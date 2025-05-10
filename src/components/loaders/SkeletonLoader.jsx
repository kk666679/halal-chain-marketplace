'use client';

import React from 'react';

const SkeletonLoader = ({ type = 'text', count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}></div>
        );
      case 'circle':
        return (
          <div className={`rounded-full bg-gray-200 animate-pulse ${className || 'h-12 w-12'}`}></div>
        );
      case 'rectangle':
        return (
          <div className={`h-32 bg-gray-200 rounded animate-pulse ${className}`}></div>
        );
      case 'card':
        return (
          <div className="border rounded-lg p-4 w-full">
            <div className="h-48 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        );
      case 'table-row':
        return (
          <div className="flex w-full">
            <div className="h-8 bg-gray-200 rounded animate-pulse mr-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mr-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mr-2 w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
          </div>
        );
      default:
        return (
          <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`}></div>
        );
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="mb-2">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;