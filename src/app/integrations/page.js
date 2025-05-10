"use client";

import { useState } from 'react';
import IntegrationHero from './components/IntegrationHero';
import IntegrationTabs from './components/IntegrationTabs';
import IntegrationProcess from './components/IntegrationProcess';
import IntegrationGuides from './components/IntegrationGuides';
import ApiSection from './components/ApiSection';
import SocialMediaIntegrations from './components/SocialMediaIntegrations';
import EcommerceIntegrations from './components/EcommerceIntegrations';
import { FaShieldAlt, FaGlobe, FaDatabase, FaRobot } from 'react-icons/fa';
import IntegrationCard from './components/IntegrationCard';

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('api');
  
  // SDK integrations data
  const sdkIntegrations = [
    {
      name: "JavaScript SDK",
      description: "Integrate HalalChain into web applications with our comprehensive JavaScript SDK.",
      icon: <span className="text-yellow-500 text-2xl font-bold">JS</span>,
      features: [
        "Browser and Node.js support",
        "TypeScript definitions",
        "React components library",
        "Authentication helpers"
      ],
      documentation: "/docs/sdk/javascript",
      demo: "/demos/javascript-sdk",
      version: "v4.2.0"
    },
    {
      name: "Python SDK",
      description: "Build powerful backend integrations with our Python SDK for data analysis and automation.",
      icon: <span className="text-blue-500 text-2xl font-bold">Py</span>,
      features: [
        "Async/await support",
        "Pandas integration",
        "ML model connectors",
        "CLI tools"
      ],
      documentation: "/docs/sdk/python",
      version: "v3.7.1"
    },
    {
      name: "Mobile SDKs",
      description: "Native SDKs for iOS and Android with AR capabilities and offline support.",
      icon: <span className="text-green-500 text-2xl font-bold">M</span>,
      features: [
        "iOS (Swift) and Android (Kotlin)",
        "AR product visualization",
        "QR/barcode scanning",
        "Offline certification verification"
      ],
      documentation: "/docs/sdk/mobile",
      version: "v2.5.3"
    },
    {
      name: "Blockchain Connectors",
      description: "Connect directly to our blockchain infrastructure with specialized connectors.",
      icon: <span className="text-blue-500 text-2xl font-bold">BC</span>,
      features: [
        "Ethereum, Polygon, and Solana support",
        "Smart contract interaction",
        "Transaction signing and verification",
        "Quantum-resistant cryptography"
      ],
      documentation: "/docs/sdk/blockchain",
      version: "v2.0.1"
    }
  ];

  // Webhooks integrations data
  const webhooksIntegrations = [
    {
      name: "Certification Events",
      description: "Receive real-time notifications when certifications are issued, updated, or revoked.",
      icon: <FaShieldAlt className="text-green-600 text-2xl" />,
      features: [
        "Certification issuance",
        "Certification renewal",
        "Certification revocation",
        "Certification expiration warnings"
      ],
      documentation: "/docs/webhooks/certification",
      version: "v2.4.0"
    },
    {
      name: "Supply Chain Events",
      description: "Get notified of key events throughout the supply chain process.",
      icon: <FaGlobe className="text-blue-600 text-2xl" />,
      features: [
        "Product location updates",
        "Condition threshold alerts",
        "Chain of custody transfers",
        "Delivery confirmations"
      ],
      documentation: "/docs/webhooks/supply-chain",
      version: "v3.1.2"
    },
    {
      name: "AI Insights",
      description: "Receive AI-generated insights and alerts based on pattern recognition and anomaly detection.",
      icon: <FaRobot className="text-red-600 text-2xl" />,
      features: [
        "Fraud detection alerts",
        "Demand forecast updates",
        "Inventory optimization suggestions",
        "Quality control issues"
      ],
      documentation: "/docs/webhooks/ai-insights",
      version: "v1.5.0"
    }
  ];

  // Neural interface integrations data
  const neuralIntegrations = [
    {
      name: "Sensory API",
      description: "Connect to our neural interface system to provide sensory experiences of products.",
      icon: <FaRobot className="text-purple-600 text-2xl" />,
      features: [
        "Taste simulation data",
        "Texture and feel parameters",
        "Aroma profiles",
        "Visual enhancement data"
      ],
      documentation: "/docs/neural/sensory",
      version: "v1.2.0",
      beta: true
    },
    {
      name: "Neural SDK",
      description: "Integrate with neural interface hardware using our specialized SDK.",
      icon: <span className="text-purple-500 text-2xl font-bold">N</span>,
      features: [
        "NeuraLink compatibility",
        "Non-invasive interface support",
        "Sensory data processing",
        "Feedback calibration"
      ],
      documentation: "/docs/neural/sdk",
      version: "v0.9.5",
      beta: true
    }
  ];

  // Render the appropriate content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'api':
        return <ApiSection />;
      case 'sdk':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {sdkIntegrations.map((integration, index) => (
              <IntegrationCard key={index} integration={integration} />
            ))}
          </div>
        );
      case 'webhooks':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {webhooksIntegrations.map((integration, index) => (
              <IntegrationCard key={index} integration={integration} />
            ))}
          </div>
        );
      case 'social':
        return <SocialMediaIntegrations />;
      case 'ecommerce':
        return <EcommerceIntegrations />;
      case 'neural':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {neuralIntegrations.map((integration, index) => (
              <IntegrationCard key={index} integration={integration} />
            ))}
          </div>
        );
      default:
        return <ApiSection />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <IntegrationHero />
      
      {/* Integration Types Tabs */}
      <IntegrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Integration List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {renderTabContent()}
        </div>
      </section>
      
      {/* Integration Process */}
      <IntegrationProcess />
      
      {/* Integration Guides */}
      <IntegrationGuides />
      
      {/* CTA */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Integrate with HalalChain?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that have enhanced their halal supply chain operations with our integration solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register/developer" className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
              Create Developer Account
            </a>
            <a href="/contact/sales" className="bg-transparent hover:bg-indigo-800 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}