'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Factory, Package, Store, AlertTriangle } from 'lucide-react';

/**
 * Supply Chain Map Component
 * 
 * This component visualizes the supply chain journey on an interactive map,
 * showing the geographical flow of products from production to distribution.
 */
export default function SupplyChainMap({ 
  productId, 
  certificationId,
  batchNumber = null,
  region = null,
  width = '100%',
  height = '400px'
}) {
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  
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
        
        if (region === 'australia') {
          mockData = getMockAustraliaSupplyChain(productId, certificationId, batchNumber);
        } else if (region === 'uae' || region === 'dubai') {
          mockData = getMockUAESupplyChain(productId, certificationId, batchNumber);
        } else if (region === 'gcc') {
          mockData = getMockGCCSupplyChain(productId, certificationId, batchNumber);
        } else if (region === 'china') {
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
  
  // Get icon for step type
  const getStepIcon = (type) => {
    switch (type) {
      case 'production':
        return <Factory className="h-5 w-5" />;
      case 'processing':
        return <Package className="h-5 w-5" />;
      case 'transportation':
        return <Truck className="h-5 w-5" />;
      case 'distribution':
        return <Store className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };
  
  // Handle step selection
  const handleStepSelect = (step) => {
    setSelectedStep(step.id === selectedStep?.id ? null : step);
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Supply Chain Map</h3>
        <div className="flex justify-center items-center" style={{ height }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Supply Chain Map</h3>
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
      <h3 className="text-xl font-semibold mb-4">Supply Chain Map</h3>
      <p className="text-gray-600 mb-6">
        Visualize the geographical journey of this product from production to distribution.
      </p>
      
      {/* Map Container */}
      <div className="relative mb-6 border border-gray-200 rounded-lg overflow-hidden" style={{ height }}>
        {/* Map Placeholder - This would be replaced with an actual map integration */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Interactive map would be displayed here</p>
            <p className="text-sm">Showing {supplyChainData.steps.length} supply chain locations</p>
          </div>
        </div>
        
        {/* Map Markers - These would be positioned on the actual map */}
        <div className="absolute inset-0 pointer-events-none">
          {/* This is just a visual representation of where markers would be */}
          <div className="flex justify-between items-center h-full px-10 py-10">
            {supplyChainData.steps.map((step, index) => (
              <div 
                key={step.id}
                className="relative"
                style={{ 
                  top: `${20 + Math.random() * 60}%`,
                  left: `${index * (100 / (supplyChainData.steps.length - 1))}%`
                }}
              >
                <div 
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                    step.status === 'verified' 
                      ? 'bg-green-100 text-green-700' 
                      : step.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                  onClick={() => handleStepSelect(step)}
                >
                  {getStepIcon(step.type)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Step Info */}
        {selectedStep && (
          <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{selectedStep.name}</h4>
                <p className="text-sm text-gray-600">{selectedStep.location}</p>
                <p className="text-xs text-gray-500">{selectedStep.date}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                selectedStep.status === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : selectedStep.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {selectedStep.status === 'verified' ? 'Verified' : selectedStep.status === 'pending' ? 'Pending' : 'Warning'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Supply Chain Steps */}
      <div className="space-y-2">
        <h4 className="font-medium mb-2">Supply Chain Journey</h4>
        {supplyChainData.steps.map((step, index) => (
          <div 
            key={step.id}
            className={`p-3 border rounded-lg cursor-pointer ${
              selectedStep?.id === step.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleStepSelect(step)}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                step.status === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : step.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {getStepIcon(step.type)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h5 className="font-medium">{step.name}</h5>
                  <span className="text-xs text-gray-500">{index + 1}/{supplyChainData.steps.length}</span>
                </div>
                <p className="text-sm text-gray-600">{step.location}</p>
              </div>
            </div>
          </div>
        ))}
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
        coordinates: { lat: 1.4927, lng: 103.7414 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Halal Processing',
        description: 'Slaughtering and processing according to Islamic law',
        date: '2023-10-18',
        location: 'Kuala Lumpur, Malaysia',
        coordinates: { lat: 3.1390, lng: 101.6869 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'transportation',
        name: 'Cold Chain Transport',
        description: 'Temperature-controlled transportation to distribution center',
        date: '2023-10-20',
        location: 'Penang, Malaysia',
        coordinates: { lat: 5.4141, lng: 100.3288 },
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'distribution',
        name: 'Distribution Center',
        description: 'Quality check and preparation for retail distribution',
        date: '2023-10-22',
        location: 'Singapore',
        coordinates: { lat: 1.3521, lng: 103.8198 },
        status: 'verified'
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
        coordinates: { lat: 38.4722, lng: 106.2588 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Halal Slaughtering',
        description: 'Slaughtering according to Islamic requirements',
        date: '2023-11-10',
        location: 'Yinchuan, China',
        coordinates: { lat: 38.4872, lng: 106.2309 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'processing',
        name: 'Product Manufacturing',
        description: 'Processing into final beef products',
        date: '2023-11-12',
        location: 'Ningxia, China',
        coordinates: { lat: 38.4722, lng: 106.2588 },
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'transportation',
        name: 'Domestic Transport',
        description: 'Transportation to distribution centers across China',
        date: '2023-11-15',
        location: 'Multiple Locations, China',
        coordinates: { lat: 39.9042, lng: 116.4074 },
        status: 'pending'
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
        coordinates: { lat: 55.7558, lng: 37.6173 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Formulation & Manufacturing',
        description: 'Formulation and production of cosmetic products',
        date: '2023-09-20',
        location: 'Moscow, Russia',
        coordinates: { lat: 55.7558, lng: 37.6173 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'transportation',
        name: 'Distribution',
        description: 'Distribution to retail locations',
        date: '2023-10-05',
        location: 'Various Cities, Russia',
        coordinates: { lat: 59.9343, lng: 30.3351 },
        status: 'warning'
      }
    ]
  };
}

function getMockAustraliaSupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Premium Halal Lamb',
    certificationId,
    certifiedBy: 'Australian Federation of Islamic Councils',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Sheep Farming',
        description: 'Free-range sheep farming with ethical practices',
        date: '2023-08-10',
        location: 'Victoria, Australia',
        coordinates: { lat: -37.8136, lng: 144.9631 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Halal Slaughtering',
        description: 'Slaughtering according to Islamic requirements',
        date: '2023-08-15',
        location: 'Melbourne, Australia',
        coordinates: { lat: -37.8136, lng: 144.9631 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'processing',
        name: 'Meat Processing',
        description: 'Processing and packaging of halal meat products',
        date: '2023-08-18',
        location: 'Sydney, Australia',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'transportation',
        name: 'Export Logistics',
        description: 'Preparation for international export',
        date: '2023-08-25',
        location: 'Sydney, Australia',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        status: 'verified'
      }
    ]
  };
}

function getMockUAESupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Premium Halal Dates',
    certificationId,
    certifiedBy: 'Emirates Authority for Standardization and Metrology',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Date Palm Cultivation',
        description: 'Organic date palm farming',
        date: '2023-07-05',
        location: 'Al Ain, UAE',
        coordinates: { lat: 24.1302, lng: 55.8023 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Date Processing',
        description: 'Cleaning, sorting, and packaging of dates',
        date: '2023-07-15',
        location: 'Dubai, UAE',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'transportation',
        name: 'Distribution',
        description: 'Distribution to local and international markets',
        date: '2023-07-20',
        location: 'Dubai, UAE',
        coordinates: { lat: 25.2048, lng: 55.2708 },
        status: 'verified'
      }
    ]
  };
}

function getMockGCCSupplyChain(productId, certificationId, batchNumber) {
  return {
    productId,
    productName: 'Halal Certified Honey',
    certificationId,
    certifiedBy: 'Saudi Food and Drug Authority',
    batchNumber,
    steps: [
      {
        id: 'step1',
        type: 'production',
        name: 'Honey Production',
        description: 'Natural honey harvesting from halal-certified apiaries',
        date: '2023-06-10',
        location: 'Riyadh, Saudi Arabia',
        coordinates: { lat: 24.7136, lng: 46.6753 },
        status: 'verified'
      },
      {
        id: 'step2',
        type: 'processing',
        name: 'Honey Processing',
        description: 'Filtering, quality testing, and packaging',
        date: '2023-06-20',
        location: 'Jeddah, Saudi Arabia',
        coordinates: { lat: 21.4858, lng: 39.1925 },
        status: 'verified'
      },
      {
        id: 'step3',
        type: 'transportation',
        name: 'GCC Distribution',
        description: 'Distribution across GCC countries',
        date: '2023-06-30',
        location: 'Multiple GCC Locations',
        coordinates: { lat: 25.3548, lng: 51.1839 },
        status: 'verified'
      },
      {
        id: 'step4',
        type: 'distribution',
        name: 'Retail Distribution',
        description: 'Distribution to retail outlets',
        date: '2023-07-05',
        location: 'Doha, Qatar',
        coordinates: { lat: 25.2854, lng: 51.5310 },
        status: 'pending'
      }
    ]
  };
}