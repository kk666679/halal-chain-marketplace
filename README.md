# Halal Chain Marketplace

A blockchain-powered marketplace for halal products with certification verification.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with PM2

To run the application with PM2 for production:

```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Start the application with PM2
npm run pm2:start
# or directly
pm2 start app.js

# Other PM2 commands
npm run pm2:stop    # Stop the application
npm run pm2:restart # Restart the application
npm run pm2:reload  # Zero-downtime reload
npm run pm2:delete  # Remove from PM2
```

## Deployment

This project is configured for deployment on Vercel. The live site can be accessed at:

- [https://halal-chain.com](https://halal-chain.com)
- [https://halal-chain-marketplace.vercel.app](https://halal-chain-marketplace.vercel.app)

## Features

- Blockchain-based halal certification verification
- E-commerce marketplace for halal products
- Multi-agent AI system for inventory and logistics management
- Supplier verification and tracking

## Tech Stack

- Next.js
- React
- Express.js
- Blockchain (Ethereum)
- MongoDB
- PM2 for process management
- Vercel for deployment
