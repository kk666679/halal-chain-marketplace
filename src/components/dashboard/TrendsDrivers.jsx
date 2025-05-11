'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Download, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

export default function TrendsDrivers({ region = 'global' }) {
  const [expandedTrend, setExpandedTrend] = useState(null);
  
  // Growth drivers data by region
  const driversData = {
    global: [
      { name: 'Muslim Population Growth', value: 90 },
      { name: 'Rising Disposable Income', value: 85 },
      { name: 'Halal Awareness', value: 80 },
      { name: 'Certification Standards', value: 75 },
      { name: 'E-commerce Growth', value: 70 },
      { name: 'Tourism & Hospitality', value: 65 }
    ],
    asean: [
      { name: 'Government Support', value: 95 },
      { name: 'Muslim Population Growth', value: 90 },
      { name: 'Rising Middle Class', value: 85 },
      { name: 'Halal Tourism', value: 80 },
      { name: 'E-commerce Growth', value: 75 },
      { name: 'Export Opportunities', value: 70 }
    ],
    gcc: [
      { name: 'Regulatory Framework', value: 95 },
      { name: 'High Disposable Income', value: 90 },
      { name: 'Tourism Growth', value: 85 },
      { name: 'Food Security Initiatives', value: 80 },
      { name: 'Retail Expansion', value: 75 },
      { name: 'Product Premiumization', value: 70 }
    ],
    europe: [
      { name: 'Muslim Population Growth', value: 90 },
      { name: 'Ethical Consumption', value: 85 },
      { name: 'Food Safety Concerns', value: 80 },
      { name: 'Multicultural Food Trends', value: 75 },
      { name: 'Retail Inclusion', value: 70 },
      { name: 'Tourism Adaptation', value: 65 }
    ],
    china: [
      { name: 'Government Initiatives', value: 90 },
      { name: 'Muslim Regions Development', value: 85 },
      { name: 'Belt & Road Initiative', value: 80 },
      { name: 'Export Opportunities', value: 75 },
      { name: 'E-commerce Growth', value: 70 },
      { name: 'Food Safety Concerns', value: 65 }
    ],
    russia: [
      { name: 'Muslim Population Growth', value: 85 },
      { name: 'Middle East Trade Relations', value: 80 },
      { name: 'Domestic Tourism', value: 75 },
      { name: 'Export Opportunities', value: 70 },
      { name: 'Retail Expansion', value: 65 },
      { name: 'Food Security Initiatives', value: 60 }
    ]
  };

  // Certification trends data
  const certificationTrends = {
    global: [
      { year: '2018', value: 100 },
      { year: '2019', value: 120 },
      { year: '2020', value: 135 },
      { year: '2021', value: 160 },
      { year: '2022', value: 190 },
      { year: '2023', value: 230 }
    ],
    asean: [
      { year: '2018', value: 40 },
      { year: '2019', value: 48 },
      { year: '2020', value: 55 },
      { year: '2021', value: 65 },
      { year: '2022', value: 78 },
      { year: '2023', value: 95 }
    ],
    gcc: [
      { year: '2018', value: 30 },
      { year: '2019', value: 35 },
      { year: '2020', value: 38 },
      { year: '2021', value: 45 },
      { year: '2022', value: 52 },
      { year: '2023', value: 60 }
    ],
    europe: [
      { year: '2018', value: 15 },
      { year: '2019', value: 18 },
      { year: '2020', value: 22 },
      { year: '2021', value: 28 },
      { year: '2022', value: 35 },
      { year: '2023', value: 45 }
    ],
    china: [
      { year: '2018', value: 8 },
      { year: '2019', value: 10 },
      { year: '2020', value: 12 },
      { year: '2021', value: 15 },
      { year: '2022', value: 18 },
      { year: '2023', value: 22 }
    ],
    russia: [
      { year: '2018', value: 5 },
      { year: '2019', value: 6 },
      { year: '2020', value: 7 },
      { year: '2021', value: 8 },
      { year: '2022', value: 10 },
      { year: '2023', value: 12 }
    ]
  };

  // Innovation focus areas data
  const innovationData = {
    global: [
      { subject: 'Clean Label', A: 80, fullMark: 100 },
      { subject: 'Convenience', A: 75, fullMark: 100 },
      { subject: 'Plant-Based', A: 70, fullMark: 100 },
      { subject: 'Packaging', A: 65, fullMark: 100 },
      { subject: 'Traceability', A: 85, fullMark: 100 },
      { subject: 'Functional', A: 60, fullMark: 100 }
    ],
    asean: [
      { subject: 'Clean Label', A: 75, fullMark: 100 },
      { subject: 'Convenience', A: 85, fullMark: 100 },
      { subject: 'Plant-Based', A: 65, fullMark: 100 },
      { subject: 'Packaging', A: 70, fullMark: 100 },
      { subject: 'Traceability', A: 80, fullMark: 100 },
      { subject: 'Functional', A: 75, fullMark: 100 }
    ],
    gcc: [
      { subject: 'Clean Label', A: 85, fullMark: 100 },
      { subject: 'Convenience', A: 80, fullMark: 100 },
      { subject: 'Plant-Based', A: 60, fullMark: 100 },
      { subject: 'Packaging', A: 75, fullMark: 100 },
      { subject: 'Traceability', A: 90, fullMark: 100 },
      { subject: 'Functional', A: 70, fullMark: 100 }
    ],
    europe: [
      { subject: 'Clean Label', A: 90, fullMark: 100 },
      { subject: 'Convenience', A: 75, fullMark: 100 },
      { subject: 'Plant-Based', A: 85, fullMark: 100 },
      { subject: 'Packaging', A: 80, fullMark: 100 },
      { subject: 'Traceability', A: 85, fullMark: 100 },
      { subject: 'Functional', A: 70, fullMark: 100 }
    ],
    china: [
      { subject: 'Clean Label', A: 70, fullMark: 100 },
      { subject: 'Convenience', A: 85, fullMark: 100 },
      { subject: 'Plant-Based', A: 60, fullMark: 100 },
      { subject: 'Packaging', A: 75, fullMark: 100 },
      { subject: 'Traceability', A: 80, fullMark: 100 },
      { subject: 'Functional', A: 65, fullMark: 100 }
    ],
    russia: [
      { subject: 'Clean Label', A: 65, fullMark: 100 },
      { subject: 'Convenience', A: 70, fullMark: 100 },
      { subject: 'Plant-Based', A: 55, fullMark: 100 },
      { subject: 'Packaging', A: 60, fullMark: 100 },
      { subject: 'Traceability', A: 75, fullMark: 100 },
      { subject: 'Functional', A: 60, fullMark: 100 }
    ]
  };

  // Key trends data
  const keyTrends = [
    {
      id: 'blockchain',
      title: 'Blockchain for Halal Verification',
      description: 'Blockchain technology is increasingly being adopted to verify and track halal products throughout the supply chain, ensuring authenticity and transparency.',
      impact: 'High',
      timeframe: 'Current',
      regions: ['Global', 'GCC', 'ASEAN']
    },
    {
      id: 'plant-based',
      title: 'Plant-Based Halal Alternatives',
      description: 'Growing demand for plant-based halal-certified alternatives to meat products, driven by health, sustainability, and cost considerations.',
      impact: 'High',
      timeframe: 'Growing',
      regions: ['Europe', 'ASEAN', 'Global']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Expansion',
      description: 'Rapid growth of specialized e-commerce platforms and marketplaces dedicated to halal products, making them more accessible globally.',
      impact: 'High',
      timeframe: 'Current',
      regions: ['Global', 'ASEAN', 'China']
    },
    {
      id: 'premium',
      title: 'Premium Halal Products',
      description: 'Increasing consumer demand for premium, high-quality halal products, particularly in affluent markets and among younger consumers.',
      impact: 'Medium',
      timeframe: 'Growing',
      regions: ['GCC', 'Europe', 'China']
    },
    {
      id: 'standards',
      title: 'Harmonization of Standards',
      description: 'Efforts to harmonize halal certification standards across regions to facilitate international trade and consumer confidence.',
      impact: 'High',
      timeframe: 'Emerging',
      regions: ['Global', 'ASEAN', 'GCC']
    }
  ];

  // Get data for the selected region
  const drivers = driversData[region] || driversData.global;
  const certTrends = certificationTrends[region] || certificationTrends.global;
  const innovation = innovationData[region] || innovationData.global;

  // Toggle expanded trend
  const toggleTrend = (id) => {
    if (expandedTrend === id) {
      setExpandedTrend(null);
    } else {
      setExpandedTrend(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Growth Drivers */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Key Growth Drivers</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={drivers}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis label={{ value: 'Impact Score (0-100)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Impact Score" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Certification Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Halal Certification Growth Trend</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={certTrends}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Number of Certifications (Thousands)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Certifications Issued" 
                stroke="#00C49F" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Innovation Focus Areas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Product Innovation Focus Areas</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={innovation}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar 
                name="Innovation Focus" 
                dataKey="A" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6} 
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Key Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-6">Emerging Trends in Halal Market</h3>
        
        <div className="space-y-4">
          {keyTrends.map((trend) => (
            <div 
              key={trend.id} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div 
                className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                onClick={() => toggleTrend(trend.id)}
              >
                <h4 className="font-medium">{trend.title}</h4>
                {expandedTrend === trend.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedTrend === trend.id && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 mb-4">{trend.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Impact</h5>
                      <p className={`font-medium ${
                        trend.impact === 'High' 
                          ? 'text-green-600' 
                          : trend.impact === 'Medium'
                          ? 'text-amber-600'
                          : 'text-blue-600'
                      }`}>
                        {trend.impact}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Timeframe</h5>
                      <p className="font-medium">{trend.timeframe}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500">Key Regions</h5>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trend.regions.map((r, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
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