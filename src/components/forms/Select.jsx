"use client";

import { useState } from 'react';
import { Check, ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Select({
  id,
  name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  className,
  helpText,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  
  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(option => option.value === value);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange({ target: { name, value: options[nextIndex].value } });
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(option => option.value === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange({ target: { name, value: options[prevIndex].value } });
    }
  };
  
  const handleBlur = (e) => {
    // Delay to allow click on options
    setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
      if (onBlur) onBlur(e);
    }, 100);
  };

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
        <button
          id={id}
          type="button"
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "relative w-full rounded-md border shadow-sm pl-3 pr-10 py-2 text-left cursor-default",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            error 
              ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:text-red-100 dark:focus:border-red-500 dark:focus:ring-red-500" 
              : isFocused
                ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:focus:border-emerald-500 dark:focus:ring-emerald-500",
            disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400" : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
          )}
          {...props}
        >
          <span className={cn(
            "block truncate",
            !selectedOption && "text-gray-500 dark:text-gray-400"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto focus:outline-none">
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby={id}
              className="py-1"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "cursor-pointer select-none relative py-2 pl-3 pr-9",
                    value === option.value
                      ? "text-white bg-emerald-600 dark:bg-emerald-700"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <span className={cn(
                    "block truncate",
                    value === option.value ? "font-semibold" : "font-normal"
                  )}>
                    {option.label}
                  </span>
                  
                  {value === option.value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600 dark:text-red-500">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
      
      {/* Hidden select for form submission */}
      <select
        name={name}
        value={value || ''}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}