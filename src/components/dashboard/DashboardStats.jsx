'use client';

import React from 'react';
import IconSet from '../icons/IconSet';

const DashboardStats = ({ stats = [] }) => {
  // Default stats if none provided
  const defaultStats = [
    {
      title: 'Total Products',
      value: '0',
      change: '0%',
      isPositive: true,
      icon: <IconSet.Products className="w-8 h-8 text-blue-600" />,
      color: 'blue',
    },
    {
      title: 'Certifications',
      value: '0',
      change: '0%',
      isPositive: true,
      icon: <IconSet.Certification className="w-8 h-8 text-green-600" />,
      color: 'green',
    },
    {
      title: 'Vendors',
      value: '0',
      change: '0%',
      isPositive: true,
      icon: <IconSet.Users className="w-8 h-8 text-purple-600" />,
      color: 'purple',
    },
    {
      title: 'Transactions',
      value: '0',
      change: '0%',
      isPositive: true,
      icon: <IconSet.Blockchain className="w-8 h-8 text-orange-600" />,
      color: 'orange',
    },
  ];

  const statsToRender = stats.length > 0 ? stats : defaultStats;

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'text-blue-600',
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'text-green-600',
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        icon: 'text-red-600',
      },
      yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        icon: 'text-yellow-600',
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'text-purple-600',
      },
      orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        icon: 'text-orange-600',
      },
      gray: {
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        icon: 'text-gray-600',
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsToRender.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                
                {stat.change && (
                  <div className="flex items-center mt-2">
                    {stat.isPositive ? (
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd"></path>
                      </svg>
                    )}
                    <span className={`text-xs font-medium ml-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">vs last month</span>
                  </div>
                )}
              </div>
              
              <div className={`${colorClasses.bg} p-3 rounded-full`}>
                {stat.icon || <div className={`w-8 h-8 ${colorClasses.icon}`}></div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;