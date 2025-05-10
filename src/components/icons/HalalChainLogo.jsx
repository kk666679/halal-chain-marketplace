'use client';

import React from 'react';
import Image from 'next/image';

/**
 * HalalChainLogo Component
 * 
 * This component displays the HalalChain logo with configurable size and styling.
 * It uses Next.js Image component for optimized image loading.
 * 
 * @param {Object} props - Component props
 * @param {number} [props.width=150] - Width of the logo in pixels
 * @param {number} [props.height=50] - Height of the logo in pixels
 * @param {string} [props.alt="HalalChain Logo"] - Alt text for the logo
 * @param {Object} [props.className] - Additional CSS classes
 * @returns {React.Component} HalalChain logo component
 */
const HalalChainLogo = ({ 
  width = 150, 
  height = 50, 
  alt = "HalalChain Logo",
  className = "",
  ...props 
}) => {
  return (
    <div className={`halal-chain-logo ${className}`} {...props}>
      <Image
        src="/images/HalalChain.png"
        width={width}
        height={height}
        alt={alt}
        priority
        className="logo-image"
      />
    </div>
  );
};

export default HalalChainLogo;