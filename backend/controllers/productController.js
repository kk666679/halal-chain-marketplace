const Product = require('../models/Product');
const { uploadToIPFS, getIPFSUrl } = require('../config/ipfs');
const { getProvider, getSupplyChainContract } = require('../config/blockchain');
const { PAGINATION } = require('../config/constants');
const logger = require('../config/logger');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Vendor)
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      ingredients,
      nutritionalInfo,
      price,
      images,
      mainImage
    } = req.body;

    // Create product in database
    const product = await Product.create({
      name,
      description,
      category,
      vendor: req.user.id,
      ingredients: ingredients || [],
      nutritionalInfo: nutritionalInfo || {},
      price,
      images: images || [],
      mainImage
    });

    // Create product metadata for blockchain
    const metadata = {
      name,
      description,
      category,
      vendor: req.user.id,
      productId: product._id.toString(),
      createdAt: new Date().toISOString()
    };

    // Upload metadata to IPFS
    try {
      const metadataBuffer = Buffer.from(JSON.stringify(metadata));
      const ipfsCid = await uploadToIPFS(metadataBuffer);
      const metadataURI = getIPFSUrl(ipfsCid);

      // Update product with IPFS metadata URI
      product.metadataURI = metadataURI;

      // Register product on blockchain
      const provider = getProvider();
      const contract = getSupplyChainContract(provider);
      
      // Only proceed with blockchain if contract is available
      if (contract && contract.address !== '0x0000000000000000000000000000000000000000') {
        const tx = await contract.createProduct(
          product._id.toString(),
          metadataURI
        );
        
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        // Update product with blockchain ID
        product.blockchainId = product._id.toString();
        await product.save();
      } else {
        // Save product without blockchain integration
        await product.save();
      }
    } catch (error) {
      logger.error('Blockchain/IPFS integration error', { error });
      // Continue without blockchain integration
      await product.save();
    }

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Create product error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not create product',
      error: error.message
    });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || PAGINATION.DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || PAGINATION.DEFAULT_LIMIT;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();

    // Build query
    let query = {};

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by vendor
    if (req.query.vendor) {
      query.vendor = req.query.vendor;
    }

    // Filter by availability
    if (req.query.available) {
      query.isAvailable = req.query.available === 'true';
    }

    // Filter by featured
    if (req.query.featured) {
      query.isFeatured = req.query.featured === 'true';
    }

    // Search by name or description
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Execute query
    const products = await Product.find(query)
      .populate('vendor', 'name company')
      .populate('certifications')
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
      count: products.length,
      pagination,
      data: products
    });
  } catch (error) {
    logger.error('Get products error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not retrieve products',
      error: error.message
    });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'name company')
      .populate({
        path: 'certifications',
        populate: {
          path: 'certifier',
          select: 'name company'
        }
      })
      .populate('supplyChainEvents');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Get product error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not retrieve product',
      error: error.message
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private (Vendor)
 */
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is the vendor
    if (product.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    // Update product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Update blockchain metadata if needed
    if (req.body.name || req.body.description || req.body.category) {
      try {
        // Create updated metadata
        const metadata = {
          name: product.name,
          description: product.description,
          category: product.category,
          vendor: req.user.id,
          productId: product._id.toString(),
          updatedAt: new Date().toISOString()
        };

        // Upload updated metadata to IPFS
        const metadataBuffer = Buffer.from(JSON.stringify(metadata));
        const ipfsCid = await uploadToIPFS(metadataBuffer);
        const metadataURI = getIPFSUrl(ipfsCid);

        // Update product with new IPFS metadata URI
        product.metadataURI = metadataURI;
        await product.save();

        // Update blockchain if product is registered
        if (product.blockchainId) {
          const provider = getProvider();
          const contract = getSupplyChainContract(provider);
          
          if (contract && contract.address !== '0x0000000000000000000000000000000000000000') {
            await contract.updateProductMetadata(
              product.blockchainId,
              metadataURI
            );
          }
        }
      } catch (error) {
        logger.error('Blockchain/IPFS update error', { error });
        // Continue without blockchain update
      }
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Update product error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not update product',
      error: error.message
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private (Vendor)
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is the vendor
    if (product.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    logger.error('Delete product error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not delete product',
      error: error.message
    });
  }
};

/**
 * @desc    Get vendor products
 * @route   GET /api/products/vendor
 * @access  Private (Vendor)
 */
exports.getVendorProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || PAGINATION.DEFAULT_PAGE;
    const limit = parseInt(req.query.limit, 10) || PAGINATION.DEFAULT_LIMIT;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const query = { vendor: req.user.id };
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('certifications')
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
      count: products.length,
      pagination,
      data: products
    });
  } catch (error) {
    logger.error('Get vendor products error', { error });
    res.status(500).json({
      success: false,
      message: 'Could not retrieve vendor products',
      error: error.message
    });
  }
};