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

export default function RegionalIntegrationsPage() {
  const [activeRegion, setActiveRegion] = useState('asean');
  const [activeTab, setActiveTab] = useState('certification');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Regional Halal Marketplace Integration</h1>
          <p className="text-xl mb-8 max-w-3xl">
            Connect with halal certification bodies, e-commerce platforms, and suppliers across ASEAN, Australia, Dubai, GCC, MENA, EU, China, and Russia.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Verified Certification</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Cross-Border Trade</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Regional Compliance</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Market Access</span>
          </div>
        </div>
      </section>

      {/* Region Selection */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveRegion('asean')}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                activeRegion === 'asean' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className={`px-4 py-2 font-medium transition border-b-2 ${
                activeTab === 'certification' 
                  ? 'border-emerald-600 text-emerald-600' 
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
                  <p className="mb-6">Connect with official halal certification authorities across ASEAN countries:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Country</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Agency</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Scope</th>
                          <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 px-4">Indonesia</td>
                          <td className="py-4 px-4 font-medium">MUI (Majelis Ulama Indonesia)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals, Logistics</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.halalmui.org/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Malaysia</td>
                          <td className="py-4 px-4 font-medium">JAKIM (Department of Islamic Development Malaysia)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals, Logistics, Finance</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.halal.gov.my/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Thailand</td>
                          <td className="py-4 px-4 font-medium">CICOT (Central Islamic Council of Thailand)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Hospitality</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.cicot.or.th/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Singapore</td>
                          <td className="py-4 px-4 font-medium">MUIS (Islamic Religious Council of Singapore)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals, Logistics</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.muis.gov.sg/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Philippines</td>
                          <td className="py-4 px-4 font-medium">IDCP (Islamic Da'wah Council of the Philippines)</td>
                          <td className="py-4 px-4">Food, Cosmetics</td>
                          <td className="py-4 px-4">
                            <Link href="https://idcphalal.com/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4">Brunei</td>
                          <td className="py-4 px-4 font-medium">MUIB (Brunei Islamic Religious Council)</td>
                          <td className="py-4 px-4">Food, Cosmetics, Pharmaceuticals, Logistics</td>
                          <td className="py-4 px-4">
                            <Link href="https://www.religiousaffairs.gov.bn/" target="_blank" className="text-emerald-600 hover:text-emerald-800 flex items-center">
                              Verify <ExternalLink className="h-4 w-4 ml-1" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition inline-flex items-center"
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