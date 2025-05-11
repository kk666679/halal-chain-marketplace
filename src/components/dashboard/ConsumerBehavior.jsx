'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Download, Filter, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function ConsumerBehavior({ region = 'global' }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedSegment, setExpandedSegment] = useState(null);
  
  // Age demographics data
  const ageData = {
    global: [
      { name: '18-24', value: 20 },
      { name: '25-34', value: 35 },
      { name: '35-44', value: 25 },
      { name: '45-54', value: 12 },
      { name: '55+', value: 8 }
    ],
    asean: [
      { name: '18-24', value: 25 },
      { name: '25-34', value: 38 },
      { name: '35-44', value: 22 },
      { name: '45-54', value: 10 },
      { name: '55+', value: 5 }
    ],
    gcc: [
      { name: '18-24', value: 22 },
      { name: '25-34', value: 36 },
      { name: '35-44', value: 24 },
      { name: '45-54', value: 12 },
      { name: '55+', value: 6 }
    ],
    europe: [
      { name: '18-24', value: 15 },
      { name: '25-34', value: 30 },
      { name: '35-44', value: 28 },
      { name: '45-54', value: 17 },
      { name: '55+', value: 10 }
    ],
    china: [
      { name: '18-24', value: 18 },
      { name: '25-34', value: 32 },
      { name: '35-44', value: 28 },
      { name: '45-54', value: 15 },
      { name: '55+', value: 7 }
    ],
    russia: [
      { name: '18-24', value: 16 },
      { name: '25-34', value: 30 },
      { name: '35-44', value: 27 },
      { name: '45-54', value: 18 },
      { name: '55+', value: 9 }
    ]
  };

  // Purchase motivations data
  const motivationData = {
    global: [
      { subject: 'Religious Compliance', A: 78, fullMark: 100 },
      { subject: 'Food Safety', A: 65, fullMark: 100 },
      { subject: 'Quality Perception', A: 60, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 42, fullMark: 100 },
      { subject: 'Health Benefits', A: 38, fullMark: 100 },
      { subject: 'Taste Preference', A: 35, fullMark: 100 }
    ],
    asean: [
      { subject: 'Religious Compliance', A: 85, fullMark: 100 },
      { subject: 'Food Safety', A: 70, fullMark: 100 },
      { subject: 'Quality Perception', A: 65, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 40, fullMark: 100 },
      { subject: 'Health Benefits', A: 45, fullMark: 100 },
      { subject: 'Taste Preference', A: 50, fullMark: 100 }
    ],
    gcc: [
      { subject: 'Religious Compliance', A: 90, fullMark: 100 },
      { subject: 'Food Safety', A: 75, fullMark: 100 },
      { subject: 'Quality Perception', A: 70, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 45, fullMark: 100 },
      { subject: 'Health Benefits', A: 50, fullMark: 100 },
      { subject: 'Taste Preference', A: 40, fullMark: 100 }
    ],
    europe: [
      { subject: 'Religious Compliance', A: 70, fullMark: 100 },
      { subject: 'Food Safety', A: 75, fullMark: 100 },
      { subject: 'Quality Perception', A: 65, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 60, fullMark: 100 },
      { subject: 'Health Benefits', A: 55, fullMark: 100 },
      { subject: 'Taste Preference', A: 45, fullMark: 100 }
    ],
    china: [
      { subject: 'Religious Compliance', A: 65, fullMark: 100 },
      { subject: 'Food Safety', A: 80, fullMark: 100 },
      { subject: 'Quality Perception', A: 70, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 35, fullMark: 100 },
      { subject: 'Health Benefits', A: 50, fullMark: 100 },
      { subject: 'Taste Preference', A: 45, fullMark: 100 }
    ],
    russia: [
      { subject: 'Religious Compliance', A: 75, fullMark: 100 },
      { subject: 'Food Safety', A: 70, fullMark: 100 },
      { subject: 'Quality Perception', A: 60, fullMark: 100 },
      { subject: 'Ethical Concerns', A: 40, fullMark: 100 },
      { subject: 'Health Benefits', A: 45, fullMark: 100 },
      { subject: 'Taste Preference', A: 50, fullMark: 100 }
    ]
  };

  // Product preference data
  const productPreferenceData = {
    global: [
      { name: 'Meat & Poultry', value: 35 },
      { name: 'Processed Foods', value: 25 },
      { name: 'Dairy', value: 15 },
      { name: 'Snacks', value: 12 },
      { name: 'Beverages', value: 8 },
      { name: 'Others', value: 5 }
    ],
    asean: [
      { name: 'Meat & Poultry', value: 30 },
      { name: 'Processed Foods', value: 28 },
      { name: 'Dairy', value: 15 },
      { name: 'Snacks', value: 15 },
      { name: 'Beverages', value: 7 },
      { name: 'Others', value: 5 }
    ],
    gcc: [
      { name: 'Meat & Poultry', value: 40 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 18 },
      { name: 'Snacks', value: 10 },
      { name: 'Beverages', value: 7 },
      { name: 'Others', value: 5 }
    ],
    europe: [
      { name: 'Meat & Poultry', value: 45 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 12 },
      { name: 'Snacks', value: 10 },
      { name: 'Beverages', value: 8 },
      { name: 'Others', value: 5 }
    ],
    china: [
      { name: 'Meat & Poultry', value: 50 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 10 },
      { name: 'Snacks', value: 10 },
      { name: 'Beverages', value: 5 },
      { name: 'Others', value: 5 }
    ],
    russia: [
      { name: 'Meat & Poultry', value: 55 },
      { name: 'Processed Foods', value: 15 },
      { name: 'Dairy', value: 12 },
      { name: 'Snacks', value: 8 },
      { name: 'Beverages', value: 5 },
      { name: 'Others', value: 5 }
    ]
  };

  // Consumer segments data
  const consumerSegments = [
    {
      id: 'traditional',
      name: 'Traditional Halal Consumers',
      description: 'Primarily motivated by religious compliance, these consumers strictly adhere to halal requirements and prefer products with recognized certification.',
      percentage: {
        global: 45,
        asean: 55,
        gcc: 60,
        europe: 40,
        china: 35,
        russia: 50
      },
      characteristics: [
        'Highly loyal to trusted halal brands',
        'Carefully scrutinize certification',
        'Less price-sensitive for guaranteed halal products',
        'Prefer shopping at specialized halal stores'
      ],
      marketingApproach: 'Emphasize certification credentials, religious compliance, and authenticity. Use traditional media channels and community endorsements.'
    },
    {
      id: 'modern',
      name: 'Modern Halal Seekers',
      description: 'Young, educated consumers who value halal compliance but also prioritize quality, innovation, and convenience in their purchasing decisions.',
      percentage: {
        global: 30,
        asean: 25,
        gcc: 25,
        europe: 35,
        china: 40,
        russia: 30
      },
      characteristics: [
        'Tech-savvy and research products online',
        'Balance religious requirements with modern lifestyle',
        'Interested in innovative halal products',
        'Value brand story and experience'
      ],
      marketingApproach: 'Highlight both halal credentials and product innovation. Use digital marketing, social media influencers, and modern packaging design.'
    },
    {
      id: 'ethical',
      name: 'Ethical & Health-Conscious Consumers',
      description: 'Both Muslim and non-Muslim consumers who choose halal products for perceived ethical, quality, and health benefits rather than religious reasons.',
      percentage: {
        global: 15,
        asean: 12,
        gcc: 10,
        europe: 20,
        china: 15,
        russia: 12
      },
      characteristics: [
        'Focus on ethical treatment of animals',
        'Interested in sustainability credentials',
        'Health-conscious and ingredient-aware',
        'Often non-Muslim consumers'
      ],
      marketingApproach: 'Emphasize ethical production methods, quality standards, and health benefits alongside halal certification. Use mainstream channels and health-focused messaging.'
    },
    {
      id: 'occasional',
      name: 'Occasional Halal Buyers',
      description: 'Consumers who purchase halal products occasionally based on availability, recommendations, or specific needs.',
      percentage: {
        global: 10,
        asean: 8,
        gcc: 5,
        europe: 5,
        china: 10,
        russia: 8
      },
      characteristics: [
        'No strong preference for halal products',
        'Purchase based on convenience or availability',
        'Price-sensitive consumers',
        'Limited knowledge of halal requirements'
      ],
      marketingApproach: 'Focus on product quality, value, and mainstream appeal while noting halal certification as an additional benefit.'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Get data for the selected region
  const ageDistribution = ageData[region] || ageData.global;
  const motivations = motivationData[region] || motivationData.global;
  const productPreferences = productPreferenceData[region] || productPreferenceData.global;

  // Toggle expanded segment
  const toggleSegment = (id) => {
    if (expandedSegment === id) {
      setExpandedSegment(null);
    } else {
      setExpandedSegment(id);
    }
  };

  // Get consumer segments for the selected region
  const getSegmentsForRegion = () => {
    return consumerSegments.map(segment => ({
      ...segment,
      currentPercentage: segment.percentage[region] || segment.percentage.global
    }));
  };

  const segmentsForRegion = getSegmentsForRegion();

  return (
    <div className="space-y-8">
      {/* Age Demographics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Consumer Age Demographics</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ageDistribution}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="value" name="Percentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Purchase Motivations */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Purchase Motivations</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={motivations}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar 
                name="Importance Score" 
                dataKey="A" 
                stroke="#FF8042" 
                fill="#FF8042" 
                fillOpacity={0.6} 
              />
              <Legend />
              <Tooltip formatter={(value) => `${value}%`} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Product Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Product Category Preferences</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productPreferences}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {productPreferences.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Consumer Segments */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Consumer Segments</h3>
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <select 
              className="text-sm border-none focus:ring-0"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="all">All Segments</option>
              <option value="traditional">Traditional</option>
              <option value="modern">Modern</option>
              <option value="ethical">Ethical</option>
              <option value="occasional">Occasional</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {segmentsForRegion
            .filter(segment => activeFilter === 'all' || segment.id === activeFilter)
            .map((segment) => (
              <div 
                key={segment.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSegment(segment.id)}
                >
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <h4 className="font-medium">{segment.name}</h4>
                      <p className="text-sm text-gray-500">{segment.currentPercentage}% of consumers in {region === 'global' ? 'global market' : region}</p>
                    </div>
                  </div>
                  {expandedSegment === segment.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                
                {expandedSegment === segment.id && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{segment.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Characteristics</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {segment.characteristics.map((char, i) => (
                          <li key={i} className="text-gray-700">{char}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Marketing Approach</h5>
                      <p className="text-gray-700">{segment.marketingApproach}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}