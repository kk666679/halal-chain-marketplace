import { useState } from 'react';
import Image from 'next/image';
import { FaLeaf, FaSolarPanel, FaRecycle, FaWater, FaTree, FaChartLine } from 'react-icons/fa';

export default function SustainabilitySection() {
  const [selectedMetric, setSelectedMetric] = useState('carbon');
  
  const metrics = {
    carbon: {
      title: "Carbon Negative Operations",
      value: "-125,000",
      unit: "tons CO₂e/year",
      description: "Our operations remove more carbon than they produce through advanced carbon capture technology and renewable energy investments.",
      icon: <FaLeaf className="text-green-400 text-2xl" />,
      color: "from-green-500 to-green-700"
    },
    energy: {
      title: "Renewable Energy Usage",
      value: "100%",
      unit: "clean energy",
      description: "All HalalChain operations and data centers run on 100% renewable energy from solar, wind, and geothermal sources.",
      icon: <FaSolarPanel className="text-yellow-400 text-2xl" />,
      color: "from-yellow-500 to-yellow-700"
    },
    water: {
      title: "Water Conservation",
      value: "85%",
      unit: "reduction",
      description: "Our water recycling systems and efficiency measures have reduced water usage by 85% compared to traditional systems.",
      icon: <FaWater className="text-blue-400 text-2xl" />,
      color: "from-blue-500 to-blue-700"
    },
    waste: {
      title: "Zero Waste Operations",
      value: "99.7%",
      unit: "diversion rate",
      description: "Nearly all operational waste is diverted from landfills through recycling, composting, and circular economy practices.",
      icon: <FaRecycle className="text-purple-400 text-2xl" />,
      color: "from-purple-500 to-purple-700"
    }
  };
  
  const sustainabilityFeatures = [
    {
      title: "Blockchain Carbon Tracking",
      description: "Every product on HalalChain includes a verified carbon footprint, tracked from source to consumer with blockchain verification.",
      icon: <FaChartLine />
    },
    {
      title: "Reforestation Credits",
      description: "Vendors can earn sustainability credits by participating in our global reforestation program, offsetting their carbon footprint.",
      icon: <FaTree />
    },
    {
      title: "Circular Packaging",
      description: "Our smart packaging system tracks, recovers, and reuses packaging materials through an AI-optimized reverse logistics network.",
      icon: <FaRecycle />
    },
    {
      title: "Quantum-Optimized Logistics",
      description: "Quantum computing algorithms reduce transportation emissions by optimizing routes and consolidating shipments in real-time.",
      icon: <FaLeaf />
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-green-900 to-green-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-green-700 bg-opacity-50 rounded-full px-4 py-1 mb-4">
            <FaLeaf className="mr-2 text-green-300" />
            <span className="text-sm font-semibold">SUSTAINABILITY LEADERSHIP</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Carbon-Negative Halal Supply Chain</h2>
          <p className="text-lg text-green-100 max-w-3xl mx-auto">
            HalalChain is the world's first carbon-negative supply chain platform, combining ethical halal practices 
            with environmental stewardship through advanced sustainability technologies.
          </p>
        </div>
        
        {/* Sustainability Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <div 
              key={key}
              className={`bg-gradient-to-br ${metric.color} rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedMetric === key ? 'ring-4 ring-white ring-opacity-50 transform scale-105' : 'opacity-80 hover:opacity-100'
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="flex items-center mb-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  {metric.icon}
                </div>
                <h3 className="font-semibold">{metric.title}</h3>
              </div>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="text-sm opacity-80">{metric.unit}</div>
            </div>
          ))}
        </div>
        
        {/* Selected Metric Detail */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className={`bg-gradient-to-br ${metrics[selectedMetric].color} rounded-full p-3 mr-4`}>
                  {metrics[selectedMetric].icon}
                </div>
                <h3 className="text-2xl font-bold">{metrics[selectedMetric].title}</h3>
              </div>
              
              <p className="text-green-100 mb-6">
                {metrics[selectedMetric].description}
              </p>
              
              {selectedMetric === 'carbon' && (
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Carbon Removal Methods:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Direct air capture facilities in UAE, Malaysia, and Indonesia</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Enhanced rock weathering in agricultural supply chains</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Biochar production from agricultural waste</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Reforestation projects in 12 countries</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {selectedMetric === 'energy' && (
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Energy Sources:</h4>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5 mr-2">
                      <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm">65% Solar</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5 mr-2">
                      <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm">25% Wind</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5 mr-2">
                      <div className="bg-red-400 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-sm">10% Geothermal</span>
                  </div>
                </div>
              )}
              
              {selectedMetric === 'water' && (
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Water Conservation Technologies:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Atmospheric water harvesting at all facilities</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Closed-loop water recycling systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>AI-optimized irrigation for agricultural partners</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>Quantum desalination technology</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {selectedMetric === 'waste' && (
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Waste Reduction Initiatives:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>Molecular recycling of complex materials</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>Biodegradable smart packaging</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>Upcycling programs for vendor partners</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span>AI-powered waste sorting and recovery</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative h-64 md:h-80">
              <Image
                src={`/images/sustainability-${selectedMetric}.png`}
                alt={metrics[selectedMetric].title}
                fill
                style={{objectFit: "contain"}}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Sustainability Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sustainabilityFeatures.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
              <div className="bg-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-green-100">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Certification */}
        <div className="mt-16 text-center">
          <p className="text-green-200 mb-6">Certified sustainable by:</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-lg">Global Sustainability Initiative</div>
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-lg">Carbon Removal Alliance</div>
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-lg">Islamic Eco Council</div>
            <div className="bg-white bg-opacity-10 px-4 py-2 rounded-lg">UN Sustainable Development Goals</div>
          </div>
        </div>
      </div>
    </section>
  );
}