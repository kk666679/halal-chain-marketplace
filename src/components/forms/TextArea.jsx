"use client";

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TextArea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className,
  helpText,
  maxLength,
  rows = 4,
  showCharCount = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const charCount = value?.length || 0;
  const isNearLimit = maxLength && charCount >= maxLength * 0.9;
  const isAtLimit = maxLength && charCount >= maxLength;

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={id} 
          className={cn(
            "block text-sm font-medium mb-1",
            error ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-300"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            "block w-full rounded-md border shadow-sm sm:text-sm px-4 py-2",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error 
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:text-red-100 dark:placeholder-red-400 dark:focus:border-red-500 dark:focus:ring-red-500" 
              : isFocused
                ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:focus:border-emerald-500 dark:focus:ring-emerald-500",
            disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400" : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
          )}
          {...props}
        />
      </div>
      
      <div className="mt-1 flex justify-between items-start">
        <div>
          {error && (
            <div className="flex items-center text-sm text-red-600 dark:text-red-500">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {helpText && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
          )}
        </div>
        
        {showCharCount && maxLength && (
          <div className={cn(
            "text-xs",
            isAtLimit ? "text-red-600 dark:text-red-500" : 
            isNearLimit ? "text-amber-600 dark:text-amber-500" : 
            "text-gray-500 dark:text-gray-400"
          )}>
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}