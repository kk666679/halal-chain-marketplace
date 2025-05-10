/**
 * IPFS configuration
 * Manages IPFS connection and file operations
 */

const { create } = require('ipfs-http-client');
const { IPFS_API_URL, IPFS_GATEWAY } = require('./env');

// Create IPFS client
const ipfs = create({ url: 'http://localhost:5001' });

module.exports = ipfs;

// Upload file to IPFS
const uploadToIPFS = async (data) => {
  try {
    const result = await ipfs.add(data);
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS');
  }
};

// Get file from IPFS
const getFromIPFS = async (cid) => {
  try {
    const stream = ipfs.cat(cid);
    
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    return Buffer.concat(chunks);
  } catch (error) {
    console.error('Error getting from IPFS:', error);
    throw new Error('Failed to get file from IPFS');
  }
};

// Get IPFS gateway URL for a CID
const getIPFSUrl = (cid) => {
  if (!cid) return null;
  return `${IPFS_GATEWAY}/${cid}`;
};

module.exports = {
  uploadToIPFS,
  getFromIPFS,
  getIPFSUrl
};