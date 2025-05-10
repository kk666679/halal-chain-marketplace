'use client';

import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    certification: '',
    vendor: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (isAdvancedSearch) {
      onSearch({
        searchTerm,
        ...advancedFilters,
      });
    } else {
      onSearch({ searchTerm });
    }
  };

  const handleAdvancedFilterChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFilters({
      ...advancedFilters,
      [name]: value,
    });
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="p-3 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div className="mt-2">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          >
            {isAdvancedSearch ? 'Hide advanced search' : 'Advanced search'}
          </button>
        </div>

        {isAdvancedSearch && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={advancedFilters.category}
                onChange={handleAdvancedFilterChange}
              >
                <option value="">All Categories</option>
                <option value="food">Food</option>
                <option value="beverages">Beverages</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="pharmaceuticals">Pharmaceuticals</option>
              </select>
            </div>

            <div>
              <label htmlFor="certification" className="block text-sm font-medium text-gray-700 mb-1">
                Certification
              </label>
              <select
                id="certification"
                name="certification"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={advancedFilters.certification}
                onChange={handleAdvancedFilterChange}
              >
                <option value="">All Certifications</option>
                <option value="halal">Halal Certified</option>
                <option value="organic">Organic</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor
              </label>
              <input
                type="text"
                id="vendor"
                name="vendor"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Vendor name"
                value={advancedFilters.vendor}
                onChange={handleAdvancedFilterChange}
              />
            </div>

            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Min price"
                value={advancedFilters.minPrice}
                onChange={handleAdvancedFilterChange}
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                placeholder="Max price"
                value={advancedFilters.maxPrice}
                onChange={handleAdvancedFilterChange}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductSearch;