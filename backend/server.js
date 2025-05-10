const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import configuration
const { env, connectDB, middleware, logger } = require('./config');
const setupRoutes = require('./config/routes');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Apply middleware
app.use(cors(middleware.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.request);

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use(middleware.errorHandler);

// Start server
const PORT = env.PORT || 3002;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;