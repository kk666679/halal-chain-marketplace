/**
 * API client for interacting with the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

/**
 * Fetch wrapper with error handling
 */
async function fetchWithAuth(endpoint, options = {}) {
  // Get token from localStorage if available
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  // Set headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Make request
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle non-JSON responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') === -1) {
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return response;
  }

  // Parse JSON response
  const data = await response.json();

  // Handle API errors
  if (!response.ok) {
    const error = new Error(data.message || 'API error');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Authentication API
 */
export const authApi = {
  register: (userData) => 
    fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) => 
    fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => 
    fetchWithAuth('/api/auth/me'),

  updateProfile: (userData) => 
    fetchWithAuth('/api/auth/updateprofile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  updatePassword: (passwordData) => 
    fetchWithAuth('/api/auth/updatepassword', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }),

  forgotPassword: (email) => 
    fetchWithAuth('/api/auth/forgotpassword', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, password) => 
    fetchWithAuth(`/api/auth/resetpassword/${token}`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    }),

  verifyEmail: (token) => 
    fetchWithAuth(`/api/auth/verifyemail/${token}`),
};

/**
 * Products API
 */
export const productsApi = {
  getProducts: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add pagination
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    // Add filters
    if (params.category) queryParams.append('category', params.category);
    if (params.vendor) queryParams.append('vendor', params.vendor);
    if (params.search) queryParams.append('search', params.search);
    if (params.available !== undefined) queryParams.append('available', params.available);
    if (params.featured !== undefined) queryParams.append('featured', params.featured);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchWithAuth(`/api/products${query}`);
  },

  getProduct: (id) => 
    fetchWithAuth(`/api/products/${id}`),

  createProduct: (productData) => 
    fetchWithAuth('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  updateProduct: (id, productData) => 
    fetchWithAuth(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  deleteProduct: (id) => 
    fetchWithAuth(`/api/products/${id}`, {
      method: 'DELETE',
    }),

  getVendorProducts: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchWithAuth(`/api/products/vendor/products${query}`);
  },
};

/**
 * Certifications API
 */
export const certificationsApi = {
  getCertifications: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchWithAuth(`/api/certifications${query}`);
  },

  getCertification: (id) => 
    fetchWithAuth(`/api/certifications/${id}`),

  createCertification: (certificationData) => 
    fetchWithAuth('/api/certifications', {
      method: 'POST',
      body: JSON.stringify(certificationData),
    }),

  updateCertificationStatus: (id, statusData) => 
    fetchWithAuth(`/api/certifications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),

  verifyCertification: (certificateNumber) => 
    fetchWithAuth(`/api/certifications/verify/${certificateNumber}`),
};

/**
 * Supply Chain API
 */
export const supplyChainApi = {
  getProductSupplyChain: (productId) => 
    fetchWithAuth(`/api/supply-chain/${productId}`),

  addSupplyChainEvent: (eventData) => 
    fetchWithAuth('/api/supply-chain', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),

  getSupplyChainEvent: (id) => 
    fetchWithAuth(`/api/supply-chain/events/${id}`),
};

/**
 * AI Agents API
 */
export const aiApi = {
  assessCertification: (productData) => 
    fetchWithAuth('/api/ai-agents/assess-certification', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  getSupplyChainRecommendations: (productData) => 
    fetchWithAuth('/api/ai-agents/supply-chain-recommendations', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  generateProductDescription: (productData) => 
    fetchWithAuth('/api/ai-agents/generate-description', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
};