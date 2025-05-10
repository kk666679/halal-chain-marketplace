import { useState } from 'react';
import { FaCode, FaCopy, FaCheck } from 'react-icons/fa';
import IntegrationCard from './IntegrationCard';
import { FaShieldAlt, FaGlobe, FaDatabase, FaRobot } from 'react-icons/fa';

export default function ApiSection() {
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  
  const apiIntegrations = [
    {
      name: "Certification API",
      description: "Access and verify halal certifications with our quantum-secure API endpoints.",
      icon: <FaShieldAlt className="text-green-600 text-2xl" />,
      features: [
        "Verify certification authenticity",
        "Query certification details",
        "Check certification status",
        "Access certification history"
      ],
      documentation: "/docs/api/certification",
      version: "v3.2.1"
    },
    {
      name: "Supply Chain API",
      description: "Track products through the entire supply chain with comprehensive traceability data.",
      icon: <FaGlobe className="text-blue-600 text-2xl" />,
      features: [
        "Real-time location tracking",
        "Temperature and condition monitoring",
        "Chain of custody verification",
        "Carbon footprint calculation"
      ],
      documentation: "/docs/api/supply-chain",
      version: "v2.8.0"
    },
    {
      name: "Vendor API",
      description: "Manage vendor profiles, products, and certifications programmatically.",
      icon: <FaDatabase className="text-purple-600 text-2xl" />,
      features: [
        "Vendor registration and verification",
        "Product catalog management",
        "Inventory synchronization",
        "Sales analytics and reporting"
      ],
      documentation: "/docs/api/vendor",
      version: "v3.0.5"
    },
    {
      name: "AI Agent API",
      description: "Integrate with our AI agents for advanced supply chain intelligence and automation.",
      icon: <FaRobot className="text-red-600 text-2xl" />,
      features: [
        "Inventory optimization",
        "Demand forecasting",
        "Fraud detection",
        "Routing optimization"
      ],
      documentation: "/docs/api/ai-agents",
      version: "v1.9.2"
    }
  ];

  const codeSnippets = [
    {
      id: 'authentication',
      title: 'Authentication',
      language: 'javascript',
      code: `// Install the SDK
npm install @halalchain/api-client

// Initialize with your API key
const HalalChain = require('@halalchain/api-client');
const client = new HalalChain({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'sandbox' for testing
});

// Authenticate your requests
const authToken = await client.auth.getToken();
console.log('Authentication successful!');`
    },
    {
      id: 'certification',
      title: 'Verify Certification',
      language: 'javascript',
      code: `// Verify a product certification
const certificationId = 'cert_12345abcde';

try {
  const certification = await client.certifications.verify(certificationId);
  
  if (certification.isValid) {
    console.log('Certification is valid!');
    console.log(\`Issued by: \${certification.issuer}\`);
    console.log(\`Expiration: \${certification.expiresAt}\`);
  } else {
    console.log('Certification is invalid or expired');
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
  const trackingData = await client.supplyChain.getProductJourney(productId);
  
  console.log(\`Product: \${trackingData.productName}\`);
  console.log(\`Current location: \${trackingData.currentLocation.name}\`);
  
  console.log('Journey:');
  trackingData.journey.forEach((step, index) => {
    console.log(\`\${index + 1}. \${step.location} - \${step.timestamp}\`);
    console.log(\`   Status: \${step.status}\`);
    console.log(\`   Verified by: \${step.verifier}\`);
  });
} catch (error) {
  console.error('Tracking failed:', error.message);
}`
    }
  ];

  const [activeSnippet, setActiveSnippet] = useState(codeSnippets[0].id);

  const copyToClipboard = (snippetId) => {
    const snippet = codeSnippets.find(s => s.id === snippetId);
    navigator.clipboard.writeText(snippet.code);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {apiIntegrations.map((integration, index) => (
          <IntegrationCard key={index} integration={integration} />
        ))}
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        <div className="flex border-b border-gray-700">
          {codeSnippets.map(snippet => (
            <button
              key={snippet.id}
              className={`px-4 py-3 text-sm font-medium ${
                activeSnippet === snippet.id
                  ? 'bg-gray-800 text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setActiveSnippet(snippet.id)}
            >
              {snippet.title}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => copyToClipboard(activeSnippet)}
              className="p-2 text-gray-400 hover:text-white rounded"
              aria-label="Copy code"
            >
              {copiedSnippet === activeSnippet ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          
          <pre className="p-4 overflow-x-auto text-gray-300 text-sm">
            <code>
              {codeSnippets.find(s => s.id === activeSnippet).code}
            </code>
          </pre>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <a 
          href="/docs/api/getting-started"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FaCode className="mr-2" />
          API Documentation
        </a>
      </div>
    </div>
  );
}