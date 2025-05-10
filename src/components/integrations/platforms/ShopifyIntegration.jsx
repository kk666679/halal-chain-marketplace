'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ShopifyIntegration({ role }) {
  return (
    <>
      {/* For Customers Tab */}
      {role === 'customer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Customers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verify Halal Products on Shopify Stores</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Look for the HalalChain verification badge on Shopify stores to ensure products are certified halal.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Look for the green "Halal Verified" badge on product pages</li>
                <li>Click the badge to view certification details</li>
                <li>Scan the QR code to verify authenticity on the blockchain</li>
                <li>Check expiration date and certification authority</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Filter by Halal Certification</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Find halal-certified products easily on Shopify stores.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Look for the "Halal Certified" filter in the product collection page</li>
                <li>Select the filter to show only halal-certified products</li>
                <li>View certification details on each product page</li>
                <li>Verify certification status before purchasing</li>
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
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Install the HalalChain Shopify App</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Our official Shopify app makes it easy to display your halal certifications.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Go to the Shopify App Store</li>
                <li>Search for "HalalChain Certification"</li>
                <li>Click "Add app" and follow the installation process</li>
                <li>Connect your HalalChain vendor account</li>
                <li>Select which certified products to display badges on</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customize Your Certification Display</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Choose how certification information appears on your product pages.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your Shopify admin, go to "Apps" > "HalalChain Certification"</li>
                <li>Select "Display Settings"</li>
                <li>Choose badge style, position, and information to display</li>
                <li>Enable QR code verification if desired</li>
                <li>Save your settings and preview on your store</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Liquid Template Integration</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`{% if product.metafields.halalchain.certification_id %}
  {% assign certification = product.metafields.halalchain %}
  
  <div class="halal-certification-badge">
    <img src="{{ certification.badge_url }}" alt="Halal Certified">
    <div class="certification-details">
      <p>Certificate #: {{ certification.certification_id }}</p>
      <p>Issued by: {{ certification.certifier_name }}</p>
      <p>Valid until: {{ certification.expiry_date | date: "%b %d, %Y" }}</p>
      <a href="{{ certification.verification_url }}" target="_blank">Verify on Blockchain</a>
    </div>
  </div>
{% endif %}`}</code></pre>
            </div>
          </div>
        </div>
      )}
      
      {/* For Developers Tab */}
      {role === 'developer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Developers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shopify API Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Integrate HalalChain certification with Shopify's API for seamless product verification.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm"><code>{`// Shopify API Integration with HalalChain
const Shopify = require('@shopify/shopify-api');
const { HalalChainAPI } = require('@halalchain/api-client');

// Initialize Shopify API client
const shopify = new Shopify.Clients.Rest({
  shop: 'your-store.myshopify.com',
  accessToken: 'your-shopify-access-token'
});

// Initialize HalalChain API client
const halalChainApi = new HalalChainAPI({
  apiKey: 'YOUR_API_KEY'
});

// Sync certification data for a product
async function syncProductCertification(shopifyProductId, certificationId) {
  try {
    // Get certification details from HalalChain
    const certification = await halalChainApi.getCertification(certificationId);
    
    // Update product metafields in Shopify
    const response = await shopify.put({
      path: 'products/' + shopifyProductId + '/metafields',
      data: {
        metafield: {
          namespace: 'halalchain',
          key: 'certification_id',
          value: certification.id,
          type: 'string'
        }
      }
    });
    
    // Add more metafields for certification details
    await shopify.put({
      path: 'products/' + shopifyProductId + '/metafields',
      data: {
        metafield: {
          namespace: 'halalchain',
          key: 'certification_status',
          value: certification.status,
          type: 'string'
        }
      }
    });
    
    return response.body;
  } catch (error) {
    console.error('Failed to sync certification:', error);
    throw error;
  }
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shopify App Bridge Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Use Shopify's App Bridge to create a seamless app experience.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';

// Initialize App Bridge
const app = createApp({
  apiKey: 'YOUR_SHOPIFY_API_KEY',
  host: window.shopOrigin,
  forceRedirect: true
});

// Get session token for API calls
async function getShopifyToken() {
  return await getSessionToken(app);
}

// Redirect to product page
function redirectToProduct(productId) {
  const redirect = Redirect.create(app);
  redirect.dispatch(Redirect.Action.ADMIN_PATH, {
    path: \`/products/\${productId}\`,
  });
}

// Fetch HalalChain certifications and update Shopify products
async function updateCertifications() {
  const token = await getShopifyToken();
  
  // Make API call to your backend
  const response = await fetch('/api/shopify/sync-certifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  return await response.json();
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete API reference for Shopify integration.</p>
            
            <Link href="/docs/api/shopify" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
              View API Documentation
              <ExternalLink className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}