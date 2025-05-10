"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Calendar, CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink, Share2, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function CertificationCard({
  certification,
  className,
  showActions = true,
  interactive = true,
  onQrCodeClick,
  onShareClick,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    certificateNumber,
    product,
    certifier,
    vendor,
    status,
    issuedDate,
    expiryDate,
    blockchainTxHash
  } = certification;
  
  // Status configuration
  const statusConfig = {
    approved: {
      icon: CheckCircle,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
      label: 'Approved'
    },
    pending: {
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
      label: 'Pending'
    },
    rejected: {
      icon: XCircle,
      color: 'text-red-500 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
      label: 'Rejected'
    },
    expired: {
      icon: AlertTriangle,
      color: 'text-gray-500 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      label: 'Expired'
    },
    revoked: {
      icon: XCircle,
      color: 'text-red-500 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
      label: 'Revoked'
    }
  };
  
  const currentStatus = statusConfig[status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;
  
  // Check if certification is verified on blockchain
  const isBlockchainVerified = !!blockchainTxHash;
  
  // Handle QR code click
  const handleQrCodeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQrCodeClick) {
      onQrCodeClick(certification);
    }
  };
  
  // Handle share click
  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShareClick) {
      onShareClick(certification);
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: `HalalChain Certification: ${product?.name || 'Product'}`,
          text: `Check out this halal certification for ${product?.name || 'a product'} by ${vendor?.name || 'a vendor'}`,
          url: window.location.origin + `/certification/${id}`,
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={interactive ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border",
        currentStatus.borderColor,
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      {...props}
    >
      {/* Header with status */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between",
        currentStatus.bgColor
      )}>
        <div className="flex items-center">
          <StatusIcon className={cn("h-5 w-5 mr-2", currentStatus.color)} />
          <span className={cn("font-medium", currentStatus.color)}>
            {currentStatus.label}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          #{certificateNumber}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Product info */}
        <div className="flex items-center mb-4">
          {product?.mainImage ? (
            <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
              <Image
                src={product.mainImage}
                alt={product.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
              <Award className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              {product?.name || 'Product Name'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {product?.category || 'Category'}
            </p>
          </div>
        </div>
        
        {/* Certification details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400 flex items-center">
              <Award className="h-3.5 w-3.5 mr-1" />
              Certifier:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">{certifier?.name || 'Certifier Name'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400 flex items-center">
              <Award className="h-3.5 w-3.5 mr-1" />
              Vendor:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">{vendor?.name || 'Vendor Name'}</span>
          </div>
          
          {issuedDate && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Issued:
              </span>
              <span className="text-gray-900 dark:text-white">{formatDate(issuedDate)}</span>
            </div>
          )}
          
          {expiryDate && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Expires:
              </span>
              <span className="text-gray-900 dark:text-white">{formatDate(expiryDate)}</span>
            </div>
          )}
          
          {isBlockchainVerified && (
            <div className="flex items-center justify-center mt-3">
              <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs rounded-full flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Blockchain Verified
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        {showActions && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <Link
              href={`/certification/${id}`}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
            >
              View Details
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
            
            <div className="flex space-x-2">
              <button
                onClick={handleQrCodeClick}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Show QR Code"
              >
                <QrCode className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleShareClick}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              {isBlockchainVerified && (
                <a
                  href={`https://etherscan.io/tx/${blockchainTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}