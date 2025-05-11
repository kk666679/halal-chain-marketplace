'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Search, Smartphone } from 'lucide-react';
import QRScanner from '@/components/supply-chain/qr-tracking/QRScanner';

export default function VerifySupplyChainPage() {
  const [verificationMethod, setVerificationMethod] = useState('qr');
  const [manualCertId, setManualCertId] = useState('');
  const [manualProductId, setManualProductId] = useState('');
  const [manualBatchNumber, setManualBatchNumber] = useState('');
  const [scanResult, setScanResult] = useState(null);
  
  // Handle QR scan success
  const handleScanSuccess = (result) => {
    setScanResult(result);
    
    // Redirect to verification page after a short delay
    setTimeout(() => {
      window.location.href = result.url;
    }, 2000);
  };
  
  // Handle QR scan error
  const handleScanError = (error) => {
    console.error('QR Scan Error:', error);
  };
  
  // Handle manual verification
  const handleManualVerify = (e) => {
    e.preventDefault();
    
    if (!manualProductId || !manualCertId) {
      alert('Please enter both Product ID and Certification ID');
      return;
    }
    
    // Construct verification URL
    let verifyUrl = `/verify/${manualProductId}?cert=${manualCertId}`;
    
    if (manualBatchNumber) {
      verifyUrl += `&batch=${manualBatchNumber}`;
    }
    
    verifyUrl += '&track=true';
    
    // Redirect to verification page
    window.location.href = verifyUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Navigation */}
          <div className="flex items-center mb-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Verify Halal Supply Chain</h1>
            <p className="text-gray-600 mb-8">
              Verify the authenticity and trace the supply chain journey of halal-certified products from around the world.
            </p>
            
            {/* Verification Method Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-3 px-6 ${
                  verificationMethod === 'qr'
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setVerificationMethod('qr')}
              >
                <div className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  Scan QR Code
                </div>
              </button>
              <button
                className={`py-3 px-6 ${
                  verificationMethod === 'manual'
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setVerificationMethod('manual')}
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Manual Verification
                </div>
              </button>
            </div>
            
            {/* QR Scanner */}
            {verificationMethod === 'qr' && (
              <div>
                <QRScanner 
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                />
                
                {scanResult && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">QR Code Scanned Successfully</h3>
                    <p className="text-gray-600 mb-2">Redirecting to verification page...</p>
                    <div className="animate-pulse bg-green-200 h-1 w-full rounded-full"></div>
                  </div>
                )}
              </div>
            )}
            
            {/* Manual Verification Form */}
            {verificationMethod === 'manual' && (
              <div>
                <form onSubmit={handleManualVerify} className="space-y-6">
                  <div>
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                      Product ID
                    </label>
                    <input
                      type="text"
                      id="productId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter product ID"
                      value={manualProductId}
                      onChange={(e) => setManualProductId(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="certId" className="block text-sm font-medium text-gray-700 mb-1">
                      Certification ID
                    </label>
                    <input
                      type="text"
                      id="certId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter certification ID (e.g., JAKIM12345)"
                      value={manualCertId}
                      onChange={(e) => setManualCertId(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Number (Optional)
                    </label>
                    <input
                      type="text"
                      id="batchNumber"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter batch number (if available)"
                      value={manualBatchNumber}
                      onChange={(e) => setManualBatchNumber(e.target.value)}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                  >
                    Verify Product
                  </button>
                </form>
              </div>
            )}
          </div>
          
          {/* Mobile App Promotion */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6">
                <Smartphone className="h-16 w-16" />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">Get Our Mobile App</h2>
                <p className="mb-4">
                  Scan and verify halal products on the go with our mobile app. Available for iOS and Android.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition">
                    App Store
                  </button>
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition">
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}