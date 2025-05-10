import { useState } from 'react';
import Image from 'next/image';
import { FaBrain, FaVrCardboard, FaHandPointer, FaWaveSquare, FaMicrochip } from 'react-icons/fa';

export default function NeuralInterfaceSection() {
  const [activeTab, setActiveTab] = useState('consumer');
  
  const interfaces = {
    consumer: {
      title: "Consumer Neural Interface",
      description: "Experience products through direct sensory simulation before purchase. Taste, smell, and feel halal products through our safe, non-invasive neural interface technology.",
      features: [
        "Sensory product sampling without physical product",
        "Personalized taste profile calibration",
        "Nutritional impact simulation",
        "Ethical sourcing emotional resonance",
        "Memory anchoring for enhanced recall"
      ],
      image: "/images/consumer-neural.png"
    },
    vendor: {
      title: "Vendor Command Center",
      description: "Control your entire supply chain with thought-based commands and neural visualization. Monitor inventory, production, and sales through an immersive neural dashboard.",
      features: [
        "Thought-based inventory management",
        "Neural supply chain visualization",
        "Emotional customer feedback integration",
        "Predictive market sensing",
        "Multi-location simultaneous oversight"
      ],
      image: "/images/vendor-neural.png"
    },
    inspector: {
      title: "Halal Inspector Interface",
      description: "Certify products with unprecedented accuracy using enhanced sensory perception and AI-augmented cognition for halal compliance verification.",
      features: [
        "Enhanced molecular composition sensing",
        "Cross-reference with global halal standards",
        "Contamination detection at parts-per-billion",
        "Processing method verification",
        "Blockchain certification integration"
      ],
      image: "/images/inspector-neural.png"
    }
  };
  
  return (
    <section className="w-full py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-indigo-700 bg-opacity-50 rounded-full px-4 py-1 mb-4">
            <FaMicrochip className="mr-2 text-purple-300" />
            <span className="text-sm font-semibold">NEURAL INTERFACE TECHNOLOGY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Future of Halal Commerce</h2>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            Our non-invasive neural interface technology connects your mind directly to the HalalChain ecosystem,
            enabling unprecedented levels of product verification, sensory experience, and supply chain transparency.
          </p>
        </div>
        
        {/* Interface Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-indigo-800 bg-opacity-50 rounded-full p-1">
            <button
              onClick={() => setActiveTab('consumer')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'consumer' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Consumer
            </button>
            <button
              onClick={() => setActiveTab('vendor')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'vendor' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Vendor
            </button>
            <button
              onClick={() => setActiveTab('inspector')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'inspector' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:text-white'
              }`}
            >
              Inspector
            </button>
          </div>
        </div>
        
        {/* Interface Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">{interfaces[activeTab].title}</h3>
            <p className="text-indigo-100 mb-6">
              {interfaces[activeTab].description}
            </p>
            
            <ul className="space-y-3">
              {interfaces[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <FaWaveSquare className="text-indigo-200" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300">
                <FaVrCardboard className="mr-2" />
                Request Demo
              </button>
              <button className="bg-transparent border border-indigo-400 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300">
                <FaBrain className="mr-2" />
                Learn More
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 bg-indigo-600 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="absolute inset-0 bg-purple-600 rounded-2xl transform -rotate-3 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={interfaces[activeTab].image}
                  alt={interfaces[activeTab].title}
                  width={400}
                  height={300}
                  className="rounded-xl"
                />
              </div>
            </div>
            
            {/* Neural connection animation */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: '0 0 8px 2px rgba(129, 140, 248, 0.6)',
                    animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Safety Notice */}
        <div className="mt-16 bg-indigo-800 bg-opacity-50 rounded-xl p-6 max-w-3xl mx-auto">
          <h4 className="text-xl font-semibold mb-3 flex items-center">
            <FaHandPointer className="mr-2 text-indigo-300" />
            Neural Interface Safety
          </h4>
          <p className="text-indigo-100">
            Our neural interfaces use non-invasive quantum-entangled photonic sensors that require no implants or physical contact.
            All sensory experiences comply with ISO 42001 Neural Safety Standards and are certified by the Global Neural Ethics Board.
            User neural patterns remain private and are never stored or transmitted.
          </p>
        </div>
      </div>
    </section>
  );
}