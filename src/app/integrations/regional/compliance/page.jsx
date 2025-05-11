'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ComplianceChecker from '@/components/integrations/regional/ComplianceChecker';

// Loading fallback component
function ComplianceLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading compliance checker...</p>
      </div>
    </div>
  );
}

// Client Component that uses useSearchParams wrapped in its own Suspense boundary
function ComplianceContent() {
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
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link 
              href="/integrations/regional" 
              className="flex items-center text-white hover:text-emerald-100 transition"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Regional Hub
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Halal Compliance Checker for {regionTitle}</h1>
          <p className="text-lg max-w-3xl">
            Verify if your products meet the halal compliance requirements for {regionTitle} markets and get guidance on certification.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ComplianceChecker region={region} />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Why Check Compliance?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                    <span className="text-gray-700">Identify gaps in your halal compliance before certification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                    <span className="text-gray-700">Understand region-specific requirements for {regionTitle}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                    <span className="text-gray-700">Prepare for official halal certification process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-100 text-emerald-800 h-6 w-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                    <span className="text-gray-700">Ensure your products meet market entry requirements</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Need Assistance?</h2>
                <p className="text-gray-600 mb-4">
                  Our team of halal compliance experts can help you navigate the certification process for {regionTitle} markets.
                </p>
                <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
                  Request Consultation
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Resources</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-emerald-600 hover:text-emerald-800 flex items-start">
                      <span className="bg-emerald-100 rounded p-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </span>
                      {regionTitle} Halal Compliance Guide (PDF)
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-emerald-600 hover:text-emerald-800 flex items-start">
                      <span className="bg-emerald-100 rounded p-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </span>
                      Webinar: Halal Certification in {regionTitle}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-emerald-600 hover:text-emerald-800 flex items-start">
                      <span className="bg-emerald-100 rounded p-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      Halal Standards Checklist
                    </Link>
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

// Main page component that wraps the client component with Suspense
export default function CompliancePage() {
  return (
    <Suspense fallback={<ComplianceLoading />}>
      <Suspense fallback={<ComplianceLoading />}>
        <ComplianceContent />
      </Suspense>
    </Suspense>
  );
}