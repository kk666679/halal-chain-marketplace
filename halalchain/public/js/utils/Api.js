import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

export const fetchVendors = () => apiClient.get('/vendors');
export const verifyCertification = (certId) => apiClient.get(`/certifications/${certId}`);
export const getVendorProfile = (vendorId) => apiClient.get(`/vendors/${vendorId}`);