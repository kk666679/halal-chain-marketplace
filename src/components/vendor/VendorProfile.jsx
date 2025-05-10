'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  User, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  Camera,
  Save,
  AlertCircle
} from 'lucide-react';

export default function VendorProfile({ initialData = {} }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: initialData.companyName || 'Your Company Name',
    contactName: initialData.contactName || 'Your Name',
    email: initialData.email || 'your.email@example.com',
    phone: initialData.phone || '+1234567890',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    country: initialData.country || '',
    postalCode: initialData.postalCode || '',
    website: initialData.website || '',
    description: initialData.description || '',
    logo: initialData.logo || null,
    certifications: initialData.certifications || [],
    socialMedia: initialData.socialMedia || {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Here you would typically send the data to your API
      // const response = await fetch('/api/vendor/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Failed to update profile');
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors({
        form: 'Failed to update profile. Please try again later.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
          <h1 className="text-2xl font-bold text-white">{formData.companyName}</h1>
          <p className="text-emerald-100">{formData.description.substring(0, 100)}...</p>
        </div>
        
        {/* Logo */}
        <div className="absolute -bottom-16 left-6">
          <div className="relative w-32 h-32 rounded-lg bg-white dark:bg-gray-700 shadow-lg overflow-hidden border-4 border-white dark:border-gray-700">
            {formData.logo ? (
              <Image 
                src={formData.logo} 
                alt={formData.companyName} 
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Building className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {isEditing && (
              <label htmlFor="logo-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
                <input 
                  id="logo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleLogoChange}
                />
              </label>
            )}
          </div>
        </div>
        
        {/* Edit button */}
        <div className="absolute top-4 right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white text-emerald-600 rounded-md shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="mx-6 mt-20 mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Profile updated successfully!
        </div>
      )}
      
      {/* Error message */}
      {errors.form && (
        <div className="mx-6 mt-20 mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {errors.form}
        </div>
      )}
      
      {/* Profile content */}
      <div className={`p-6 ${!showSuccess && !errors.form ? 'mt-20' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Company Information
              </h2>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? `border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500` 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certifications & Compliance
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.length > 0 ? (
                    formData.certifications.map((cert, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {cert}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No certifications added yet</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Contact Information
              </h2>
              
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Person *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? `border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500` 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? `border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500` 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? `border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500 focus:border-emerald-500` 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`block w-full pl-10 py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full py-2 sm:text-sm rounded-md ${
                      isEditing 
                        ? 'border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-none'
                    } dark:text-white`}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}