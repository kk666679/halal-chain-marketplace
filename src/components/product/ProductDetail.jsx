'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SupplyChainTracker } from '../supply-chain/SupplyChainTracker';

const ProductDetail = ({ product }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    id,
    name,
    description,
    price,
    image,
    category,
    vendor,
    certifications,
    ingredients,
    nutritionalInfo,
    supplyChainData,
  } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="relative h-96 w-full rounded-lg overflow-hidden border">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          {/* Certification Badges */}
          {certifications && certifications.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  {cert.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-500 mb-4">{category}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">${price?.toFixed(2)}</span>
            {product.discountPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">${product.discountPrice.toFixed(2)}</span>
            )}
          </div>
          
          {vendor && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">Sold by</p>
              <p className="font-medium">{vendor.name}</p>
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-gray-700">{description}</p>
          </div>
          
          <div className="flex gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
              Add to Cart
            </button>
            <button className="border border-gray-300 hover:border-gray-400 py-2 px-6 rounded-md">
              Save for Later
            </button>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ingredients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('supplyChain')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'supplyChain'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Supply Chain
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'details' && (
              <div>
                <h3 className="font-medium mb-2">Product Details</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>SKU: {product.sku || 'N/A'}</li>
                  <li>Weight: {product.weight || 'N/A'}</li>
                  <li>Dimensions: {product.dimensions || 'N/A'}</li>
                  {nutritionalInfo && Object.entries(nutritionalInfo).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="font-medium mb-2">Ingredients</h3>
                {ingredients && ingredients.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No ingredient information available.</p>
                )}
              </div>
            )}
            
            {activeTab === 'supplyChain' && (
              <div>
                <h3 className="font-medium mb-2">Supply Chain Tracking</h3>
                {supplyChainData ? (
                  <SupplyChainTracker data={supplyChainData} productId={id} />
                ) : (
                  <p className="text-gray-500">No supply chain data available for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;