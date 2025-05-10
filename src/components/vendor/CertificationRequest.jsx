'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle,
  Info,
  Send
} from 'lucide-react';

export default function CertificationRequest({ product = null }) {
  const [formData, setFormData] = useState({
    productId: product?.id || '',
    productName: product?.name || '',
    certificationTypes: [],
    ingredients: product?.ingredients || '',
    manufacturingProcess: '',
    sourceOfIngredients: '',
    additionalInfo: '',
    documents: [],
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const certificationTypes = [
    { id: 'halal', name: 'Halal Certification', description: 'Certifies that products meet Islamic dietary laws' },
    { id: 'organic', name: 'Organic Certification', description: 'Certifies products grown without synthetic fertilizers or pesticides' },
    { id: 'vegan', name: 'Vegan Certification', description: 'Certifies products contain no animal-derived ingredients' },
    { id: 'glutenFree', name: 'Gluten-Free Certification', description: 'Certifies products contain no gluten' },
    { id: 'nonGMO', name: 'Non-GMO Certification', description: 'Certifies products contain no genetically modified organisms' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'certificationTypes') {
      const updatedTypes = [...formData.certificationTypes];
      if (checked) {
        updatedTypes.push(value);
      } else {
        const index = updatedTypes.indexOf(value);
        if (index > -1) {
          updatedTypes.splice(index, 1);
        }
      }
      
      setFormData({
        ...formData,
        certificationTypes: updatedTypes
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
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

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newDocuments = [...formData.documents];
      
      files.forEach(file => {
        // Check if file is PDF or image
        if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
          newDocuments.push({
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            name: file.name,
            type: file.type,
            size: file.size,
            file: file
          });
        }
      });
      
      setFormData({
        ...formData,
        documents: newDocuments
      });
    }
  };

  const removeDocument = (id) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter(doc => doc.id !== id)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (formData.certificationTypes.length === 0) {
      newErrors.certificationTypes = 'At least one certification type must be selected';
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients information is required';
    }
    
    if (!formData.manufacturingProcess.trim()) {
      newErrors.manufacturingProcess = 'Manufacturing process information is required';
    }
    
    if (formData.documents.length === 0) {
      newErrors.documents = 'At least one supporting document is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (key === 'documents') {
      //     formData.documents.forEach(doc => {
      //       formDataToSend.append('documents', doc.file);
      //     });
      //   } else if (key === 'certificationTypes') {
      //     formDataToSend.append('certificationTypes', JSON.stringify(formData.certificationTypes));
      //   } else {
      //     formDataToSend.append(key, formData[key]);
      //   }
      // });
      
      // const response = await fetch('/api/certifications/request', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      
      // if (!response.ok) throw new Error('Failed to submit certification request');
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        productId: product?.id || '',
        productName: product?.name || '',
        certificationTypes: [],
        ingredients: product?.ingredients || '',
        manufacturingProcess: '',
        sourceOfIngredients: '',
        additionalInfo: '',
        documents: [],
        agreeToTerms: false
      });
    } catch (error) {
      console.error('Certification request error:', error);
      setErrors({
        form: 'Failed to submit certification request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (showSuccess) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Certification Request Submitted</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your certification request has been submitted successfully. Our team will review your application and get back to you within 3-5 business days.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/certifications"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              View My Certifications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Request Product Certification
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete the form below to request certification for your product. Our team will review your submission and guide you through the certification process.
        </p>
      </div>

      {/* Error message */}
      {errors.form && (
        <div className="m-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Product Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Product Information
            </h3>
            
            <div className="mt-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.productName ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
              )}
            </div>
          </div>

          {/* Certification Types */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Certification Types *
            </h3>
            
            <div className="mt-4 space-y-4">
              {certificationTypes.map((cert) => (
                <div key={cert.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={cert.id}
                      name="certificationTypes"
                      type="checkbox"
                      value={cert.id}
                      checked={formData.certificationTypes.includes(cert.id)}
                      onChange={handleChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={cert.id} className="font-medium text-gray-700 dark:text-gray-300">
                      {cert.name}
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">{cert.description}</p>
                  </div>
                </div>
              ))}
              {errors.certificationTypes && (
                <p className="mt-1 text-sm text-red-600">{errors.certificationTypes}</p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Product Details
            </h3>
            
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ingredients *
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  rows={3}
                  value={formData.ingredients}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md ${
                    errors.ingredients ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholder="List all ingredients with their sources"
                />
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="manufacturingProcess" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Manufacturing Process *
                </label>
                <textarea
                  id="manufacturingProcess"
                  name="manufacturingProcess"
                  rows={3}
                  value={formData.manufacturingProcess}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md ${
                    errors.manufacturingProcess ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholder="Describe the manufacturing process in detail"
                />
                {errors.manufacturingProcess && (
                  <p className="mt-1 text-sm text-red-600">{errors.manufacturingProcess}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="sourceOfIngredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Source of Ingredients
                </label>
                <textarea
                  id="sourceOfIngredients"
                  name="sourceOfIngredients"
                  rows={3}
                  value={formData.sourceOfIngredients}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Provide details about the sources of your ingredients"
                />
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Any additional information that might be relevant for certification"
                />
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Supporting Documents *
            </h3>
            
            <div className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Required Documents</h4>
                    <ul className="mt-1 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside">
                      <li>Product specification sheet</li>
                      <li>Ingredient list with sources</li>
                      <li>Manufacturing process flow chart</li>
                      <li>Existing certifications (if any)</li>
                      <li>Product packaging/label images</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    {formData.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(doc.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="document-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="document-upload"
                          name="document-upload"
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={handleDocumentUpload}
                          accept=".pdf,image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF or image files up to 10MB
                    </p>
                  </div>
                </div>
                
                {errors.documents && (
                  <p className="mt-1 text-sm text-red-600">{errors.documents}</p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="font-medium text-gray-700 dark:text-gray-300">
                I agree to the certification terms and conditions *
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                By checking this box, you agree to our{' '}
                <Link href="/certification-terms" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
                  Certification Terms and Conditions
                </Link>
                {' '}and acknowledge that all information provided is accurate and complete.
              </p>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Certification Request
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}