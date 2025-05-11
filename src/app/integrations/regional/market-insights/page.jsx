'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, Download } from 'lucide-react';
import MarketInsights from '@/components/integrations/regional/MarketInsights';

export default function MarketInsightsPage() {
  const searchParams = useSearchParams();
  const [region, setRegion] = useState('asean');
  
  useEffect(() => {
    const regionParam = searchParams.get('region');
    if (regionParam && ['asean', 'china', 'russia'].includes(regionParam)) {
      setRegion(regionParam);
    }
  }, [searchParams]);

  const regionTitle = region === 'asean' ? 'ASEAN' : region === 'china' ? 'China' : 'Russia';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link 
              href="/integrations/regional" 
              className="flex items-center text-white hover:text-blue-100 transition"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Regional Hub
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Halal Market Insights: {regionTitle}</h1>
          <p className="text-lg max-w-3xl">
            Explore market data, trends, and opportunities for halal products and services in {regionTitle}.
          </p>
        </div>
      </section>

      {/* Region Selection */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setRegion('asean')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                region === 'asean' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ASEAN
            </button>
            <button 
              onClick={() => setRegion('china')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                region === 'china' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              China
            </button>
            <button 
              onClick={() => setRegion('russia')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                region === 'russia' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Russia
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MarketInsights region={region} />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Market Entry Services</h2>
                <p className="text-gray-600 mb-4">
                  Our team can help you enter the {regionTitle} halal market with tailored strategies and local expertise.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                    <span className="text-gray-700">Market assessment and opportunity analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                    <span className="text-gray-700">Certification guidance and compliance support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                    <span className="text-gray-700">Local partner and distributor connections</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                    <span className="text-gray-700">E-commerce platform integration</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
                  Request Market Entry Consultation
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Market Reports</h2>
                <ul className="space-y-4">
                  <li>
                    <Link href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{regionTitle} Halal Market Report 2024</h3>
                        <Download className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Comprehensive analysis of the {regionTitle} halal market landscape, trends, and opportunities.</p>
                      <div className="mt-2 text-xs text-gray-500">PDF • 28 pages • Updated Jan 2024</div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{regionTitle} Halal Consumer Insights</h3>
                        <Download className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Consumer behavior, preferences, and purchasing patterns in the {regionTitle} halal market.</p>
                      <div className="mt-2 text-xs text-gray-500">PDF • 18 pages • Updated Mar 2024</div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Halal E-commerce Opportunities in {regionTitle}</h3>
                        <Download className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Digital marketplace analysis and e-commerce integration strategies for halal products.</p>
                      <div className="mt-2 text-xs text-gray-500">PDF • 22 pages • Updated Feb 2024</div>
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                <ul className="space-y-4">
                  <li className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-blue-600 font-medium">June 15-17, 2024</p>
                    <h3 className="font-medium">{regionTitle} Halal Expo 2024</h3>
                    <p className="text-sm text-gray-600">
                      {region === 'asean' ? 'Kuala Lumpur, Malaysia' : 
                       region === 'china' ? 'Shanghai, China' : 'Moscow, Russia'}
                    </p>
                  </li>
                  <li className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-green-600 font-medium">Online • July 8, 2024</p>
                    <h3 className="font-medium">Webinar: Entering the {regionTitle} Halal Market</h3>
                    <p className="text-sm text-gray-600">Expert insights and practical strategies</p>
                  </li>
                  <li className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-purple-600 font-medium">August 22-23, 2024</p>
                    <h3 className="font-medium">{regionTitle} Halal Certification Workshop</h3>
                    <p className="text-sm text-gray-600">
                      {region === 'asean' ? 'Jakarta, Indonesia' : 
                       region === 'china' ? 'Yinchuan, China' : 'Kazan, Russia'}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}