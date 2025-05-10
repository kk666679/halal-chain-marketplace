"use client";

import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Checkbox({
  id,
  name,
  label,
  checked = false,
  onChange,
  error,
  disabled = false,
  required = false,
  className,
  helpText,
  ...props
}) {
  return (
    <div className={cn("flex items-start", className)}>
      <div className="flex items-center h-5">
        <div className="relative">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-5 w-5 rounded border flex items-center justify-center",
              checked
                ? "bg-emerald-600 border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500"
                : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700",
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
              error
                ? "border-red-300 dark:border-red-700"
                : ""
            )}
          >
            {checked && (
              <Check className="h-3 w-3 text-white" />
            )}
          </div>
        </div>
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "font-medium",
              disabled
                ? "text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-300 cursor-pointer",
              error
                ? "text-red-600 dark:text-red-500"
                : ""
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {helpText && !error && (
          <p className="text-gray-500 dark:text-gray-400">{helpText}</p>
        )}
        
        {error && (
          <div className="mt-1 flex items-center text-sm text-red-600 dark:text-red-500">
            <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}