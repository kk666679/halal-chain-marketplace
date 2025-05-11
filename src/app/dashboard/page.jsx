'use client';

import React, { useState, Suspense } from 'react';
import { 
  Globe, TrendingUp, Users, ShoppingBag, 
  PieChart as PieChartIcon, BarChart as BarChartIcon, 
  Map, Download, Filter
} from 'lucide-react';

// Use dynamic imports to prevent build issues
import dynamic from 'next/dynamic';

const MarketOverview = dynamic(() => import('@/components/dashboard/MarketOverview'), {
  ssr: false,
  loading: () => <div className="p-6 bg-white rounded-lg shadow-md">Loading market overview data...</div>
});

const TrendsDrivers = dynamic(() => import('@/components/dashboard/TrendsDrivers'), {
  ssr: false,
  loading: () => <div className="p-6 bg-white rounded-lg shadow-md">Loading trends and drivers data...</div>
});

const ConsumerBehavior = dynamic(() => import('@/components/dashboard/ConsumerBehavior'), {
  ssr: false,
  loading: () => <div className="p-6 bg-white rounded-lg shadow-md">Loading consumer behavior data...</div>
});

const CompetitiveLandscape = dynamic(() => import('@/components/dashboard/CompetitiveLandscape'), {
  ssr: false,
  loading: () => <div className="p-6 bg-white rounded-lg shadow-md">Loading competitive landscape data...</div>
});

export default function DashboardPage() {
  const [activeRegion, setActiveRegion] = useState('global');
  const [activeView, setActiveView] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2">Halal Market Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Comprehensive insights into the global halal food market trends and opportunities
      </p>
      
      {/* Region Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Select Region</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setActiveRegion('global')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'global' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            Global
          </button>
          <button 
            onClick={() => setActiveRegion('asean')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'asean' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            ASEAN
          </button>
          <button 
            onClick={() => setActiveRegion('gcc')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'gcc' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            GCC
          </button>
          <button 
            onClick={() => setActiveRegion('europe')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'europe' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            Europe
          </button>
          <button 
            onClick={() => setActiveRegion('china')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'china' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            China
          </button>
          <button 
            onClick={() => setActiveRegion('russia')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'russia' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            Russia
          </button>
          <button 
            onClick={() => setActiveRegion('australia')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'australia' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            Australia
          </button>
          <button 
            onClick={() => setActiveRegion('uae')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeRegion === 'uae' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Globe className="h-4 w-4 mr-2" />
            UAE/Dubai
          </button>
        </div>
      </div>
      
      {/* View Selection */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-3 px-6 ${
              activeView === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Market Overview
          </button>
          <button
            onClick={() => setActiveView('trends')}
            className={`py-3 px-6 ${
              activeView === 'trends'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Trends & Drivers
          </button>
          <button
            onClick={() => setActiveView('consumer')}
            className={`py-3 px-6 ${
              activeView === 'consumer'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Consumer Behavior
          </button>
          <button
            onClick={() => setActiveView('competitive')}
            className={`py-3 px-6 ${
              activeView === 'competitive'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Competitive Landscape
          </button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div>
        <Suspense fallback={<div className="p-6 bg-white rounded-lg shadow-md">Loading data...</div>}>
          {activeView === 'overview' && <MarketOverview region={activeRegion} />}
          {activeView === 'trends' && <TrendsDrivers region={activeRegion} />}
          {activeView === 'consumer' && <ConsumerBehavior region={activeRegion} />}
          {activeView === 'competitive' && <CompetitiveLandscape region={activeRegion} />}
        </Suspense>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Data sources: Cognitive Market Research, industry reports, and market analysis</p>
        <p className="mt-1">Last updated: July 2023</p>
      </div>
    </div>
  );
}