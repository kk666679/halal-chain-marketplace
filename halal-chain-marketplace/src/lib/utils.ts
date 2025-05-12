import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class values to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a human-readable string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

/**
 * Format a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate a string to a specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string
 */
export function truncateString(str: string, length: number = 50): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Generate a random ID
 * @param prefix - Prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Debounce a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if an object is empty
 * @param obj - Object to check
 * @returns Boolean indicating if the object is empty
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Convert a string to title case
 * @param str - String to convert
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

/**
 * Generate a molecular signature for quantum verification (new in May 2025)
 * @returns Molecular signature string
 */
export function generateMolecularSignature(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(
    { length: 32 },
    () => chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

/**
 * Calculate carbon footprint based on supply chain data (new in May 2025)
 * @param supplyChainData - Supply chain data
 * @returns Carbon footprint value
 */
export function calculateCarbonFootprint(supplyChainData: any): number {
  // This is a simplified calculation for demonstration purposes
  // In a real implementation, this would use actual data and complex algorithms
  const baseFootprint = 10; // Base carbon footprint in kg CO2e
  const transportFactor = supplyChainData?.transport?.distance ? 
    supplyChainData.transport.distance * 0.1 : 5;
  const processingFactor = supplyChainData?.processing?.energy ?
    supplyChainData.processing.energy * 0.2 : 3;
  
  return +(baseFootprint + transportFactor + processingFactor).toFixed(2);
}