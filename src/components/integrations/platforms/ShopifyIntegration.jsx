import React from 'react';
import Image from 'next/image';
import { FaShopify, FaCheck } from 'react-icons/fa';

export default function ShopifyIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-full">
          <FaShopify className="text-green-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold">Shopify Integration</h2>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Integrate HalalChain with Your Shopify Store</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Display halal certification badges on your Shopify product pages and enable customers to verify authenticity with a single click.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>One-click app installation</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Customizable certification badges</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Blockchain verification integration</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Automatic inventory synchronization</span>
              </li>
            </ul>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/integrations/shopify-store.jpg"
              alt="Shopify Store Integration"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Integration Steps</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-3">1. Install the HalalChain App</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your Shopify admin dashboard</li>
                <li>Go to the Shopify App Store</li>
                <li>Search for &quot;HalalChain Certification&quot;</li>
                <li>Click &quot;Add app&quot; and follow the installation instructions</li>
                <li>Enter your HalalChain API credentials when prompted</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">2. Configure Display Settings</h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your Shopify admin, go to &quot;Apps&quot; &gt; &quot;HalalChain Certification&quot;</li>
                <li>Select &quot;Display Settings&quot;</li>
                <li>Choose badge style, position, and information to display</li>
                <li>Enable QR code verification if desired</li>
                <li>Save your settings</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">3. Map Your Products</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Go to the &quot;Product Mapping&quot; section in the HalalChain app</li>
                <li>Match your Shopify products with your HalalChain certified products</li>
                <li>Set up automatic synchronization options</li>
                <li>Preview how certification information will appear on your store</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Technical Requirements</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Shopify Requirements</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Shopify Basic plan or higher</li>
              <li>• Admin access to your store</li>
              <li>• Product catalog set up</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">HalalChain Requirements</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Verified vendor account</li>
              <li>• At least one certified product</li>
              <li>• API access enabled</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <a 
          href="/docs/integrations/shopify"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FaShopify className="mr-2" />
          View Full Documentation
        </a>
      </div>
    </div>
  );
}