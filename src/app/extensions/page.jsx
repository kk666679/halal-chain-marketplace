'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaBrain, FaVrCardboard, FaRobot, FaShieldAlt, FaGlobeAmericas, 
  FaSearch, FaFilter, FaStar, FaDownload, FaArrowRight
} from 'react-icons/fa';

export default function ExtensionsMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Extensions' },
    { id: 'neural', name: 'Neural Interfaces' },
    { id: 'ai', name: 'AI & Automation' },
    { id: 'ar-vr', name: 'AR/VR' },
    { id: 'quantum', name: 'Quantum Security' },
    { id: 'analytics', name: 'Analytics' }
  ];
  
  const extensions = [
    {
      id: 'neural-policy',
      name: 'Neural Policy Interface',
      description: 'Direct neural connection to policy databases for instant regulatory updates and compliance verification.',
      icon: <FaBrain className="text-purple-500" />,
      category: 'neural',
      portal: 'Government',
      rating: 4.8,
      downloads: 1245,
      new: true,
      link: '/extensions/government/neural-policy'
    },
    {
      id: 'quantum-verification',
      name: 'Quantum Verification Suite',
      description: 'Tamper-proof verification system using quantum cryptography for ultimate security in regulatory oversight.',
      icon: <FaShieldAlt className="text-blue-500" />,
      category: 'quantum',
      portal: 'Government',
      rating: 4.9,
      downloads: 876,
      new: true,
      link: '/extensions/government/quantum-verification'
    },
    {
      id: 'neural-sdk',
      name: 'Neural Interface SDK',
      description: 'Build applications that connect directly to users\' neural implants for seamless interaction with halal verification systems.',
      icon: <FaBrain className="text-purple-500" />,
      category: 'neural',
      portal: 'Developer',
      rating: 4.7,
      downloads: 3421,
      new: false,
      link: '/extensions/developer/neural-sdk'
    },
    {
      id: 'ar-tools',
      name: 'Holographic AR Tools',
      description: 'Create immersive AR experiences for product verification and supply chain visualization.',
      icon: <FaVrCardboard className="text-green-500" />,
      category: 'ar-vr',
      portal: 'Developer',
      rating: 4.6,
      downloads: 2187,
      new: false,
      link: '/extensions/developer/ar-tools'
    },
    {
      id: 'ai-agents',
      name: 'AI Agent Integration',
      description: 'Deploy autonomous AI agents to optimize your supply chain, predict demand, and automate inventory management.',
      icon: <FaRobot className="text-red-500" />,
      category: 'ai',
      portal: 'Vendor',
      rating: 4.9,
      downloads: 5632,
      new: false,
      link: '/extensions/vendor/ai-agents'
    },
    {
      id: 'carbon-tracker',
      name: 'Carbon Footprint Tracker',
      description: 'Real-time monitoring and optimization of your carbon footprint across the entire supply chain.',
      icon: <FaGlobeAmericas className="text-green-500" />,
      category: 'analytics',
      portal: 'Vendor',
      rating: 4.5,
      downloads: 1876,
      new: false,
      link: '/extensions/vendor/carbon-tracker'
    },
    {
      id: 'vr-training',
      name: 'VR Training Modules',
      description: 'Immersive virtual reality training for halal certification procedures and supply chain management.',
      icon: <FaVrCardboard className="text-blue-500" />,
      category: 'ar-vr',
      portal: 'Education',
      rating: 4.8,
      downloads: 943,
      new: true,
      link: '/extensions/education/vr-training'
    },
    {
      id: 'quantum-lab',
      name: 'Quantum Computing Lab',
      description: 'Access quantum computing resources for advanced molecular analysis and certification research.',
      icon: <FaShieldAlt className="text-purple-500" />,
      category: 'quantum',
      portal: 'Research',
      rating: 4.7,
      downloads: 562,
      new: true,
      link: '/extensions/research/quantum-lab'
    },
    {
      id: 'ai-assistant',
      name: 'AI Compliance Assistant',
      description: 'AI-powered assistant that helps navigate complex international halal standards and regulations.',
      icon: <FaRobot className="text-yellow-500" />,
      category: 'ai',
      portal: 'Global Standards',
      rating: 4.6,
      downloads: 2341,
      new: true,
      link: '/extensions/standards/ai-assistant'
    }
  ];
  
  // Filter extensions based on search query and selected category
  const filteredExtensions = extensions.filter(extension => {
    const matchesSearch = extension.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         extension.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || extension.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Extensions Marketplace</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Enhance your HalalChain experience with powerful extensions for neural interfaces, 
            quantum security, AR/VR, and AI-powered automation.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search extensions..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div className="flex items-center">
              <FaFilter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 mr-2">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Extensions Grid */}
        {filteredExtensions.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredExtensions.map(extension => (
              <motion.div
                key={extension.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      {extension.icon}
                    </div>
                    {extension.new && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{extension.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{extension.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {extension.portal} Portal
                    </span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{extension.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FaDownload className="mr-1" />
                      <span>{extension.downloads.toLocaleString()} downloads</span>
                    </div>
                    <Link 
                      href={extension.link}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      Details <FaArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                  <Link 
                    href={`${extension.link}/install`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <FaDownload className="mr-2 h-4 w-4" />
                    Install Extension
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No extensions found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        {/* Developer CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Build Your Own Extension</h2>
              <p className="text-emerald-100 max-w-xl">
                Are you a developer? Create and publish your own extensions to the HalalChain Marketplace
                using our comprehensive developer tools and SDKs.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                href="/portals/developer/extensions"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-emerald-50"
              >
                Developer Portal <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}