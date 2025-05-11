'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { Download, Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function CompetitiveLandscape({ region = 'global' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [expandedOpportunity, setExpandedOpportunity] = useState(null);
  
  // Market leaders data
  const marketLeadersData = {
    global: [
      { name: 'Nestlé', marketShare: 12, growth: 5.2, category: 'Diversified' },
      { name: 'BRF', marketShare: 8, growth: 4.8, category: 'Meat & Poultry' },
      { name: 'Al Islami Foods', marketShare: 6, growth: 7.5, category: 'Meat & Poultry' },
      { name: 'Saffron Road', marketShare: 4, growth: 9.2, category: 'Ready Meals' },
      { name: 'Tahira Foods', marketShare: 3, growth: 3.5, category: 'Processed Foods' }
    ],
    asean: [
      { name: 'Marrybrown', marketShare: 10, growth: 6.5, category: 'Food Service' },
      { name: 'Prima Agri-Products', marketShare: 8, growth: 7.2, category: 'Meat & Poultry' },
      { name: 'Ramly Food', marketShare: 7, growth: 5.8, category: 'Meat & Poultry' },
      { name: 'Indofood', marketShare: 6, growth: 4.5, category: 'Processed Foods' },
      { name: 'Charoen Pokphand', marketShare: 5, growth: 6.0, category: 'Meat & Poultry' }
    ],
    gcc: [
      { name: 'Al Islami Foods', marketShare: 15, growth: 6.8, category: 'Meat & Poultry' },
      { name: 'Sadia', marketShare: 12, growth: 5.5, category: 'Meat & Poultry' },
      { name: 'Al Kabeer', marketShare: 10, growth: 4.2, category: 'Frozen Foods' },
      { name: 'Emirates Modern Poultry', marketShare: 8, growth: 7.0, category: 'Meat & Poultry' },
      { name: 'IFFCO', marketShare: 7, growth: 5.0, category: 'Diversified' }
    ],
    europe: [
      { name: 'Tahira Foods', marketShare: 14, growth: 4.5, category: 'Processed Foods' },
      { name: 'Nestlé', marketShare: 10, growth: 3.8, category: 'Diversified' },
      { name: 'Isla Delice', marketShare: 8, growth: 6.2, category: 'Meat & Poultry' },
      { name: 'Halal Food Group', marketShare: 7, growth: 5.5, category: 'Meat & Poultry' },
      { name: 'Halalico', marketShare: 5, growth: 8.0, category: 'Processed Foods' }
    ],
    china: [
      { name: 'Ningxia Xiaoming', marketShare: 18, growth: 9.5, category: 'Meat & Poultry' },
      { name: 'Xinjiang Halal', marketShare: 15, growth: 8.2, category: 'Meat & Poultry' },
      { name: 'Lanzhou Halal Food', marketShare: 12, growth: 7.5, category: 'Processed Foods' },
      { name: 'Xian Muslim Food', marketShare: 8, growth: 6.8, category: 'Processed Foods' },
      { name: 'Anhui Halal', marketShare: 6, growth: 10.2, category: 'Meat & Poultry' }
    ],
    russia: [
      { name: 'Miratorg', marketShare: 20, growth: 7.5, category: 'Meat & Poultry' },
      { name: 'Tsaritsino', marketShare: 15, growth: 6.2, category: 'Meat & Poultry' },
      { name: 'Halal Ash', marketShare: 12, growth: 8.5, category: 'Processed Foods' },
      { name: 'Ekosem-Agrar', marketShare: 8, growth: 5.8, category: 'Dairy' },
      { name: 'Cherkizovo', marketShare: 7, growth: 4.5, category: 'Meat & Poultry' }
    ]
  };

  // Company profiles data
  const companyProfiles = [
    {
      id: 'nestle',
      name: 'Nestlé',
      description: 'Swiss multinational food and beverage company with a significant halal product portfolio across 86 countries.',
      headquarters: 'Vevey, Switzerland',
      founded: '1866',
      halalStrategy: 'Expanding halal portfolio through dedicated production facilities and strategic acquisitions.',
      keyMarkets: ['Global', 'ASEAN', 'GCC', 'Europe'],
      keyProducts: ['Dairy', 'Confectionery', 'Coffee', 'Infant Nutrition'],
      website: 'https://www.nestle.com'
    },
    {
      id: 'brf',
      name: 'BRF',
      description: 'One of the largest food companies in the world with a strong focus on halal meat production and distribution.',
      headquarters: 'São Paulo, Brazil',
      founded: '1934',
      halalStrategy: 'Strategic acquisitions in Middle East distribution networks and dedicated halal production facilities.',
      keyMarkets: ['GCC', 'ASEAN', 'Europe'],
      keyProducts: ['Poultry', 'Processed Meat', 'Ready Meals'],
      website: 'https://www.brf-global.com'
    },
    {
      id: 'alislami',
      name: 'Al Islami Foods',
      description: 'Leading halal food company in the UAE with a strong presence across the GCC and beyond.',
      headquarters: 'Dubai, UAE',
      founded: '1981',
      halalStrategy: 'Focus on premium halal products and expansion into international markets through partnerships.',
      keyMarkets: ['GCC', 'ASEAN', 'Europe'],
      keyProducts: ['Frozen Meat', 'Ready Meals', 'Processed Foods'],
      website: 'https://www.alislamifoods.com'
    },
    {
      id: 'saffronroad',
      name: 'Saffron Road',
      description: 'American company specializing in halal-certified natural foods with a focus on ethical and sustainable production.',
      headquarters: 'Stamford, USA',
      founded: '2010',
      halalStrategy: 'Targeting premium halal market with clean label, ethical, and sustainably produced products.',
      keyMarkets: ['North America', 'Europe'],
      keyProducts: ['Frozen Meals', 'Snacks', 'Broths', 'Simmer Sauces'],
      website: 'https://www.saffronroad.com'
    },
    {
      id: 'miratorg',
      name: 'Miratorg',
      description: 'Russia\'s largest producer of pork and beef with a growing halal meat division.',
      headquarters: 'Moscow, Russia',
      founded: '1995',
      halalStrategy: 'Dedicated halal production facilities with focus on export markets in Middle East and Asia.',
      keyMarkets: ['Russia', 'GCC', 'ASEAN'],
      keyProducts: ['Beef', 'Poultry', 'Processed Meat'],
      website: 'https://www.miratorg.ru'
    }
  ];

  // Market opportunity data
  const marketOpportunities = [
    {
      id: 'baby-food',
      name: 'Halal Baby Food & Infant Nutrition',
      description: 'Growing demand for halal-certified baby food and infant nutrition products, particularly in Muslim-majority countries and among Muslim communities in Western markets.',
      marketPotential: 'High',
      competitionLevel: 'Low',
      entryBarriers: 'Medium',
      regions: ['Global', 'ASEAN', 'GCC'],
      keyConsiderationsTitle: 'Key Considerations',
      keyConsiderations: [
        'Stringent quality and safety requirements',
        'Need for multiple certifications (halal + infant nutrition standards)',
        'Premium pricing potential',
        'High consumer loyalty when trust is established'
      ]
    },
    {
      id: 'plant-based',
      name: 'Plant-Based Halal Alternatives',
      description: 'Rapidly growing market for plant-based meat alternatives that are halal-certified, catering to health-conscious Muslim consumers and those seeking sustainable options.',
      marketPotential: 'High',
      competitionLevel: 'Medium',
      entryBarriers: 'Medium',
      regions: ['Europe', 'ASEAN', 'North America'],
      keyConsiderationsTitle: 'Key Considerations',
      keyConsiderations: [
        'Innovation in taste and texture is critical',
        'Clear halal certification and messaging needed',
        'Target both Muslim and non-Muslim consumers',
        'Consider clean label and natural ingredients'
      ]
    },
    {
      id: 'pet-food',
      name: 'Halal-Certified Pet Food',
      description: 'Emerging niche market for halal-certified pet food products for Muslim pet owners who prefer to maintain halal standards throughout their household.',
      marketPotential: 'Medium',
      competitionLevel: 'Very Low',
      entryBarriers: 'Medium',
      regions: ['GCC', 'ASEAN', 'Europe'],
      keyConsiderationsTitle: 'Key Considerations',
      keyConsiderations: [
        'Educational marketing required to build category awareness',
        'Premium pricing strategy viable',
        'Limited competition provides first-mover advantage',
        'Consider e-commerce as primary distribution channel'
      ]
    },
    {
      id: 'nutraceuticals',
      name: 'Halal Nutraceuticals & Supplements',
      description: 'Growing demand for halal-certified vitamins, supplements, and functional foods, particularly as health consciousness increases among Muslim consumers.',
      marketPotential: 'High',
      competitionLevel: 'Low',
      entryBarriers: 'High',
      regions: ['Global', 'GCC', 'ASEAN'],
      keyConsiderationsTitle: 'Key Considerations',
      keyConsiderations: [
        'Complex certification process for ingredients',
        'Pharmaceutical-grade manufacturing requirements',
        'Strong scientific backing needed for claims',
        'Digital marketing and education essential'
      ]
    },
    {
      id: 'ready-meals',
      name: 'Premium Halal Ready Meals',
      description: 'Growing market for high-quality, convenient halal-certified ready meals targeting busy professionals and families in both Muslim-majority and Western markets.',
      marketPotential: 'High',
      competitionLevel: 'Medium',
      entryBarriers: 'Medium',
      regions: ['Europe', 'GCC', 'North America'],
      keyConsiderationsTitle: 'Key Considerations',
      keyConsiderations: [
        'Focus on authentic recipes and premium ingredients',
        'Sustainable packaging increasingly important',
        'Direct-to-consumer models showing success',
        'Shelf life and preservation without additives is challenging'
      ]
    }
  ];

  // Opportunity mapping data for scatter plot
  const opportunityMappingData = [
    { name: 'Halal Baby Food', x: 85, y: 30, z: 15, category: 'Emerging' },
    { name: 'Plant-Based Alternatives', x: 80, y: 50, z: 12, category: 'Growth' },
    { name: 'Halal Pet Food', x: 60, y: 20, z: 8, category: 'Niche' },
    { name: 'Halal Nutraceuticals', x: 75, y: 35, z: 10, category: 'Emerging' },
    { name: 'Premium Ready Meals', x: 70, y: 55, z: 14, category: 'Growth' },
    { name: 'Halal Snacks', x: 65, y: 70, z: 18, category: 'Mature' },
    { name: 'Halal Meat', x: 50, y: 85, z: 20, category: 'Mature' },
    { name: 'Halal Dairy', x: 55, y: 65, z: 16, category: 'Mature' },
    { name: 'Halal Confectionery', x: 60, y: 60, z: 12, category: 'Growth' },
    { name: 'Halal Beverages', x: 70, y: 45, z: 10, category: 'Growth' }
  ];

  // Get data for the selected region
  const marketLeaders = marketLeadersData[region] || marketLeadersData.global;

  // Toggle expanded company
  const toggleCompany = (id) => {
    if (expandedCompany === id) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(id);
    }
  };

  // Toggle expanded opportunity
  const toggleOpportunity = (id) => {
    if (expandedOpportunity === id) {
      setExpandedOpportunity(null);
    } else {
      setExpandedOpportunity(id);
    }
  };

  // Filter companies based on search term
  const filteredCompanies = companyProfiles.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter opportunities based on region
  const filteredOpportunities = marketOpportunities.filter(opportunity => 
    opportunity.regions.includes(region === 'global' ? 'Global' : region.charAt(0).toUpperCase() + region.slice(1))
  );

  // Colors for scatter plot
  const categoryColors = {
    'Mature': '#0088FE',
    'Growth': '#00C49F',
    'Emerging': '#FFBB28',
    'Niche': '#FF8042'
  };

  return (
    <div className="space-y-8">
      {/* Market Leaders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Market Leaders in {region === 'global' ? 'Global' : region.toUpperCase()} Halal Market</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={marketLeaders}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: 'Market Share (%)', position: 'insideBottom', offset: -5 }} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip 
                formatter={(value, name) => [`${value}${name === 'marketShare' ? '%' : '%'}`, name === 'marketShare' ? 'Market Share' : 'Growth Rate']}
              />
              <Legend />
              <Bar dataKey="marketShare" name="Market Share" fill="#0088FE" />
              <Bar dataKey="growth" name="Growth Rate" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Company Profiles */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Leading Company Profiles</h3>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div 
                key={company.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCompany(company.id)}
                >
                  <h4 className="font-medium">{company.name}</h4>
                  {expandedCompany === company.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                
                {expandedCompany === company.id && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{company.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Headquarters</h5>
                        <p>{company.headquarters}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Founded</h5>
                        <p>{company.founded}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h5 className="text-sm font-medium text-gray-500">Halal Strategy</h5>
                        <p>{company.halalStrategy}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Key Markets</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {company.keyMarkets.map((market, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {market}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Key Products</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {company.keyProducts.map((product, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No companies found matching your search.</p>
          )}
        </div>
      </div>
      
      {/* Opportunity Mapping */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Market Opportunity Mapping</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Market Potential" 
                label={{ value: 'Market Potential', position: 'bottom', offset: 0 }}
                domain={[0, 100]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Competition Level" 
                label={{ value: 'Competition Level', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[100, 500]} 
                name="Market Size" 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => {
                  if (name === 'x') return [`${value}%`, 'Market Potential'];
                  if (name === 'y') return [`${value}%`, 'Competition Level'];
                  if (name === 'z') return [`${value}B USD`, 'Market Size'];
                  return [value, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
                        <p className="font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm">Market Potential: {payload[0].payload.x}%</p>
                        <p className="text-sm">Competition Level: {payload[0].payload.y}%</p>
                        <p className="text-sm">Category: {payload[0].payload.category}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter name="Product Categories" data={opportunityMappingData}>
                {opportunityMappingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-4">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }}></div>
                <span className="text-xs text-gray-600">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Market Opportunities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-6">Untapped Market Opportunities</h3>
        
        <div className="space-y-4">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <div 
                key={opportunity.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOpportunity(opportunity.id)}
                >
                  <h4 className="font-medium">{opportunity.name}</h4>
                  {expandedOpportunity === opportunity.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                
                {expandedOpportunity === opportunity.id && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{opportunity.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Market Potential</h5>
                        <p className={`font-medium ${
                          opportunity.marketPotential === 'High' 
                            ? 'text-green-600' 
                            : opportunity.marketPotential === 'Medium'
                            ? 'text-amber-600'
                            : 'text-blue-600'
                        }`}>
                          {opportunity.marketPotential}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Competition Level</h5>
                        <p className={`font-medium ${
                          opportunity.competitionLevel === 'High' 
                            ? 'text-red-600' 
                            : opportunity.competitionLevel === 'Medium'
                            ? 'text-amber-600'
                            : opportunity.competitionLevel === 'Low'
                            ? 'text-green-600'
                            : 'text-green-700'
                        }`}>
                          {opportunity.competitionLevel}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-500">Entry Barriers</h5>
                        <p className={`font-medium ${
                          opportunity.entryBarriers === 'High' 
                            ? 'text-red-600' 
                            : opportunity.entryBarriers === 'Medium'
                            ? 'text-amber-600'
                            : 'text-green-600'
                        }`}>
                          {opportunity.entryBarriers}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-2">{opportunity.keyConsiderationsTitle}</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {opportunity.keyConsiderations.map((consideration, i) => (
                          <li key={i} className="text-gray-700">{consideration}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No specific opportunities identified for this region.</p>
          )}
        </div>
      </div>
    </div>
  );
}