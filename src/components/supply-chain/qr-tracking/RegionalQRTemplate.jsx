'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Globe, MapPin, Calendar, Shield } from 'lucide-react';

/**
 * Regional QR Template Component
 * 
 * This component provides region-specific QR code templates with
 * appropriate styling, logos, and certification information.
 */
export default function RegionalQRTemplate({
  region,
  productName,
  productId,
  certificationId,
  certifiedBy,
  expiryDate,
  countryOfOrigin,
  size = 200,
  showRegionalBranding = true
}) {
  // Get region-specific styling and content
  const getRegionalConfig = () => {
    switch (region?.toLowerCase()) {
      case 'australia':
        return {
          primaryColor: '#00843D', // Australian green
          secondaryColor: '#FFCD00', // Australian gold
          logo: '/images/regional/australia-halal-logo.png',
          certText: 'Australian Halal Certification',
          borderStyle: 'border-2 border-green-600'
        };
      case 'uae':
      case 'dubai':
        return {
          primaryColor: '#00A19C', // UAE teal
          secondaryColor: '#ED1C24', // UAE red
          logo: '/images/regional/uae-halal-logo.png',
          certText: 'UAE Halal Certification',
          borderStyle: 'border-2 border-teal-600'
        };
      case 'gcc':
        return {
          primaryColor: '#006C35', // GCC green
          secondaryColor: '#8A1538', // GCC maroon
          logo: '/images/regional/gcc-halal-logo.png',
          certText: 'GCC Halal Certification',
          borderStyle: 'border-2 border-green-700'
        };
      case 'china':
        return {
          primaryColor: '#DE2910', // China red
          secondaryColor: '#FFDE00', // China yellow
          logo: '/images/regional/china-halal-logo.png',
          certText: 'China Halal Certification',
          borderStyle: 'border-2 border-red-600'
        };
      case 'russia':
        return {
          primaryColor: '#0039A6', // Russia blue
          secondaryColor: '#D52B1E', // Russia red
          logo: '/images/regional/russia-halal-logo.png',
          certText: 'Russia Halal Certification',
          borderStyle: 'border-2 border-blue-700'
        };
      case 'asean':
      default:
        return {
          primaryColor: '#2D7D46', // ASEAN green
          secondaryColor: '#FFC72C', // ASEAN yellow
          logo: '/images/regional/asean-halal-logo.png',
          certText: 'ASEAN Halal Certification',
          borderStyle: 'border-2 border-green-600'
        };
    }
  };

  const config = getRegionalConfig();
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className={`qr-template-container ${config.borderStyle} rounded-lg p-4 bg-white`}
      style={{ width: size + 64, maxWidth: '100%' }}
    >
      {/* Header */}
      {showRegionalBranding && (
        <div 
          className="qr-header flex items-center justify-between mb-3 pb-2 border-b"
          style={{ borderColor: config.primaryColor }}
        >
          <div className="qr-logo-container h-8 w-8 relative">
            {/* This would be replaced with actual regional logo */}
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: config.primaryColor }}
            >
              {region?.substring(0, 2).toUpperCase() || 'HC'}
            </div>
          </div>
          <div 
            className="qr-cert-text text-sm font-medium"
            style={{ color: config.primaryColor }}
          >
            {config.certText}
          </div>
        </div>
      )}
      
      {/* Product Info */}
      <div className="qr-product-info mb-3">
        <h3 className="text-sm font-bold truncate" title={productName}>
          {productName}
        </h3>
        <div className="text-xs text-gray-600 flex items-center mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          {countryOfOrigin || 'Origin not specified'}
        </div>
      </div>
      
      {/* QR Placeholder - This would be replaced with actual QR code */}
      <div className="qr-code-container flex justify-center mb-3">
        <div 
          className="border border-gray-300 rounded"
          style={{ 
            width: size, 
            height: size, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: '#666'
          }}
        >
          QR Code Placeholder
        </div>
      </div>
      
      {/* Certification Info */}
      <div className="qr-cert-info text-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            <span className="text-gray-600">Cert ID:</span>
          </div>
          <span className="font-medium">{certificationId}</span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            <span className="text-gray-600">Certified By:</span>
          </div>
          <span className="font-medium truncate" style={{ maxWidth: '150px' }} title={certifiedBy}>
            {certifiedBy}
          </span>
        </div>
        {expiryDate && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span className="text-gray-600">Valid Until:</span>
            </div>
            <span className="font-medium">{formatDate(expiryDate)}</span>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div 
        className="qr-footer mt-3 pt-2 border-t text-center text-xs"
        style={{ borderColor: config.primaryColor }}
      >
        <span style={{ color: config.primaryColor }}>
          Scan to verify authenticity
        </span>
      </div>
    </div>
  );
}