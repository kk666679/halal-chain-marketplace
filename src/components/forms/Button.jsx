"use client";

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  // Variants
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent focus:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-transparent focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
    outline: 'bg-transparent hover:bg-gray-100 text-emerald-600 border-emerald-600 focus:ring-emerald-500 dark:hover:bg-gray-800 dark:text-emerald-500 dark:border-emerald-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500 dark:hover:bg-gray-800 dark:text-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800',
    success: 'bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white border-transparent focus:ring-amber-500 dark:bg-amber-600 dark:hover:bg-amber-700',
    info: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800',
    link: 'bg-transparent underline text-emerald-600 hover:text-emerald-700 border-transparent focus:ring-0 dark:text-emerald-500 dark:hover:text-emerald-400 p-0 h-auto'
  };

  // Sizes
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-base'
  };

  // Disabled and loading state
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'relative inline-flex items-center justify-center font-medium rounded-md border shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-200 ease-in-out',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        variant !== 'link' ? 'font-medium' : '',
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader2 className={cn(
          'animate-spin',
          children ? 'mr-2' : '',
          size === 'xs' || size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
        )} />
      )}
      
      {LeftIcon && !isLoading && (
        <LeftIcon className={cn(
          children ? 'mr-2' : '',
          size === 'xs' || size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
        )} />
      )}
      
      {children}
      
      {RightIcon && (
        <RightIcon className={cn(
          children ? 'ml-2' : '',
          size === 'xs' || size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
        )} />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;