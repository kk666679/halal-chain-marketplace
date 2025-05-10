# HalalChain Marketplace Frontend

This directory contains the frontend application for the HalalChain Marketplace platform.

## Directory Structure

```
src/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   └── auth/         # Authentication API routes
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── marketplace/      # Marketplace pages
│   ├── certification/    # Certification pages
│   ├── about/            # About pages
│   ├── blog/             # Blog pages
│   ├── contact/          # Contact pages
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   ├── page.js           # Home page
│   └── providers.js      # Context providers
├── components/           # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   ├── blockchain/       # Blockchain components
│   ├── theme/            # Theme components
│   ├── auth/             # Authentication components
│   ├── product/          # Product components
│   ├── certification/    # Certification components
│   ├── dashboard/        # Dashboard components
│   ├── common/           # Common components
│   └── icons/            # Icon components
├── contracts/            # Smart contract ABIs
│   └── abis/             # Contract ABI JSON files
└── lib/                  # Utility functions and API clients
```

## Key Features

### Authentication
- Email/password authentication
- Social login (Google, GitHub)
- JWT-based authentication
- Protected routes

### Blockchain Integration
- Wallet connection (MetaMask, etc.)
- Smart contract interaction
- Transaction management
- Blockchain event listening

### Product Management
- Product listing
- Product details
- Product creation and editing
- Product search and filtering

### Certification
- Certification requests
- Certification approval workflow
- Certificate verification
- Blockchain certification

### Supply Chain Tracking
- Supply chain event recording
- Product journey visualization
- QR code generation
- Traceability features

### Dashboard
- Analytics and statistics
- User management
- Product management
- Certification management

## Technologies Used

- **Next.js 14**: React framework with app router
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Ethers.js**: Ethereum library
- **NextAuth.js**: Authentication library
- **React Query**: Data fetching and caching
- **Lucide React**: Icon library

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3002
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   NEXT_PUBLIC_HALAL_CERTIFICATION_CONTRACT=0x...
   NEXT_PUBLIC_SUPPLY_CHAIN_CONTRACT=0x...
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3001
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-id
   GITHUB_SECRET=your-github-secret
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

5. Start the production server:
   ```
   npm start
   ```

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Recommended for Next.js applications
- **AWS Amplify**: For AWS integration
- **Netlify**: For simple deployments
- **Docker**: For containerized deployments

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request