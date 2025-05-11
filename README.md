# HalalChain Marketplace

A blockchain-based marketplace for halal-certified products with transparent supply chain tracking, focusing on ASEAN, China, Russia, Australia, UAE/Dubai, and GCC markets.

## Features

### Regional Integration Hub
- Certification bodies from ASEAN, China, Russia, Australia, UAE/Dubai, and GCC countries
- Region-specific e-commerce platform integrations
- Product categories tailored to each region
- Regional compliance guides and market insights

### Supply Chain Tracking
- QR code generation and scanning for product verification
- Detailed supply chain journey visualization
- Interactive supply chain maps
- Blockchain verification of each supply chain step
- Document verification and traceability

### Compliance Tools
- Halal certification verification
- Product compliance checker
- Regional standards compliance
- Region-specific QR templates

### Market Insights
- Market size and growth trends
- Category distribution analysis
- Regional market opportunities
- Export potential assessment

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Key Components

### Regional Integration
- `/src/app/integrations/regional` - Regional integration hub
- `/src/app/integrations/regional/market-insights` - Market insights by region
- `/src/app/integrations/regional/compliance` - Regional compliance checker

### Supply Chain & Verification
- `/src/components/supply-chain/SupplyChainTracker.jsx` - Supply chain visualization
- `/src/components/supply-chain/SupplyChainMap.jsx` - Interactive supply chain map
- `/src/components/supply-chain/qr-tracking` - QR code generation and scanning
- `/src/app/verify/[productId]` - Product verification page
- `/src/app/supply-chain/verify` - Supply chain verification page

### Marketplace
- `/src/app/marketplace` - Main marketplace with regional filtering

## Technologies Used

- Next.js for the frontend framework
- Tailwind CSS for styling
- Recharts for data visualization
- QR code generation and scanning libraries
- Blockchain integration for verification

## Regional Coverage

### ASEAN
- Certification bodies: MUI (Indonesia), JAKIM (Malaysia), CICOT (Thailand), MUIS (Singapore), IDCP (Philippines), MUIB (Brunei)
- E-commerce platforms: Lazada Halal Hub, Shopee Halal, Tokopedia

### China
- Certification bodies: China Islamic Association, Ningxia Halal Certification Center, Xinjiang Halal Certification Center
- E-commerce platforms: Alibaba.com, JD.com, Tmall Global

### Russia
- Certification bodies: Halal Standard Committee (HSC), International Center for Halal Standardization and Certification
- E-commerce platforms: Wildberries, Ozon, Yandex.Market

### Australia
- Certification bodies: Australian Federation of Islamic Councils (AFIC), Halal Certification Authority Australia (HCAA), Islamic Co-ordinating Council of Victoria (ICCV)
- E-commerce platforms: Integration with major Australian retailers

### UAE/Dubai
- Certification bodies: Emirates Authority for Standardization and Metrology (ESMA), Dubai Municipality - Food Safety Department
- E-commerce platforms: Integration with UAE e-commerce platforms

### GCC Countries
- Certification bodies: Saudi Food and Drug Authority (SFDA), Qatar Halal Authority, Kuwait Municipality, Bahrain Standards and Metrology Directorate, Oman Ministry of Endowments and Religious Affairs
- E-commerce platforms: Integration with regional GCC platforms