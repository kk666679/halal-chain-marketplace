'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaExclamationTriangle, FaHeadset, FaGlobe, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ClickToCallButton } from '@/components/contact';

export default function EmergencyContactPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [nearestOffice, setNearestOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Emergency contact numbers by region
  const emergencyContacts = [
    {
      region: 'Middle East',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
      phone: '+971 800 HALAL (42525)',
      whatsapp: '+971501234567',
      email: 'emergency@halal-chain.com',
      hours: '24/7',
      coordinates: { lat: 25.2048, lng: 55.2708 } // Dubai
    },
    {
      region: 'Southeast Asia',
      countries: ['Malaysia', 'Indonesia', 'Singapore', 'Thailand', 'Philippines'],
      phone: '+60 3 2723 9999',
      whatsapp: '+60123456789',
      email: 'emergency.asia@halal-chain.com',
      hours: '24/7',
      coordinates: { lat: 3.1390, lng: 101.6869 } // Kuala Lumpur
    },
    {
      region: 'Australia & Oceania',
      countries: ['Australia', 'New Zealand', 'Fiji'],
      phone: '+61 2 8005 7777',
      whatsapp: '+61412345678',
      email: 'emergency.aus@halal-chain.com',
      hours: '8:00 AM - 8:00 PM AEST',
      coordinates: { lat: -33.8688, lng: 151.2093 } // Sydney
    },
    {
      region: 'Europe',
      countries: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
      phone: '+44 20 7946 0800',
      whatsapp: '+447123456789',
      email: 'emergency.eu@halal-chain.com',
      hours: '8:00 AM - 8:00 PM CET',
      coordinates: { lat: 51.5074, lng: -0.1278 } // London
    },
    {
      region: 'North America',
      countries: ['USA', 'Canada', 'Mexico'],
      phone: '+1 888 555 4252',
      whatsapp: '+14155552671',
      email: 'emergency.na@halal-chain.com',
      hours: '8:00 AM - 8:00 PM EST',
      coordinates: { lat: 40.7128, lng: -74.0060 } // New York
    }
  ];
  
  // Update current time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get user's location and find nearest office
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Find nearest office based on coordinates
          let nearest = null;
          let shortestDistance = Infinity;
          
          emergencyContacts.forEach(contact => {
            const distance = calculateDistance(
              userCoords.lat, userCoords.lng,
              contact.coordinates.lat, contact.coordinates.lng
            );
            
            if (distance < shortestDistance) {
              shortestDistance = distance;
              nearest = contact;
            }
          });
          
          setNearestOffice(nearest);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Middle East if location access is denied
          setNearestOffice(emergencyContacts[0]);
          setLoading(false);
        }
      );
    } else {
      // Geolocation not supported
      setNearestOffice(emergencyContacts[0]);
      setLoading(false);
    }
  }, []);
  
  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center bg-white/20 p-4 rounded-full mb-6">
              <FaExclamationTriangle className="text-4xl text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Support</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Immediate assistance for urgent certification, compliance, or supply chain issues.
            </p>
            
            {nearestOffice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold mb-1">{nearestOffice.region} Emergency Line</h2>
                    <p className="text-yellow-200 flex items-center">
                      <FaClock className="mr-2" /> {nearestOffice.hours}
                    </p>
                  </div>
                  <a 
                    href={`tel:${nearestOffice.phone.replace(/\s/g, '')}`}
                    className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center text-lg"
                  >
                    <FaPhone className="mr-2" />
                    {nearestOffice.phone}
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Emergency Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Emergency Contacts</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our emergency support team is available to assist with urgent issues across all regions.
              {userLocation && nearestOffice && (
                <span className="block mt-2 text-red-600 font-medium">
                  Based on your location, we recommend contacting our {nearestOffice.region} support team.
                </span>
              )}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white p-6 rounded-xl shadow-md border ${
                  nearestOffice === contact ? 'border-red-500 ring-2 ring-red-500/50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <FaGlobe className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{contact.region}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {contact.countries.join(', ')}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Emergency Phone:</div>
                        <a 
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="text-red-600 font-medium hover:underline flex items-center"
                        >
                          <FaPhone className="mr-2" />
                          {contact.phone}
                        </a>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">WhatsApp Support:</div>
                        <a 
                          href={`https://wa.me/${contact.whatsapp.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 font-medium hover:underline"
                        >
                          {contact.whatsapp}
                        </a>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Email:</div>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Hours:</div>
                        <div className="font-medium">{contact.hours}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <FaHeadset className="mr-2" />
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Emergency Guidelines */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Emergency Support Guidelines</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-red-800 mb-4">What Qualifies as an Emergency?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong>Product Recall Situations:</strong> Immediate assistance with halal certification issues requiring product recalls.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong>Supply Chain Disruptions:</strong> Critical breaks in the halal supply chain affecting multiple stakeholders.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong>Certification Verification Failures:</strong> Urgent verification issues affecting large shipments or retail distribution.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span><strong>Blockchain Network Issues:</strong> Critical failures in the verification blockchain affecting multiple vendors.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</span>
                  <span><strong>Security Breaches:</strong> Potential or confirmed security incidents affecting certification data.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">When Contacting Emergency Support</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span>Please have your company ID and certification numbers ready.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span>Clearly describe the nature of the emergency and its impact.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span>Provide details about when the issue was first noticed.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span>Be prepared to provide access to relevant systems if needed.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</span>
                  <span>For non-emergency issues, please use our <a href="/help/support" className="text-blue-600 hover:underline">regular support channels</a>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating Click-to-Call Button */}
      <ClickToCallButton 
        phoneNumber={nearestOffice ? nearestOffice.phone : emergencyContacts[0].phone}
        whatsappNumber={nearestOffice ? nearestOffice.whatsapp : emergencyContacts[0].whatsapp}
        position="bottom-right"
        text="Emergency Call"
        theme="accent"
        size="large"
        pulsate={true}
      />
    </main>
  );
}