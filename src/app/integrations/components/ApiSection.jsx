'use client';

import { useState, useEffect } from 'react';
import { FaCode, FaCopy, FaCheck, FaShieldAlt, FaGlobe, FaDatabase, FaRobot, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import IntegrationCard from './IntegrationCard';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useToast } from '@/components/ui/use-toast';

export default function ApiSection() {
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const [activeSnippet, setActiveSnippet] = useState('authentication');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const apiIntegrations = [
    {
      name: "Certification API",
      description: "Access and verify halal certifications with our quantum-secure API endpoints.",
      icon: <FaShieldAlt className="text-green-600 dark:text-green-400 text-2xl" />,
      features: [
        "Verify certification authenticity",
        "Query certification details",
        "Check certification status",
        "Access certification history"
      ],
      documentation: "/docs/api/certification",
      version: "v4.1.0",
      new: true
    },
    {
      name: "Supply Chain API",
      description: "Track products through the entire supply chain with comprehensive traceability data.",
      icon: <FaGlobe className="text-blue-600 dark:text-blue-400 text-2xl" />,
      features: [
        "Real-time location tracking",
        "Temperature and condition monitoring",
        "Chain of custody verification",
        "Carbon footprint calculation"
      ],
      documentation: "/docs/api/supply-chain",
      version: "v3.2.5"
    },
    {
      name: "Vendor API",
      description: "Manage vendor profiles, products, and certifications programmatically.",
      icon: <FaDatabase className="text-purple-600 dark:text-purple-400 text-2xl" />,
      features: [
        "Vendor registration and verification",
        "Product catalog management",
        "Inventory synchronization",
        "Sales analytics and reporting"
      ],
      documentation: "/docs/api/vendor",
      version: "v3.5.2"
    },
    {
      name: "AI Agent API",
      description: "Integrate with our AI agents for advanced supply chain intelligence and automation.",
      icon: <FaRobot className="text-red-600 dark:text-red-400 text-2xl" />,
      features: [
        "Inventory optimization",
        "Demand forecasting",
        "Fraud detection",
        "Routing optimization"
      ],
      documentation: "/docs/api/ai-agents",
      version: "v2.8.0"
    },
    {
      name: "Quantum Verification API",
      description: "Leverage quantum computing for tamper-proof verification of halal products.",
      icon: <FaLightbulb className="text-amber-600 dark:text-amber-400 text-2xl" />,
      features: [
        "Quantum-resistant encryption",
        "Molecular composition verification",
        "Quantum random number generation",
        "Quantum-secured blockchain integration"
      ],
      documentation: "/docs/api/quantum",
      version: "v1.2.0",
      new: true
    }
  ];

  const codeSnippets = [
    {
      id: 'authentication',
      title: 'Authentication',
      language: 'javascript',
      code: `// Install the SDK
npm install @halalchain/api-client@latest

// Initialize with your API key
import { HalalChainClient } from '@halalchain/api-client';

const client = new HalalChainClient({
  apiKey: process.env.HALALCHAIN_API_KEY,
  environment: 'production', // or 'sandbox' for testing
  region: 'global', // or 'eu', 'asia', 'me'
  version: 'v4'
});

// Authenticate your requests
const authResult = await client.auth.getToken({
  scope: ['certifications:read', 'supply-chain:read']
});

console.log('Authentication successful!');
console.log(\`Token expires in \${authResult.expiresIn} seconds\`);`
    },
    {
      id: 'certification',
      title: 'Verify Certification',
      language: 'javascript',
      code: `// Verify a product certification
const certificationId = 'cert_12345abcde';

try {
  const certification = await client.certifications.verify(certificationId, {
    includeHistory: true,
    verificationLevel: 'quantum' // Use quantum verification for highest security
  });
  
  if (certification.isValid) {
    console.log('Certification is valid!');
    console.log(\`Issued by: \${certification.issuer}\`);
    console.log(\`Expiration: \${certification.expiresAt}\`);
    console.log(\`Verification method: \${certification.verificationMethod}\`);
    
    // Check blockchain verification
    if (certification.blockchainVerification) {
      console.log(\`Blockchain verified: \${certification.blockchainVerification.verified}\`);
      console.log(\`Transaction hash: \${certification.blockchainVerification.txHash}\`);
    }
  } else {
    console.log('Certification is invalid or expired');
    console.log(\`Reason: \${certification.invalidReason}\`);
  }
} catch (error) {
  console.error('Verification failed:', error.message);
}`
    },
    {
      id: 'tracking',
      title: 'Track Product',
      language: 'javascript',
      code: `// Track a product through the supply chain
const productId = 'prod_67890fghij';

try {
  const trackingData = await client.supplyChain.getProductJourney(productId, {
    includeEnvironmentalData: true,
    includeVerificationProofs: true
  });
  
  console.log(\`Product: \${trackingData.productName}\`);
  console.log(\`Current location: \${trackingData.currentLocation.name}\`);
  console.log(\`Carbon footprint: \${trackingData.environmentalData.carbonFootprint}kg CO2e\`);
  
  console.log('Journey:');
  trackingData.journey.forEach((step, index) => {
    console.log(\`\${index + 1}. \${step.location} - \${step.timestamp}\`);
    console.log(\`   Status: \${step.status}\`);
    console.log(\`   Verified by: \${step.verifier}\`);
    console.log(\`   Temperature: \${step.conditions.temperature}°C\`);
    console.log(\`   Humidity: \${step.conditions.humidity}%\`);
  });
  
  // Generate QR code for consumer verification
  const qrCodeUrl = await client.supplyChain.generateVerificationQR(productId);
  console.log(\`Consumer verification QR: \${qrCodeUrl}\`);
} catch (error) {
  console.error('Tracking failed:', error.message);
}`
    },
    {
      id: 'quantum',
      title: 'Quantum Verification',
      language: 'javascript',
      code: `// Perform quantum-secured verification of product authenticity
const productId = 'prod_67890fghij';
const sampleId = 'sample_12345abcde';

try {
  // Initialize quantum verification session
  const session = await client.quantum.initVerificationSession({
    productId,
    sampleId,
    verificationLevel: 'molecular'
  });
  
  console.log(\`Quantum session initialized: \${session.id}\`);
  console.log(\`Quantum entropy source: \${session.entropySource}\`);
  
  // Perform molecular composition verification
  const result = await client.quantum.verifyMolecularComposition({
    sessionId: session.id,
    referenceData: {
      molecularSignature: 'SAMPLE_MOLECULAR_SIGNATURE',
      confidenceThreshold: 0.95
    }
  });
  
  if (result.verified) {
    console.log('Product authenticity verified via quantum verification!');
    console.log(\`Confidence score: \${result.confidenceScore}\`);
    console.log(\`Verification method: \${result.method}\`);
    
    // Get quantum-signed certificate
    const certificate = await client.quantum.generateCertificate(session.id);
    console.log(\`Certificate ID: \${certificate.id}\`);
    console.log(\`Verification proof: \${certificate.verificationProof}\`);
  } else {
    console.log('Product verification failed');
    console.log(\`Reason: \${result.failureReason}\`);
  }
} catch (error) {
  console.error('Quantum verification failed:', error.message);
}`
    }
  ];

  const copyToClipboard = (snippetId) => {
    const snippet = codeSnippets.find(s => s.id === snippetId);
    navigator.clipboard.writeText(snippet.code);
    setCopiedSnippet(snippetId);
    
    toast({
      title: "Code copied!",
      description: "The code snippet has been copied to your clipboard.",
      variant: "success",
      duration: 2000
    });
    
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (!mounted) {
    return null; // Avoid rendering until client-side to prevent hydration mismatch
  }

  return (
    <div className="space-y-12">
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {apiIntegrations.map((integration, index) => (
          <motion.div key={index} variants={itemVariants}>
            <IntegrationCard integration={integration} />
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700">
          {codeSnippets.map(snippet => (
            <button
              key={snippet.id}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeSnippet === snippet.id
                  ? 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setActiveSnippet(snippet.id)}
            >
              {snippet.title}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => copyToClipboard(activeSnippet)}
              className="p-2 bg-gray-800 dark:bg-gray-700 text-gray-200 hover:text-white rounded-md transition-colors"
              aria-label="Copy code"
            >
              {copiedSnippet === activeSnippet ? <FaCheck className="text-green-400" /> : <FaCopy />}
            </button>
          </div>
          
          <div className="p-1 overflow-x-auto">
            <SyntaxHighlighter
              language="javascript"
              style={theme === 'dark' ? atomDark : oneLight}
              showLineNumbers={true}
              wrapLines={true}
              customStyle={{
                margin: 0,
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f8f8'
              }}
            >
              {codeSnippets.find(s => s.id === activeSnippet).code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a 
          href="/docs/api/getting-started"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors w-full sm:w-auto justify-center"
        >
          <FaCode className="mr-2" />
          API Documentation
        </a>
        <a 
          href="/api/playground"
          className="inline-flex items-center px-6 py-3 border border-emerald-600 text-base font-medium rounded-md shadow-sm text-emerald-600 dark:text-emerald-400 bg-transparent hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors w-full sm:w-auto justify-center"
        >
          <FaLightbulb className="mr-2" />
          API Playground
        </a>
      </div>
      
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex items-start">
        <div className="flex-shrink-0 mt-1">
          <FaLightbulb className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">New in May 2025</h3>
          <div className="mt-2 text-sm text-emerald-700 dark:text-emerald-200">
            <p>Our APIs now support quantum-secured verification and regional data residency. Check out our updated <a href="/docs/api/changelog" className="underline hover:text-emerald-900 dark:hover:text-emerald-100">changelog</a> for more details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}