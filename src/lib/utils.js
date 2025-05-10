import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an Ethereum address to a shortened form
 * @param {string} address - The Ethereum address to format
 * @param {number} chars - Number of characters to show at start and end
 * @returns {string} - Formatted address
 */
export function formatAddress(address, chars = 4) {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

/**
 * Formats a date string to a localized date format
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Date(date).toLocaleDateString(undefined, mergedOptions);
}

/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncates text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Generates a random ID
 * @returns {string} - Random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Checks if an object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - True if empty
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Converts a file to a data URL
 * @param {File} file - File to convert
 * @returns {Promise<string>} - Data URL
 */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}