import { useState } from 'react';
import { FaCube, FaVrCardboard, FaGlobe, FaStore, FaUsers, FaUniversity } from 'react-icons/fa';

export default function MetaverseSection() {
  const [activeSpace, setActiveSpace] = useState('marketplace');
  
  const metaverseSpaces = {
    marketplace: {
      title: "Virtual Marketplace",
      description: "Explore thousands of halal products in our immersive 3D marketplace. Interact with products, view their supply chain journey, and make purchases in a fully immersive environment.",
      features: [
        "Holographic product displays with interactive information",
        "Real-time blockchain verification of certifications",
        "Virtual taste testing through neural interfaces",
        "Social shopping with friends and family across the globe"
      ],
      color: "from-blue-600 to-indigo-800"
    },
    education: {
      title: "Halal Education Center",
      description: "Learn about halal standards, certification processes, and ethical consumption through interactive courses, simulations, and expert-led workshops in our virtual education center.",
      features: [
        "Interactive halal certification courses",
        "Virtual facility tours of exemplary halal operations",
        "Live Q&A sessions with global halal scholars",
        "Hands-on training for certification inspectors"
      ],
      color: "from-green-600 to-teal-800"
    },
    conference: {
      title: "Global Halal Summit",
      description: "Attend virtual conferences, trade shows, and networking events with halal industry leaders, scholars, and innovators from around the world without leaving your home or office.",
      features: [
        "Virtual exhibition halls with vendor booths",
        "Multilingual real-time translation for global accessibility",
        "Networking lounges with spatial audio",
        "Recorded sessions with AI-enhanced search"
      ],
      color: "from-purple-600 to-pink-800"
    },
    factory: {
      title: "Digital Twin Facilities",
      description: "Tour vendor facilities and monitor production processes in real-time through digital twin technology that creates perfect virtual replicas of physical manufacturing spaces.",
      features: [
        "Real-time IoT sensor data visualization",
        "Process optimization simulations",
        "Virtual quality control inspections",
        "Supply chain integration and monitoring"
      ],
      color: "from-orange-600 to-red-800"
    }
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Metaverse grid background */}
      <div className="absolute inset-0 z-0">
        <div className="metaverse-grid"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-indigo-700 bg-opacity-50 rounded-full px-4 py-1 mb-4">
            <FaCube className="mr-2 text-indigo-300" />
            <span className="text-sm font-semibold">HALAL METAVERSE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Halal Metaverse</h2>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            Step into our immersive virtual world where halal commerce, education, and community converge.
            The HalalChain Metaverse connects consumers, vendors, and certifiers in a shared digital experience.
          </p>
        </div>
        
        {/* Metaverse Space Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(metaverseSpaces).map(([key, space]) => (
            <button
              key={key}
              className={`p-4 rounded-xl transition-all duration-300 ${
                activeSpace === key 
                  ? `bg-gradient-to-br ${space.color} shadow-lg shadow-indigo-500/20` 
                  : 'bg-indigo-800 bg-opacity-50 hover:bg-opacity-70'
              }`}
              onClick={() => setActiveSpace(key)}
            >
              <div className="flex flex-col items-center text-center">
                {key === 'marketplace' && <FaStore className="text-2xl mb-2" />}
                {key === 'education' && <FaUniversity className="text-2xl mb-2" />}
                {key === 'conference' && <FaUsers className="text-2xl mb-2" />}
                {key === 'factory' && <FaGlobe className="text-2xl mb-2" />}
                <span className="font-medium">{space.title}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Active Space Content */}
        <div className={`bg-gradient-to-br ${metaverseSpaces[activeSpace].color} rounded-2xl p-8 mb-12 transform transition-all duration-500`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{metaverseSpaces[activeSpace].title}</h3>
              <p className="text-white mb-6">
                {metaverseSpaces[activeSpace].description}
              </p>
              
              <ul className="space-y-3">
                {metaverseSpaces[activeSpace].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-1 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button className="bg-white text-indigo-900 hover:bg-indigo-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300">
                  <FaVrCardboard className="mr-2" />
                  Enter {metaverseSpaces[activeSpace].title}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="metaverse-visual">
                <div className="metaverse-sphere"></div>
                <div className="metaverse-platform"></div>
                
                {/* Floating elements */}
                <div className="metaverse-floating-element" style={{ '--delay': '0s', '--x': '-20px', '--y': '-30px' }}></div>
                <div className="metaverse-floating-element" style={{ '--delay': '1s', '--x': '30px', '--y': '20px' }}></div>
                <div className="metaverse-floating-element" style={{ '--delay': '2s', '--x': '10px', '--y': '-40px' }}></div>
                <div className="metaverse-floating-element" style={{ '--delay': '3s', '--x': '-30px', '--y': '15px' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Access Options */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all duration-300">
            <div className="bg-indigo-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FaVrCardboard className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">VR Headset</h3>
            <p className="text-indigo-200 mb-4">
              Experience the full immersion of the HalalChain Metaverse with compatible VR headsets.
              Support for all major devices including NeuraLink Visual, Meta Quest Pro, and Apple Vision Pro.
            </p>
            <div className="text-sm text-indigo-300">Compatible with 15+ devices</div>
          </div>
          
          <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all duration-300">
            <div className="bg-indigo-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile AR</h3>
            <p className="text-indigo-200 mb-4">
              Access the metaverse on the go with our mobile AR application. Place virtual products in your real environment
              and interact with them using advanced AR capabilities.
            </p>
            <div className="text-sm text-indigo-300">iOS 19+ and Android 15+</div>
          </div>
          
          <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all duration-300">
            <div className="bg-indigo-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Desktop 3D</h3>
            <p className="text-indigo-200 mb-4">
              Access a simplified version of the metaverse from any computer browser. Navigate and interact with
              3D environments using standard controls.
            </p>
            <div className="text-sm text-indigo-300">All modern browsers supported</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .metaverse-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: top;
          animation: grid-animation 20s linear infinite;
        }
        
        @keyframes grid-animation {
          0% { background-position: 0 0; }
          100% { background-position: 0 50px; }
        }
        
        .metaverse-visual {
          position: relative;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .metaverse-sphere {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.5));
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
          animation: pulse 4s ease-in-out infinite alternate;
        }
        
        .metaverse-platform {
          position: absolute;
          width: 200px;
          height: 50px;
          background: linear-gradient(to right, rgba(99, 102, 241, 0.8), rgba(79, 70, 229, 0.8));
          border-radius: 100%;
          bottom: 50px;
          filter: blur(5px);
          transform: perspective(200px) rotateX(60deg);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        
        .metaverse-floating-element {
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 4px;
          top: 50%;
          left: 50%;
          transform: translate(var(--x), var(--y));
          animation: float 4s ease-in-out infinite;
          animation-delay: var(--delay);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes float {
          0% { transform: translate(var(--x), var(--y)) rotate(0deg); }
          50% { transform: translate(calc(var(--x) - 10px), calc(var(--y) + 10px)) rotate(180deg); }
          100% { transform: translate(var(--x), var(--y)) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
          100% { box-shadow: 0 0 50px rgba(99, 102, 241, 0.8); }
        }
      `}</style>
    </section>
  );
}