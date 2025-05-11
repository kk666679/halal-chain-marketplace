'use client';

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaLeaf, FaSolarPanel, FaRecycle, FaWater, FaTree, FaChartLine } from 'react-icons/fa';

export default function SustainabilitySection() {
  const [activeTab, setActiveTab] = useState('initiatives');
  
  const tabs = [
    { id: 'initiatives', label: 'Our Initiatives' },
    { id: 'impact', label: 'Environmental Impact' },
    { id: 'goals', label: 'Sustainability Goals' },
  ];
  
  const content = {
    initiatives: {
      title: 'Sustainable Halal Practices',
      description: 'Our blockchain-powered platform promotes sustainable practices throughout the halal supply chain, reducing waste and environmental impact.',
      stats: [
        { value: '75%', label: 'Reduction in paper certification' },
        { value: '40%', label: 'Less food waste' },
        { value: '30%', label: 'Lower carbon footprint' },
      ],
      image: '/images/sustainability-initiatives.jpg',
    },
    impact: {
      title: 'Measuring Our Impact',
      description: 'We continuously monitor and measure the environmental impact of our platform and the halal supply chains we support.',
      stats: [
        { value: '120K', label: 'Trees saved annually' },
        { value: '500K', label: 'Gallons of water conserved' },
        { value: '60%', label: 'Energy efficiency improvement' },
      ],
      image: '/images/sustainability-impact.jpg',
    },
    goals: {
      title: 'Future Sustainability Goals',
      description: 'Our roadmap includes ambitious goals to further enhance the sustainability of halal certification and supply chains globally.',
      stats: [
        { value: '2030', label: 'Carbon neutral operations' },
        { value: '100%', label: 'Renewable energy usage' },
        { value: '0', label: 'Certification paper waste' },
      ],
      image: '/images/sustainability-goals.jpg',
    },
  };
  
  const features = [
    {
      icon: <FaLeaf className="h-6 w-6 text-green-500" />,
      title: 'Eco-Friendly Certification',
      description: 'Digital certification processes that eliminate paper waste and reduce carbon emissions.',
    },
    {
      icon: <FaSolarPanel className="h-6 w-6 text-green-500" />,
      title: 'Green Infrastructure',
      description: 'Our blockchain network runs on renewable energy sources, minimizing environmental impact.',
    },
    {
      icon: <FaRecycle className="h-6 w-6 text-green-500" />,
      title: 'Supply Chain Optimization',
      description: 'Efficient routing and logistics reduce transportation emissions and resource consumption.',
    },
    {
      icon: <FaWater className="h-6 w-6 text-green-500" />,
      title: 'Water Conservation',
      description: 'Promoting water-saving practices among halal producers and processors.',
    },
    {
      icon: <FaTree className="h-6 w-6 text-green-500" />,
      title: 'Reforestation Initiatives',
      description: 'For every 1000 certifications, we plant trees to offset carbon emissions.',
    },
    {
      icon: <FaChartLine className="h-6 w-6 text-green-500" />,
      title: 'Sustainability Metrics',
      description: 'Transparent reporting on environmental impact and sustainability progress.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainability Commitment</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our blockchain-powered halal certification platform is designed with sustainability at its core, promoting ethical and environmentally responsible practices.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-1 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">{content[activeTab].title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {content[activeTab].description}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {content[activeTab].stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Learn More
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src={content[activeTab].image}
                  alt={content[activeTab].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 bg-green-100 dark:bg-green-900 rounded-full p-4 shadow-lg">
              <FaLeaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}