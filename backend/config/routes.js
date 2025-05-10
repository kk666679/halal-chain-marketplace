/**
 * Routes configuration
 * Configures API routes and their handlers
 */

const express = require('express');
const { authenticate, authorize } = require('./middleware');
const { USER_ROLES } = require('./constants');

// Import route modules
const setupRoutes = (app) => {
  // API version prefix
  const apiPrefix = '/api';
  
  // Auth routes
  app.use(`${apiPrefix}/auth`, require('../routes/authRoutes'));
  
  // Vendor routes - requires authentication
  app.use(
    `${apiPrefix}/vendors`, 
    authenticate, 
    require('../routes/vendorRoutes')
  );
  
  // Product routes - some endpoints require authentication
  app.use(
    `${apiPrefix}/products`, 
    require('../routes/productRoutes')
  );
  
  // Certification routes - requires authentication and specific roles
  app.use(
    `${apiPrefix}/certifications`, 
    authenticate, 
    authorize(USER_ROLES.ADMIN, USER_ROLES.CERTIFIER, USER_ROLES.VENDOR),
    require('../routes/certificationRoutes')
  );
  
  // Supply chain routes - requires authentication
  app.use(
    `${apiPrefix}/supply-chain`, 
    authenticate,
    require('../routes/supplyChainRoutes')
  );
  
  // AI agent routes - requires authentication
  app.use(
    `${apiPrefix}/ai-agents`, 
    authenticate,
    require('../routes/aiAgentRoutes')
  );
  
  // Admin routes - requires admin role
  app.use(
    `${apiPrefix}/admin`, 
    authenticate, 
    authorize(USER_ROLES.ADMIN),
    require('../routes/adminRoutes')
  );
  
  // Root route
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to HalalChain Marketplace API',
      version: '1.0.0',
      documentation: '/api/docs'
    });
  });
  
  // API documentation route
  app.get(`${apiPrefix}/docs`, (req, res) => {
    res.json({
      message: 'API Documentation',
      endpoints: {
        auth: `${apiPrefix}/auth`,
        vendors: `${apiPrefix}/vendors`,
        products: `${apiPrefix}/products`,
        certifications: `${apiPrefix}/certifications`,
        supplyChain: `${apiPrefix}/supply-chain`,
        aiAgents: `${apiPrefix}/ai-agents`,
        admin: `${apiPrefix}/admin`
      }
    });
  });
  
  // 404 handler for API routes
  app.use(`${apiPrefix}/*`, (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API endpoint not found'
    });
  });
};

module.exports = setupRoutes;