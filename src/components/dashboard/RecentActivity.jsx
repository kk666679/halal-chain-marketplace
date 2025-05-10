'use client';

import React from 'react';
import Link from 'next/link';
import Badge from '../common/Badge';

const RecentActivity = ({ activities = [], maxItems = 5 }) => {
  // Default activities if none provided
  const defaultActivities = [
    {
      id: 1,
      type: 'certification',
      title: 'New Certification Issued',
      description: 'Halal certification issued for Product XYZ',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      user: {
        name: 'Certification Authority',
        avatar: null,
      },
      status: 'success',
      link: '/certification/123',
    },
    {
      id: 2,
      type: 'product',
      title: 'New Product Added',
      description: 'Organic Honey added to marketplace',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      user: {
        name: 'Vendor Company',
        avatar: null,
      },
      status: 'info',
      link: '/marketplace/456',
    },
    {
      id: 3,
      type: 'transaction',
      title: 'Blockchain Transaction',
      description: 'Supply chain update recorded on blockchain',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      user: {
        name: 'System',
        avatar: null,
      },
      status: 'info',
      link: '/transactions/789',
    },
  ];

  const activitiesToRender = activities.length > 0 ? activities : defaultActivities;
  const displayActivities = activitiesToRender.slice(0, maxItems);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'certification':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'product':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      case 'transaction':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 7H7v6h6V7z" />
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'user':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
          </div>
        );
    }
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="p-5 hover:bg-gray-50">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <Badge 
                    variant={activity.status} 
                    size="sm" 
                    rounded
                  >
                    {activity.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <span>{activity.user?.name}</span>
                  <span className="mx-1">•</span>
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
            
            {activity.link && (
              <div className="mt-3 text-right">
                <Link 
                  href={activity.link} 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View details
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {displayActivities.length === 0 && (
        <div className="p-5 text-center text-gray-500">
          No recent activity
        </div>
      )}
      
      {activitiesToRender.length > maxItems && (
        <div className="p-3 border-t border-gray-100 text-center">
          <Link 
            href="/dashboard/activity" 
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all activity
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;