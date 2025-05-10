/**
 * Blockchain configuration
 * Manages blockchain connection and contract interactions
 */

const { ethers } = require('ethers');
const { BLOCKCHAIN_NETWORK, PROVIDER_URL, CONTRACT_ADDRESS } = require('./env');

// Import contract ABIs
const HalalCertificationABI = require('../contracts/abis/HalalCertification.json');
const SupplyChainABI = require('../contracts/abis/SupplyChain.json');

// Setup provider based on environment
const getProvider = () => {
  try {
    if (BLOCKCHAIN_NETWORK === 'localhost') {
      return new ethers.JsonRpcProvider(PROVIDER_URL);
    } else {
      // For production networks like mainnet, testnet, etc.
      return new ethers.JsonRpcProvider(PROVIDER_URL);
    }
  } catch (error) {
    console.error('Error creating blockchain provider:', error);
    throw new Error('Failed to connect to blockchain provider');
  }
};

// Get contract instances
const getHalalCertificationContract = (signerOrProvider) => {
  try {
    const contractAddress = CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
    return new ethers.Contract(contractAddress, HalalCertificationABI, signerOrProvider);
  } catch (error) {
    console.error('Error creating HalalCertification contract instance:', error);
    throw new Error('Failed to create contract instance');
  }
};

const getSupplyChainContract = (signerOrProvider) => {
  try {
    // You might want to store this address separately in env
    const contractAddress = CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
    return new ethers.Contract(contractAddress, SupplyChainABI, signerOrProvider);
  } catch (error) {
    console.error('Error creating SupplyChain contract instance:', error);
    throw new Error('Failed to create contract instance');
  }
};

module.exports = {
  getProvider,
  getHalalCertificationContract,
  getSupplyChainContract
};