'use client';

import React from 'react';
import { Download, Globe, Book, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RegionalGuides({ region }) {
  // Region-specific guides
  const guides = {
    asean: {
      title: 'ASEAN Halal Trade Compliance Checklist',
      description: 'A comprehensive guide to navigating halal certification and trade requirements across ASEAN countries.',
      steps: [
        'Understand country-specific halal certification requirements',
        'Identify appropriate certification bodies for your product category',
        'Prepare documentation for halal certification application',
        'Implement halal-compliant supply chain processes',
        'Obtain certification and maintain compliance records',
        'Register with local halal directories and marketplaces'
      ],
      requirements: [
        { name: 'Halal Certification', required: true },
        { name: 'Product Registration', required: true },
        { name: 'Import License', required: true },
        { name: 'Nutritional Information', required: true },
        { name: 'Country of Origin Labeling', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Philippines', 'Brunei']
    },
    australia: {
      title: 'Australian Halal Market Entry Guide',
      description: 'Essential information for entering the Australian halal market and meeting certification requirements.',
      steps: [
        'Understand Australian halal certification standards and requirements',
        'Connect with recognized Australian halal certification bodies',
        'Prepare documentation for Australian market compliance',
        'Implement halal-compliant production and supply chain processes',
        'Obtain certification and register with Australian halal directories',
        'Connect with Australian retailers and distribution networks'
      ],
      requirements: [
        { name: 'Australian Halal Certification', required: true },
        { name: 'Food Standards Australia New Zealand (FSANZ) Compliance', required: true },
        { name: 'Import License', required: true },
        { name: 'Australian Labeling Requirements', required: true },
        { name: 'Nutritional Information Panel', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast']
    },
    dubai: {
      title: 'Dubai Halal Certification Guide',
      description: 'A comprehensive guide to obtaining halal certification and entering the Dubai market.',
      steps: [
        'Understand UAE halal standards (ESMA) and Dubai Municipality requirements',
        'Connect with Emirates Authority for Standardization and Metrology (ESMA)',
        'Prepare documentation for halal certification application',
        'Implement halal-compliant production and logistics processes',
        'Obtain certification and register with UAE halal directories',
        'Connect with Dubai retailers and distribution networks'
      ],
      requirements: [
        { name: 'ESMA Halal Certification', required: true },
        { name: 'Dubai Municipality Approval', required: true },
        { name: 'Import License', required: true },
        { name: 'Arabic Labeling', required: true },
        { name: 'Gulf Standards Organization (GSO) Compliance', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah']
    },
    gcc: {
      title: 'GCC Halal Market Entry Guide',
      description: 'Essential information for entering the Gulf Cooperation Council halal markets.',
      steps: [
        'Understand GCC unified halal standards and requirements',
        'Connect with Gulf Standards Organization (GSO)',
        'Prepare documentation for GCC market compliance',
        'Implement halal-compliant production and supply chain processes',
        'Obtain certification and register with GCC halal directories',
        'Connect with GCC retailers and distribution networks'
      ],
      requirements: [
        { name: 'GCC Halal Certification', required: true },
        { name: 'Gulf Standards Organization (GSO) Compliance', required: true },
        { name: 'Import License', required: true },
        { name: 'Arabic Labeling', required: true },
        { name: 'Technical Documentation', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman']
    },
    mena: {
      title: 'MENA Region Halal Compliance Guide',
      description: 'A guide to navigating halal certification and market entry across the Middle East and North Africa.',
      steps: [
        'Understand country-specific halal certification requirements',
        'Identify appropriate certification bodies for your product category',
        'Prepare documentation for halal certification application',
        'Implement halal-compliant supply chain processes',
        'Obtain certification and maintain compliance records',
        'Register with local halal directories and marketplaces'
      ],
      requirements: [
        { name: 'Country-specific Halal Certification', required: true },
        { name: 'Product Registration', required: true },
        { name: 'Import License', required: true },
        { name: 'Arabic Labeling', required: true },
        { name: 'Technical Documentation', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Egypt', 'Morocco', 'Tunisia', 'Jordan', 'Lebanon', 'Algeria']
    },
    eu: {
      title: 'European Union Halal Market Guide',
      description: 'Essential information for entering the EU halal market and meeting certification requirements.',
      steps: [
        'Understand EU food safety regulations and halal certification standards',
        'Connect with recognized European halal certification bodies',
        'Prepare documentation for EU market compliance',
        'Implement halal-compliant production and supply chain processes',
        'Obtain certification and register with European halal directories',
        'Connect with EU retailers and distribution networks'
      ],
      requirements: [
        { name: 'European Halal Certification', required: true },
        { name: 'EU Food Safety Compliance', required: true },
        { name: 'Import License', required: true },
        { name: 'EU Labeling Requirements', required: true },
        { name: 'Nutritional Information', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Germany', 'France', 'UK', 'Netherlands', 'Spain', 'Italy']
    },
    china: {
      title: 'How to Source Halal Products in China',
      description: 'A guide to finding and verifying authentic halal-certified products and suppliers in China.',
      steps: [
        'Identify regions with established halal industries (Ningxia, Xinjiang, etc.)',
        'Verify certification through China Islamic Association or provincial bodies',
        'Conduct supplier audits to ensure halal compliance',
        'Establish direct relationships with certified manufacturers',
        'Implement blockchain tracking for supply chain transparency',
        'Register products with Chinese halal e-commerce platforms'
      ],
      requirements: [
        { name: 'Chinese Halal Certification', required: true },
        { name: 'Product Registration', required: true },
        { name: 'Import License', required: true },
        { name: 'Chinese Labeling', required: true },
        { name: 'Quality Inspection Certificate', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Ningxia', 'Xinjiang', 'Gansu', 'Qinghai', 'Beijing', 'Shanghai']
    },
    russia: {
      title: 'Navigating Russian Halal Standards',
      description: 'Essential information for understanding and complying with halal certification requirements in Russia.',
      steps: [
        'Understand Russian halal standards and certification process',
        'Connect with the Russia Muftis Council or Halal Standard Committee',
        'Prepare documentation in Russian language',
        'Implement halal-compliant production processes',
        'Obtain certification and register with Russian halal directories',
        'Connect with Russian halal e-commerce platforms and distributors'
      ],
      requirements: [
        { name: 'Russian Halal Certification', required: true },
        { name: 'Product Registration', required: true },
        { name: 'Import License', required: true },
        { name: 'Russian Labeling', required: true },
        { name: 'Technical Documentation', required: true },
        { name: 'Blockchain Verification', required: false }
      ],
      keyMarkets: ['Moscow', 'St. Petersburg', 'Kazan', 'Ufa', 'Makhachkala', 'Grozny']
    }
  };

  const regionGuide = guides[region] || {};
  const getRegionTitle = (region) => {
    switch(region) {
      case 'asean': return 'ASEAN';
      case 'china': return 'China';
      case 'russia': return 'Russia';
      case 'australia': return 'Australia';
      case 'dubai': return 'Dubai';
      case 'mena': return 'MENA';
      case 'gcc': return 'GCC';
      case 'eu': return 'European Union';
      default: return region.toUpperCase();
    }
  };
  
  const regionTitle = getRegionTitle(region);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{regionGuide.title}</h2>
      <p className="mb-8 text-gray-600">
        {regionGuide.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Book className="h-5 w-5 mr-2 text-emerald-600" />
            Step-by-Step Guide
          </h3>
          <ol className="space-y-4">
            {regionGuide.steps?.map((step, index) => (
              <li key={index} className="flex">
                <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-emerald-600" />
              Key Markets in {regionTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {regionGuide.keyMarkets?.map((market, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-emerald-600" />
            Compliance Requirements
          </h3>
          <div className="space-y-3">
            {regionGuide.requirements?.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  {req.required ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                  )}
                  <span>{req.name}</span>
                </div>
                <span className={`text-sm font-medium ${req.required ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {req.required ? 'Required' : 'Recommended'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Need Assistance?</h4>
            <p className="text-sm text-gray-600 mb-4">
              Our team of experts can help you navigate the halal certification process in {regionTitle}.
            </p>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center text-sm">
              <Download className="h-4 w-4 mr-2" />
              Download Complete Guide
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Certification Assistance</h3>
        <p className="text-gray-600 mb-4">
          Let our experts help you navigate the halal certification process in {regionTitle}.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
            Request Consultation
          </button>
          <button className="px-6 py-2 bg-white border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
            View Webinars
          </button>
        </div>
      </div>
    </div>
  );
}