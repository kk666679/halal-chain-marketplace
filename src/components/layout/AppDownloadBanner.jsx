"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the banner has been dismissed before
    const dismissed = localStorage.getItem('appBannerDismissed');
    if (!dismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    // Remember the user's preference
    localStorage.setItem('appBannerDismissed', 'true');
    setIsDismissed(true);
  };

  // Don't render anything if permanently dismissed
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <Smartphone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Get the HalalChain Mobile App</h3>
                  <p className="text-xs sm:text-sm text-emerald-100">Scan products, verify certifications, and track supply chains on the go.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.halalchain.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image 
                    src="/images/google-play-badge.png" 
                    alt="Get it on Google Play" 
                    width={120} 
                    height={36} 
                    className="h-8 w-auto"
                  />
                </a>
                
                <a 
                  href="https://apps.apple.com/app/halalchain/id1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image 
                    src="/images/app-store-badge.png" 
                    alt="Download on the App Store" 
                    width={120} 
                    height={36} 
                    className="h-8 w-auto"
                  />
                </a>
                
                <button 
                  onClick={dismissBanner}
                  className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}