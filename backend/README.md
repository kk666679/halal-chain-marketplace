# HalalChain Marketplace Backend

This directory contains the backend API for the HalalChain Marketplace platform.

## Directory Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # API controllers
├── models/           # MongoDB models
├── routes/           # API routes
├── middleware/       # Express middleware
├── utils/            # Utility functions
├── services/         # Business logic services
├── contracts/        # Smart contract ABIs
│   └── abis/         # Contract ABI JSON files
├── tests/            # Test files
├── logs/             # Application logs
├── uploads/          # Uploaded files
└── server.js         # Main entry point
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory (see `.env.example` for required variables)

3. Start the development server:
   ```
   npm run backend:dev
   ```

4. Start the production server:
   ```
   npm run backend:start
   ```

5. Start with PM2:
   ```
   npm run pm2:start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update user profile
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/verifyemail/:verificationtoken` - Verify email

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor only)
- `PUT /api/products/:id` - Update product (Vendor only)
- `DELETE /api/products/:id` - Delete product (Vendor only)
- `GET /api/products/vendor/products` - Get vendor products (Vendor only)

### Certifications
- `GET /api/certifications` - Get all certifications (Admin, Certifier, Vendor)
- `GET /api/certifications/:id` - Get single certification (Admin, Certifier, Vendor)
- `POST /api/certifications` - Create certification (Certifier only)
- `PUT /api/certifications/:id/status` - Update certification status (Certifier only)
- `GET /api/certifications/verify/:certificateNumber` - Verify certification (Public)

### Supply Chain
- `GET /api/supply-chain/:productId` - Get product supply chain
- `POST /api/supply-chain` - Add supply chain event (Vendor only)
- `GET /api/supply-chain/events/:id` - Get supply chain event

### AI Agents
- `POST /api/ai-agents/assess-certification` - Get certification assessment
- `POST /api/ai-agents/supply-chain-recommendations` - Get supply chain recommendations
- `POST /api/ai-agents/generate-description` - Generate product description

## Technologies

- Node.js & Express - Backend framework
- MongoDB & Mongoose - Database
- JWT - Authentication
- Ethers.js - Blockchain integration
- IPFS - Decentralized storage
- OpenAI - AI features
- PM2 - Process management

## Development

- Use `nodemon` for development with auto-reload
- Run tests with `npm test`
- Check code style with `npm run lint`

## Blockchain Integration

The backend integrates with Ethereum smart contracts for:
- Product registration
- Certification issuance
- Supply chain tracking

Smart contract ABIs are stored in `contracts/abis/` directory.

## IPFS Integration

Product metadata and certification documents are stored on IPFS for:
- Decentralized storage
- Immutable records
- Public verification