'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Map, 
  Calendar,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data - in a real app, this would come from API based on timeRange
  const analyticsData = {
    salesOverview: {
      total: 12580,
      change: 8.5,
      trend: 'up',
      chartData: [340, 420, 380, 450, 620, 560, 490, 540, 580, 620, 710, 690]
    },
    topProducts: [
      { id: 1, name: 'Organic Honey', sales: 42, revenue: 1260, trend: 'up' },
      { id: 2, name: 'Halal Beef Cuts', sales: 38, revenue: 1140, trend: 'up' },
      { id: 3, name: 'Natural Dates', sales: 31, revenue: 930, trend: 'down' },
      { id: 4, name: 'Spice Mix', sales: 28, revenue: 840, trend: 'up' },
      { id: 5, name: 'Olive Oil', sales: 24, revenue: 720, trend: 'same' }
    ],
    customerMetrics: {
      total: 87,
      new: 12,
      returning: 75,
      conversionRate: 3.2
    },
    geographicData: [
      { country: 'Malaysia', sales: 42, percentage: 28 },
      { country: 'Indonesia', sales: 36, percentage: 24 },
      { country: 'Saudi Arabia', sales: 24, percentage: 16 },
      { country: 'UAE', sales: 18, percentage: 12 },
      { country: 'Singapore', sales: 15, percentage: 10 },
      { country: 'Other', sales: 15, percentage: 10 }
    ],
    certificationImpact: {
      withCertification: 78,
      withoutCertification: 22,
      conversionIncrease: 45
    }
  };

  const renderTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sales Analytics
        </h2>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                timeRange === 'week'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                timeRange === 'month'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                timeRange === 'year'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
            Sales Overview
          </h3>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              analyticsData.salesOverview.trend === 'up' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {renderTrendIcon(analyticsData.salesOverview.trend)}
              {analyticsData.salesOverview.change}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${analyticsData.salesOverview.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : 'Annual'} Sales
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {analyticsData.customerMetrics.total} Customers
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {analyticsData.customerMetrics.new} new this {timeRange}
            </p>
          </div>
        </div>
        
        {/* Simple bar chart */}
        <div className="h-48">
          <div className="flex h-full items-end">
            {analyticsData.salesOverview.chartData.map((value, index) => (
              <div 
                key={index} 
                className="flex-1 mx-1"
              >
                <div 
                  className="bg-emerald-500 dark:bg-emerald-600 rounded-t hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all"
                  style={{ height: `${(value / Math.max(...analyticsData.salesOverview.chartData)) * 100}%` }}
                ></div>
                <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
                  {timeRange === 'month' ? `W${index + 1}` : index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products and Customer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-emerald-500" />
              Top Performing Products
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {analyticsData.topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {product.sales} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ${product.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {renderTrendIcon(product.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-6">
            <Users className="h-5 w-5 mr-2 text-emerald-500" />
            Customer Insights
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.customerMetrics.total}</p>
              <div className="mt-2 flex items-center">
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {analyticsData.customerMetrics.new}
                </span>
                <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">new</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Returning Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.customerMetrics.returning}</p>
              <div className="mt-2 flex items-center">
                <span className="text-emerald-500 text-sm font-medium">
                  {Math.round((analyticsData.customerMetrics.returning / analyticsData.customerMetrics.total) * 100)}%
                </span>
                <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">of total</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.customerMetrics.conversionRate}%</p>
              <div className="mt-2 flex items-center">
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  0.5%
                </span>
                <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">vs last {timeRange}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$78</p>
              <div className="mt-2 flex items-center">
                <span className="text-red-500 text-sm font-medium flex items-center">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  2.1%
                </span>
                <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">vs last {timeRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Distribution and Certification Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-6">
            <Map className="h-5 w-5 mr-2 text-emerald-500" />
            Geographic Distribution
          </h3>
          
          <div className="space-y-4">
            {analyticsData.geographicData.map((item) => (
              <div key={item.country}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.country}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-emerald-500 h-2.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center mb-6">
            <ShoppingCart className="h-5 w-5 mr-2 text-emerald-500" />
            Certification Impact on Sales
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sales Distribution by Certification</p>
              <div className="flex h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500" 
                  style={{ width: `${analyticsData.certificationImpact.withCertification}%` }}
                ></div>
                <div 
                  className="bg-gray-300 dark:bg-gray-600" 
                  style={{ width: `${analyticsData.certificationImpact.withoutCertification}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Certified Products: {analyticsData.certificationImpact.withCertification}%</span>
                <span>Non-Certified: {analyticsData.certificationImpact.withoutCertification}%</span>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                Certification Impact
              </p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                Products with halal certification show a {analyticsData.certificationImpact.conversionIncrease}% higher conversion rate compared to non-certified products.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button className="px-4 py-2 text-sm font-medium rounded-md border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700">
                  View Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}