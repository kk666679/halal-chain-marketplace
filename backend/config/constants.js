/**
 * Application constants
 * Defines constants used throughout the application
 */

// User roles
const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CERTIFIER: 'certifier',
  CONSUMER: 'consumer'
};

// Certification status
const CERTIFICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  REVOKED: 'revoked'
};

// Product categories
const PRODUCT_CATEGORIES = [
  'Food & Beverages',
  'Meat & Poultry',
  'Dairy',
  'Snacks',
  'Bakery',
  'Confectionery',
  'Seafood',
  'Processed Foods',
  'Ingredients',
  'Cosmetics',
  'Pharmaceuticals',
  'Other'
];

// Supply chain stages
const SUPPLY_CHAIN_STAGES = {
  RAW_MATERIAL: 'raw_material',
  PROCESSING: 'processing',
  MANUFACTURING: 'manufacturing',
  PACKAGING: 'packaging',
  DISTRIBUTION: 'distribution',
  RETAIL: 'retail'
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// API response codes
const RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
};

// File upload limits
const UPLOAD_LIMITS = {
  IMAGE_SIZE_MB: 5,
  DOCUMENT_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

module.exports = {
  USER_ROLES,
  CERTIFICATION_STATUS,
  PRODUCT_CATEGORIES,
  SUPPLY_CHAIN_STAGES,
  PAGINATION,
  RESPONSE_CODES,
  UPLOAD_LIMITS
};