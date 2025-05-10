'use client';

import React from 'react';
import Link from 'next/link';
import { HalalChainLogo } from '../icons';

/**
 * Logo Component
 * 
 * A wrapper component that displays the HalalChain logo and links to the homepage.
 * 
 * @param {Object} props - Component props
 * @param {number} [props.width=150] - Width of the logo in pixels
 * @param {number} [props.height=50] - Height of the logo in pixels
 * @param {string} [props.href="/"] - Link destination
 * @returns {React.Component} Logo component with link
 */
const Logo = ({ 
  width = 150, 
  height = 50, 
  href = "/",
  ...props 
}) => {
  return (
    <Link href={href} className="logo-link" aria-label="Go to homepage">
      <HalalChainLogo 
        width={width} 
        height={height} 
        {...props} 
      />
    </Link>
  );
};

export default Logo;