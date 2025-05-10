'use client';

import React, { useState } from 'react';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

const AnalyticsSummary = ({ data = {} }) => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Default data if none provided
  const defaultData = {
    productCertifications: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        [10, 15, 8, 12, 20, 18, 22, 25, 28, 30, 35, 40],
        [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32],
      ],
      datasetLabels: ['Products', 'Certifications'],
    },
    categoryDistribution: {
      labels: ['Food', 'Beverages', 'Cosmetics', 'Pharmaceuticals', 'Other'],
      data: [45, 25, 15, 10, 5],
    },
    vendorActivity: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [12, 19, 15, 22],
    },
  };
  
  // Use provided data or default
  const chartData = {
    productCertifications: data.productCertifications || defaultData.productCertifications,
    categoryDistribution: data.categoryDistribution || defaultData.categoryDistribution,
    vendorActivity: data.vendorActivity || defaultData.vendorActivity,
  };
  
  // Filter data based on time range
  const getFilteredData = () => {
    switch (timeRange) {
      case 'week':
        return {
          productCertifications: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              chartData.productCertifications.datasets[0].slice(-7),
              chartData.productCertifications.datasets[1].slice(-7),
            ],
            datasetLabels: chartData.productCertifications.datasetLabels,
          },
          vendorActivity: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: chartData.vendorActivity.data ? chartData.vendorActivity.data.slice(-7) : [3, 5, 4, 6, 5, 3, 4],
          },
        };
      case 'month':
        return {
          productCertifications: {
            labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
            datasets: [
              chartData.productCertifications.datasets[0].slice(-30),
              chartData.productCertifications.datasets[1].slice(-30),
            ],
            datasetLabels: chartData.productCertifications.datasetLabels,
          },
          vendorActivity: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: chartData.vendorActivity.data || [12, 19, 15, 22],
          },
        };
      case 'year':
        return {
          productCertifications: chartData.productCertifications,
          vendorActivity: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: chartData.vendorActivity.data ? 
              chartData.vendorActivity.data.concat(Array(12 - chartData.vendorActivity.data.length).fill(0)) : 
              [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          },
        };
      default:
        return {
          productCertifications: chartData.productCertifications,
          vendorActivity: chartData.vendorActivity,
        };
    }
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-200`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products & Certifications Line Chart */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Products & Certifications</h3>
          <LineChart
            data={filteredData.productCertifications.datasets}
            labels={filteredData.productCertifications.labels}
            title=""
            xAxisLabel="Time Period"
            yAxisLabel="Count"
            colors={['#3b82f6', '#10b981']}
            height={300}
            showLegend={true}
            showPoints={true}
          />
          <div className="flex justify-center mt-4 space-x-6">
            {filteredData.productCertifications.datasetLabels.map((label, index) => (
              <div key={index} className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: index === 0 ? '#3b82f6' : '#10b981' }}
                ></span>
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Category Distribution Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
          <PieChart
            data={chartData.categoryDistribution.data}
            labels={chartData.categoryDistribution.labels}
            title=""
            height={300}
            doughnut={true}
            showLegend={true}
          />
        </div>
        
        {/* Vendor Activity Bar Chart */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Activity</h3>
          <BarChart
            data={[filteredData.vendorActivity.data]}
            labels={filteredData.vendorActivity.labels}
            title=""
            xAxisLabel="Time Period"
            yAxisLabel="Activity Count"
            colors={['#8b5cf6']}
            height={300}
            showLegend={false}
          />
        </div>
        
        {/* Key Metrics Summary */}
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">
                {chartData.productCertifications.datasets[0].reduce((a, b) => a + b, 0)}
              </p>
              <div className="flex items-center mt-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs font-medium ml-1 text-green-500">12%</span>
                <span className="text-xs text-gray-400 ml-1">vs last period</span>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Certifications</p>
              <p className="text-2xl font-bold text-gray-800">
                {chartData.productCertifications.datasets[1].reduce((a, b) => a + b, 0)}
              </p>
              <div className="flex items-center mt-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs font-medium ml-1 text-green-500">8%</span>
                <span className="text-xs text-gray-400 ml-1">vs last period</span>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Vendors</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.floor(chartData.vendorActivity.data?.reduce((a, b) => a + b, 0) / 3) || 23}
              </p>
              <div className="flex items-center mt-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs font-medium ml-1 text-green-500">15%</span>
                <span className="text-xs text-gray-400 ml-1">vs last period</span>
              </div>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Blockchain Txs</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.floor(chartData.productCertifications.datasets[0].reduce((a, b) => a + b, 0) * 2.5) || 650}
              </p>
              <div className="flex items-center mt-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
                <span className="text-xs font-medium ml-1 text-green-500">20%</span>
                <span className="text-xs text-gray-400 ml-1">vs last period</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;