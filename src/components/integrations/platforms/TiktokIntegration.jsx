import React from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function TiktokIntegration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 p-3 rounded-full">
          <SiTiktok className="text-black text-2xl" />
        </div>
        <h2 className="text-2xl font-bold">TikTok Integration</h2>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Connect Your Halal Products to TikTok Shop</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Showcase your halal-certified products on TikTok Shop with verified certification badges and enable seamless shopping experiences.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>TikTok Shop integration</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Live shopping certification display</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Creator marketplace collaboration</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Viral content templates</span>
              </li>
            </ul>
          </div>
          
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/integrations/tiktok-shop.jpg"
              alt="TikTok Shop Integration"
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
            <h4 className="text-lg font-medium mb-3">1. Connect Your TikTok Shop</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your HalalChain vendor dashboard</li>
                <li>Navigate to &quot;Integrations&quot; &gt; &quot;TikTok&quot;</li>
                <li>Click &quot;Connect TikTok Shop&quot;</li>
                <li>Authorize the HalalChain app</li>
                <li>Select which certified products to display on TikTok</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">2. Configure Display Settings</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your TikTok Shop Seller Center, go to &quot;Settings&quot;</li>
                <li>Select &quot;Integrations&quot; from the menu</li>
                <li>Find &quot;HalalChain Certification&quot; and click &quot;Configure&quot;</li>
                <li>Choose how certification badges should appear on product listings</li>
                <li>Save your settings</li>
              </ol>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">3. Create Content with Certification Focus</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Use our TikTok content templates in the &quot;Marketing&quot; section</li>
                <li>Create videos showcasing your halal certification process</li>
                <li>Partner with halal-focused creators through our network</li>
                <li>Use the #HalalCertified hashtag in your content</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Technical Requirements</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-3">TikTok Requirements</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• TikTok Shop seller account</li>
              <li>• TikTok Business account</li>
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
          href="/docs/integrations/tiktok"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
        >
          <SiTiktok className="mr-2" />
          View Full Documentation
        </a>
      </div>
    </div>
  );
}