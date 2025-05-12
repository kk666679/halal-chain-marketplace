'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactCard = ({
  name,
  title,
  phoneNumber,
  whatsappNumber = null,
  email,
  location,
  imageUrl = null,
  theme = 'primary',
  variant = 'default'
}) => {
  const [copied, setCopied] = useState({
    phone: false,
    email: false
  });
  
  // Copy text to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };
  
  // Theme styles
  const themeStyles = {
    primary: {
      bg: 'bg-white',
      border: 'border-emerald-200',
      highlight: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      secondaryButton: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
    },
    secondary: {
      bg: 'bg-white',
      border: 'border-gray-200',
      highlight: 'text-gray-800',
      button: 'bg-gray-800 hover:bg-gray-900 text-white',
      secondaryButton: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    accent: {
      bg: 'bg-white',
      border: 'border-amber-200',
      highlight: 'text-amber-600',
      button: 'bg-amber-500 hover:bg-amber-600 text-white',
      secondaryButton: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    }
  };
  
  // Variant styles
  const variantStyles = {
    default: 'rounded-xl shadow-md p-6',
    compact: 'rounded-lg shadow-sm p-4',
    minimal: 'rounded border p-4',
    elevated: 'rounded-xl shadow-lg p-6'
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${themeStyles[theme].bg} ${themeStyles[theme].border} border ${variantStyles[variant]}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar/Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src={imageUrl} 
                alt={name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Contact Info */}
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-lg font-bold">{name}</h3>
          {title && <p className="text-gray-600 mb-2">{title}</p>}
          
          <div className="space-y-2 mt-3">
            {/* Phone */}
            <div className="flex items-center justify-center sm:justify-start">
              <FaPhone className={`${themeStyles[theme].highlight} mr-2`} />
              <a 
                href={`tel:${phoneNumber}`} 
                className="text-gray-700 hover:underline mr-2"
              >
                {phoneNumber}
              </a>
              <button 
                onClick={() => copyToClipboard(phoneNumber, 'phone')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Copy phone number"
              >
                {copied.phone ? <FaCheck className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
            
            {/* Email */}
            <div className="flex items-center justify-center sm:justify-start">
              <FaEnvelope className={`${themeStyles[theme].highlight} mr-2`} />
              <a 
                href={`mailto:${email}`} 
                className="text-gray-700 hover:underline mr-2"
              >
                {email}
              </a>
              <button 
                onClick={() => copyToClipboard(email, 'email')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Copy email address"
              >
                {copied.email ? <FaCheck className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
            
            {/* Location */}
            {location && (
              <div className="flex items-center justify-center sm:justify-start">
                <FaMapMarkerAlt className={`${themeStyles[theme].highlight} mr-2`} />
                <span className="text-gray-700">{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <a 
          href={`tel:${phoneNumber}`}
          className={`${themeStyles[theme].button} py-2 px-4 rounded text-center transition-colors flex items-center justify-center`}
        >
          <FaPhone className="mr-2" />
          <span>Call</span>
        </a>
        
        {whatsappNumber ? (
          <a 
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${themeStyles[theme].secondaryButton} py-2 px-4 rounded text-center transition-colors flex items-center justify-center`}
          >
            <FaWhatsapp className="mr-2" />
            <span>WhatsApp</span>
          </a>
        ) : (
          <a 
            href={`mailto:${email}`}
            className={`${themeStyles[theme].secondaryButton} py-2 px-4 rounded text-center transition-colors flex items-center justify-center`}
          >
            <FaEnvelope className="mr-2" />
            <span>Email</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ContactCard;