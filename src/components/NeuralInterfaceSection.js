'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaBrain, FaVrCardboard, FaHandPointer, FaWaveSquare, FaMicrochip } from 'react-icons/fa';

export default function NeuralInterfaceSection() {
  const [activeFeature, setActiveFeature] = useState('mindControl');
  
  const features = {
    mindControl: {
      title: 'Mind-Controlled Verification',
      description: 'Authenticate halal products using neural signals, enabling hands-free verification for inspectors and consumers.',
      icon: <FaBrain className="h-8 w-8 text-purple-500" />,
    },
    immersiveTraining: {
      title: 'Immersive Training',
      description: 'Train halal inspectors through neural interfaces that simulate real-world scenarios with perfect sensory feedback.',
      icon: <FaVrCardboard className="h-8 w-8 text-purple-500" />,
    },
    gestureControl: {
      title: 'Neural Gesture Control',
      description: 'Control supply chain monitoring systems with intuitive neural-powered gestures for efficient oversight.',
      icon: <FaHandPointer className="h-8 w-8 text-purple-500" />,
    },
    brainwaveAnalytics: {
      title: 'Brainwave Analytics',
      description: 'Analyze consumer brainwave patterns to understand preferences and improve halal product development.',
      icon: <FaWaveSquare className="h-8 w-8 text-purple-500" />,
    },
    neuralImplants: {
      title: 'Neural Implants',
      description: 'Optional implants for certification authorities to maintain continuous connection with the halal verification network.',
      icon: <FaMicrochip className="h-8 w-8 text-purple-500" />,
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Neural Interface Technology</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge neural interface technology connects human cognition directly with our halal verification systems, creating unprecedented levels of trust and efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Neural Interface Visualization */}
          <div className="order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl opacity-10">
                <div className="absolute w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-400 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  {features[activeFeature].icon}
                  <h3 className="text-2xl font-bold ml-3">{features[activeFeature].title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                  {features[activeFeature].description}
                </p>
                
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
                      <div className="absolute inset-4 bg-purple-600 rounded-full opacity-40 animate-pulse"></div>
                      <div className="absolute inset-8 bg-purple-700 rounded-full opacity-60 flex items-center justify-center">
                        <div className="text-white">
                          <FaBrain className="h-16 w-16" />
                        </div>
                      </div>
                      
                      {/* Connection lines */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full h-16 w-1 bg-gradient-to-t from-purple-500 to-transparent"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full h-16 w-1 bg-gradient-to-b from-purple-500 to-transparent"></div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full h-1 w-16 bg-gradient-to-l from-purple-500 to-transparent"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full h-1 w-16 bg-gradient-to-r from-purple-500 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-0 left-0 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg animate-float">
                    <Image src="/images/icons/halal-icon.png" alt="Halal" width={32} height={32} />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                    <Image src="/images/icons/blockchain-icon.png" alt="Blockchain" width={32} height={32} />
                  </div>
                  <div className="absolute top-0 right-1/4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <Image src="/images/icons/certification-icon.png" alt="Certification" width={32} height={32} />
                  </div>
                  <div className="absolute bottom-1/4 left-0 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                    <Image src="/images/icons/security-icon.png" alt="Security" width={32} height={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Feature Selection */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-6">Neural Interface Features</h3>
            <div className="space-y-4">
              {Object.entries(features).map(([key, feature]) => (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-start ${
                    activeFeature === key
                      ? 'bg-purple-100 dark:bg-purple-900 shadow-md'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    activeFeature === key
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-500 dark:text-purple-300'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{feature.description}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Learn More About Neural Interfaces
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}