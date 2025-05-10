"use client";

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}, ref) => {
  // Variants
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-200',
    link: 'bg-transparent text-emerald-600 hover:text-emerald-700 hover:underline dark:text-emerald-500 dark:hover:text-emerald-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white',
  };
  
  // Sizes
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-base',
  };
  
  // Icon sizes
  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-5 w-5',
  };
  
  // Icon margins
  const leftIconMargins = {
    xs: 'mr-1',
    sm: 'mr-1.5',
    md: 'mr-2',
    lg: 'mr-2',
    xl: 'mr-2.5',
  };
  
  const rightIconMargins = {
    xs: 'ml-1',
    sm: 'ml-1.5',
    md: 'ml-2',
    lg: 'ml-2',
    xl: 'ml-2.5',
  };
  
  // Disabled state
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-900',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-60 cursor-not-allowed' : '',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className={cn('animate-spin', leftIconMargins[size], iconSizes[size])} />
      )}
      
      {!isLoading && LeftIcon && (
        <LeftIcon className={cn(leftIconMargins[size], iconSizes[size])} />
      )}
      
      {children}
      
      {RightIcon && (
        <RightIcon className={cn(rightIconMargins[size], iconSizes[size])} />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;