'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RegionalIntegrationsLayout({ children }) {
  const pathname = usePathname();
  
  // Check if we're on a subpage
  const isSubpage = pathname !== '/integrations/regional';
  
  return (
    <div>
      {isSubpage && (
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto px-4">
            <nav className="text-sm breadcrumbs">
              <ul className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/integrations" className="text-gray-600 hover:text-gray-900">
                    Integrations
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/integrations/regional" className="text-gray-600 hover:text-gray-900">
                    Regional Hub
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900">
                    {pathname.includes('/compliance') ? 'Compliance Checker' : 
                     pathname.includes('/market-insights') ? 'Market Insights' : 'Page'}
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {children}
      
      {/* Common Footer for Regional Integration Pages */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Regional Halal Hubs</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/integrations/regional?region=asean" className="text-gray-300 hover:text-white">
                    ASEAN Halal Hub
                  </Link>
                </li>
                <li>
                  <Link href="/integrations/regional?region=china" className="text-gray-300 hover:text-white">
                    China Halal Hub
                  </Link>
                </li>
                <li>
                  <Link href="/integrations/regional?region=russia" className="text-gray-300 hover:text-white">
                    Russia Halal Hub
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/integrations/regional/compliance" className="text-gray-300 hover:text-white">
                    Compliance Checker
                  </Link>
                </li>
                <li>
                  <Link href="/integrations/regional/market-insights" className="text-gray-300 hover:text-white">
                    Market Insights
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Certification Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    E-commerce Integration
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">Need assistance with regional halal market entry?</p>
              <Link 
                href="/contact" 
                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} HalalChain Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}