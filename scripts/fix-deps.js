#!/usr/bin/env node

/**
 * This script fixes dependency issues that might cause webpack errors
 * It runs after npm install via the postinstall hook
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Running dependency fix script...');

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Create apps directory structure if it doesn't exist
ensureDirectoryExists(path.join(__dirname, '../apps'));
ensureDirectoryExists(path.join(__dirname, '../apps/backend'));

// Create a basic package.json for the backend app if it doesn't exist
const backendPackagePath = path.join(__dirname, '../apps/backend/package.json');
if (!fs.existsSync(backendPackagePath)) {
  const backendPackage = {
    name: "halal-chain-backend",
    version: "1.0.0",
    private: true,
    main: "server.js",
    scripts: {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    dependencies: {
      "express": "^4.18.2",
      "mongoose": "^8.0.0",
      "cors": "^2.8.5",
      "dotenv": "^16.3.1",
      "jsonwebtoken": "^9.0.2"
    }
  };
  
  fs.writeFileSync(
    backendPackagePath,
    JSON.stringify(backendPackage, null, 2)
  );
  console.log('Created backend package.json');
}

// Create a basic server.js for the backend app if it doesn't exist
const backendServerPath = path.join(__dirname, '../apps/backend/server.js');
if (!fs.existsSync(backendServerPath)) {
  const serverContent = `
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'HalalChain Backend API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
  
  fs.writeFileSync(backendServerPath, serverContent);
  console.log('Created backend server.js');
}

// Fix for webpack 5 polyfill issues
try {
  // Check if we need to create a custom webpack config
  const webpackConfigPath = path.join(__dirname, '../webpack.config.js');
  if (!fs.existsSync(webpackConfigPath)) {
    const webpackConfig = `
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      assert: require.resolve('assert/'),
      url: require.resolve('url/'),
      buffer: require.resolve('buffer/'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
};
`;
    fs.writeFileSync(webpackConfigPath, webpackConfig);
    console.log('Created webpack.config.js with polyfills');
  }
  
  console.log('✅ Dependency fixes completed successfully');
} catch (error) {
  console.error('❌ Error fixing dependencies:', error);
  process.exit(1);
}