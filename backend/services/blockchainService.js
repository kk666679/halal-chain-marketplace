const { getProvider, getHalalCertificationContract, getSupplyChainContract } = require('../config/blockchain');
const logger = require('../config/logger');

/**
 * Blockchain Service
 * Handles interactions with blockchain contracts
 */
class BlockchainService {
  /**
   * Register a product on the blockchain
   * @param {string} productId - MongoDB product ID
   * @param {string} metadataURI - IPFS URI for product metadata
   * @returns {Promise<Object>} - Transaction receipt
   */
  async registerProduct(productId, metadataURI) {
    try {
      const provider = getProvider();
      const contract = getSupplyChainContract(provider);
      
      if (!contract || contract.address === '0x0000000000000000000000000000000000000000') {
        throw new Error('Contract not properly configured');
      }
      
      const tx = await contract.createProduct(productId, metadataURI);
      const receipt = await tx.wait();
      
      logger.info('Product registered on blockchain', { 
        productId, 
        txHash: receipt.transactionHash 
      });
      
      return {
        success: true,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      logger.error('Failed to register product on blockchain', { error, productId });
      throw error;
    }
  }
  
  /**
   * Add a supply chain stage for a product
   * @param {string} productId - MongoDB product ID
   * @param {string} stage - Supply chain stage
   * @param {string} metadataURI - IPFS URI for stage metadata
   * @returns {Promise<Object>} - Transaction receipt
   */
  async addSupplyChainStage(productId, stage, metadataURI) {
    try {
      const provider = getProvider();
      const contract = getSupplyChainContract(provider);
      
      if (!contract || contract.address === '0x0000000000000000000000000000000000000000') {
        throw new Error('Contract not properly configured');
      }
      
      const tx = await contract.addStage(productId, stage, metadataURI);
      const receipt = await tx.wait();
      
      logger.info('Supply chain stage added on blockchain', { 
        productId, 
        stage,
        txHash: receipt.transactionHash 
      });
      
      return {
        success: true,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      logger.error('Failed to add supply chain stage on blockchain', { error, productId, stage });
      throw error;
    }
  }
  
  /**
   * Create a certification on the blockchain
   * @param {string} productId - MongoDB product ID
   * @param {string} vendorAddress - Vendor's blockchain address
   * @param {number} validityPeriod - Validity period in seconds
   * @param {string} metadataURI - IPFS URI for certification metadata
   * @returns {Promise<Object>} - Transaction receipt and certification ID
   */
  async createCertification(productId, vendorAddress, validityPeriod, metadataURI) {
    try {
      const provider = getProvider();
      const contract = getHalalCertificationContract(provider);
      
      if (!contract || contract.address === '0x0000000000000000000000000000000000000000') {
        throw new Error('Contract not properly configured');
      }
      
      const tx = await contract.createCertification(
        productId,
        vendorAddress,
        validityPeriod,
        metadataURI
      );
      
      const receipt = await tx.wait();
      
      // Get certification ID from event
      const event = receipt.events.find(e => e.event === 'CertificationCreated');
      let certificationId = null;
      
      if (event) {
        [certificationId] = event.args;
      }
      
      logger.info('Certification created on blockchain', { 
        productId, 
        certificationId: certificationId?.toString(),
        txHash: receipt.transactionHash 
      });
      
      return {
        success: true,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        certificationId: certificationId?.toString()
      };
    } catch (error) {
      logger.error('Failed to create certification on blockchain', { error, productId });
      throw error;
    }
  }
  
  /**
   * Verify a certification on the blockchain
   * @param {string} productId - MongoDB product ID
   * @returns {Promise<Object>} - Verification result
   */
  async verifyCertification(productId) {
    try {
      const provider = getProvider();
      const contract = getHalalCertificationContract(provider);
      
      if (!contract || contract.address === '0x0000000000000000000000000000000000000000') {
        throw new Error('Contract not properly configured');
      }
      
      const result = await contract.verifyCertification(productId);
      
      return {
        isValid: result.isValid,
        certificationId: result.certificationId.toString(),
        certifier: result.certifier,
        expiresAt: new Date(result.expiresAt.toNumber() * 1000).toISOString()
      };
    } catch (error) {
      logger.error('Failed to verify certification on blockchain', { error, productId });
      throw error;
    }
  }
  
  /**
   * Revoke a certification on the blockchain
   * @param {string} certificationId - Blockchain certification ID
   * @returns {Promise<Object>} - Transaction receipt
   */
  async revokeCertification(certificationId) {
    try {
      const provider = getProvider();
      const contract = getHalalCertificationContract(provider);
      
      if (!contract || contract.address === '0x0000000000000000000000000000000000000000') {
        throw new Error('Contract not properly configured');
      }
      
      const tx = await contract.revokeCertification(certificationId);
      const receipt = await tx.wait();
      
      logger.info('Certification revoked on blockchain', { 
        certificationId, 
        txHash: receipt.transactionHash 
      });
      
      return {
        success: true,
        txHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      logger.error('Failed to revoke certification on blockchain', { error, certificationId });
      throw error;
    }
  }
}

module.exports = new BlockchainService();