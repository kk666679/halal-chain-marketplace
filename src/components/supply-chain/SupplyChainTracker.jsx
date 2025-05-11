'use client';

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Factory, 
  Package, 
  Store, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  FileText,
  Shield
} from 'lucide-react';
import Link from 'next/link';

/**
 * Supply Chain Tracker Component
 * 
 * This component visualizes the supply chain journey of a halal product,
 * showing each step from production to retail with verification status.
 */
export default function SupplyChainTracker({ 
  productId, 
  certificationId,
  batchNumber = null,
  region = null
}) {
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);
  
  // Fetch supply chain data
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchSupplyChainData = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on region
        let mockData;
        
        if (region === 'china') {
          mockData = getMockChinaSupplyChain(productId, certificationId, batchNumber);
        } else if (region === 'russia') {
          mockData = getMockRussiaSupplyChain(productId, certificationId, batchNumber);
        } else {
          // Default to ASEAN
          mockData = getMockAseanSupplyChain(productId, certificationId, batchNumber);
        }
        
        setSupplyChainData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching supply chain data:', err);
        setError('Failed to load supply chain data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSupplyChainData();
  }, [productId, certificationId, batchNumber, region]);
  
  // Toggle expanded step
  const toggleStep = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };
  
  // Get icon for step type
  const getStepIcon = (type) => {
    switch (type) {
      case 'production':
        return <Factory className="h-6 w-6" />;
      case 'processing':
        return <Package className="h-6 w-6" />;
      case 'transportation':
        return <Truck className="h-6 w-6" />;
      case 'distribution':
        return <Store className="h-6 w-6" />;
      case 'certification':
        return <Shield className="h-6 w-6" />;
      default:
        return <Package className="h-6 w-6" />;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Supply Chain Tracker</h3>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Supply Chain Tracker</h3>
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }
  
  if (!supplyChainData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">Supply Chain Tracker</h3>
      <p className="text-gray-600 mb-6">
        Track the journey of this halal product from production to distribution.
      </p>
      
      {/* Product Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Product</h4>
            <p className="font-medium">{supplyChainData.productName}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Certification</h4>
            <p className="font-medium">{supplyChainData.certificationId}</p>
          </div>
          {batchNumber && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Batch</h4>
              <p className="font-medium">{batchNumber}</p>
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Certified By</h4>
            <p className="font-medium">{supplyChainData.certifiedBy}</p>
          </div>
        </div>
      </div>
      
      {/* Supply Chain Timeline */}
      <div className="relative">
        {supplyChainData.steps.map((step, index) => (
          <div key={step.id} className="mb-4">
            {/* Timeline connector */}
            {index < supplyChainData.steps.length - 1 && (
              <div 
                className="absolute left-6 ml-px border-l-2 border-dashed border-gray-300" 
                style={{ 
                  top: `${index * 100 + 40}px`, 
                  height: expandedStep === step.id ? '120px' : '80px' 
                }}
              ></div>
            )}
            
            {/* Step card */}
            <div className="relative">
              <div 
                className={`p-4 border rounded-lg ${
                  step.status === 'verified' 
                    ? 'border-green-200 bg-green-50' 
                    : step.status === 'pending'
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start">
                  {/* Step icon */}
                  <div className={`p-2 rounded-full mr-4 ${
                    step.status === 'verified' 
                      ? 'bg-green-100 text-green-700' 
                      : step.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {getStepIcon(step.type)}
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{step.name}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(step.status)}
                        <span className="ml-1 text-sm font-medium">
                          {step.status === 'verified' 
                            ? 'Verified' 
                            : step.status === 'pending'
                            ? 'Pending'
                            : 'Warning'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Basic info always visible */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(step.date)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {step.location}
                      </div>
                    </div>
                    
                    {/* Toggle button */}
                    <button 
                      onClick={() => toggleStep(step.id)}
                      className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {expandedStep === step.id ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show Details
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Expanded details */}
                {expandedStep === step.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {step.company && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500">Company</h5>
                          <p>{step.company}</p>
                        </div>
                      )}
                      {step.facility && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500">Facility</h5>
                          <p>{step.facility}</p>
                        </div>
                      )}
                      {step.certifications && step.certifications.length > 0 && (
                        <div className="md:col-span-2">
                          <h5 className="text-sm font-medium text-gray-500">Certifications</h5>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {step.certifications.map((cert, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {step.verifiedBy && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500">Verified By</h5>
                          <p>{step.verifiedBy}</p>
                        </div>
                      )}
                      {step.blockchainTxHash && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-500">Blockchain Verification</h5>
                          <p className="text-xs font-mono break-all">{step.blockchainTxHash}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Documents Section */}
      <div className="mt-8">
        <button
          onClick={() => setShowDocuments(!showDocuments)}
          className="flex items-center justify-between w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
        >
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-700" />
            <span className="font-medium">Related Documents</span>
          </div>
          {showDocuments ? (
            <ChevronUp className="h-5 w-5 text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-700" />
          )}
        </button>
        
        {showDocuments && (
          <div className="mt-4 space-y-3">
            {supplyChainData.documents.map((doc, index) => (
              <Link 
                key={index}
                href={doc.url}
                target="_blank"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-grow">
                  <h5 className="font-medium">{doc.name}</h5>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>This supply chain information is verified and stored on the blockchain for transparency and authenticity.</p>
      </div>
    </div>
  );
}

// Mock data generators for different regions
function getMockAseanSupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Organic Halal Chicken',
    certificationId,
    certifiedBy: 'JAKIM (Malaysia)',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Farm Production',
        description: 'Free-range chicken farming with halal practices',
        date: '2023-10-15',
        location: 'Johor, Malaysia',
        company: 'Green Valley Farms',
        facility: 'Johor Farming Complex',
        certifications: ['Organic Certified', 'Animal Welfare Approved'],
        verifiedBy: 'JAKIM Inspector #45892',
        blockchainTxHash: '0x8f5a4e7d3c2b1a0e9f8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5',
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Halal Processing',
        description: 'Slaughtering and processing according to Islamic law',
        date: '2023-10-18',
        location: 'Kuala Lumpur, Malaysia',
        company: 'Pure Poultry Processing',
        facility: 'KL Halal Processing Center',
        certifications: ['JAKIM Halal Certified', 'ISO 22000'],
        verifiedBy: 'JAKIM Inspector #32145',
        blockchainTxHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5',
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'transportation',
        name: 'Cold Chain Transport',
        description: 'Temperature-controlled transportation to distribution center',
        date: '2023-10-20',
        location: 'Penang, Malaysia',
        company: 'Cool Transit Logistics',
        facility: 'Refrigerated Fleet #12',
        certifications: ['Halal Logistics Certified', 'HACCP Compliant'],
        verifiedBy: 'JAKIM Logistics Inspector #78901',
        blockchainTxHash: '0x6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4',
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'distribution',
        name: 'Distribution Center',
        description: 'Quality check and preparation for retail distribution',
        date: '2023-10-22',
        location: 'Singapore',
        company: 'MUIS Halal Distribution',
        facility: 'Singapore Halal Hub',
        certifications: ['MUIS Halal Certified', 'ISO 9001'],
        verifiedBy: 'MUIS Inspector #56789',
        blockchainTxHash: '0x5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3',
        status: 'verified'
      }
    ],
    documents: [
      {
        name: 'Halal Certificate - JAKIM',
        description: 'Official halal certification document',
        url: '#'
      },
      {
        name: 'Product Specification Sheet',
        description: 'Detailed product specifications and ingredients',
        url: '#'
      },
      {
        name: 'Supply Chain Verification Report',
        description: 'Third-party verification of supply chain integrity',
        url: '#'
      },
      {
        name: 'Blockchain Verification Record',
        description: 'Immutable record of product journey on blockchain',
        url: '#'
      }
    ]
  };
}

function getMockChinaSupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Halal Beef Products',
    certificationId,
    certifiedBy: 'China Islamic Association',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Cattle Farming',
        description: 'Ethically raised cattle in compliance with halal standards',
        date: '2023-11-05',
        location: 'Ningxia, China',
        company: 'Ningxia Halal Cattle Farm',
        facility: 'Yinchuan Farming Base',
        certifications: ['Ningxia Halal Certified', 'Good Agricultural Practices'],
        verifiedBy: 'China Islamic Association Inspector #12345',
        blockchainTxHash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7',
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Halal Slaughtering',
        description: 'Slaughtering according to Islamic requirements',
        date: '2023-11-10',
        location: 'Ningxia, China',
        company: 'Ningxia Halal Meat Processing',
        facility: 'Yinchuan Processing Plant',
        certifications: ['China Islamic Association Certified', 'ISO 22000'],
        verifiedBy: 'China Islamic Association Inspector #67890',
        blockchainTxHash: '0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d',
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'processing',
        name: 'Product Manufacturing',
        description: 'Processing into final beef products',
        date: '2023-11-12',
        location: 'Ningxia, China',
        company: 'Ningxia Halal Food Co.',
        facility: 'Product Manufacturing Plant',
        certifications: ['Halal Food Production Certified', 'HACCP Compliant'],
        verifiedBy: 'China Islamic Association Inspector #24680',
        blockchainTxHash: '0x7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c',
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'transportation',
        name: 'Domestic Transport',
        description: 'Transportation to distribution centers across China',
        date: '2023-11-15',
        location: 'Multiple Locations, China',
        company: 'Halal Logistics China',
        facility: 'National Distribution Network',
        certifications: ['Halal Logistics Certified'],
        verifiedBy: 'China Islamic Association Logistics Inspector #13579',
        blockchainTxHash: '0x6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b',
        status: 'pending'
      }
    ],
    documents: [
      {
        name: 'Halal Certificate - China Islamic Association',
        description: 'Official halal certification document',
        url: '#'
      },
      {
        name: 'Product Testing Report',
        description: 'Laboratory analysis confirming halal compliance',
        url: '#'
      },
      {
        name: 'Ningxia Halal Industry Compliance Report',
        description: 'Regional halal industry compliance documentation',
        url: '#'
      },
      {
        name: 'Export Documentation',
        description: 'Documentation for international export compliance',
        url: '#'
      }
    ]
  };
}

function getMockRussiaSupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Halal Cosmetics',
    certificationId,
    certifiedBy: 'Halal Standard Committee (HSC) Russia',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Raw Material Sourcing',
        description: 'Sourcing of halal-compliant cosmetic ingredients',
        date: '2023-09-10',
        location: 'Multiple Locations',
        company: 'Natura Siberica',
        facility: 'Ingredient Sourcing Division',
        certifications: ['Halal Ingredients Certified', 'Organic Certified'],
        verifiedBy: 'HSC Russia Inspector #54321',
        blockchainTxHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Formulation & Manufacturing',
        description: 'Formulation and production of cosmetic products',
        date: '2023-09-20',
        location: 'Moscow, Russia',
        company: 'Natura Siberica',
        facility: 'Moscow Production Facility',
        certifications: ['HSC Halal Certified', 'GMP Compliant'],
        verifiedBy: 'HSC Russia Inspector #98765',
        blockchainTxHash: '0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'certification',
        name: 'Halal Certification',
        description: 'Product testing and certification process',
        date: '2023-09-25',
        location: 'Moscow, Russia',
        company: 'Halal Standard Committee Russia',
        facility: 'Moscow Certification Center',
        certifications: ['HSC Halal Certified'],
        verifiedBy: 'HSC Russia Lead Inspector #24680',
        blockchainTxHash: '0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'transportation',
        name: 'Distribution',
        description: 'Distribution to retail locations',
        date: '2023-10-05',
        location: 'Various Cities, Russia',
        company: 'Halal Logistics Russia',
        facility: 'National Distribution Network',
        certifications: ['Halal Logistics Certified'],
        verifiedBy: 'HSC Russia Logistics Inspector #13579',
        blockchainTxHash: '0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
        status: 'warning'
      }
    ],
    documents: [
      {
        name: 'Halal Certificate - HSC Russia',
        description: 'Official halal certification document',
        url: '#'
      },
      {
        name: 'Ingredient Analysis Report',
        description: 'Detailed analysis of all product ingredients',
        url: '#'
      },
      {
        name: 'Manufacturing Process Documentation',
        description: 'Documentation of halal-compliant manufacturing process',
        url: '#'
      },
      {
        name: 'Quality Assurance Report',
        description: 'Quality testing and compliance verification',
        url: '#'
      }
    ]
  };
}