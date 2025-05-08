require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const httpErrors = require('http-errors');

const app = express();
const port = process.env.PORT || 3001;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Blockchain routes
app.use('/api/v1/blockchain', require('./routes/blockchain.routes'));

// Vendor management routes
app.use('/api/v1/vendors', require('./routes/vendor.routes'));

// Agent system routes
app.use('/api/v1/agents', require('./routes/agent.routes'));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      blockchain: process.env.BLOCKCHAIN_NODE_URL ? 'connected' : 'disabled',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Error handling
app.use((req, res, next) => {
  next(httpErrors(404, 'Endpoint not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

// Server initialization
app.listen(port, () => {
  console.log(`
  ██╗  ██╗ █████╗ ██╗      ██████╗  ██████╗
  ██║  ██║██╔══██╗██║     ██╔════╝ ██╔═══██╗
  ███████║███████║██║     ██║  ███╗██║   ██║
  ██╔══██║██╔══██║██║     ██║   ██║██║   ██║
  ██║  ██║██║  ██║███████╗╚██████╔╝╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
  
  HalalChain API running on port ${port}
  Environment: ${process.env.NODE_ENV || 'development'}
  Blockchain Node: ${process.env.BLOCKCHAIN_NODE_URL || 'local'}
  `);
});

module.exports = app;