const Certification = require('../models/Certification');
const Product = require('../models/Product');
const { uploadToIPFS, getIPFSUrl } = require('../config/ipfs');
const { getProvider, getHalalCertificationContract } = require('../config/blockchain');
const { CERTIFICATION_STATUS, PAGINATION } = require('../config/constants');
const { sendEmail, EMAIL_TEMPLATES } = require('../config/email');
const logger = require('../config/logger');

/**
 * @desc    Create a new certification
 * @route   POST /api/certifications
 * @access  Private (Certifier)
 */
exports.createCertification = async (req, res) => {
  try {
    const {
      productId,
      expiryDate,
      documents,
      inspectionDetails
    } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Create certification in database
    const certification = await Certification.create({
      product: productId,
      certifier: req.user.id,
      vendor: product.vendor,
      expiryDate,
      documents: documents || [],
      inspectionDetails: inspectionDetails || {},
      status: CERTIFICATION_STATUS.PENDING
    });

    // Create certification metadata for blockchain
    const metadata = {
      certificationId: certification._id.toString(),
      productId: product._id.toString(),
      certifierId: req.user.id,
      vendorId: product.vendor.toString(),
      status: CERTIFICATION_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      expiryDate
    };

    // Upload metadata to IPFS
    try {
      const metadataBuffer = Buffer.from(JSON.stringify(metadata));
      const ipfsCid = await uploadToIPFS(metadataBuffer);
      const metadataURI = getIPFSUrl(ipfsCid);

      // Update certification with IPFS metadata URI
      certification.metadataURI = metadataURI;
      await certification.save();

      // Register certification on blockchain (will be done when approved)
    } catch (error) {
      logger.error('IPFS integration error', { error });
      // Continue without IPFS integration
      await certification.save();
    }

    res.status(201).json({
      success: true,
      data: certification
    });
  } catch (error) {
    logger.error('Create certification error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not create certification',
      error: error.message
    });
  }
};

/**
 * @desc    Get all certifications
 * @route   GET /api/certifications
 * @access  Private (Admin, Certifier)
 */
exports.getCertifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || PAGINATION.DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || PAGINATION.DEFAULT_LIMIT;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    // Build query based on role
    let query = {};
    
    if (req.user.role === 'certifier') {
      query.certifier = req.user.id;
    } else if (req.user.role === 'vendor') {
      query.vendor = req.user.id;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    const total = await Certification.countDocuments(query);

    const certifications = await Certification.find(query)
      .populate('product', 'name category')
      .populate('certifier', 'name company')
      .populate('vendor', 'name company')
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: certifications.length,
      pagination,
      data: certifications
    });
  } catch (error) {
    logger.error('Get certifications error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not retrieve certifications',
      error: error.message
    });
  }
};

/**
 * @desc    Get single certification
 * @route   GET /api/certifications/:id
 * @access  Private (Admin, Certifier, Vendor of the product)
 */
exports.getCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id)
      .populate('product', 'name description category')
      .populate('certifier', 'name company')
      .populate('vendor', 'name company');

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    // Check if user is authorized to view this certification
    if (
      req.user.role !== 'admin' &&
      certification.certifier.toString() !== req.user.id &&
      certification.vendor.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this certification'
      });
    }

    res.status(200).json({
      success: true,
      data: certification
    });
  } catch (error) {
    logger.error('Get certification error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not retrieve certification',
      error: error.message
    });
  }
};

/**
 * @desc    Update certification status
 * @route   PUT /api/certifications/:id/status
 * @access  Private (Certifier who created it)
 */
exports.updateCertificationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!Object.values(CERTIFICATION_STATUS).includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid certification status'
      });
    }

    let certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    // Check if user is the certifier
    if (certification.certifier.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this certification'
      });
    }

    // If approving, set issuedDate to now
    if (status === CERTIFICATION_STATUS.APPROVED && certification.status !== CERTIFICATION_STATUS.APPROVED) {
      certification.issuedDate = Date.now();
      
      // Register on blockchain
      try {
        const provider = getProvider();
        const contract = getHalalCertificationContract(provider);
        
        if (contract && contract.address !== '0x0000000000000000000000000000000000000000') {
          // Calculate validity period in seconds
          const now = new Date();
          const expiryDate = new Date(certification.expiryDate);
          const validityPeriod = Math.floor((expiryDate - now) / 1000);
          
          // Create certification on blockchain
          const tx = await contract.createCertification(
            certification.product.toString(),
            certification.vendor.toString(),
            validityPeriod,
            certification.metadataURI || ''
          );
          
          // Wait for transaction to be mined
          const receipt = await tx.wait();
          
          // Get certification ID from event
          const event = receipt.events.find(e => e.event === 'CertificationCreated');
          if (event) {
            const [certificationId] = event.args;
            certification.blockchainId = certificationId.toString();
            certification.blockchainTxHash = receipt.transactionHash;
          }
        }
      } catch (error) {
        logger.error('Blockchain integration error', { error });
        // Continue without blockchain integration
      }
      
      // Send email to vendor
      try {
        const product = await Product.findById(certification.product);
        const vendor = await User.findById(certification.vendor);
        
        if (vendor && product) {
          await sendEmail({
            to: vendor.email,
            subject: EMAIL_TEMPLATES.CERTIFICATION_APPROVED.subject,
            html: EMAIL_TEMPLATES.CERTIFICATION_APPROVED.generateHtml(vendor.name, product.name)
          });
        }
      } catch (error) {
        logger.error('Email sending error', { error });
        // Continue without email
      }
    }
    
    // If revoking, set revocation reason
    if (status === CERTIFICATION_STATUS.REVOKED) {
      certification.revocationReason = req.body.revocationReason || 'No reason provided';
      
      // Revoke on blockchain if registered
      if (certification.blockchainId) {
        try {
          const provider = getProvider();
          const contract = getHalalCertificationContract(provider);
          
          if (contract && contract.address !== '0x0000000000000000000000000000000000000000') {
            await contract.revokeCertification(certification.blockchainId);
          }
        } catch (error) {
          logger.error('Blockchain revocation error', { error });
          // Continue without blockchain revocation
        }
      }
    }

    // Update status
    certification.status = status;
    await certification.save();

    res.status(200).json({
      success: true,
      data: certification
    });
  } catch (error) {
    logger.error('Update certification status error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not update certification status',
      error: error.message
    });
  }
};

/**
 * @desc    Verify certification by certificate number
 * @route   GET /api/certifications/verify/:certificateNumber
 * @access  Public
 */
exports.verifyCertification = async (req, res) => {
  try {
    const { certificateNumber } = req.params;

    const certification = await Certification.findOne({ certificateNumber })
      .populate('product', 'name category')
      .populate('certifier', 'name company')
      .populate('vendor', 'name company');

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    // Check if certification is valid
    const now = new Date();
    const expiryDate = new Date(certification.expiryDate);
    const isExpired = now > expiryDate;
    const isValid = certification.status === CERTIFICATION_STATUS.APPROVED && !isExpired;

    res.status(200).json({
      success: true,
      data: {
        certification,
        isValid,
        isExpired,
        verificationResult: isValid ? 'Valid' : 'Invalid'
      }
    });
  } catch (error) {
    logger.error('Verify certification error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not verify certification',
      error: error.message
    });
  }
};