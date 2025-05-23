'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, 
  Award, 
  Truck, 
  Users, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  Download,
  Check,
  Globe
} from 'lucide-react';
import IntegrationCard from '@/components/integrations/IntegrationCard';
import PlatformTabs from '@/components/integrations/PlatformTabs';
import ApiSection from '@/components/integrations/ApiSection';
import IntegrationGuide from '@/components/integrations/IntegrationGuide';

export default function IntegrationsPage() {
  const [activeRole, setActiveRole] = useState('customer');
  const [activePlatform, setActivePlatform] = useState('tiktok');
  
  // Social media platforms
  const socialMediaPlatforms = [
    { id: 'tiktok', name: 'TikTok', icon: '/images/integrations/tiktok-logo.svg' },
    { id: 'facebook', name: 'Facebook', icon: '/images/integrations/facebook-logo.svg' },
    { id: 'instagram', name: 'Instagram', icon: '/images/integrations/instagram-logo.svg' },
    { id: 'twitter', name: 'X (Twitter)', icon: '/images/integrations/twitter-logo.svg' },
    { id: 'linkedin', name: 'LinkedIn', icon: '/images/integrations/linkedin-logo.svg' }
  ];
  
  // E-commerce platforms
  const ecommercePlatforms = [
    // Global platforms
    { id: 'shopify', name: 'Shopify', icon: '/images/integrations/shopify-logo.svg' },
    { id: 'woocommerce', name: 'WooCommerce', icon: '/images/integrations/woocommerce-logo.svg' },
    { id: 'amazon', name: 'Amazon', icon: '/images/integrations/amazon-logo.svg' },
    { id: 'ebay', name: 'eBay', icon: '/images/integrations/ebay-logo.svg' },
    
    // ASEAN platforms
    { id: 'lazada', name: 'Lazada Halal Hub', icon: '/images/integrations/lazada-logo.svg', region: 'asean' },
    { id: 'shopee', name: 'Shopee Halal', icon: '/images/integrations/shopee-logo.svg', region: 'asean' },
    { id: 'tokopedia', name: 'Tokopedia', icon: '/images/integrations/tokopedia-logo.svg', region: 'asean' },
    
    // China platforms
    { id: 'alibaba', name: 'Alibaba.com', icon: '/images/integrations/alibaba-logo.svg', region: 'china' },
    { id: 'jd', name: 'JD.com', icon: '/images/integrations/jd-logo.svg', region: 'china' },
    { id: 'tmall', name: 'Tmall Global', icon: '/images/integrations/tmall-logo.svg', region: 'china' },
    
    // Other platforms
    { id: 'tiktok-shop', name: 'TikTok Shop', icon: '/images/integrations/tiktok-shop-logo.svg' },
    { id: 'facebook-marketplace', name: 'Facebook Marketplace', icon: '/images/integrations/facebook-marketplace-logo.svg' },
    { id: 'instagram-marketplace', name: 'Instagram Marketplace', icon: '/images/integrations/instagram-marketplace-logo.svg' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="integration-hero bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect Your Halal Business Everywhere</h1>
          <p className="text-xl mb-8 max-w-3xl">Seamlessly integrate your halal-certified products across major social media and e-commerce platforms with our blockchain-verified certification system.</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Verified Halal Status</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Real-time Certification Updates</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Supply Chain Transparency</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Multi-platform Support</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="#social-media" className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition">Social Media Integrations</a>
            <a href="#e-commerce" className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition">E-commerce Platforms</a>
            <a href="#developer-api" className="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-medium hover:bg-white/10 transition">Developer API</a>
          </div>
        </div>
      </section>

      {/* Regional Integration Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Regional Halal Market Integration</h2>
              <p className="max-w-2xl">
                Connect with certification bodies, e-commerce platforms, and suppliers across ASEAN, China, and Russia.
              </p>
            </div>
            <Link href="/integrations/regional" className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium hover:bg-gray-100 transition flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Explore Regional Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Selection */}
      <section id="social-media" className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Integration</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">Select your role and platform to get started with our step-by-step integration guides.</p>
          </div>
          
          {/* Role Tabs */}
          <PlatformTabs 
            activeRole={activeRole} 
            setActiveRole={setActiveRole}
          />
          
          {/* Social Media Platforms */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Social Media Platforms</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {socialMediaPlatforms.map((platform) => (
                <IntegrationCard
                  key={platform.id}
                  platform={platform}
                  isActive={activePlatform === platform.id}
                  onClick={() => setActivePlatform(platform.id)}
                />
              ))}
            </div>
          </div>
          
          {/* E-commerce Platforms */}
          <div id="e-commerce">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">E-commerce Platforms</h3>
            
            {/* Global Platforms */}
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Global Platforms</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {ecommercePlatforms
                .filter(platform => !platform.region)
                .map((platform) => (
                  <IntegrationCard
                    key={platform.id}
                    platform={platform}
                    isActive={activePlatform === platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                  />
                ))}
            </div>
            
            {/* ASEAN Platforms */}
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">ASEAN Platforms</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {ecommercePlatforms
                .filter(platform => platform.region === 'asean')
                .map((platform) => (
                  <IntegrationCard
                    key={platform.id}
                    platform={platform}
                    isActive={activePlatform === platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                  />
                ))}
            </div>
            
            {/* China Platforms */}
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">China Platforms</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {ecommercePlatforms
                .filter(platform => platform.region === 'china')
                .map((platform) => (
                  <IntegrationCard
                    key={platform.id}
                    platform={platform}
                    isActive={activePlatform === platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Guide for Selected Platform */}
      <IntegrationGuide 
        platformId={activePlatform} 
        role={activeRole}
        socialMediaPlatforms={socialMediaPlatforms}
        ecommercePlatforms={ecommercePlatforms}
      />

      {/* Developer API Section */}
      <ApiSection />
    </div>
  );
}