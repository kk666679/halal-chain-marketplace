import React from 'react';
import Image from 'next/image';
import { FaFacebook, FaShoppingBag, FaCheck } from 'react-icons/fa';

export default function FacebookIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <FaFacebook className="text-blue-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold">Facebook Integration</h2>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Connect Your Halal Products to Facebook</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Showcase your halal-certified products on Facebook Marketplace and Facebook Shops with verified certification badges.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Automatic certification badge display</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Real-time inventory synchronization</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>QR code verification for customers</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Automated product catalog updates</span>
              </li>
            </ul>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/integrations/facebook-marketplace.jpg"
              alt="Facebook Marketplace Integration"
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
            <h4 className="text-lg font-medium mb-3">1. Connect Your Facebook Account</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your HalalChain vendor dashboard</li>
                <li>Navigate to &quot;Integrations&quot; &gt; &quot;Facebook&quot;</li>
                <li>Click &quot;Connect Facebook Shop&quot;</li>
                <li>Authorize the HalalChain app</li>
                <li>Select which certified products to display on Facebook</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">2. Configure Display Settings</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your Facebook Commerce Manager, go to &quot;Settings&quot;</li>
                <li>Select &quot;HalalChain Certification&quot; from the integrations list</li>
                <li>Choose how certification badges should appear on product listings</li>
                <li>Enable or disable QR code verification</li>
                <li>Save your settings</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">3. Promote Your Certified Products</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Create Facebook posts highlighting your halal certification</li>
                <li>Use the &quot;HalalChain Verified&quot; tag in your product descriptions</li>
                <li>Share your certification journey with your audience</li>
                <li>Respond to customer questions about your certification</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Technical Requirements</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Facebook Business Account</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Facebook Business Manager account</li>
              <li>• Commerce Manager access</li>
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
          href="/docs/integrations/facebook"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <FaFacebook className="mr-2" />
          View Full Documentation
        </a>
      </div>
    </div>
  );
}