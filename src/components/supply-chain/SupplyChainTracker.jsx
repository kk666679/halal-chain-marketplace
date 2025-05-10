"use client";

import { useState } from 'react';
import { Truck, Package, Factory, Warehouse, ShoppingBag, CheckCircle, Clock } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';

export default function SupplyChainTracker({
  events = [],
  currentStage,
  className,
  ...props
}) {
  const [expandedEvent, setExpandedEvent] = useState(null);
  
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
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden", className)} {...props}>
      {/* Stage progress */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Supply Chain Tracking
        </h2>
        
        <div className="relative">
          {/* Progress bar */}
          <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 dark:bg-emerald-600"
              style={{ width: `${Math.max(0, Math.min(100, (currentStageIndex + 1) / stages.length * 100))}%` }}
            ></div>
          </div>
          
          {/* Stages */}
          <div className="flex justify-between">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isCompleted = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                    isCompleted 
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                  )}>
                    <StageIcon className="h-5 w-5" />
                  </div>
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
                  <div key={event.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-gray-800"></div>
                    
                    {/* Event card */}
                    <div className="ml-10">
                      <div
                        className={cn(
                          "bg-gray-50 dark:bg-gray-750 rounded-lg p-4 cursor-pointer transition-all",
                          isExpanded ? "shadow-md" : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              {event.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Temperature
                                  </h5>
                                  <p className="text-gray-900 dark:text-white">
                                    {event.temperature}°C
                                  </p>
                                </div>
                              )}
                              
                              {event.humidity && (
                                <div>
                                  <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400">
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
                                  className="text-xs text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                                >
                                  View blockchain verification
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}