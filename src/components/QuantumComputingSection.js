'use client';

import { useState, useEffect } from 'react';
import { FaAtom, FaLock, FaSearch, FaChartLine, FaGlobe, FaShieldAlt } from 'react-icons/fa';

export default function QuantumComputingSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  const features = [
    {
      title: 'Quantum Encryption',
      description: 'Unbreakable encryption for certification data using quantum key distribution.',
      icon: <FaLock className="h-6 w-6" />,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Quantum Pattern Recognition',
      description: 'Identify counterfeit products by analyzing quantum-level patterns.',
      icon: <FaSearch className="h-6 w-6" />,
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Quantum algorithms that optimize halal supply chains globally.',
      icon: <FaChartLine className="h-6 w-6" />,
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Global Quantum Network',
      description: 'Instantaneous verification across our quantum-secured global network.',
      icon: <FaGlobe className="h-6 w-6" />,
      color: 'from-red-400 to-red-600',
    },
    {
      title: 'Quantum Threat Detection',
      description: 'Proactively identify and neutralize threats to halal integrity.',
      icon: <FaShieldAlt className="h-6 w-6" />,
      color: 'from-yellow-400 to-yellow-600',
    },
  ];
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      setAnimationProgress(0);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Progress animation
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(animationInterval);
  }, [activeFeature]);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quantum Computing Integration</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform leverages quantum computing to provide unprecedented security, optimization, and verification capabilities for halal certification.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Quantum Visualization */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent dark:from-blue-900 opacity-30"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="h-24 w-24 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 animate-pulse"></div>
                    <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <FaAtom className="h-12 w-12 text-blue-500 animate-spin-slow" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{features[activeFeature].title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{features[activeFeature].description}</p>
                </div>
                
                {/* Quantum particles animation */}
                <div className="h-48 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute h-3 w-3 rounded-full bg-blue-500 opacity-75"
                        style={{
                          animation: `quantum-orbit ${3 + i * 0.5}s linear infinite`,
                          animationDelay: `${i * 0.2}s`,
                          transform: `rotate(${i * 45}deg) translateX(${50 + i * 10}px)`,
                        }}
                      ></div>
                    ))}
                    
                    {/* Central quantum core */}
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        {features[activeFeature].icon}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-6">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${features[activeFeature].color}`}
                    style={{ width: `${animationProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 bg-blue-100 dark:bg-blue-900 rounded-full p-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          {/* Features List */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quantum-Powered Features</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveFeature(index);
                    setAnimationProgress(0);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    activeFeature === index
                      ? 'bg-blue-100 dark:bg-blue-900 shadow-md'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      activeFeature === index
                        ? 'bg-gradient-to-r ' + feature.color + ' text-white'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Explore Quantum Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}