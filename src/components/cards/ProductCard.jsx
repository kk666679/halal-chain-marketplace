"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ExternalLink, ShoppingBag, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductCard({
  product,
  className,
  showActions = true,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    name,
    description,
    category,
    mainImage,
    price,
    vendor,
    isCertified = false,
    certificationStatus,
    certificationDate
  } = product;
  
  // Truncate description
  const truncatedDescription = description?.length > 100
    ? `${description.substring(0, 100)}...`
    : description;
  
  // Certification badge color based on status
  const certificationColors = {
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  };
  
  const certificationColor = certificationColors[certificationStatus] || certificationColors.pending;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300",
        isHovered ? "shadow-lg transform -translate-y-1" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        
        {/* Certification Badge */}
        {isCertified && (
          <div className={cn(
            "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center",
            certificationColor
          )}>
            <Award className="h-3 w-3 mr-1" />
            Halal Certified
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              <Link href={`/marketplace/products/${id}`} className="hover:text-emerald-600 dark:hover:text-emerald-500">
                {name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {category}
            </p>
          </div>
          
          {price && (
            <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
              ${price.toFixed(2)}
            </div>
          )}
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {truncatedDescription}
        </p>
        
        {vendor && (
          <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Vendor:</span>
            <span className="ml-1">{vendor.name || vendor}</span>
          </div>
        )}
        
        {/* Actions */}
        {showActions && (
          <div className="mt-4 flex justify-between items-center">
            <Link
              href={`/marketplace/products/${id}`}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
            >
              View Details
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
            
            {isCertified && (
              <Link
                href={`/certification/verify/${id}`}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                Verify
                <Info className="ml-1 h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}