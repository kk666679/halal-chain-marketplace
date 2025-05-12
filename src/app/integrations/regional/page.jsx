'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  ExternalLink, 
  MapPin, 
  Check, 
  Download,
  Globe,
  ShoppingBag
} from 'lucide-react';

// Import components
import CertificationVerifier from '@/components/integrations/regional/CertificationVerifier';
import EcommercePartners from '@/components/integrations/regional/EcommercePartners';
import ProductCategories from '@/components/integrations/regional/ProductCategories';
import RegionalGuides from '@/components/integrations/regional/RegionalGuides';
import AseanComplianceSection from '@/components/integrations/regional/AseanComplianceSection';
import { Badge } from '@/components/ui/badge';

export default function RegionalIntegrationsPage() {
  const [activeRegion, setActiveRegion] = useState('asean');
  const [activeTab, setActiveTab] = useState('certification');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Regional Halal Marketplace Integration
          </h1>
          <p className="text-xl mb-8 max-w-3xl">
            Connect with halal certification bodies, e-commerce platforms, and suppliers across ASEAN, Australia, Dubai, GCC, MENA, EU, China, and Russia.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm">Verified Certification</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm">Cross-Border Trade</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm">Regional Compliance</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm">Market Access</span>
          </div>
        </div>
      </section>

      {/* Region Selection */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveRegion('asean')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeRegion === 'asean' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              ASEAN
            </button>
            <button 
              onClick={() => setActiveRegion('australia')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'australia' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Australia
            </button>
            <button 
              onClick={() => setActiveRegion('dubai')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'dubai' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dubai
            </button>
            <button 
              onClick={() => setActiveRegion('gcc')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'gcc' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              GCC
            </button>
            <button 
              onClick={() => setActiveRegion('mena')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'mena' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              MENA
            </button>
            <button 
              onClick={() => setActiveRegion('eu')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'eu' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              EU
            </button>
            <button 
              onClick={() => setActiveRegion('china')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'china' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              China
            </button>
            <button 
              onClick={() => setActiveRegion('russia')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'russia' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Russia
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('certification')}
              className={`px-4 py-2 font-medium transition-all duration-300 border-b-2 ${
                activeTab === 'certification' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Certification Bodies
            </button>
            <button 
              onClick={() => setActiveTab('ecommerce')}
              className={`px-4 py-2 font-medium transition border-b-2 ${
                activeTab === 'ecommerce' 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              E-commerce Platforms
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 font-medium transition border-b-2 ${
                activeTab === 'products' 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Products & Services
            </button>
            <button 
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 font-medium transition border-b-2 ${
                activeTab === 'guides' 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Regional Guides
            </button>
            <Link 
              href={`/integrations/regional/market-insights?region=${activeRegion}`}
              className="px-4 py-2 font-medium transition border-b-2 border-transparent text-gray-600 hover:text-gray-900 flex items-center"
            >
              Market Insights
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === 'certification' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Halal Certification Bodies in {activeRegion === 'asean' ? 'ASEAN' : activeRegion === 'china' ? 'China' : 'Russia'}</h2>
              
              {activeRegion === 'asean' && (
                <div>
                  <p className="mb-6">Connect with official halal certification authorities across all ASEAN member countries:</p>
                  
                  {/* Import and use the new AseanComplianceSection component */}
                  <div className="mt-4">
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="gradient">Updated May 2025</Badge>
                        <Badge variant="secondary">10 Member Countries</Badge>
                        <Badge variant="outline">Blockchain Verified</Badge>
                      </div>
                    </div>
                    
                    {/* Use the new component */}
                    <AseanComplianceSection />
                  </div>
                </div>
              )}

              {activeRegion === 'china' && (
                <div>
                  <p className="mb-6">Connect with official halal certification authorities in China:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Region</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Agency</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Scope</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 px-4">National</td>
                          <td className="py-4 px-4 font-medium">China Islamic Association (CIA)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Hospitality</td>
                          <td className="py-4 px-4">
                            <Link href="http://www.chinaislam.net.cn/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Ningxia</td>
                          <td className="py-4 px-4 font-medium">Ningxia Halal Certification Center</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals</td>
                          <td className="py-4 px-4">
                            <Link href="#" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Xinjiang</td>
                          <td className="py-4 px-4 font-medium">Xinjiang Halal Certification Center</td>
                          <td className="py-4 px-4">Food, Cosmetics</td>
                          <td className="py-4 px-4">
                            <Link href="#" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeRegion === 'russia' && (
                <div>
                  <p className="mb-6">Connect with official halal certification authorities in Russia:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Region</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Agency</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Scope</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 px-4">National</td>
                          <td className="py-4 px-4 font-medium">Halal Standard Committee (HSC) under Russia Muftis Council</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals, Logistics</td>
                          <td className="py-4 px-4">
                            <Link href="https://halalstandard.org/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Moscow</td>
                          <td className="py-4 px-4 font-medium">International Center for Halal Standardization and Certification</td>
                          <td className="py-4 px-4">Food, Cosmetics, Finance</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.halalcenter.org/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CertificationVerifier />
                
                <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100">
                  <h3 className="text-xl font-semibold mb-4">Compliance Checker</h3>
                  <p className="text-gray-600 mb-6">
                    Check if your product meets the halal compliance requirements for {activeRegion === 'asean' ? 'ASEAN' : activeRegion === 'china' ? 'China' : 'Russia'} markets.
                  </p>
                  <Link 
                    href={`/integrations/regional/compliance?region=${activeRegion}`}
                    className="btn-primary inline-flex items-center"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Check Product Compliance
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ecommerce' && (
            <EcommercePartners region={activeRegion} />
          )}

          {activeTab === 'products' && (
            <ProductCategories region={activeRegion} />
          )}

          {activeTab === 'guides' && (
            <RegionalGuides region={activeRegion} />
          )}
        </div>
      </section>
    </div>
  );
}