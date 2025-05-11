'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaBuilding, FaCode, FaStore, FaGraduationCap, FaFlask, FaGlobeAmericas, 
  FaArrowRight, FaPlus, FaBrain, FaVrCardboard, FaRobot, FaShieldAlt
} from 'react-icons/fa';

export default function PortalsSection() {
  const [activeExtension, setActiveExtension] = useState(null);
  
  const portals = [
    {
      icon: <FaBuilding className="text-white text-3xl" />,
      title: "Government Portal",
      description: "Advanced regulatory dashboard with AI-powered compliance monitoring, real-time supply chain visibility, and quantum-secure verification tools.",
      color: "bg-blue-600",
      link: "/portals/government",
      new: false,
      extensions: [
        {
          id: "gov-neural",
          name: "Neural Policy Interface",
          description: "Direct neural connection to policy databases for instant regulatory updates and compliance verification.",
          icon: <FaBrain />,
          link: "/extensions/government/neural-policy"
        },
        {
          id: "gov-quantum",
          name: "Quantum Verification Suite",
          description: "Tamper-proof verification system using quantum cryptography for ultimate security in regulatory oversight.",
          icon: <FaShieldAlt />,
          link: "/extensions/government/quantum-verification"
        }
      ]
    },
    {
      icon: <FaCode className="text-white text-3xl" />,
      title: "Developer Hub",
      description: "Next-generation API ecosystem with quantum-resistant authentication, neural interface SDKs, and holographic AR integration tools.",
      color: "bg-purple-600",
      link: "/portals/developer",
      new: false,
      extensions: [
        {
          id: "dev-sdk",
          name: "Neural Interface SDK",
          description: "Build applications that connect directly to users' neural implants for seamless interaction with halal verification systems.",
          icon: <FaBrain />,
          link: "/extensions/developer/neural-sdk"
        },
        {
          id: "dev-ar",
          name: "Holographic AR Tools",
          description: "Create immersive AR experiences for product verification and supply chain visualization.",
          icon: <FaVrCardboard />,
          link: "/extensions/developer/ar-tools"
        }
      ]
    },
    {
      icon: <FaStore className="text-white text-3xl" />,
      title: "Vendor Dashboard",
      description: "AI-enhanced management interface with predictive analytics, autonomous inventory optimization, and carbon footprint monitoring.",
      color: "bg-green-600",
      link: "/portals/vendor",
      new: false,
      extensions: [
        {
          id: "vendor-ai",
          name: "AI Agent Integration",
          description: "Deploy autonomous AI agents to optimize your supply chain, predict demand, and automate inventory management.",
          icon: <FaRobot />,
          link: "/extensions/vendor/ai-agents"
        },
        {
          id: "vendor-carbon",
          name: "Carbon Footprint Tracker",
          description: "Real-time monitoring and optimization of your carbon footprint across the entire supply chain.",
          icon: <FaGlobeAmericas />,
          link: "/extensions/vendor/carbon-tracker"
        }
      ]
    },
    {
      icon: <FaGraduationCap className="text-white text-3xl" />,
      title: "Education Portal",
      description: "Interactive learning platform with AR/VR training modules on halal standards, supply chain management, and blockchain certification.",
      color: "bg-red-600",
      link: "/portals/education",
      new: true,
      extensions: [
        {
          id: "edu-vr",
          name: "VR Training Modules",
          description: "Immersive virtual reality training for halal certification procedures and supply chain management.",
          icon: <FaVrCardboard />,
          link: "/extensions/education/vr-training"
        }
      ]
    },
    {
      icon: <FaFlask className="text-white text-3xl" />,
      title: "Research Hub",
      description: "Collaborative platform for halal certification research, with quantum computing resources and AI-assisted analysis tools.",
      color: "bg-yellow-600",
      link: "/portals/research",
      new: true,
      extensions: [
        {
          id: "research-quantum",
          name: "Quantum Computing Lab",
          description: "Access quantum computing resources for advanced molecular analysis and certification research.",
          icon: <FaShieldAlt />,
          link: "/extensions/research/quantum-lab"
        }
      ]
    },
    {
      icon: <FaGlobeAmericas className="text-white text-3xl" />,
      title: "Global Standards Portal",
      description: "Unified interface for managing compliance with halal standards across 120+ countries with real-time regulatory updates.",
      color: "bg-indigo-600",
      link: "/portals/standards",
      new: true,
      extensions: [
        {
          id: "standards-ai",
          name: "AI Compliance Assistant",
          description: "AI-powered assistant that helps navigate complex international halal standards and regulations.",
          icon: <FaRobot />,
          link: "/extensions/standards/ai-assistant"
        }
      ]
    }
  ];

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

  const handleExtensionToggle = (portalIndex, extensionId) => {
    if (activeExtension === extensionId) {
      setActiveExtension(null);
    } else {
      setActiveExtension(extensionId);
    }
  };

  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Enhanced Multi-Portal Ecosystem</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Specialized interfaces for different stakeholders in the halal certification ecosystem,
            now with neural interfaces and quantum-secure authentication.
          </p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portals.map((portal, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${portal.color} p-6 flex justify-center relative`}>
                {portal.new && (
                  <div className="absolute top-2 right-2 bg-white text-xs font-bold text-gray-800 px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  {portal.icon}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{portal.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{portal.description}</p>
                
                {portal.extensions && portal.extensions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Available Extensions
                    </h4>
                    <div className="space-y-2">
                      {portal.extensions.map((extension) => (
                        <div key={extension.id}>
                          <button
                            onClick={() => handleExtensionToggle(index, extension.id)}
                            className="flex items-center justify-between w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center">
                              <span className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-md text-gray-600 dark:text-gray-300 mr-2">
                                {extension.icon}
                              </span>
                              <span className="font-medium text-gray-700 dark:text-gray-200">{extension.name}</span>
                            </div>
                            <FaPlus className={`text-gray-400 transition-transform ${activeExtension === extension.id ? 'rotate-45' : ''}`} />
                          </button>
                          
                          {activeExtension === extension.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-8 mt-2 mb-3 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
                            >
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{extension.description}</p>
                              <Link 
                                href={extension.link}
                                className="inline-flex items-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                              >
                                Learn more <FaArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-auto">
                  <Link 
                    href={portal.link}
                    className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded transition duration-300 w-full text-center"
                  >
                    Access Portal
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Our expanded portal ecosystem now supports neural interfaces, holographic displays, and quantum-secure 
            authentication for a seamless and secure experience across all stakeholder touchpoints.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/portals"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Explore All Portals
            </Link>
            <Link 
              href="/extensions"
              className="inline-block bg-transparent border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Browse Extensions Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}