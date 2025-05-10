/**
 * Configuration index
 * Exports all configuration modules for easy access
 */

const env = require('./env');
const connectDB = require('./database');
const auth = require('./auth');
const blockchain = require('./blockchain');
const ipfs = require('./ipfs');
const ai = require('./ai');
const email = require('./email');

module.exports = {
  env,
  connectDB,
  auth,
  blockchain,
  ipfs,
  ai,
  email
};