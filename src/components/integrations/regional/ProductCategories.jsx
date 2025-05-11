'use client';

import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductCategories({ region }) {
  const [activeCategory, setActiveCategory] = useState('food');
  
  // Region-specific product examples
  const products = {
    asean: {
      food: [
        { name: 'Sappe Fruit Juice', company: 'Sappe', country: 'Thailand', certification: 'CICOT' },
        { name: 'Indomie Instant Noodles', company: 'Indofood', country: 'Indonesia', certification: 'MUI' },
        { name: 'Ramly Burger Patties', company: 'Ramly Food', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Malagos Chocolate', company: 'Malagos Agri-Ventures', country: 'Philippines', certification: 'IDCP' }
      ],
      cosmetics: [
        { name: 'Wardah Cosmetics', company: 'Paragon Technology', country: 'Indonesia', certification: 'MUI' },
        { name: 'SimplySiti', company: 'SimplySiti', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Safi', company: 'Safi Research Institute', country: 'Malaysia', certification: 'JAKIM' }
      ],
      pharmaceutical: [
        { name: 'Hovid Supplements', company: 'Hovid Berhad', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Blackmores Halal Vitamins', company: 'Blackmores', country: 'Singapore', certification: 'MUIS' }
      ],
      finance: [
        { name: 'Bank Islam', company: 'Bank Islam Malaysia', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Maybank Islamic', company: 'Maybank', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Bank Muamalat', company: 'Bank Muamalat Indonesia', country: 'Indonesia', certification: 'MUI' }
      ],
      travel: [
        { name: 'AirAsia Halal Meals', company: 'AirAsia', country: 'Malaysia', certification: 'JAKIM' },
        { name: 'Al Meroz Hotel', company: 'Al Meroz', country: 'Thailand', certification: 'CICOT' },
        { name: 'Sofyan Hotels', company: 'Sofyan Hotels', country: 'Indonesia', certification: 'MUI' }
      ]
    },
    china: {
      food: [
        { name: 'Sufex Frozen Meals', company: 'Sufex Food Co.', country: 'China', certification: 'CIA' },
        { name: 'Xingjiang Dried Fruits', company: 'Xinjiang Specialty Foods', country: 'China', certification: 'Xinjiang HCC' },
        { name: 'Ningxia Wolfberry Products', company: 'Ningxia Superfood Co.', country: 'China', certification: 'Ningxia HCC' }
      ],
      cosmetics: [
        { name: 'MiniSo Halal Line', company: 'MiniSo', country: 'China', certification: 'CIA' },
        { name: 'Herborist Halal Skincare', company: 'Herborist', country: 'China', certification: 'CIA' }
      ],
      pharmaceutical: [
        { name: 'Traditional Chinese Medicine (Halal)', company: 'Beijing TCM Group', country: 'China', certification: 'CIA' },
        { name: 'Halal Herbal Supplements', company: 'Ningxia Health Products', country: 'China', certification: 'Ningxia HCC' }
      ]
    },
    russia: {
      food: [
        { name: 'Halal Beef Products', company: 'Miratorg', country: 'Russia', certification: 'HSC' },
        { name: 'Halal Chicken', company: 'Cherkizovo Group', country: 'Russia', certification: 'HSC' },
        { name: 'Halal Confectionery', company: 'Udarnitsa', country: 'Russia', certification: 'HSC' }
      ],
      fashion: [
        { name: 'Modest Fashion Collection', company: 'Al-Rayah', country: 'Russia', certification: 'HSC' },
        { name: 'Hijab Collection', company: 'Irada', country: 'Russia', certification: 'HSC' }
      ],
      cosmetics: [
        { name: 'Halal Cosmetics Line', company: 'Natura Siberica', country: 'Russia', certification: 'HSC' },
        { name: 'Organic Halal Skincare', company: 'Mirrolla', country: 'Russia', certification: 'HSC' }
      ]
    }
  };

  // Categories by region
  const categories = {
    asean: [
      { id: 'food', name: 'Food & Beverages' },
      { id: 'cosmetics', name: 'Cosmetics & Personal Care' },
      { id: 'pharmaceutical', name: 'Pharmaceutical & Health' },
      { id: 'finance', name: 'Islamic Finance' },
      { id: 'travel', name: 'Travel & Hospitality' }
    ],
    china: [
      { id: 'food', name: 'Food & Beverages' },
      { id: 'cosmetics', name: 'Cosmetics & Personal Care' },
      { id: 'pharmaceutical', name: 'Pharmaceutical & Health' }
    ],
    russia: [
      { id: 'food', name: 'Food & Beverages' },
      { id: 'fashion', name: 'Modest Fashion' },
      { id: 'cosmetics', name: 'Cosmetics & Personal Care' }
    ]
  };

  const regionCategories = categories[region] || [];
  const regionProducts = products[region] || {};
  const categoryProducts = regionProducts[activeCategory] || [];
  const regionTitle = region === 'asean' ? 'ASEAN' : region === 'china' ? 'China' : 'Russia';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Halal Products & Services in {regionTitle}</h2>
      <p className="mb-8 text-gray-600">
        Explore popular halal-certified products and services from {regionTitle} that are available on our marketplace.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {regionCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category.id
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Product Name</th>
              <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Company</th>
              <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Country</th>
              <th className="py-3 px-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Certification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categoryProducts.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-4 font-medium">{product.name}</td>
                <td className="py-4 px-4">{product.company}</td>
                <td className="py-4 px-4">{product.country}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.certification}
                  </span>
                </td>
              </tr>
            ))}
            {categoryProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No products available in this category for {regionTitle}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Become a Supplier</h3>
        <p className="text-gray-600 mb-4">
          Are you a halal-certified supplier from {regionTitle}? Join our marketplace to reach global customers.
        </p>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
          Register as Supplier
        </button>
      </div>
    </div>
  );
}