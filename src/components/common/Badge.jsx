'use client';

import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  rounded = false,
  dot = false,
  className = '',
  onClick = null,
}) => {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    light: 'bg-gray-50 text-gray-600',
    dark: 'bg-gray-800 text-white',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const baseClasses = 'inline-flex items-center font-medium';
  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  const cursorClass = onClick ? 'cursor-pointer hover:opacity-80' : '';

  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${cursorClass} ${className}`;

  return (
    <span 
      className={badgeClasses} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {dot && (
        <span className={`inline-block w-2 h-2 mr-1 rounded-full bg-current`}></span>
      )}
      {children}
    </span>
  );
};

export default Badge;