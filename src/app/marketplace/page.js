"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with an actual API call
    const mockProducts = [
      {
        id: 1,
        name: 'Premium Halal Beef',
        description: 'Grass-fed, ethically raised beef with full halal certification',
        price: 15.99,
        category: 'meat',
        vendor: 'Al-Baraka Farms',
        rating: 4.8,
        reviewCount: 124,
        image: '/images/products/beef.png',
        isCertified: true,
        stock: 50
      },
      {
        id: 2,
        name: 'Organic Halal Chicken',
        description: 'Free-range organic chicken processed according to halal standards',
        price: 9.99,
        category: 'meat',
        vendor: 'Pure Poultry Co.',
        rating: 4.6,
        reviewCount: 89,
        image: '/images/products/chicken.png',
        isCertified: true,
        stock: 75
      },
      {
        id: 3,
        name: 'Halal Lamb Cuts',
        description: 'Premium lamb cuts from certified halal sources',
        price: 18.99,
        category: 'meat',
        vendor: 'Green Meadows',
        rating: 4.7,
        reviewCount: 56,
        image: '/images/products/lamb.png',
        isCertified: true,
        stock: 30
      },
      {
        id: 4,
        name: 'Organic Dates',
        description: 'Premium organic dates from sustainable farms',
        price: 12.99,
        category: 'fruits',
        vendor: 'Oasis Farms',
        rating: 4.9,
        reviewCount: 203,
        image: '/images/products/dates.png',
        isCertified: true,
        stock: 100
      },
      {
        id: 5,
        name: 'Halal Gummy Candies',
        description: 'Gelatin-free gummy candies suitable for halal diets',
        price: 3.99,
        category: 'snacks',
        vendor: 'Sweet Delights',
        rating: 4.5,
        reviewCount: 78,
        image: '/images/products/gummies.png',
        isCertified: true,
        stock: 200
      },
      {
        id: 6,
        name: 'Halal Certified Honey',
        description: 'Pure, raw honey from certified halal apiaries',
        price: 8.99,
        category: 'condiments',
        vendor: 'Nature\'s Gold',
        rating: 4.8,
        reviewCount: 112,
        image: '/images/products/honey.png',
        isCertified: true,
        stock: 60
      }
    ];
    
    const mockCategories = [
      { id: 'all', name: 'All Categories' },
      { id: 'meat', name: 'Meat & Poultry' },
      { id: 'dairy', name: 'Dairy Products' },
      { id: 'fruits', name: 'Fruits & Vegetables' },
      { id: 'snacks', name: 'Snacks & Confectionery' },
      { id: 'condiments', name: 'Condiments & Spices' },
      { id: 'beverages', name: 'Beverages' }
    ];
    
    setProducts(mockProducts);
    setCategories(mockCategories);
    setLoading(false);
  }, []);
  
  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      // Default: popularity (by review count)
      return b.reviewCount - a.reviewCount;
    }
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HalalChain Marketplace</h1>
          <p className="text-lg mb-6">Discover authentic halal products with blockchain-verified certification</p>
          
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden p-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search for products, categories, or vendors..."
              className="flex-grow px-4 py-2 focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-green-600 text-white p-2 rounded-full">
              <FaSearch size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category.id ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sort By */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sort By</h3>
              <select
                className="w-full p-2 border rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            {/* Certification Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Certification</h3>
              <div className="flex items-center">
                <input type="checkbox" id="certified" className="mr-2" defaultChecked />
                <label htmlFor="certified">Halal Certified Only</label>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-4">
            <button 
              className="flex items-center justify-center w-full bg-white p-3 rounded-lg shadow-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filters & Sorting
            </button>
            
            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow-md mt-2">
                {/* Categories */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sort By */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <select
                    className="w-full p-2 border rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                
                {/* Certification Filter */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Certification</h3>
                  <div className="flex items-center">
                    <input type="checkbox" id="certified-mobile" className="mr-2" defaultChecked />
                    <label htmlFor="certified-mobile">Halal Certified Only</label>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-green-600 text-white py-2 rounded"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600">{sortedProducts.length} products</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{objectFit: "cover"}}
                        />
                        {product.isCertified && (
                          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <FaCheckCircle className="mr-1" />
                            Certified
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.vendor}</p>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-yellow-500 mr-2">
                            <FaStar />
                            <span className="ml-1 text-gray-700">{product.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full flex items-center">
                            <FaShoppingCart className="mr-1" />
                            Add
                          </button>
                        </div>
                      </div>
                      
                      <Link href={`/product/${product.id}`} className="block bg-gray-50 text-center py-2 text-green-600 hover:bg-gray-100 transition-colors duration-300">
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}