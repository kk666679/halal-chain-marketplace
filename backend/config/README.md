# Backend Configuration

This directory contains configuration files for the HalalChain Marketplace backend.

## Configuration Files

- **index.js**: Main entry point that exports all configuration modules
- **env.js**: Environment variables and defaults
- **database.js**: MongoDB connection configuration
- **auth.js**: Authentication and JWT configuration
- **blockchain.js**: Blockchain connection and contract interactions
- **ipfs.js**: IPFS connection and file operations
- **ai.js**: OpenAI API integration for AI features
- **email.js**: Email sending functionality
- **constants.js**: Application-wide constants
- **middleware.js**: Express middleware functions
- **routes.js**: API routes configuration
- **validation.js**: Request data validation functions
- **logger.js**: Application logging configuration

## Usage

Import the configuration modules in your backend files:

```javascript
// Import all configurations
const config = require('./config');

// Use specific configurations
const { env, auth, blockchain } = require('./config');

// Connect to database
const connectDB = require('./config/database');
connectDB();

// Use environment variables
const { PORT, NODE_ENV } = require('./config/env');

// Use authentication functions
const { generateToken, verifyToken } = require('./config/auth');

// Use constants
const { USER_ROLES, CERTIFICATION_STATUS } = require('./config/constants');
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server
NODE_ENV=development
PORT=3002
API_URL=http://localhost:3002
FRONTEND_URL=http://localhost:3001

# Database
MONGODB_URI=mongodb://localhost:27017/halal-chain

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# Blockchain
BLOCKCHAIN_NETWORK=localhost
CONTRACT_ADDRESS=0x...
PROVIDER_URL=http://localhost:8545

# IPFS
IPFS_API_URL=http://localhost:5001
IPFS_GATEWAY=http://localhost:8080/ipfs

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Email
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@halalchain.com
```

## Adding New Configuration

To add a new configuration module:

1. Create a new file in the `config` directory
2. Export the configuration functions/objects
3. Import the new module in `index.js` and add it to the exports