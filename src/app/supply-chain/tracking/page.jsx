'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTruck, 
  FaBarcode, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaPhoneAlt
} from 'react-icons/fa';
import { ClickToCallButton } from '@/components/contact';

export default function SupplyChainTrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Mock tracking data
  const mockTrackingData = {
    'HCM-1234567890': {
      productId: 'HCM-1234567890',
      productName: 'Premium Halal Beef',
      status: 'in-transit',
      certificationId: 'CERT-5678',
      origin: 'Brisbane, Australia',
      destination: 'Dubai, UAE',
      currentLocation: 'Singapore',
      estimatedDelivery: '2025-05-20',
      lastUpdated: '2025-05-12T14:30:00Z',
      temperature: '2.4°C',
      humidity: '85%',
      blockchain: {
        transactionId: '0x1a2b3c4d5e6f7g8h9i0j',
        verificationUrl: 'https://halal-chain.com/verify/0x1a2b3c4d5e6f7g8h9i0j'
      },
      route: [
        { location: 'Brisbane, Australia', timestamp: '2025-05-08T09:15:00Z', status: 'departed', temperature: '2.1°C' },
        { location: 'Sydney, Australia', timestamp: '2025-05-09T14:20:00Z', status: 'in-transit', temperature: '2.2°C' },
        { location: 'Jakarta, Indonesia', timestamp: '2025-05-11T08:45:00Z', status: 'in-transit', temperature: '2.3°C' },
        { location: 'Singapore', timestamp: '2025-05-12T14:30:00Z', status: 'in-transit', temperature: '2.4°C' },
        { location: 'Dubai, UAE', timestamp: null, status: 'pending', temperature: null }
      ],
      supportContact: {
        name: 'Global Logistics Support',
        phone: '+971 4 123 4567',
        whatsapp: '+971501234567',
        email: 'logistics@halal-chain.com'
      }
    },
    'HCM-9876543210': {
      productId: 'HCM-9876543210',
      productName: 'Halal Chicken Breast',
      status: 'delivered',
      certificationId: 'CERT-9012',
      origin: 'Kuala Lumpur, Malaysia',
      destination: 'Riyadh, Saudi Arabia',
      currentLocation: 'Riyadh, Saudi Arabia',
      estimatedDelivery: '2025-05-10',
      lastUpdated: '2025-05-10T16:45:00Z',
      temperature: '1.8°C',
      humidity: '82%',
      blockchain: {
        transactionId: '0xa1b2c3d4e5f6g7h8i9j0',
        verificationUrl: 'https://halal-chain.com/verify/0xa1b2c3d4e5f6g7h8i9j0'
      },
      route: [
        { location: 'Kuala Lumpur, Malaysia', timestamp: '2025-05-05T10:30:00Z', status: 'departed', temperature: '1.9°C' },
        { location: 'Bangkok, Thailand', timestamp: '2025-05-06T15:20:00Z', status: 'in-transit', temperature: '2.0°C' },
        { location: 'Dubai, UAE', timestamp: '2025-05-08T09:15:00Z', status: 'in-transit', temperature: '1.8°C' },
        { location: 'Riyadh, Saudi Arabia', timestamp: '2025-05-10T16:45:00Z', status: 'delivered', temperature: '1.8°C' }
      ],
      supportContact: {
        name: 'MENA Logistics Support',
        phone: '+966 11 123 4567',
        whatsapp: '+966501234567',
        email: 'mena.logistics@halal-chain.com'
      }
    }
  };
  
  // Handle tracking search
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (mockTrackingData[trackingId]) {
        setTrackingResult(mockTrackingData[trackingId]);
        setLoading(false);
      } else {
        setTrackingResult(null);
        setError('No tracking information found for this ID. Please check and try again.');
        setLoading(false);
      }
    }, 1500);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Pending';
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'departed':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'departed':
        return <FaTruck className="mr-1" />;
      case 'in-transit':
        return <FaTruck className="mr-1" />;
      case 'delivered':
        return <FaCheckCircle className="mr-1" />;
      case 'pending':
        return <FaExclamationTriangle className="mr-1" />;
      default:
        return <FaExclamationTriangle className="mr-1" />;
    }
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Supply Chain Tracking</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Track your halal-certified products in real-time with our blockchain-powered supply chain tracking system.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBarcode className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter tracking ID (e.g., HCM-1234567890)"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaSearch className="mr-2" />
                      Track
                    </span>
                  )}
                </button>
              </div>
              
              <div className="mt-2 text-sm text-blue-200">
                Try sample IDs: HCM-1234567890 or HCM-9876543210
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Tracking Results */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8"
            >
              <div className="flex items-center">
                <FaExclamationTriangle className="mr-2" />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          
          {trackingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Product Information */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{trackingResult.productName}</h2>
                    <p className="text-gray-600">Tracking ID: {trackingResult.productId}</p>
                  </div>
                  <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${getStatusColor(trackingResult.status)} flex items-center`}>
                    {getStatusIcon(trackingResult.status)}
                    <span className="font-medium capitalize">{trackingResult.status.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Origin</div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-2" />
                      <span className="font-medium">{trackingResult.origin}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Destination</div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-2" />
                      <span className="font-medium">{trackingResult.destination}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current Location</div>
                    <div className="flex items-center">
                      <FaTruck className="text-blue-600 mr-2" />
                      <span className="font-medium">{trackingResult.currentLocation}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Estimated Delivery</div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-600 mr-2" />
                      <span className="font-medium">{formatDate(trackingResult.estimatedDelivery)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Certification ID</div>
                      <div className="font-medium">{trackingResult.certificationId}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Temperature</div>
                      <div className="font-medium">{trackingResult.temperature}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Humidity</div>
                      <div className="font-medium">{trackingResult.humidity}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4">Blockchain Verification</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Transaction ID</div>
                    <div className="font-mono text-sm break-all mb-3">{trackingResult.blockchain.transactionId}</div>
                    <a 
                      href={trackingResult.blockchain.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
                    >
                      Verify on Blockchain
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Tracking Timeline */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-6">Tracking Timeline</h3>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline Events */}
                  <div className="space-y-8">
                    {trackingResult.route.map((stop, index) => (
                      <div key={index} className="relative pl-12">
                        {/* Timeline Dot */}
                        <div className={`absolute left-0 top-1.5 h-10 w-10 rounded-full flex items-center justify-center ${
                          stop.status === 'delivered' ? 'bg-green-100' : 
                          stop.status === 'in-transit' ? 'bg-yellow-100' : 
                          stop.status === 'departed' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {stop.status === 'delivered' ? (
                            <FaCheckCircle className="text-green-600" />
                          ) : stop.status === 'in-transit' || stop.status === 'departed' ? (
                            <FaTruck className="text-blue-600" />
                          ) : (
                            <FaExclamationTriangle className="text-gray-400" />
                          )}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="font-bold">{stop.location}</h4>
                              <p className="text-gray-600">{formatTimestamp(stop.timestamp)}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stop.status)}`}>
                                {getStatusIcon(stop.status)}
                                <span className="capitalize">{stop.status.replace('-', ' ')}</span>
                              </span>
                              
                              {stop.temperature && (
                                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Temp: {stop.temperature}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Support Contact */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-6">
                  Contact our logistics support team for any questions about this shipment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Contact Name</div>
                    <div className="font-medium">{trackingResult.supportContact.name}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <a 
                      href={`tel:${trackingResult.supportContact.phone}`}
                      className="text-blue-600 font-medium hover:underline flex items-center"
                    >
                      <FaPhoneAlt className="mr-2" />
                      {trackingResult.supportContact.phone}
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a 
                      href={`mailto:${trackingResult.supportContact.email}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {trackingResult.supportContact.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {!trackingResult && !error && !loading && (
            <div className="text-center py-12">
              <div className="bg-blue-50 inline-flex items-center justify-center p-4 rounded-full mb-6">
                <FaBarcode className="text-blue-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Enter a Tracking ID</h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Enter your tracking ID above to view real-time location, status, and blockchain verification details for your shipment.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Floating Click-to-Call Button */}
      {trackingResult && (
        <ClickToCallButton 
          phoneNumber={trackingResult.supportContact.phone}
          whatsappNumber={trackingResult.supportContact.whatsapp}
          position="bottom-right"
          text="Logistics Support"
          theme="primary"
          size="medium"
          pulsate={true}
        />
      )}
    </main>
  );
}