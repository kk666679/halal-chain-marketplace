'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function EcommercePartners({ region }) {
  // E-commerce platforms by region
  const platforms = {
    asean: [
      {
        id: 'lazada',
        name: 'Lazada Halal Hub',
        logo: '/images/integrations/lazada-logo.svg',
        description: 'Southeast Asia\'s leading halal product marketplace with dedicated halal sections.',
        link: 'https://www.lazada.com/'
      },
      {
        id: 'shopee',
        name: 'Shopee Halal',
        logo: '/images/integrations/shopee-logo.svg',
        description: 'Specialized halal product categories across Malaysia and Indonesia.',
        link: 'https://shopee.com.my/'
      },
      {
        id: 'tokopedia',
        name: 'Tokopedia',
        logo: '/images/integrations/tokopedia-logo.svg',
        description: 'Indonesia\'s largest marketplace with verified halal product sections.',
        link: 'https://www.tokopedia.com/'
      },
      {
        id: 'zalora',
        name: 'Zalora',
        logo: '/images/integrations/zalora-logo.svg',
        description: 'Fashion and lifestyle platform with modest fashion collections.',
        link: 'https://www.zalora.com/'
      }
    ],
    china: [
      {
        id: 'alibaba',
        name: 'Alibaba.com',
        logo: '/images/integrations/alibaba-logo.svg',
        description: 'Global B2B platform with halal-certified suppliers and products.',
        link: 'https://www.alibaba.com/'
      },
      {
        id: 'jd',
        name: 'JD.com',
        logo: '/images/integrations/jd-logo.svg',
        description: 'China\'s leading e-commerce platform with dedicated halal product sections.',
        link: 'https://www.jd.com/'
      },
      {
        id: 'tmall',
        name: 'Tmall Global',
        logo: '/images/integrations/tmall-logo.svg',
        description: 'Cross-border e-commerce platform featuring halal food and cosmetics.',
        link: 'https://www.tmall.com/'
      },
      {
        id: 'taobao',
        name: 'Taobao',
        logo: '/images/integrations/taobao-logo.svg',
        description: 'Consumer-to-consumer platform with halal product categories.',
        link: 'https://www.taobao.com/'
      }
    ],
    russia: [
      {
        id: 'wildberries',
        name: 'Wildberries',
        logo: '/images/integrations/wildberries-logo.svg',
        description: 'Russia\'s largest online retailer with halal product categories.',
        link: 'https://www.wildberries.ru/'
      },
      {
        id: 'ozon',
        name: 'Ozon',
        logo: '/images/integrations/ozon-logo.svg',
        description: 'Major Russian e-commerce platform with halal food and cosmetics.',
        link: 'https://www.ozon.ru/'
      },
      {
        id: 'yandex',
        name: 'Yandex.Market',
        logo: '/images/integrations/yandex-logo.svg',
        description: 'Comparison shopping platform with halal product filters.',
        link: 'https://market.yandex.ru/'
      }
    ]
  };

  const regionPlatforms = platforms[region] || [];
  const regionTitle = region === 'asean' ? 'ASEAN' : region === 'china' ? 'China' : 'Russia';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Halal E-commerce Platforms in {regionTitle}</h2>
      <p className="mb-8 text-gray-600">
        Connect your halal-certified products with these leading e-commerce platforms in {regionTitle} to expand your market reach.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionPlatforms.map((platform) => (
          <div key={platform.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 relative mr-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    {/* Placeholder for logo */}
                    {platform.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{platform.name}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{platform.description}</p>
              
              <div className="flex justify-between items-center">
                <Link 
                  href={platform.link} 
                  target="_blank"
                  className="text-emerald-600 hover:text-emerald-800 flex items-center text-sm font-medium"
                >
                  Visit Platform <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
                
                <Link 
                  href={`/integrations/platforms/${platform.id}`}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Integration Guide
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Integration Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Certification Display</h4>
            <p className="text-sm text-gray-600">Showcase your halal certification directly on product listings.</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Verification Links</h4>
            <p className="text-sm text-gray-600">Allow customers to verify certification authenticity via blockchain.</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-2">Automated Updates</h4>
            <p className="text-sm text-gray-600">Certification status updates automatically sync with listings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}