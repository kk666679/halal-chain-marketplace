"use client";

import { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  Factory, 
  Warehouse, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  MapPin,
  Thermometer,
  Droplets,
  Calendar,
  Share2,
  QrCode,
  AlertTriangle
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupplyChainTracker({
  events = [],
  currentStage,
  className,
  interactive = true,
  showQrCode = false,
  onQrCodeClick,
  onShareClick,
  ...props
}) {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Define stages and their icons
  const stages = [
    { id: 'raw_material', name: 'Raw Materials', icon: Package },
    { id: 'processing', name: 'Processing', icon: Factory },
    { id: 'manufacturing', name: 'Manufacturing', icon: Factory },
    { id: 'packaging', name: 'Packaging', icon: Package },
    { id: 'distribution', name: 'Distribution', icon: Truck },
    { id: 'retail', name: 'Retail', icon: ShoppingBag }
  ];
  
  // Find the current stage index
  const currentStageIndex = stages.findIndex(stage => stage.id === currentStage);
  
  // Toggle event details
  const toggleEventDetails = (eventId) => {
    if (!interactive) return;
    
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };
  
  // Show location on map
  const showLocationOnMap = (location) => {
    if (!location?.coordinates) return;
    
    setSelectedLocation(location);
    setMapVisible(true);
  };
  
  // Close map
  const closeMap = () => {
    setMapVisible(false);
  };
  
  // Handle QR code click
  const handleQrCodeClick = () => {
    if (onQrCodeClick) {
      onQrCodeClick();
    }
  };
  
  // Handle share click
  const handleShareClick = () => {
    if (onShareClick) {
      onShareClick();
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: 'Supply Chain Tracking',
          text: 'Check out this product\'s supply chain journey',
          url: window.location.href,
        });
      }
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden", className)} {...props}>
      {/* Stage progress */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Supply Chain Tracking
          </h2>
          
          <div className="flex items-center space-x-2">
            {showQrCode && (
              <button
                onClick={handleQrCodeClick}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Show QR Code"
              >
                <QrCode className="h-5 w-5" />
              </button>
            )}
            
            <button
              onClick={handleShareClick}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          {/* Progress bar */}
          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, Math.min(100, (currentStageIndex + 1) / stages.length * 100))}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 dark:bg-emerald-600"
            ></motion.div>
          </div>
          
          {/* Stages */}
          <div className="flex justify-between">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isCompleted = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                      isCompleted 
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                    )}
                  >
                    <StageIcon className="h-5 w-5" />
                  </motion.div>
                  <span className={cn(
                    "text-xs text-center",
                    isCurrent 
                      ? "font-medium text-emerald-600 dark:text-emerald-400" 
                      : isCompleted 
                        ? "font-medium text-gray-900 dark:text-white" 
                        : "text-gray-500 dark:text-gray-400"
                  )}>
                    {stage.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Events timeline */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Event Timeline
        </h3>
        
        {events.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No supply chain events recorded yet.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Events */}
            <div className="space-y-6">
              {events.map((event, index) => {
                const isExpanded = expandedEvent === event.id;
                const stageInfo = stages.find(s => s.id === event.stage) || {};
                const StageIcon = stageInfo.icon || Package;
                
                return (
                  <motion.div 
                    key={event.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-gray-800"></div>
                    
                    {/* Event card */}
                    <div className="ml-10">
                      <div
                        className={cn(
                          "bg-gray-50 dark:bg-gray-750 rounded-lg p-4 transition-all",
                          interactive ? "cursor-pointer" : "",
                          isExpanded ? "shadow-md" : interactive ? "hover:bg-gray-100 dark:hover:bg-gray-700" : ""
                        )}
                        onClick={() => toggleEventDetails(event.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="mr-3">
                              <div className="p-2 rounded-full bg-white dark:bg-gray-800">
                                <StageIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {stageInfo.name || event.stage}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(event.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {event.verified && (
                              <div className="mr-2 flex items-center text-xs text-emerald-600 dark:text-emerald-500">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </div>
                            )}
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {event.location?.address}
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                            >
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {event.description}
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Date & Time
                                  </h5>
                                  <p className="text-gray-900 dark:text-white">
                                    {new Date(event.timestamp).toLocaleString()}
                                  </p>
                                </div>
                                
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    Location
                                  </h5>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      showLocationOnMap(event.location);
                                    }}
                                    className="text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
                                  >
                                    {event.location?.address || 'Unknown'}
                                  </button>
                                </div>
                                
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Actor
                                  </h5>
                                  <p className="text-gray-900 dark:text-white">
                                    {event.actor?.name || 'Unknown'}
                                  </p>
                                </div>
                                
                                {event.temperature && (
                                  <div>
                                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                      <Thermometer className="h-3 w-3 mr-1" />
                                      Temperature
                                    </h5>
                                    <p className="text-gray-900 dark:text-white">
                                      {event.temperature}°C
                                    </p>
                                  </div>
                                )}
                                
                                {event.humidity && (
                                  <div>
                                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                      <Droplets className="h-3 w-3 mr-1" />
                                      Humidity
                                    </h5>
                                    <p className="text-gray-900 dark:text-white">
                                      {event.humidity}%
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {/* Attachments */}
                              {event.attachments && event.attachments.length > 0 && (
                                <div className="mt-3">
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                    Attachments
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {event.attachments.map((attachment, i) => (
                                      <div key={i} className="w-16 h-16 relative rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {attachment.fileType?.startsWith('image/') ? (
                                          <Image
                                            src={attachment.fileUrl}
                                            alt={attachment.name}
                                            fill
                                            className="object-cover"
                                          />
                                        ) : (
                                          <div className="flex items-center justify-center h-full">
                                            <Package className="h-6 w-6 text-gray-400" />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Blockchain verification */}
                              {event.blockchainTxHash && (
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  <a
                                    href={`https://etherscan.io/tx/${event.blockchainTxHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    View blockchain verification
                                  </a>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Map Modal */}
      {mapVisible && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Location Details
              </h3>
              <button
                onClick={closeMap}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                <p className="text-gray-900 dark:text-white">{selectedLocation.address}</p>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Latitude: {selectedLocation.coordinates.lat}</p>
                <p>Longitude: {selectedLocation.coordinates.lng}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}