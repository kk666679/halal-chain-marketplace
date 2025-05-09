import React from 'react';
import Image from 'next/image';

const ChemmaraLogo = ({ width = 150, height = 45 }) => {
  return (
    <div className="flex items-center">
      <Image 
        src="/images/chemmara-logo.png" 
        alt="Chemmara Logo" 
        width={width} 
        height={height} 
        priority
      />
    </div>
  );
};

export default ChemmaraLogo;