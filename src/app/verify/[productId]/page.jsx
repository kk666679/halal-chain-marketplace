'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ArrowLeft, 
  Share2, 
  Download, 
  QrCode,
  Truck
} from 'lucide-react';
import QRGenerator from '@/components/supply-chain/qr-tracking/QRGenerator';
import SupplyChainTracker from '@/components/supply-chain/SupplyChainTracker';

// Loading component for Suspense
function VerifyProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Verifying Product...</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Client component that uses useSearchParams
function VerifyProductContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('verification');
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  
  const productId = params.productId;
  const certificationId = searchParams.get('cert');
  const batchNumber = searchParams.get('batch');
  const trackSupplyChain = searchParams.get('track') === 'true';
  
  // Determine region based on certification ID prefix
  const determineRegion = (certId) => {
    if (!certId) return 'asean';
    
    const prefix = certId.substring(0, 3).toUpperCase();
    
    if (['MUI', 'JAK', 'MUI', 'CIC', 'IDP'].includes(prefix)) {
      return 'asean';
    } else if (['CIA', 'NHC', 'XHC'].includes(prefix)) {
      return 'china';
    } else if (['HSC', 'RMC'].includes(prefix)) {
      return 'russia';
    }
    
    return 'asean'; // Default
  };
  
  const region = determineRegion(certificationId);
  
  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on product ID and certification ID
        const mockData = getMockProductData(productId, certificationId, batchNumber, region);
        
        if (!mockData) {
          setError('Product not found or certification invalid');
          setProductData(null);
        } else {
          setProductData(mockData);
          setError(null);
          
          // Set active tab to supply chain if track=true in URL
          if (trackSupplyChain) {
            setActiveTab('supply-chain');
          }
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (productId && certificationId) {
      fetchProductData();
    } else {
      setError('Missing product ID or certification ID');
      setLoading(false);
    }
  }, [productId, certificationId, batchNumber, trackSupplyChain, region]);
  
  // Handle share
  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Halal Verification: ${productData?.name || 'Product'}`,
          text: `Verify the halal certification of ${productData?.name || 'this product'}`,
          url: shareUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Verification link copied to clipboard');
      });
    }
  };
  
  // Get verification status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 border-green-200';
      case 'expired':
        return 'bg-amber-50 border-amber-200';
      case 'invalid':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  // Get verification status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'expired':
        return <AlertTriangle className="h-8 w-8 text-amber-600" />;
      case 'invalid':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-gray-600" />;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Verifying Product...</h1>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg mb-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600 mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-red-800">Verification Failed</h2>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600">
              Please check the product ID and certification ID and try again. If the problem persists, 
              contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!productData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="flex items-center mb-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          
          {/* Product Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">{productData.name}</h1>
                <p className="text-gray-600">{productData.manufacturer}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex gap-3">
                <button 
                  onClick={handleShare}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition flex items-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                
                <button 
                  onClick={() => setShowQRGenerator(!showQRGenerator)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center"
                >
                  <QrCode className="h-5 w-5 mr-2" />
                  {showQRGenerator ? 'Hide QR Code' : 'Generate QR Code'}
                </button>
              </div>
            </div>
            
            {/* Verification Status */}
            <div className={`p-6 border rounded-lg mb-6 ${getStatusColor(productData.verificationStatus)}`}>
              <div className="flex items-center">
                {getStatusIcon(productData.verificationStatus)}
                <div className="ml-4">
                  <h2 className="text-xl font-bold">
                    {productData.verificationStatus === 'valid' && 'Valid Halal Certification'}
                    {productData.verificationStatus === 'expired' && 'Expired Halal Certification'}
                    {productData.verificationStatus === 'invalid' && 'Invalid Halal Certification'}
                  </h2>
                  <p className="text-gray-700">
                    {productData.verificationStatus === 'valid' && 'This product has a valid halal certification that has been verified on the blockchain.'}
                    {productData.verificationStatus === 'expired' && 'This product\'s halal certification has expired. Please check with the manufacturer for updated certification.'}
                    {productData.verificationStatus === 'invalid' && 'This product\'s halal certification could not be verified. Please contact the manufacturer for more information.'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* QR Code Generator */}
            {showQRGenerator && (
              <div className="mb-6">
                <QRGenerator 
                  productId={productId}
                  productName={productData.name}
                  certificationId={certificationId}
                  certifiedBy={productData.certifiedBy}
                  batchNumber={batchNumber}
                />
              </div>
            )}
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap -mb-px">
                <button
                  className={`mr-6 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'verification'
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('verification')}
                >
                  Certification Details
                </button>
                <button
                  className={`mr-6 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'supply-chain'
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('supply-chain')}
                >
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Supply Chain
                  </div>
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'verification' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Product Name</p>
                        <p className="font-medium">{productData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Manufacturer</p>
                        <p className="font-medium">{productData.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Product Category</p>
                        <p className="font-medium">{productData.category}</p>
                      </div>
                      {batchNumber && (
                        <div>
                          <p className="text-sm text-gray-500">Batch Number</p>
                          <p className="font-medium">{batchNumber}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Country of Origin</p>
                        <p className="font-medium">{productData.countryOfOrigin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Certification Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Certification ID</p>
                        <p className="font-medium">{certificationId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Certified By</p>
                        <p className="font-medium">{productData.certifiedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="font-medium">{formatDate(productData.issueDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="font-medium">{formatDate(productData.expiryDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blockchain Verification</p>
                        <p className="font-mono text-xs break-all">{productData.blockchainTxHash}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certification Standards */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Certification Standards</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {productData.standards.map((standard, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>{standard}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'supply-chain' && (
              <SupplyChainTracker 
                productId={productId}
                certificationId={certificationId}
                batchNumber={batchNumber}
                region={region}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component that wraps the client component with Suspense
export default function VerifyProductPage() {
  return (
    <Suspense fallback={<VerifyProductLoading />}>
      <VerifyProductContent />
    </Suspense>
  );
}

// Mock data generator
function getMockProductData(productId, certificationId, batchNumber, region) {
  // Generate different data based on region
  if (region === 'china') {
    return {
      name: 'Halal Beef Products',
      manufacturer: 'Ningxia Halal Food Co.',
      category: 'Meat Products',
      countryOfOrigin: 'China',
      certifiedBy: 'China Islamic Association',
      issueDate: '2023-01-15',
      expiryDate: '2025-01-14',
      verificationStatus: 'valid',
      blockchainTxHash: '0x8f5a4e7d3c2b1a0e9f8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5',
      standards: [
        'Processed according to Islamic dietary laws',
        'Free from pork and alcohol',
        'Segregated production facilities',
        'Halal-certified ingredients',
        'Regular audits by China Islamic Association'
      ]
    };
  } else if (region === 'russia') {
    return {
      name: 'Halal Cosmetics Collection',
      manufacturer: 'Natura Siberica',
      category: 'Personal Care',
      countryOfOrigin: 'Russia',
      certifiedBy: 'Halal Standard Committee (HSC) Russia',
      issueDate: '2023-03-20',
      expiryDate: '2025-03-19',
      verificationStatus: 'valid',
      blockchainTxHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5',
      standards: [
        'Free from alcohol and animal-derived ingredients',
        'No animal testing',
        'Halal-certified manufacturing process',
        'Segregated production facilities',
        'Regular audits by HSC Russia'
      ]
    };
  } else {
    // Default to ASEAN
    return {
      name: 'Organic Halal Chicken',
      manufacturer: 'Pure Poultry Co.',
      category: 'Poultry',
      countryOfOrigin: 'Malaysia',
      certifiedBy: 'JAKIM (Malaysia)',
      issueDate: '2023-05-10',
      expiryDate: '2025-05-09',
      verificationStatus: 'valid',
      blockchainTxHash: '0x6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4',
      standards: [
        'Slaughtered according to Islamic dietary laws',
        'Free-range and organic farming practices',
        'No antibiotics or growth hormones',
        'Halal-certified feed',
        'Regular audits by JAKIM'
      ]
    };
  }
}