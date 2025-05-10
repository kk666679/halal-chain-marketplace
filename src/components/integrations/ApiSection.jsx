'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ApiSection() {
  return (
    <section id="developer-api" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Developer Resources</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">HalalChain Integration API</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our comprehensive API allows you to integrate halal certification verification into any platform or application.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* API Card 1 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Certification API</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Access and verify halal certification data directly from our blockchain.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Verify certification status</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Get certification details</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Check expiration dates</span>
                </li>
              </ul>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>{`// Example API Request
GET /api/v1/certifications/{certificationId}

// Response
{
  "id": "cert_123456789",
  "status": "approved",
  "product": {
    "id": "prod_987654321",
    "name": "Halal Chicken Nuggets"
  },
  "certifier": {
    "id": "cert_auth_123",
    "name": "Global Halal Authority"
  },
  "issuedDate": "2023-05-15T00:00:00Z",
  "expiryDate": "2024-05-15T00:00:00Z",
  "blockchainTxHash": "0x1234..."
}`}</code></pre>
              </div>
              <Link href="/docs/api/certification" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
                View API Documentation
                <ExternalLink className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* API Card 2 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Integration API</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect HalalChain with e-commerce platforms and social media.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Sync product catalogs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Display certification badges</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Generate verification links</span>
                </li>
              </ul>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>{`// Example API Request
POST /api/v1/integrations/sync
{
  "platform": "shopify",
  "shop_id": "my-halal-store",
  "products": [
    {
      "platform_id": "shopify_123456",
      "certification_id": "cert_123456789"
    }
  ]
}

// Response
{
  "success": true,
  "synced_products": 1,
  "sync_id": "sync_987654321"
}`}</code></pre>
              </div>
              <Link href="/docs/api/integration" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
                View API Documentation
                <ExternalLink className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
          
          {/* API Card 3 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Webhook API</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Receive real-time updates when certification status changes.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Certification status updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Expiration notifications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">Verification events</span>
                </li>
              </ul>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm"><code>{`// Example Webhook Payload
{
  "event": "certification.status_changed",
  "certification_id": "cert_123456789",
  "previous_status": "pending",
  "new_status": "approved",
  "timestamp": "2023-06-15T14:32:10Z",
  "product_id": "prod_987654321",
  "blockchain_tx_hash": "0x1234..."
}`}</code></pre>
              </div>
              <Link href="/docs/api/webhooks" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
                View API Documentation
                <ExternalLink className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/docs/api" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            View Complete API Documentation
          </Link>
        </div>
      </div>
    </section>
  );
}