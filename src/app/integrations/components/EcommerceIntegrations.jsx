import { FaShopify, FaWordpress, FaAmazon, FaEbay } from 'react-icons/fa';
import { SiTiktok, SiFacebook, SiInstagram } from 'react-icons/si';
import IntegrationCard from './IntegrationCard';

export default function EcommerceIntegrations() {
  const ecommerceIntegrations = [
    {
      name: "Shopify Integration",
      description: "Seamlessly integrate HalalChain certification and tracking into your Shopify store.",
      icon: <FaShopify className="text-green-600 text-2xl" />,
      features: [
        "One-click app installation",
        "Product certification badges",
        "Supply chain transparency for customers",
        "Automated inventory synchronization"
      ],
      documentation: "/docs/integrations/ecommerce/shopify",
      demo: "/demos/shopify-integration",
      version: "v3.2.1"
    },
    {
      name: "WooCommerce Integration",
      description: "Add HalalChain certification features to your WordPress-based WooCommerce store.",
      icon: <FaWordpress className="text-blue-600 text-2xl" />,
      features: [
        "WordPress plugin with visual customization",
        "Product page certification details",
        "QR code generation for verification",
        "Order tracking with blockchain verification"
      ],
      documentation: "/docs/integrations/ecommerce/woocommerce",
      demo: "/demos/woocommerce-integration",
      version: "v2.8.5"
    },
    {
      name: "Amazon Integration",
      description: "Enhance your Amazon listings with verified halal certification information.",
      icon: <FaAmazon className="text-orange-500 text-2xl" />,
      features: [
        "Amazon Seller Central integration",
        "Enhanced brand content with certification",
        "A+ Content certification modules",
        "Automated listing updates"
      ],
      documentation: "/docs/integrations/ecommerce/amazon",
      version: "v2.0.3"
    },
    {
      name: "eBay Integration",
      description: "Display your halal certifications prominently on your eBay product listings.",
      icon: <FaEbay className="text-red-500 text-2xl" />,
      features: [
        "eBay listing certification badges",
        "Automated description updates",
        "Bulk listing certification updates",
        "International certification compliance"
      ],
      documentation: "/docs/integrations/ecommerce/ebay",
      version: "v1.7.2"
    },
    {
      name: "TikTok Shop Integration",
      description: "Connect your halal-certified products to the rapidly growing TikTok Shop platform.",
      icon: <SiTiktok className="text-black text-2xl" />,
      features: [
        "Live shopping certification display",
        "Product catalog synchronization",
        "Creator marketplace collaboration",
        "Real-time inventory management"
      ],
      documentation: "/docs/integrations/ecommerce/tiktok-shop",
      demo: "/demos/tiktok-shop-integration",
      version: "v1.3.0",
      beta: true
    },
    {
      name: "Facebook Marketplace Integration",
      description: "List your halal-certified products on Facebook Marketplace with verification badges.",
      icon: <SiFacebook className="text-blue-600 text-2xl" />,
      features: [
        "Automated marketplace listings",
        "Certification verification for buyers",
        "Messenger integration for inquiries",
        "Community group product sharing"
      ],
      documentation: "/docs/integrations/ecommerce/facebook-marketplace",
      version: "v1.5.1"
    },
    {
      name: "Instagram Shop Integration",
      description: "Create shoppable posts with halal certification information on Instagram.",
      icon: <SiInstagram className="text-pink-600 text-2xl" />,
      features: [
        "Product tagging with certification details",
        "Instagram checkout integration",
        "Story shopping with certification highlights",
        "Influencer product collaboration tools"
      ],
      documentation: "/docs/integrations/ecommerce/instagram-shop",
      version: "v1.2.4",
      beta: true
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {ecommerceIntegrations.map((integration, index) => (
        <IntegrationCard key={index} integration={integration} />
      ))}
    </div>
  );
}