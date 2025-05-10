const { createIPFSClient, getIPFSUrl } = require('../config/ipfs');
const logger = require('../config/logger');
const fs = require('fs');
const path = require('path');

/**
 * IPFS Service
 * Handles interactions with IPFS for file storage
 */
class IPFSService {
  /**
   * Upload a file to IPFS
   * @param {Buffer|string} fileData - File data as buffer or path to file
   * @returns {Promise<string>} - IPFS CID
   */
  async uploadFile(fileData) {
    try {
      const ipfs = createIPFSClient();
      let data;
      
      // If fileData is a string, assume it's a file path
      if (typeof fileData === 'string') {
        data = fs.readFileSync(fileData);
      } else {
        data = fileData;
      }
      
      const result = await ipfs.add(data);
      logger.info('File uploaded to IPFS', { cid: result.path });
      
      return result.path;
    } catch (error) {
      logger.error('Failed to upload file to IPFS', { error });
      throw error;
    }
  }
  
  /**
   * Upload JSON data to IPFS
   * @param {Object} jsonData - JSON data to upload
   * @returns {Promise<string>} - IPFS CID
   */
  async uploadJSON(jsonData) {
    try {
      const data = Buffer.from(JSON.stringify(jsonData));
      const cid = await this.uploadFile(data);
      
      return cid;
    } catch (error) {
      logger.error('Failed to upload JSON to IPFS', { error });
      throw error;
    }
  }
  
  /**
   * Get file from IPFS
   * @param {string} cid - IPFS CID
   * @returns {Promise<Buffer>} - File data
   */
  async getFile(cid) {
    try {
      const ipfs = createIPFSClient();
      const stream = ipfs.cat(cid);
      
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      
      return Buffer.concat(chunks);
    } catch (error) {
      logger.error('Failed to get file from IPFS', { error, cid });
      throw error;
    }
  }
  
  /**
   * Get JSON data from IPFS
   * @param {string} cid - IPFS CID
   * @returns {Promise<Object>} - JSON data
   */
  async getJSON(cid) {
    try {
      const data = await this.getFile(cid);
      return JSON.parse(data.toString());
    } catch (error) {
      logger.error('Failed to get JSON from IPFS', { error, cid });
      throw error;
    }
  }
  
  /**
   * Save file from IPFS to local filesystem
   * @param {string} cid - IPFS CID
   * @param {string} filePath - Path to save file
   * @returns {Promise<string>} - File path
   */
  async saveFileLocally(cid, filePath) {
    try {
      const data = await this.getFile(cid);
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, data);
      logger.info('File saved locally', { cid, filePath });
      
      return filePath;
    } catch (error) {
      logger.error('Failed to save file locally', { error, cid, filePath });
      throw error;
    }
  }
  
  /**
   * Get IPFS gateway URL for a CID
   * @param {string} cid - IPFS CID
   * @returns {string} - IPFS gateway URL
   */
  getUrl(cid) {
    return getIPFSUrl(cid);
  }
}

module.exports = new IPFSService();