'use client';

import { useState } from 'react';
import { FaPhone, FaWhatsapp, FaCommentDots, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ClickToCallButton = ({ 
  phoneNumber, 
  whatsappNumber = null,
  position = 'bottom-right',
  text = 'Contact Us',
  showText = true,
  theme = 'primary',
  size = 'medium',
  pulsate = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length and likely format
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 10) {
      // Assume international format
      return `+${cleaned.slice(0, cleaned.length - 10)} (${cleaned.slice(-10, -7)}) ${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
    }
    
    // Return as is if we can't format it
    return phone;
  };
  
  // Format phone number for WhatsApp link
  const formatWhatsAppNumber = (phone) => {
    return phone.replace(/\D/g, '');
  };
  
  // Copy phone number to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Theme styles
  const themeStyles = {
    primary: {
      main: 'bg-emerald-600 text-white hover:bg-emerald-700',
      secondary: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
    },
    secondary: {
      main: 'bg-gray-800 text-white hover:bg-gray-900',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    accent: {
      main: 'bg-amber-500 text-white hover:bg-amber-600',
      secondary: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    }
  };
  
  // Size styles
  const sizeStyles = {
    small: {
      button: 'h-10 w-10',
      text: 'text-xs',
      menu: 'w-48'
    },
    medium: {
      button: 'h-14 w-14',
      text: 'text-sm',
      menu: 'w-56'
    },
    large: {
      button: 'h-16 w-16',
      text: 'text-base',
      menu: 'w-64'
    }
  };
  
  // Position styles
  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };
  
  return (
    <>
      <div className={`fixed ${positionStyles[position]} z-50`}>
        {/* Main Button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${themeStyles[theme].main} ${sizeStyles[size].button} rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${pulsate ? 'animate-pulse' : ''}`}
            aria-label={isOpen ? "Close contact options" : "Open contact options"}
          >
            {isOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaPhone className="h-5 w-5" />
            )}
          </button>
          
          {showText && !isOpen && (
            <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-md ${sizeStyles[size].text}`}>
              {text}
            </div>
          )}
        </div>
        
        {/* Contact Options Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${position.includes('top') ? 'top-full mt-3' : 'bottom-full mb-3'} ${position.includes('right') ? 'right-0' : 'left-0'} ${sizeStyles[size].menu} bg-white rounded-lg shadow-xl overflow-hidden`}
            >
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">Contact Options</h3>
                
                <div className="space-y-3">
                  {/* Call Button */}
                  <a 
                    href={`tel:${phoneNumber}`}
                    className={`flex items-center p-3 rounded-lg ${themeStyles[theme].main} transition-colors w-full`}
                  >
                    <FaPhone className="mr-3" />
                    <span>Call Now</span>
                  </a>
                  
                  {/* WhatsApp Button (if provided) */}
                  {whatsappNumber && (
                    <a 
                      href={`https://wa.me/${formatWhatsAppNumber(whatsappNumber)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-3 rounded-lg ${themeStyles[theme].secondary} transition-colors w-full`}
                    >
                      <FaWhatsapp className="mr-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  
                  {/* Copy Number Button */}
                  <button 
                    onClick={copyToClipboard}
                    className={`flex items-center p-3 rounded-lg ${copied ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors w-full`}
                  >
                    <FaCommentDots className="mr-3" />
                    <span>{copied ? 'Copied!' : 'Copy Number'}</span>
                  </button>
                </div>
                
                <div className="mt-3 text-center text-sm text-gray-500">
                  {formatPhoneNumber(phoneNumber)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Backdrop when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ClickToCallButton;