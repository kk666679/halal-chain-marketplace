'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Using named import from qrcode.react
import { Download, Share2, Settings, Check } from 'lucide-react';

/**
 * QR Code Generator Component for Halal Product Tracking
 * 
 * This component generates QR codes for halal products that link to their
 * certification and supply chain information.
 */
export default function QRGenerator({ 
  productId, 
  productName, 
  certificationId, 
  certifiedBy,
  batchNumber = null,
  includeSupplyChain = true,
  size = 200,
  logoUrl = '/images/logo/halal-chain-logo-small.png'
}) {
  const [qrOptions, setQrOptions] = useState({
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    includeProductInfo: true,
    includeLogo: true,
    errorCorrectionLevel: 'H'
  });
  
  const [showCustomization, setShowCustomization] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);
  
  // Generate the URL for the QR code
  const generateTrackingUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? 
      `${window.location.protocol}//${window.location.host}` : 
      'https://halalchain.market';
    
    let url = `${baseUrl}/verify/${productId}?cert=${certificationId}`;
    
    if (batchNumber) {
      url += `&batch=${batchNumber}`;
    }
    
    if (includeSupplyChain) {
      url += '&track=true';
    }
    
    return url;
  };
  
  const trackingUrl = generateTrackingUrl();
  
  // Handle QR code download
  const handleDownload = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL(`image/${downloadFormat}`);
    const link = document.createElement('a');
    link.href = url;
    link.download = `halal-qr-${productId}${batchNumber ? `-${batchNumber}` : ''}.${downloadFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle URL copy to clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(trackingUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Toggle customization panel
  const toggleCustomization = () => {
    setShowCustomization(!showCustomization);
  };
  
  // Update QR options
  const updateQrOption = (key, value) => {
    setQrOptions({
      ...qrOptions,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Halal Product QR Code</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* QR Code Display */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div 
            ref={qrRef} 
            className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-center"
            style={{ width: size + 32, height: size + 32 }}
          >
            <QRCodeSVG
              value={trackingUrl}
              size={size}
              bgColor={qrOptions.bgColor}
              fgColor={qrOptions.fgColor}
              level={qrOptions.errorCorrectionLevel}
              imageSettings={
                qrOptions.includeLogo ? {
                  src: logoUrl,
                  x: undefined,
                  y: undefined,
                  height: size * 0.2,
                  width: size * 0.2,
                  excavate: true,
                } : undefined
              }
            />
          </div>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={handleDownload}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            
            <button 
              onClick={handleCopyUrl}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition flex items-center"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-1" />
                  Copy URL
                </>
              )}
            </button>
            
            <button 
              onClick={toggleCustomization}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition flex items-center"
            >
              <Settings className="h-4 w-4 mr-1" />
              {showCustomization ? 'Hide' : 'Customize'}
            </button>
          </div>
        </div>
        
        {/* QR Code Info */}
        <div className="flex-grow">
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Product Information</h4>
            <p className="text-gray-600">{productName}</p>
            {batchNumber && (
              <p className="text-sm text-gray-500">Batch: {batchNumber}</p>
            )}
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Certification</h4>
            <p className="text-gray-600">{certificationId}</p>
            <p className="text-sm text-gray-500">Certified by: {certifiedBy}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Tracking URL</h4>
            <p className="text-sm text-gray-600 break-all bg-gray-50 p-2 rounded border border-gray-200">
              {trackingUrl}
            </p>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Scan this QR code to verify the halal certification and view the supply chain journey of this product.</p>
          </div>
        </div>
      </div>
      
      {/* Customization Panel */}
      {showCustomization && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-3">Customize QR Code</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={qrOptions.bgColor}
                  onChange={(e) => updateQrOption('bgColor', e.target.value)}
                  className="h-8 w-8 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={qrOptions.bgColor}
                  onChange={(e) => updateQrOption('bgColor', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foreground Color</label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={qrOptions.fgColor}
                  onChange={(e) => updateQrOption('fgColor', e.target.value)}
                  className="h-8 w-8 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={qrOptions.fgColor}
                  onChange={(e) => updateQrOption('fgColor', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Error Correction Level</label>
              <select
                value={qrOptions.errorCorrectionLevel}
                onChange={(e) => updateQrOption('errorCorrectionLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Download Format</label>
              <select
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="include-logo"
                checked={qrOptions.includeLogo}
                onChange={(e) => updateQrOption('includeLogo', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="include-logo" className="ml-2 block text-sm text-gray-700">
                Include Logo
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}