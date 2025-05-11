import { useState, useEffect } from 'react';
import { FaAtom, FaLock, FaSearch, FaChartLine, FaGlobe, FaShieldAlt } from 'react-icons/fa';

export default function QuantumComputingSection() {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Animate the quantum processing power count
  useEffect(() => {
    const targetCount = 25000;
    const duration = 2000; // 2 seconds
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    const increment = targetCount / totalFrames;
    
    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      setAnimatedCount(Math.min(Math.floor(increment * currentFrame), targetCount));
      
      if (currentFrame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, []);
  
  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % quantumFeatures.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Client-specific effect
  useEffect(() => {
    setIsClient(true); // Ensures client-only logic runs after hydration
  }, []);

  const quantumFeatures = [
    {
      icon: <FaLock className="text-blue-400 text-2xl" />,
      title: "Post-Quantum Cryptography",
      description: "Our lattice-based cryptographic algorithms ensure that all certifications remain secure even against quantum computing attacks, future-proofing your supply chain data."
    },
    {
      icon: <FaSearch className="text-blue-400 text-2xl" />,
      title: "Quantum Pattern Recognition",
      description: "Identify complex patterns in global supply chains and detect anomalies that might indicate fraud or contamination with quantum-enhanced machine learning algorithms."
    },
    {
      icon: <FaChartLine className="text-blue-400 text-2xl" />,
      title: "Quantum Market Simulation",
      description: "Simulate millions of market scenarios simultaneously to predict demand, optimize pricing, and identify emerging trends with unprecedented accuracy."
    },
    {
      icon: <FaGlobe className="text-blue-400 text-2xl" />,
      title: "Quantum-Secured Global Network",
      description: "Our quantum key distribution network spans 37 countries, ensuring unhackable communication between all nodes in the HalalChain ecosystem."
    },
    {
      icon: <FaShieldAlt className="text-blue-400 text-2xl" />,
      title: "Quantum Threat Detection",
      description: "Proactively identify and neutralize security threats using quantum computing to analyze attack patterns and vulnerabilities before they can be exploited."
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-900 to-blue-900 text-white overflow-hidden relative">
      {/* Quantum particle animation background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="quantum-particles"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-800 bg-opacity-50 rounded-full px-4 py-1 mb-4">
            <FaAtom className="mr-2 text-blue-300 animate-pulse" />
            <span className="text-sm font-semibold">QUANTUM COMPUTING INTEGRATION</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quantum-Powered Supply Chain Intelligence</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            HalalChain harnesses the power of quantum computing to solve complex supply chain challenges,
            ensure unbreakable security, and process vast amounts of data with unprecedented speed.
          </p>
        </div>
        
        {/* Quantum Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-blue-300 mb-2">{animatedCount.toLocaleString()}+</div>
            <div className="text-xl font-semibold mb-1">Qubits</div>
            <p className="text-blue-200 text-sm">Processing power of our distributed quantum network</p>
          </div>
          
          <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-blue-300 mb-2">37</div>
            <div className="text-xl font-semibold mb-1">Countries</div>
            <p className="text-blue-200 text-sm">Global quantum-secured network nodes</p>
          </div>
          
          <div className="bg-blue-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold text-blue-300 mb-2">99.999%</div>
            <div className="text-xl font-semibold mb-1">Accuracy</div>
            <p className="text-blue-200 text-sm">In fraud detection and certification verification</p>
          </div>
        </div>
        
        {/* Quantum Features */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Quantum Advantage for Halal Supply Chain</h3>
            
            <div className="space-y-6">
              {quantumFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-500 cursor-pointer ${
                    activeFeature === index 
                      ? 'bg-blue-800 bg-opacity-50 shadow-lg shadow-blue-500/20' 
                      : 'hover:bg-blue-900 hover:bg-opacity-30'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-900 rounded-full p-3 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className={`text-blue-100 transition-all duration-500 ${
                        activeFeature === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-100'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-96 w-full">
              {/* Quantum computing visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="quantum-sphere">
                  <div className="quantum-core"></div>
                  <div className="quantum-orbit" style={{ animationDuration: '3s' }}></div>
                  <div className="quantum-orbit" style={{ animationDuration: '5s' }}></div>
                  <div className="quantum-orbit" style={{ animationDuration: '7s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Data flow animation */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="data-particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 30 + 10}px`,
                    height: '2px',
                    background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.3})`,
                    boxShadow: '0 0 8px 2px rgba(100, 150, 255, 0.6)',
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quantum Computing Partners */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 mb-6">Powered by quantum computing partnerships with:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="bg-blue-900 bg-opacity-30 px-6 py-3 rounded-lg">IBM Quantum</div>
            <div className="bg-blue-900 bg-opacity-30 px-6 py-3 rounded-lg">Google Sycamore</div>
            <div className="bg-blue-900 bg-opacity-30 px-6 py-3 rounded-lg">Rigetti Computing</div>
            <div className="bg-blue-900 bg-opacity-30 px-6 py-3 rounded-lg">QuEra Computing</div>
            <div className="bg-blue-900 bg-opacity-30 px-6 py-3 rounded-lg">Quantum Emirates</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .quantum-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(66, 133, 244, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: particleShift 20s linear infinite;
        }
        
        @keyframes particleShift {
          0% { background-position: 0 0; }
          100% { background-position: 30px 30px; }
        }
        
        .quantum-sphere {
          position: relative;
          width: 100px;
          height: 100px;
        }
        
        .quantum-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, rgba(100, 200, 255, 1) 0%, rgba(66, 133, 244, 0.8) 70%, rgba(66, 133, 244, 0) 100%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite alternate;
        }
        
        .quantum-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(100, 200, 255, 0.5);
          border-radius: 50%;
          animation: rotate 5s linear infinite;
        }
        
        .quantum-orbit:nth-child(2) {
          width: 100px;
          height: 100px;
        }
        
        .quantum-orbit:nth-child(3) {
          width: 160px;
          height: 160px;
        }
        
        .quantum-orbit:nth-child(4) {
          width: 220px;
          height: 220px;
        }
        
        @keyframes rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 10px 5px rgba(66, 133, 244, 0.5); }
          100% { box-shadow: 0 0 20px 10px rgba(66, 133, 244, 0.8); }
        }
        
        .data-particle {
          position: absolute;
          animation: dataFlow 3s linear infinite;
        }
        
        @keyframes dataFlow {
          0% { opacity: 0; transform: scale(0.5) rotate(var(--rotation)); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.5) rotate(var(--rotation)); }
        }
      `}</style>
    </section>
  );
}