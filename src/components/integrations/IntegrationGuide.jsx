'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Platform-specific content components
import TiktokIntegration from './platforms/TiktokIntegration';
import ShopifyIntegration from './platforms/ShopifyIntegration';
import WooCommerceIntegration from './platforms/WooCommerceIntegration';
import FacebookIntegration from './platforms/FacebookIntegration';

export default function IntegrationGuide({ platformId, role, socialMediaPlatforms, ecommercePlatforms }) {
  const [platform, setPlatform] = useState(null);
  
  // Find the selected platform from the combined list
  useEffect(() => {
    const allPlatforms = [...socialMediaPlatforms, ...ecommercePlatforms];
    const selectedPlatform = allPlatforms.find(p => p.id === platformId);
    setPlatform(selectedPlatform);
  }, [platformId, socialMediaPlatforms, ecommercePlatforms]);
  
  // If no platform is selected, show a default message
  if (!platform) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select a Platform</h2>
          <p className="text-gray-600 dark:text-gray-400">Please select a platform from above to view integration details.</p>
        </div>
      </section>
    );
  }
  
  // Determine which platform-specific component to render
  const renderPlatformContent = () => {
    switch (platformId) {
      case 'tiktok':
        return <TiktokIntegration role={role} />;
      case 'shopify':
        return <ShopifyIntegration role={role} />;
      case 'woocommerce':
        return <WooCommerceIntegration role={role} />;
      case 'facebook':
        return <FacebookIntegration role={role} />;
      default:
        // For platforms without specific components, render a generic guide
        return <GenericIntegrationGuide platform={platform} role={role} />;
    }
  };

  return (
    <section id={`${platformId}-integration`} className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="sticky top-24">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {ecommercePlatforms.some(p => p.id === platformId) ? 'E-commerce Integration' : 'Social Media Integration'}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                {platform.name} Integration
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect your halal-certified products to {platform.name} to reach more customers. 
                Our integration allows you to showcase your halal certification directly on your {platform.name} listings.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">Product Tagging</span>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">Certification Badge</span>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">Verification Link</span>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">Automated Sync</span>
              </div>
              
              <div className="mb-8">
                <Link 
                  href={`/integrations/connect/${platformId}`}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition"
                >
                  <span>Connect {platform.name} Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            {renderPlatformContent()}
          </div>
        </div>
      </div>
    </section>
  );
}

// Generic integration guide for platforms without specific components
function GenericIntegrationGuide({ platform, role }) {
  return (
    <div>
      {/* For Customers Tab */}
      {role === 'customer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Customers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verify Halal Products on {platform.name}</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Look for the HalalChain verification badge on {platform.name} products to ensure they're certified halal.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Look for the green "Halal Verified" badge on product listings</li>
                <li>Tap the badge to view certification details</li>
                <li>Scan the QR code to verify authenticity on the blockchain</li>
                <li>Check expiration date and certification authority</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Share Verified Products</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Share halal-certified products with your followers.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Find a halal-verified product on {platform.name}</li>
                <li>Tap the "Share" button</li>
                <li>Select "Share with certification details"</li>
                <li>Add to your story or send directly to friends</li>
              </ol>
            </div>
          </div>
        </div>
      )}
      
      {/* For Vendors Tab */}
      {role === 'vendor' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Vendors</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Connect Your {platform.name} Account</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Link your {platform.name} account to automatically display halal certification on your products.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your HalalChain vendor dashboard</li>
                <li>Navigate to "Integrations" &gt; "{platform.name}"</li>
                <li>Click "Connect {platform.name} Account"</li>
                <li>Authorize the HalalChain app</li>
                <li>Select which certified products to display on {platform.name}</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Showcase Your Certification</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Display your halal certification prominently on your {platform.name} listings.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your HalalChain dashboard, go to "Integration Settings"</li>
                <li>Customize how your certification appears on {platform.name}</li>
                <li>Choose badge style, position, and information to display</li>
                <li>Enable QR code verification if desired</li>
                <li>Save your settings and preview on {platform.name}</li>
              </ol>
            </div>
          </div>
        </div>
      )}
      
      {/* For Developers Tab */}
      {role === 'developer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Developers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">{platform.name} API Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Integrate HalalChain certification with {platform.name}'s API for seamless product verification.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm"><code>{`// ${platform.name} API Integration with HalalChain
const { HalalChainConnector } = require('@halalchain/integrations');

// Initialize the connector
const connector = new HalalChainConnector({
  apiKey: 'YOUR_HALALCHAIN_API_KEY',
  platform: '${platformId}',
  platformCredentials: {
    // Your ${platform.name} API credentials
  }
});

// Sync product certification status
async function syncProductCertification(productId) {
  try {
    // Get certification details from HalalChain
    const certification = await connector.getCertification(productId);
    
    // Update product on ${platform.name}
    const result = await connector.updateProduct(productId, {
      certification_details: certification,
      display_badge: true
    });
    
    return result;
  } catch (error) {
    console.error('Failed to sync certification:', error);
    throw error;
  }
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Webhook Configuration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Set up webhooks to automatically update {platform.name} product listings when certification status changes.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`// Express.js webhook handler for certification updates
const express = require('express');
const router = express.Router();

router.post('/webhook/certification-update', async (req, res) => {
  try {
    const { productId, certificationStatus, expiryDate } = req.body;
    
    // Verify webhook signature
    const isValid = verifyWebhookSignature(req);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Update ${platform.name} product listing
    if (certificationStatus === 'approved') {
      await connector.enableCertificationBadge(productId);
    } else if (certificationStatus === 'expired' || certificationStatus === 'revoked') {
      await connector.disableCertificationBadge(productId);
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete API reference for {platform.name} integration.</p>
            
            <Link href={`/docs/api/${platformId}`} className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
              View API Documentation
              <ExternalLink className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}