module.exports = {
  apps: [
    {
      name: 'halal-chain-marketplace',
      script: 'app.js',
      instances: 1,  // Changed from 'max' to 1 to avoid port conflicts
      exec_mode: 'fork',  // Changed from 'cluster' to 'fork'
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'backend-api',
      script: 'backend/server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3002  // Using a different port for the backend API
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    }
  ]
};
