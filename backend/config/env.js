/**
 * Environment configuration
 * Centralizes environment variables and provides defaults
 */

require('dotenv').config();

module.exports = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3002,
  API_URL: process.env.API_URL || 'http://localhost:3002',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3001',
  
  // Database configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/halal-chain',
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'halal-chain-jwt-secret-key-development',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // Blockchain configuration
  BLOCKCHAIN_NETWORK: process.env.BLOCKCHAIN_NETWORK || 'localhost',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  PROVIDER_URL: process.env.PROVIDER_URL || 'http://localhost:8545',
  
  // IPFS configuration
  IPFS_API_URL: process.env.IPFS_API_URL || 'http://localhost:5001',
  IPFS_GATEWAY: process.env.IPFS_GATEWAY || 'http://localhost:8080/ipfs',
  
  // OpenAI configuration
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  
  // Email configuration
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'smtp',
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@halalchain.com',
};