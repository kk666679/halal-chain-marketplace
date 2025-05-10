"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaCode, FaPlug, FaCloudDownloadAlt, FaGlobe, FaRobot, FaShieldAlt, FaDatabase, FaBrain } from 'react-icons/fa';

export default function Integrations() {
  const [activeTab, setActiveTab] = useState('api');
  
  const integrationTypes = [
    { id: 'api', name: 'REST API', icon: <FaCode /> },
    { id: 'sdk', name: 'SDKs & Libraries', icon: <FaPlug /> },
    { id: 'webhooks', name: 'Webhooks', icon: <FaCloudDownloadAlt /> },
    { id: 'neural', name: 'Neural Interface', icon: <FaRobot /> }
  ];
  
  const integrations = {
    api: [
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
    ],
    sdk: [
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
    ],
    webhooks: [
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
    ],
    neural: [
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
        version: "v1.2.0 (Beta)"
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
        version: "v0.9.5 (Beta)"
      },
      {
        name: "Thought Command API",
        description: "Enable thought-based control systems for vendor and inspector interfaces.",
        icon: <FaBrain className="text-indigo-600 text-2xl" />,
        features: [
          "Command recognition",
          "Intent processing",
          "Multi-command sequences",
          "Personalized calibration"
        ],
        documentation: "/docs/neural/thought-command",
        version: "v0.8.2 (Alpha)"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">HalalChain Integration Hub</h1>
              <p className="text-xl mb-8">
                Connect your systems and applications to the HalalChain ecosystem with our comprehensive suite of APIs, SDKs, and integration tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/docs" className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
                  View Documentation
                </Link>
                <Link href="/developer-portal" className="bg-transparent hover:bg-indigo-700 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Developer Portal
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/integration-hero.png"
                  alt="Integration Diagram"
                  fill
                  style={{objectFit: "contain"}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Integration Types Tabs */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {integrationTypes.map(type => (
              <button
                key={type.id}
                className={`flex items-center px-6 py-4 border-b-2 whitespace-nowrap ${
                  activeTab === type.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(type.id)}
              >
                <span className="mr-2">{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {integrations[activeTab].map((integration, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-full p-3 mr-4">
                      {integration.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold">{integration.name}</h3>
                        <span className="ml-3 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {integration.version}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{integration.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">FEATURES</h4>
                    <ul className="space-y-2">
                      {integration.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Link 
                      href={integration.documentation}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Documentation →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Integration Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Register</h3>
              <p className="text-gray-600">
                Create a developer account and register your application to receive API keys and credentials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Integration</h3>
              <p className="text-gray-600">
                Select the appropriate APIs, SDKs, or webhooks based on your application's requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Develop</h3>
              <p className="text-gray-600">
                Implement the integration using our comprehensive documentation and developer tools.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Go Live</h3>
              <p className="text-gray-600">
                Test thoroughly in our sandbox environment, then deploy to production with our support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            See how leading organizations have integrated with HalalChain to enhance their halal supply chain operations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image
                  src="/images/case-studies/global-foods.jpg"
                  alt="Global Foods Inc."
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/logos/global-foods.png"
                    alt="Global Foods Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h3 className="text-xl font-bold ml-3">Global Foods Inc.</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Integrated our API to verify halal certifications across 2,500+ products, increasing consumer trust by 78%.
                </p>
                <Link href="/case-studies/global-foods" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Read Case Study →
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image
                  src="/images/case-studies/halal-mart.jpg"
                  alt="HalalMart"
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/logos/halal-mart.png"
                    alt="HalalMart Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h3 className="text-xl font-bold ml-3">HalalMart</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Used our SDK to build a consumer-facing app with real-time certification verification, increasing sales by 45%.
                </p>
                <Link href="/case-studies/halal-mart" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Read Case Study →
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image
                  src="/images/case-studies/al-baraka.jpg"
                  alt="Al-Baraka Farms"
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/logos/al-baraka.png"
                    alt="Al-Baraka Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h3 className="text-xl font-bold ml-3">Al-Baraka Farms</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Implemented our neural interface SDK to allow customers to experience their products virtually before purchase.
                </p>
                <Link href="/case-studies/al-baraka" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Read Case Study →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Integrate with HalalChain?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that have enhanced their halal supply chain operations with our integration solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/developer-portal/register" className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
              Create Developer Account
            </Link>
            <Link href="/contact/sales" className="bg-transparent hover:bg-indigo-800 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}