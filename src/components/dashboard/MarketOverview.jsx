'use client';

import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

export default function MarketOverview({ region = 'global' }) {
  // Market size data by region
  const marketSizeData = {
    global: [
      { year: '2020', value: 1700 },
      { year: '2021', value: 1800 },
      { year: '2022', value: 1900 },
      { year: '2023', value: 2000 },
      { year: '2024', value: 2150, projected: true },
      { year: '2025', value: 2300, projected: true },
      { year: '2026', value: 2450, projected: true },
      { year: '2027', value: 2600, projected: true },
      { year: '2028', value: 2750, projected: true },
      { year: '2029', value: 2900, projected: true },
      { year: '2030', value: 3100, projected: true }
    ],
    asean: [
      { year: '2020', value: 600 },
      { year: '2021', value: 650 },
      { year: '2022', value: 700 },
      { year: '2023', value: 750 },
      { year: '2024', value: 810, projected: true },
      { year: '2025', value: 870, projected: true },
      { year: '2026', value: 940, projected: true },
      { year: '2027', value: 1010, projected: true },
      { year: '2028', value: 1090, projected: true },
      { year: '2029', value: 1170, projected: true },
      { year: '2030', value: 1260, projected: true }
    ],
    gcc: [
      { year: '2020', value: 400 },
      { year: '2021', value: 425 },
      { year: '2022', value: 450 },
      { year: '2023', value: 480 },
      { year: '2024', value: 515, projected: true },
      { year: '2025', value: 550, projected: true },
      { year: '2026', value: 590, projected: true },
      { year: '2027', value: 630, projected: true },
      { year: '2028', value: 675, projected: true },
      { year: '2029', value: 720, projected: true },
      { year: '2030', value: 770, projected: true }
    ],
    europe: [
      { year: '2020', value: 250 },
      { year: '2021', value: 275 },
      { year: '2022', value: 300 },
      { year: '2023', value: 330 },
      { year: '2024', value: 365, projected: true },
      { year: '2025', value: 400, projected: true },
      { year: '2026', value: 440, projected: true },
      { year: '2027', value: 480, projected: true },
      { year: '2028', value: 525, projected: true },
      { year: '2029', value: 575, projected: true },
      { year: '2030', value: 630, projected: true }
    ],
    china: [
      { year: '2020', value: 120 },
      { year: '2021', value: 135 },
      { year: '2022', value: 150 },
      { year: '2023', value: 170 },
      { year: '2024', value: 190, projected: true },
      { year: '2025', value: 215, projected: true },
      { year: '2026', value: 240, projected: true },
      { year: '2027', value: 270, projected: true },
      { year: '2028', value: 300, projected: true },
      { year: '2029', value: 335, projected: true },
      { year: '2030', value: 375, projected: true }
    ],
    russia: [
      { year: '2020', value: 45 },
      { year: '2021', value: 50 },
      { year: '2022', value: 55 },
      { year: '2023', value: 62 },
      { year: '2024', value: 70, projected: true },
      { year: '2025', value: 78, projected: true },
      { year: '2026', value: 87, projected: true },
      { year: '2027', value: 97, projected: true },
      { year: '2028', value: 108, projected: true },
      { year: '2029', value: 120, projected: true },
      { year: '2030', value: 135, projected: true }
    ]
  };

  // Regional market share data
  const marketShareData = {
    global: [
      { name: 'Asia Pacific', value: 61 },
      { name: 'Middle East & North Africa', value: 24 },
      { name: 'Europe', value: 9 },
      { name: 'North America', value: 4 },
      { name: 'Others', value: 2 }
    ],
    asean: [
      { name: 'Indonesia', value: 45 },
      { name: 'Malaysia', value: 30 },
      { name: 'Thailand', value: 10 },
      { name: 'Singapore', value: 8 },
      { name: 'Philippines', value: 5 },
      { name: 'Others', value: 2 }
    ],
    gcc: [
      { name: 'Saudi Arabia', value: 40 },
      { name: 'UAE', value: 25 },
      { name: 'Qatar', value: 15 },
      { name: 'Kuwait', value: 10 },
      { name: 'Others', value: 10 }
    ],
    europe: [
      { name: 'France', value: 30 },
      { name: 'UK', value: 25 },
      { name: 'Germany', value: 20 },
      { name: 'Netherlands', value: 15 },
      { name: 'Others', value: 10 }
    ],
    china: [
      { name: 'Ningxia', value: 35 },
      { name: 'Xinjiang', value: 30 },
      { name: 'Gansu', value: 15 },
      { name: 'Qinghai', value: 10 },
      { name: 'Others', value: 10 }
    ],
    russia: [
      { name: 'Moscow', value: 35 },
      { name: 'Kazan', value: 30 },
      { name: 'St. Petersburg', value: 15 },
      { name: 'Others', value: 20 }
    ]
  };

  // Category distribution data
  const categoryData = {
    global: [
      { name: 'Meat & Poultry', value: 35 },
      { name: 'Processed Foods', value: 25 },
      { name: 'Dairy', value: 15 },
      { name: 'Bakery', value: 10 },
      { name: 'Beverages', value: 8 },
      { name: 'Others', value: 7 }
    ],
    asean: [
      { name: 'Meat & Poultry', value: 30 },
      { name: 'Processed Foods', value: 28 },
      { name: 'Dairy', value: 15 },
      { name: 'Bakery', value: 12 },
      { name: 'Beverages', value: 10 },
      { name: 'Others', value: 5 }
    ],
    gcc: [
      { name: 'Meat & Poultry', value: 40 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 18 },
      { name: 'Bakery', value: 10 },
      { name: 'Beverages', value: 7 },
      { name: 'Others', value: 5 }
    ],
    europe: [
      { name: 'Meat & Poultry', value: 38 },
      { name: 'Processed Foods', value: 22 },
      { name: 'Dairy', value: 15 },
      { name: 'Bakery', value: 12 },
      { name: 'Beverages', value: 8 },
      { name: 'Others', value: 5 }
    ],
    china: [
      { name: 'Meat & Poultry', value: 45 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 10 },
      { name: 'Bakery', value: 10 },
      { name: 'Beverages', value: 10 },
      { name: 'Others', value: 5 }
    ],
    russia: [
      { name: 'Meat & Poultry', value: 50 },
      { name: 'Processed Foods', value: 20 },
      { name: 'Dairy', value: 15 },
      { name: 'Bakery', value: 8 },
      { name: 'Beverages', value: 5 },
      { name: 'Others', value: 2 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Get data for the selected region
  const marketData = marketSizeData[region] || marketSizeData.global;
  const shareData = marketShareData[region] || marketShareData.global;
  const catData = categoryData[region] || categoryData.global;

  // Calculate CAGR
  const calculateCAGR = (data) => {
    const startYear = data.find(item => item.year === '2023');
    const endYear = data.find(item => item.year === '2030');
    
    if (!startYear || !endYear) return 'N/A';
    
    const startValue = startYear.value;
    const endValue = endYear.value;
    const years = 7; // 2030 - 2023
    
    const cagr = ((endValue / startValue) ** (1 / years) - 1) * 100;
    return cagr.toFixed(1) + '%';
  };

  const cagr = calculateCAGR(marketData);
  const currentMarketSize = marketData.find(item => item.year === '2023')?.value || 'N/A';
  const projectedMarketSize = marketData.find(item => item.year === '2030')?.value || 'N/A';

  return (
    <div className="space-y-8">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Current Market Size (2023)</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">${currentMarketSize}</span>
            <span className="text-lg ml-1 mb-1">Billion</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Projected CAGR (2023-2030)</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">{cagr}</span>
            <TrendingUp className="h-5 w-5 text-green-600 ml-2" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Projected Market Size (2030)</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">${projectedMarketSize}</span>
            <span className="text-lg ml-1 mb-1">Billion</span>
          </div>
        </div>
      </div>
      
      {/* Market Size Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Market Size Growth Trend (2020-2030)</h3>
          <button className="flex items-center text-blue-600 text-sm">
            <Download className="h-4 w-4 mr-1" />
            Download Data
          </button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={marketData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                label={{ value: 'Billion USD', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip 
                formatter={(value) => [`$${value} Billion`, 'Market Size']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Market Size" 
                stroke="#0088FE" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Market Share and Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share by Region/Country */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              {region === 'global' ? 'Market Share by Region' : 'Market Share by Country/Area'}
            </h3>
            <button className="flex items-center text-blue-600 text-sm">
              <Download className="h-4 w-4 mr-1" />
              Download Data
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={shareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {shareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Product Category Distribution</h3>
            <button className="flex items-center text-blue-600 text-sm">
              <Download className="h-4 w-4 mr-1" />
              Download Data
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={catData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="value" name="Market Share %" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Key Market Insights</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h4 className="font-medium">Growth Drivers</h4>
            <p className="text-gray-700">
              {region === 'global' && 'Growing Muslim population worldwide (expected to reach 2.8 billion by 2050) and increasing disposable income in Muslim-majority countries.'}
              {region === 'asean' && 'Strong government support for halal industry development, particularly in Malaysia and Indonesia, coupled with growing middle-class Muslim population.'}
              {region === 'gcc' && 'High per capita income, strong regulatory frameworks for halal certification, and increasing tourism from Muslim countries.'}
              {region === 'europe' && 'Growing Muslim population and increasing awareness of halal products among non-Muslim consumers seeking ethical and quality food options.'}
              {region === 'china' && 'Government initiatives to develop halal industry in Muslim-majority regions and increasing trade with Muslim-majority countries.'}
              {region === 'russia' && 'Growing Muslim population in major cities and increasing trade relationships with Middle Eastern and Central Asian countries.'}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <h4 className="font-medium">Emerging Opportunities</h4>
            <p className="text-gray-700">
              {region === 'global' && 'Plant-based halal alternatives (projected 12.5% CAGR) and e-commerce platforms dedicated to halal products.'}
              {region === 'asean' && 'Halal tourism, modest fashion, and halal-certified cosmetics and pharmaceuticals showing strong growth potential.'}
              {region === 'gcc' && 'Premium halal products, halal-certified food service, and halal logistics and supply chain services.'}
              {region === 'europe' && 'Halal-certified convenience foods, premium meat products, and halal restaurant certification.'}
              {region === 'china' && 'Halal e-commerce platforms, halal-certified Chinese traditional medicine, and export-oriented halal manufacturing.'}
              {region === 'russia' && 'Halal meat exports, modest fashion, and halal-certified food service for domestic and tourist markets.'}
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <h4 className="font-medium">Key Challenges</h4>
            <p className="text-gray-700">
              {region === 'global' && 'Fragmented certification standards across regions and high costs of halal compliance (estimated 10-15% premium).'}
              {region === 'asean' && 'Varying standards between countries despite harmonization efforts and competition from non-certified products.'}
              {region === 'gcc' && 'High market saturation in some categories and increasing competition from international brands.'}
              {region === 'europe' && 'Limited consumer awareness outside Muslim communities and higher production costs affecting price competitiveness.'}
              {region === 'china' && 'Regional variations in halal standards and limited international recognition of Chinese halal certification.'}
              {region === 'russia' && 'Limited halal certification infrastructure and low consumer awareness outside Muslim communities.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}