'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export default function MarketInsights({ region }) {
  const [expandedSection, setExpandedSection] = useState('market-size');
  
  // Market data by region
  const marketData = {
    asean: {
      marketSize: [
        { year: '2020', value: 250 },
        { year: '2021', value: 285 },
        { year: '2022', value: 320 },
        { year: '2023', value: 370 },
        { year: '2024', value: 425, projected: true },
        { year: '2025', value: 490, projected: true }
      ],
      categories: [
        { name: 'Food & Beverages', value: 55 },
        { name: 'Cosmetics & Personal Care', value: 15 },
        { name: 'Pharmaceuticals', value: 10 },
        { name: 'Islamic Finance', value: 12 },
        { name: 'Travel & Hospitality', value: 8 }
      ],
      countries: [
        { name: 'Indonesia', value: 40 },
        { name: 'Malaysia', value: 25 },
        { name: 'Thailand', value: 12 },
        { name: 'Singapore', value: 10 },
        { name: 'Philippines', value: 8 },
        { name: 'Brunei', value: 5 }
      ],
      keyStats: {
        marketSize: '425 Billion USD',
        growth: '15%',
        consumers: '300 Million',
        exportPotential: 'High'
      }
    },
    china: {
      marketSize: [
        { year: '2020', value: 30 },
        { year: '2021', value: 38 },
        { year: '2022', value: 45 },
        { year: '2023', value: 58 },
        { year: '2024', value: 72, projected: true },
        { year: '2025', value: 90, projected: true }
      ],
      categories: [
        { name: 'Food & Beverages', value: 65 },
        { name: 'Cosmetics & Personal Care', value: 20 },
        { name: 'Pharmaceuticals', value: 15 }
      ],
      countries: [
        { name: 'Domestic Market', value: 70 },
        { name: 'Export to ASEAN', value: 15 },
        { name: 'Export to Middle East', value: 10 },
        { name: 'Other Exports', value: 5 }
      ],
      keyStats: {
        marketSize: '72 Billion USD',
        growth: '24%',
        consumers: '30 Million',
        exportPotential: 'Medium'
      }
    },
    russia: {
      marketSize: [
        { year: '2020', value: 15 },
        { year: '2021', value: 18 },
        { year: '2022', value: 20 },
        { year: '2023', value: 25 },
        { year: '2024', value: 32, projected: true },
        { year: '2025', value: 40, projected: true }
      ],
      categories: [
        { name: 'Food & Beverages', value: 70 },
        { name: 'Modest Fashion', value: 15 },
        { name: 'Cosmetics & Personal Care', value: 15 }
      ],
      countries: [
        { name: 'Domestic Market', value: 60 },
        { name: 'Export to CIS', value: 20 },
        { name: 'Export to Middle East', value: 15 },
        { name: 'Other Exports', value: 5 }
      ],
      keyStats: {
        marketSize: '32 Billion USD',
        growth: '28%',
        consumers: '20 Million',
        exportPotential: 'Medium'
      }
    }
  };

  const regionData = marketData[region] || marketData.asean;
  const regionTitle = region === 'asean' ? 'ASEAN' : region === 'china' ? 'China' : 'Russia';
  
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#6B7280'];
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Halal Market Insights: {regionTitle}</h2>
      <p className="mb-8 text-gray-600">
        Explore market data and trends for halal products and services in {regionTitle}.
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
            <h3 className="font-medium text-gray-800">Market Size</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{regionData.keyStats.marketSize}</p>
          <p className="text-sm text-gray-600">Estimated (2024)</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-800">Annual Growth</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{regionData.keyStats.growth}</p>
          <p className="text-sm text-gray-600">Year-over-year</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-medium text-gray-800">Muslim Consumers</h3>
          </div>
          <p className="text-2xl font-bold text-purple-700">{regionData.keyStats.consumers}</p>
          <p className="text-sm text-gray-600">Potential market</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <ShoppingBag className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="font-medium text-gray-800">Export Potential</h3>
          </div>
          <p className="text-2xl font-bold text-amber-700">{regionData.keyStats.exportPotential}</p>
          <p className="text-sm text-gray-600">Global opportunity</p>
        </div>
      </div>

      {/* Market Size Trend */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('market-size')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition mb-4"
        >
          <span className="font-medium">Market Size Trend (Billion USD)</span>
          {expandedSection === 'market-size' ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {expandedSection === 'market-size' && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={regionData.marketSize}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Market Size (Billion USD)" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-500 text-center mt-4">
              * 2024-2025 values are projections based on current growth trends
            </p>
          </div>
        )}
      </div>

      {/* Category Distribution */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition mb-4"
        >
          <span className="font-medium">Category Distribution</span>
          {expandedSection === 'categories' ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {expandedSection === 'categories' && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={regionData.categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Top Categories</h3>
                <ul className="space-y-3">
                  {regionData.categories.map((category, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Market Distribution */}
      <div className="mb-8">
        <button
          onClick={() => toggleSection('distribution')}
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition mb-4"
        >
          <span className="font-medium">
            {region === 'asean' ? 'Country Distribution' : 'Market Distribution'}
          </span>
          {expandedSection === 'distribution' ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {expandedSection === 'distribution' && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={regionData.countries}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.countries.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">
                  {region === 'asean' ? 'Country Breakdown' : 'Market Breakdown'}
                </h3>
                <ul className="space-y-3">
                  {regionData.countries.map((country, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span>{country.name}</span>
                      </div>
                      <span className="font-medium">{country.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Market Entry Recommendation</h3>
        <p className="text-gray-700">
          {region === 'asean' 
            ? 'Focus on Indonesia and Malaysia as primary markets due to their large Muslim populations and established halal ecosystems. Partner with local distributors to navigate country-specific regulations.'
            : region === 'china'
            ? 'Target major cities with significant Muslim populations like Yinchuan (Ningxia) and Urumqi (Xinjiang). Ensure products have both Chinese halal certification and Chinese language labeling.'
            : 'Enter through established halal hubs like Moscow and Kazan. Russian language labeling and local certification are essential for market acceptance.'}
        </p>
      </div>
    </div>
  );
}