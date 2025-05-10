'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TiktokIntegration({ role }) {
  return (
    <>
      {/* For Customers Tab */}
      {role === 'customer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Customers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verify Halal Products on TikTok</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Look for the HalalChain verification badge on TikTok Shop products to ensure they're certified halal.</p>
            
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">Share halal-certified products with your followers directly from TikTok.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Find a halal-verified product on TikTok Shop</li>
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
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Connect Your TikTok Shop</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Link your TikTok Shop to automatically display halal certification on your products.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your HalalChain vendor dashboard</li>
                <li>Navigate to "Integrations" > "TikTok"</li>
                <li>Click "Connect TikTok Shop"</li>
                <li>Authorize the HalalChain app</li>
                <li>Select which certified products to display on TikTok</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">TikTok Live Shopping Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Showcase your halal certification during TikTok Live Shopping events.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Schedule a Live Shopping event in TikTok</li>
                <li>In your HalalChain dashboard, go to "Live Events"</li>
                <li>Select "TikTok Live" and enter your event details</li>
                <li>Choose which certified products to feature</li>
                <li>During the live, certification badges will appear automatically</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Integration Code</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`// TikTok Shop API Integration
const tiktokShopIntegration = async (apiKey, shopId, productIds) => {
  try {
    const response = await fetch('https://api.halalchain.com/v1/integrations/tiktok/shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${apiKey}\`
      },
      body: JSON.stringify({
        shop_id: shopId,
        product_ids: productIds
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('TikTok Shop integration error:', error);
    throw error;
  }
};`}</code></pre>
            </div>
          </div>
        </div>
      )}
      
      {/* For Developers Tab */}
      {role === 'developer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Developers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">TikTok API Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Integrate HalalChain certification with TikTok's API for seamless product verification.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm"><code>{`// TikTok API Integration with HalalChain
const { TikTokConnector } = require('@halalchain/integrations');

// Initialize the connector
const tiktokConnector = new TikTokConnector({
  apiKey: 'YOUR_HALALCHAIN_API_KEY',
  tiktokAppId: 'YOUR_TIKTOK_APP_ID',
  tiktokAppSecret: 'YOUR_TIKTOK_APP_SECRET'
});

// Sync product certification status
async function syncProductCertification(productId) {
  try {
    // Get certification details from HalalChain
    const certification = await tiktokConnector.getCertification(productId);
    
    // Update product on TikTok Shop
    const result = await tiktokConnector.updateProduct(productId, {
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">Set up webhooks to automatically update TikTok product listings when certification status changes.</p>
            
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
    
    // Update TikTok product listing
    if (certificationStatus === 'approved') {
      await tiktokConnector.enableCertificationBadge(productId);
    } else if (certificationStatus === 'expired' || certificationStatus === 'revoked') {
      await tiktokConnector.disableCertificationBadge(productId);
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete API reference for TikTok integration.</p>
            
            <Link href="/docs/api/tiktok" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
              View API Documentation
              <ExternalLink className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}