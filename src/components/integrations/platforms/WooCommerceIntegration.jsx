import React from 'react';
import Image from 'next/image';
import { FaWordpress, FaCheck } from 'react-icons/fa';

export default function WooCommerceIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-full">
          <FaWordpress className="text-purple-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold">WooCommerce Integration</h2>
      </div>
      
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Integrate HalalChain with Your WooCommerce Store</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Display halal certification badges on your WordPress WooCommerce store and enable customers to verify product authenticity.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>WordPress plugin with visual customization</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Product page certification details</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>QR code generation for verification</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Order tracking with blockchain verification</span>
              </li>
            </ul>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/integrations/woocommerce-store.jpg"
              alt="WooCommerce Store Integration"
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
            <h4 className="text-lg font-medium mb-3">1. Install the HalalChain Plugin</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Go to your WordPress admin dashboard</li>
                <li>Navigate to &quot;Plugins&quot; &gt; &quot;Add New&quot;</li>
                <li>Search for &quot;HalalChain Certification&quot;</li>
                <li>Click &quot;Install Now&quot; and then &quot;Activate&quot;</li>
                <li>Go to &quot;HalalChain&quot; in the sidebar and enter your API key</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">2. Configure Display Settings</h4>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your WordPress admin, go to &quot;HalalChain&quot; &gt; &quot;Display Settings&quot;</li>
                <li>Choose badge style, position, and information to display</li>
                <li>Enable QR code verification if desired</li>
                <li>Configure product filter widgets</li>
                <li>Save your settings</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">3. Map Your Products</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Go to &quot;HalalChain&quot; &gt; &quot;Product Mapping&quot;</li>
                <li>Match your WooCommerce products with your HalalChain certified products</li>
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
            <h4 className="text-lg font-medium mb-3">WordPress Requirements</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• WordPress 5.6 or higher</li>
              <li>• WooCommerce 4.0 or higher</li>
              <li>• Admin access to your site</li>
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
          href="/docs/integrations/woocommerce"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
        >
          <FaWordpress className="mr-2" />
          View Full Documentation
        </a>
      </div>
    </div>
  );
}