'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function WooCommerceIntegration({ role }) {
  return (
    <>
      {/* For Customers Tab */}
      {role === 'customer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Customers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verify Halal Products on WooCommerce Stores</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Look for the HalalChain verification badge on WooCommerce stores to ensure products are certified halal.</p>
            
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">Find halal-certified products easily on WooCommerce stores.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Use the "Halal Certified" filter in the product category sidebar</li>
                <li>Select certification authorities if multiple options are available</li>
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
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Install the HalalChain WooCommerce Plugin</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Our official WooCommerce plugin makes it easy to display your halal certifications.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Go to your WordPress admin dashboard</li>
                <li>Navigate to "Plugins" > "Add New"</li>
                <li>Search for "HalalChain Certification"</li>
                <li>Click "Install Now" and then "Activate"</li>
                <li>Go to "HalalChain" in the sidebar and enter your API key</li>
                <li>Connect your HalalChain vendor account</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customize Your Certification Display</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Choose how certification information appears on your product pages.</p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>In your WordPress admin, go to "HalalChain" > "Display Settings"</li>
                <li>Choose badge style, position, and information to display</li>
                <li>Enable QR code verification if desired</li>
                <li>Configure product filter widgets</li>
                <li>Save your settings and preview on your store</li>
              </ol>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Product Synchronization</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`// Example WooCommerce product meta data
add_action('woocommerce_process_product_meta', 'save_halalchain_certification_data');

function save_halalchain_certification_data($product_id) {
  // Get certification ID from form
  $certification_id = isset($_POST['halalchain_certification_id']) 
    ? sanitize_text_field($_POST['halalchain_certification_id']) 
    : '';
    
  if (!empty($certification_id)) {
    // Save certification ID as product meta
    update_post_meta($product_id, '_halalchain_certification_id', $certification_id);
    
    // Fetch certification details from HalalChain API
    $api_key = get_option('halalchain_api_key');
    $response = wp_remote_get(
      'https://api.halalchain.com/v1/certifications/' . $certification_id,
      array(
        'headers' => array(
          'Authorization' => 'Bearer ' . $api_key
        )
      )
    );
    
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
      $certification = json_decode(wp_remote_retrieve_body($response), true);
      
      // Save certification details as product meta
      update_post_meta($product_id, '_halalchain_certification_status', $certification['status']);
      update_post_meta($product_id, '_halalchain_certification_expiry', $certification['expiryDate']);
      update_post_meta($product_id, '_halalchain_certifier_name', $certification['certifier']['name']);
      update_post_meta($product_id, '_halalchain_verification_url', 'https://verify.halalchain.com/' . $certification_id);
    }
  }
}`}</code></pre>
            </div>
          </div>
        </div>
      )}
      
      {/* For Developers Tab */}
      {role === 'developer' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">For Developers</h3>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">WooCommerce REST API Integration</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Integrate HalalChain certification with WooCommerce's REST API for seamless product verification.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm"><code>{`// WooCommerce REST API Integration with HalalChain
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
const { HalalChainAPI } = require('@halalchain/api-client');

// Initialize WooCommerce API
const wooApi = new WooCommerceRestApi({
  url: 'https://your-store.com',
  consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxx',
  consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxx',
  version: 'wc/v3'
});

// Initialize HalalChain API
const halalChainApi = new HalalChainAPI({
  apiKey: 'YOUR_API_KEY'
});

// Sync certification data for a product
async function syncProductCertification(productId, certificationId) {
  try {
    // Get certification details from HalalChain
    const certification = await halalChainApi.getCertification(certificationId);
    
    // Update product meta data in WooCommerce
    const response = await wooApi.put(\`products/\${productId}\`, {
      meta_data: [
        {
          key: '_halalchain_certification_id',
          value: certification.id
        },
        {
          key: '_halalchain_certification_status',
          value: certification.status
        },
        {
          key: '_halalchain_certification_expiry',
          value: certification.expiryDate
        },
        {
          key: '_halalchain_certifier_name',
          value: certification.certifier.name
        },
        {
          key: '_halalchain_verification_url',
          value: \`https://verify.halalchain.com/\${certification.id}\`
        }
      ]
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to sync certification:', error);
    throw error;
  }
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Custom Shortcodes</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Use these shortcodes to display certification information anywhere on your WordPress site.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm"><code>{`// Register custom shortcodes for HalalChain certification
add_shortcode('halalchain_badge', 'halalchain_badge_shortcode');
add_shortcode('halalchain_certification', 'halalchain_certification_shortcode');
add_shortcode('halalchain_verify', 'halalchain_verify_shortcode');

// Display certification badge
function halalchain_badge_shortcode($atts) {
  $atts = shortcode_atts(array(
    'product_id' => get_the_ID(),
    'size' => 'medium',
    'style' => 'standard'
  ), $atts);
  
  $product_id = $atts['product_id'];
  $certification_id = get_post_meta($product_id, '_halalchain_certification_id', true);
  
  if (!$certification_id) {
    return '';
  }
  
  $status = get_post_meta($product_id, '_halalchain_certification_status', true);
  
  if ($status !== 'approved') {
    return '';
  }
  
  $badge_url = plugin_dir_url(__FILE__) . 'assets/images/badges/' . $atts['style'] . '-' . $atts['size'] . '.png';
  
  return '<div class="halalchain-badge ' . esc_attr($atts['size']) . '">
    <img src="' . esc_url($badge_url) . '" alt="Halal Certified">
  </div>';
}

// Display full certification details
function halalchain_certification_shortcode($atts) {
  $atts = shortcode_atts(array(
    'product_id' => get_the_ID(),
    'show_qr' => 'true'
  ), $atts);
  
  $product_id = $atts['product_id'];
  $certification_id = get_post_meta($product_id, '_halalchain_certification_id', true);
  
  if (!$certification_id) {
    return '';
  }
  
  $status = get_post_meta($product_id, '_halalchain_certification_status', true);
  $expiry = get_post_meta($product_id, '_halalchain_certification_expiry', true);
  $certifier = get_post_meta($product_id, '_halalchain_certifier_name', true);
  $verify_url = get_post_meta($product_id, '_halalchain_verification_url', true);
  
  $output = '<div class="halalchain-certification">';
  $output .= '<h3>Halal Certification</h3>';
  $output .= '<p>Certificate #: ' . esc_html($certification_id) . '</p>';
  $output .= '<p>Status: ' . esc_html(ucfirst($status)) . '</p>';
  $output .= '<p>Certifier: ' . esc_html($certifier) . '</p>';
  $output .= '<p>Valid until: ' . esc_html(date('F j, Y', strtotime($expiry))) . '</p>';
  
  if ($atts['show_qr'] === 'true') {
    $qr_url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' . urlencode($verify_url);
    $output .= '<div class="halalchain-qr"><img src="' . esc_url($qr_url) . '" alt="Verification QR Code"></div>';
  }
  
  $output .= '<p><a href="' . esc_url($verify_url) . '" target="_blank">Verify on Blockchain</a></p>';
  $output .= '</div>';
  
  return $output;
}`}</code></pre>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Complete API reference for WooCommerce integration.</p>
            
            <Link href="/docs/api/woocommerce" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium flex items-center">
              View API Documentation
              <ExternalLink className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}