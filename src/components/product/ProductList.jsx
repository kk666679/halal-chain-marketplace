'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '../cards/ProductCard';
import Spinner from '../loaders/Spinner';
import SkeletonLoader from '../loaders/SkeletonLoader';

const ProductList = ({ 
  initialProducts = [], 
  isLoading = false, 
  error = null,
  filters = {},
  onFilterChange = () => {},
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedProducts = [...products];
    
    switch (value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  };

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">Error loading products: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <select 
            className="border rounded-md px-3 py-2 text-sm"
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            value={filters.category || ''}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="beverages">Beverages</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="pharmaceuticals">Pharmaceuticals</option>
          </select>
          
          <select 
            className="border rounded-md px-3 py-2 text-sm"
            onChange={(e) => onFilterChange({ ...filters, certification: e.target.value })}
            value={filters.certification || ''}
          >
            <option value="">All Certifications</option>
            <option value="halal">Halal Certified</option>
            <option value="organic">Organic</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>
        
        <div>
          <select 
            className="border rounded-md px-3 py-2 text-sm"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonLoader key={index} type="card" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;