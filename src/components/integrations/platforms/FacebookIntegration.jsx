'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function FacebookIntegration({ role }) {
  return (
    <>
      {/* For Customers Tab */}
      {role === 'customer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Customers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verify Halal Products on Facebook</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Look for the HalalChain verification badge on Facebook Shop products to ensure they're certified halal.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Look for the green "Halal Verified" badge on product listings</li>
                <li>Click the badge to view certification details</li>
                <li>Scan the QR code to verify authenticity on the blockchain</li>
                <li>Check expiration date and certification authority</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Share Verified Products</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Share halal-certified products with your friends and family on Facebook.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Find a halal-verified product on Facebook Shop</li>
                <li>Click the "Share" button</li>
                <li>Select "Share with certification details"</li>
                <li>Add your own message and post to your timeline or send via Messenger</li>
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
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Connect Your Facebook Shop</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Link your Facebook Shop to automatically display halal certification on your products.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Log in to your HalalChain vendor dashboard</li>
                <li>Navigate to "Integrations" > "Facebook"</li>
                <li>Click "Connect Facebook Shop"</li>
                <li>Authorize the HalalChain app</li>
                <li>Select which certified products to display on Facebook</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Facebook Marketplace Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Showcase your halal certification on Facebook Marketplace listings.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your HalalChain dashboard, go to "Marketplace Settings"</li>
                <li>Enable "Facebook Marketplace Integration"</li>
                <li>Choose which certified products to list on Marketplace</li>
                <li>Select certification badge style and position</li>
                <li>Save your settings and publish your listings</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Facebook Pixel Integration</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`<!-- Facebook Pixel Code with HalalChain Certification Events -->
<script>
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
    
    // Track halal certification verification events
    document.addEventListener('HalalCertificationVerified', function(e) {
      fbq('track', 'HalalCertificationVerified', {
        certification_id: e.detail.certificationId,
        product_id: e.detail.productId,
        verification_method: e.detail.method
      });
    });
</script>
<noscript>
  <img height="1" width="1" src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->`}</code></pre>
            </div>
          </div>
        </div>
      )}
      
      {/* For Developers Tab */}
      {role === 'developer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Developers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Facebook Graph API Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Integrate HalalChain certification with Facebook's Graph API for seamless product verification.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm"><code>{`// Facebook Graph API Integration with HalalChain
const axios = require('axios');
const { HalalChainAPI } = require('@halalchain/api-client');

// Initialize HalalChain API client
const halalChainApi = new HalalChainAPI({
  apiKey: 'YOUR_API_KEY'
});

// Update Facebook product catalog with certification data
async function updateFacebookProductCertification(facebookProductId, certificationId) {
  try {
    // Get certification details from HalalChain
    const certification = await halalChainApi.getCertification(certificationId);
    
    // Prepare custom data for Facebook product
    const customData = {
      certification_id: certification.id,
      certification_status: certification.status,
      certification_authority: certification.certifier.name,
      expiry_date: certification.expiryDate,
      verification_url: \`https://verify.halalchain.com/\${certification.id}\`
    };
    
    // Update Facebook product using Graph API
    const response = await axios({
      method: 'post',
      url: \`https://graph.facebook.com/v16.0/\${facebookProductId}\`,
      params: {
        access_token: 'YOUR_FACEBOOK_ACCESS_TOKEN'
      },
      data: {
        custom_data: customData
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to update Facebook product:', error);
    throw error;
  }
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Facebook Catalog Batch API</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Use Facebook's Catalog Batch API to update multiple products at once.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`// Batch update multiple products with certification data
async function batchUpdateFacebookProducts(catalogId, productCertifications) {
  try {
    // Prepare batch requests
    const requests = [];
    
    for (const item of productCertifications) {
      const { facebookProductId, certificationId } = item;
      
      // Get certification details from HalalChain
      const certification = await halalChainApi.getCertification(certificationId);
      
      requests.push({
        method: 'UPDATE',
        retailer_id: facebookProductId,
        data: {
          custom_data: {
            certification_id: certification.id,
            certification_status: certification.status,
            certification_authority: certification.certifier.name,
            expiry_date: certification.expiryDate,
            verification_url: \`https://verify.halalchain.com/\${certification.id}\`
          }
        }
      });
    }
    
    // Send batch request to Facebook
    const response = await axios({
      method: 'post',
      url: \`https://graph.facebook.com/v16.0/\${catalogId}/batch\`,
      params: {
        access_token: 'YOUR_FACEBOOK_ACCESS_TOKEN'
      },
      data: {
        requests: JSON.stringify(requests)
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to batch update Facebook products:', error);
    throw error;
  }
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete API reference for Facebook integration.</p>
            
            <Link href="/docs/api/facebook" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
              View API Documentation
              <ExternalLink className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}