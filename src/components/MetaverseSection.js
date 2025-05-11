'use client';

import { useState } from 'react';
import { FaCube, FaVrCardboard, FaGlobe, FaStore, FaUsers, FaUniversity } from 'react-icons/fa';

export default function MetaverseSection() {
  const [activeTab, setActiveTab] = useState('marketplace');
  
  const tabs = [
    { id: 'marketplace', label: 'Virtual Marketplace', icon: <FaStore className="h-5 w-5" /> },
    { id: 'education', label: 'Education Center', icon: <FaUniversity className="h-5 w-5" /> },
    { id: 'community', label: 'Community Hub', icon: <FaUsers className="h-5 w-5" /> },
  ];
  
  const features = {
    marketplace: [
      { title: 'Virtual Product Showcases', description: 'Explore 3D models of halal products with detailed certification information.' },
      { title: 'Immersive Shopping', description: 'Walk through virtual stores and interact with products before purchasing.' },
      { title: 'Live Vendor Interactions', description: 'Connect with vendors through avatars for real-time product inquiries.' },
    ],
    education: [
      { title: 'Interactive Learning', description: 'Participate in immersive workshops about halal certification processes.' },
      { title: 'Virtual Factory Tours', description: 'Visit digital twins of production facilities to understand halal compliance.' },
      { title: 'Certification Training', description: 'Train staff in virtual environments that simulate real-world scenarios.' },
    ],
    community: [
      { title: 'Global Networking', description: 'Connect with halal industry professionals worldwide in virtual meeting spaces.' },
      { title: 'Cultural Exchange', description: 'Experience diverse halal traditions through immersive cultural exhibitions.' },
      { title: 'Community Events', description: 'Attend virtual conferences, trade shows, and networking events.' },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Metaverse Integration</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of halal commerce in our immersive metaverse environment, connecting consumers, producers, and certifiers in virtual spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
                </div>
                
                <div className="relative z-10 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl transform rotate-45 animate-pulse"></div>
                    <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <FaCube className="h-24 w-24 text-indigo-500 dark:text-indigo-400" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full animate-bounce">
                  <FaVrCardboard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                
                <div className="absolute top-4 left-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full animate-pulse">
                  <FaGlobe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 rounded-full p-4 shadow-xl">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div>
                {features[activeTab].map((feature, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                ))}
                
                <div className="mt-8">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                    Explore Metaverse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our metaverse integration is powered by advanced blockchain technology, ensuring secure and transparent interactions in virtual environments.
          </p>
        </div>
      </div>
    </section>
  );
}