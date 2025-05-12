'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RegionalIntegrationsLayout({ children }) {
  const pathname = usePathname();
  
  // Check if we're on a subpage
  const isSubpage = pathname !== '/integrations/regional';
  
  // Update the document title based on the current page
  React.useEffect(() => {
    let pageTitle = 'Regional Integrations';
    if (pathname.includes('/compliance')) {
      pageTitle = 'Compliance Checker';
    } else if (pathname.includes('/market-insights')) {
      pageTitle = 'Market Insights';
    }
    document.title = `${pageTitle} | HalalChain Marketplace`;
  }, [pathname]);
  
  return (
    <>
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
      
      <main>
        {children}
      </main>
    </>
  );
}