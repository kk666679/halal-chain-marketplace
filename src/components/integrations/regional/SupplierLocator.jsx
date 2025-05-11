'use client';

import React, { useState } from 'react';
import { MapPin, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function SupplierLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock supplier data
  const suppliers = [
    // ASEAN Suppliers
    { 
      id: 1, 
      name: 'Indofood Sukses Makmur', 
      region: 'asean', 
      country: 'Indonesia',
      city: 'Jakarta',
      category: 'food',
      products: ['Instant Noodles', 'Snacks', 'Seasonings'],
      certification: 'MUI',
      verified: true
    },
    { 
      id: 2, 
      name: 'Marrybrown', 
      region: 'asean', 
      country: 'Malaysia',
      city: 'Johor Bahru',
      category: 'food',
      products: ['Fast Food', 'Fried Chicken'],
      certification: 'JAKIM',
      verified: true
    },
    { 
      id: 3, 
      name: 'Wardah Cosmetics', 
      region: 'asean', 
      country: 'Indonesia',
      city: 'Jakarta',
      category: 'cosmetics',
      products: ['Skincare', 'Makeup', 'Personal Care'],
      certification: 'MUI',
      verified: true
    },
    { 
      id: 4, 
      name: 'Thai Halal Food', 
      region: 'asean', 
      country: 'Thailand',
      city: 'Bangkok',
      category: 'food',
      products: ['Frozen Food', 'Snacks', 'Beverages'],
      certification: 'CICOT',
      verified: true
    },
    
    // China Suppliers
    { 
      id: 5, 
      name: 'Ningxia Halal Food Co.', 
      region: 'china', 
      country: 'China',
      city: 'Yinchuan',
      category: 'food',
      products: ['Beef Products', 'Lamb Products', 'Frozen Meals'],
      certification: 'China Islamic Association',
      verified: true
    },
    { 
      id: 6, 
      name: 'Xinjiang Halal Meat Processing', 
      region: 'china', 
      country: 'China',
      city: 'Urumqi',
      category: 'food',
      products: ['Halal Meat', 'Processed Meat Products'],
      certification: 'Xinjiang HCC',
      verified: true
    },
    { 
      id: 7, 
      name: 'Sufex Food Co.', 
      region: 'china', 
      country: 'China',
      city: 'Shanghai',
      category: 'food',
      products: ['Frozen Meals', 'Ready-to-eat Products'],
      certification: 'China Islamic Association',
      verified: true
    },
    
    // Russia Suppliers
    { 
      id: 8, 
      name: 'Miratorg', 
      region: 'russia', 
      country: 'Russia',
      city: 'Moscow',
      category: 'food',
      products: ['Halal Beef', 'Halal Poultry'],
      certification: 'HSC Russia',
      verified: true
    },
    { 
      id: 9, 
      name: 'Al-Rayah Fashion', 
      region: 'russia', 
      country: 'Russia',
      city: 'Kazan',
      category: 'fashion',
      products: ['Modest Fashion', 'Hijabs', 'Islamic Clothing'],
      certification: 'HSC Russia',
      verified: true
    },
    { 
      id: 10, 
      name: 'Natura Siberica Halal', 
      region: 'russia', 
      country: 'Russia',
      city: 'Moscow',
      category: 'cosmetics',
      products: ['Organic Skincare', 'Halal Cosmetics'],
      certification: 'HSC Russia',
      verified: false
    }
  ];
  
  // Filter suppliers based on search term, region, and category
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = searchTerm === '' || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase())) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || supplier.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Beverages' },
    { id: 'cosmetics', name: 'Cosmetics & Personal Care' },
    { id: 'fashion', name: 'Fashion & Textiles' },
    { id: 'pharmaceutical', name: 'Pharmaceutical' }
  ];
  
  // Regions
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'asean', name: 'ASEAN' },
    { id: 'china', name: 'China' },
    { id: 'russia', name: 'Russia' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Halal Supplier Locator</h2>
      <p className="mb-6 text-gray-600">
        Find verified halal-certified suppliers across ASEAN, China, and Russia.
      </p>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers, products, or locations..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
          </button>
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:flex gap-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Map Placeholder */}
      <div className="mb-8 bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <p className="text-gray-500">Interactive supplier map would be displayed here</p>
          <p className="text-sm text-gray-400">Showing {filteredSuppliers.length} suppliers</p>
        </div>
      </div>
      
      {/* Supplier List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Verified Suppliers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{supplier.name}</h4>
                  {supplier.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {supplier.city}, {supplier.country}
                </div>
                
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-500">Products:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {supplier.products.map((product, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                    {supplier.certification}
                  </span>
                  
                  <button className="text-sm text-emerald-600 hover:text-emerald-800">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredSuppliers.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">
              No suppliers found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}