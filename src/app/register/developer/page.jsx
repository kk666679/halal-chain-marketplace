'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Check, AlertCircle, Code, ExternalLink } from 'lucide-react';
import InputField from '@/components/forms/InputField';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import TextArea from '@/components/forms/TextArea';
import Captcha from '@/components/forms/Captcha';
import PasswordStrengthMeter from '@/components/forms/PasswordStrengthMeter';
import ProgressSteps from '@/components/forms/ProgressSteps';

export default function DeveloperRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    jobTitle: '',
    website: '',
    github: '',
    projectDescription: '',
    apiUsage: '',
    integrationType: [],
    platformIntegrations: [],
    expectedRequests: '',
    agreeTerms: false,
    agreeApiTerms: false,
    receiveUpdates: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Form steps
  const steps = [
    { label: 'Personal Info' },
    { label: 'Project Details' },
    { label: 'API Access' },
    { label: 'Complete' }
  ];
  
  // Integration type options
  const integrationTypes = [
    { id: 'e_commerce', label: 'E-commerce Platform' },
    { id: 'mobile_app', label: 'Mobile App' },
    { id: 'website', label: 'Website' },
    { id: 'pos', label: 'Point of Sale System' },
    { id: 'erp', label: 'ERP System' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'social_media', label: 'Social Media Platform' },
    { id: 'blockchain', label: 'Blockchain Application' }
  ];
  
  // Platform integration options
  const platformIntegrations = [
    { id: 'shopify', label: 'Shopify' },
    { id: 'woocommerce', label: 'WooCommerce' },
    { id: 'amazon', label: 'Amazon' },
    { id: 'ebay', label: 'eBay' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'twitter', label: 'X (Twitter)' },
    { id: 'linkedin', label: 'LinkedIn' }
  ];
  
  // API usage options
  const apiUsageOptions = [
    { value: 'certification_verification', label: 'Certification Verification' },
    { value: 'product_listing', label: 'Product Listing' },
    { value: 'supply_chain', label: 'Supply Chain Tracking' },
    { value: 'marketplace_integration', label: 'Marketplace Integration' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'ai_agents', label: 'AI Agents Integration' },
    { value: 'other', label: 'Other' }
  ];
  
  // Expected monthly API requests
  const requestOptions = [
    { value: 'under_1000', label: 'Under 1,000' },
    { value: '1000_10000', label: '1,000 - 10,000' },
    { value: '10000_100000', label: '10,000 - 100,000' },
    { value: '100000_1000000', label: '100,000 - 1,000,000' },
    { value: 'over_1000000', label: 'Over 1,000,000' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeTerms' || name === 'agreeApiTerms' || name === 'receiveUpdates') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else if (name.startsWith('platform_')) {
        // Handle platform integration checkboxes
        const platformId = name.replace('platform_', '');
        const updatedPlatforms = checked
          ? [...formData.platformIntegrations, platformId]
          : formData.platformIntegrations.filter(p => p !== platformId);
        
        setFormData(prev => ({ ...prev, platformIntegrations: updatedPlatforms }));
      } else {
        // Handle integration type checkboxes
        const updatedTypes = checked
          ? [...formData.integrationType, name]
          : formData.integrationType.filter(type => type !== name);
        
        setFormData(prev => ({ ...prev, integrationType: updatedTypes }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate personal information
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      // Validate password strength
      if (formData.password) {
        if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
          newErrors.password = 'Password must include uppercase, lowercase, number and special character';
        }
      }
      
      // Validate password match
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      // Validate GitHub URL format if provided
      if (formData.github && !formData.github.includes('github.com')) {
        newErrors.github = 'Please enter a valid GitHub URL';
      }
    } else if (step === 2) {
      // Validate project details
      if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
      if (formData.integrationType.length === 0) newErrors.integrationType = 'Please select at least one integration type';
    } else if (step === 3) {
      // Validate API access details
      if (!formData.apiUsage) newErrors.apiUsage = 'API usage is required';
      if (!formData.expectedRequests) newErrors.expectedRequests = 'Expected monthly requests is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
      if (!formData.agreeApiTerms) newErrors.agreeApiTerms = 'You must agree to the API terms of use';
      if (!captchaVerified) newErrors.captcha = 'Please complete the CAPTCHA verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registration complete
      setRegistrationComplete(true);
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        window.location.href = '/register/success';
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCaptchaVerify = (verified) => {
    setCaptchaVerified(verified);
    if (verified) {
      setErrors(prev => ({ ...prev, captcha: '' }));
    }
  };

  const handleCaptchaError = (errorMessage) => {
    setErrors(prev => ({ ...prev, captcha: errorMessage }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo.svg" 
                alt="HalalChain Logo" 
                width={64} 
                height={64} 
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Developer Registration</h1>
            <p className="text-gray-600 dark:text-gray-400">Join HalalChain's developer program to integrate halal certification into your applications.</p>
          </div>
          
          {/* Progress Steps */}
          <ProgressSteps steps={steps} currentStep={currentStep} />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {errors.form && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 rounded-md p-4 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}
              
              {!registrationComplete ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          error={errors.firstName}
                          required
                          autoComplete="given-name"
                        />
                        
                        <InputField
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          error={errors.lastName}
                          required
                          autoComplete="family-name"
                        />
                        
                        <InputField
                          id="email"
                          name="email"
                          type="email"
                          label="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          autoComplete="email"
                          required
                        />
                        
                        <InputField
                          id="company"
                          name="company"
                          label="Company/Organization (optional)"
                          value={formData.company}
                          onChange={handleChange}
                          error={errors.company}
                          autoComplete="organization"
                        />
                        
                        <InputField
                          id="jobTitle"
                          name="jobTitle"
                          label="Job Title (optional)"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          error={errors.jobTitle}
                          autoComplete="organization-title"
                        />
                        
                        <InputField
                          id="website"
                          name="website"
                          label="Website (optional)"
                          value={formData.website}
                          onChange={handleChange}
                          error={errors.website}
                          autoComplete="url"
                          placeholder="https://"
                        />
                        
                        <div className="md:col-span-2">
                          <InputField
                            id="github"
                            name="github"
                            label="GitHub Profile (optional)"
                            value={formData.github}
                            onChange={handleChange}
                            error={errors.github}
                            placeholder="https://github.com/username"
                          />
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Security</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <InputField
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            autoComplete="new-password"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <InputField
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            autoComplete="new-password"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      {/* Password strength indicator */}
                      {formData.password && (
                        <PasswordStrengthMeter password={formData.password} />
                      )}
                      
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h2>
                      
                      <div className="space-y-6">
                        <TextArea
                          id="projectDescription"
                          name="projectDescription"
                          label="Project Description"
                          value={formData.projectDescription}
                          onChange={handleChange}
                          error={errors.projectDescription}
                          rows={4}
                          placeholder="Describe your project and how you plan to integrate with HalalChain..."
                          required
                        />
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Integration Type (select all that apply) <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {integrationTypes.map(type => (
                              <Checkbox
                                key={type.id}
                                id={type.id}
                                name={type.id}
                                label={type.label}
                                checked={formData.integrationType.includes(type.id)}
                                onChange={handleChange}
                              />
                            ))}
                          </div>
                          {errors.integrationType && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.integrationType}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Platform Integrations (optional)
                          </label>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Select the platforms you plan to integrate with:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {platformIntegrations.map(platform => (
                              <Checkbox
                                key={platform.id}
                                id={`platform_${platform.id}`}
                                name={`platform_${platform.id}`}
                                label={platform.label}
                                checked={formData.platformIntegrations.includes(platform.id)}
                                onChange={handleChange}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handlePrevStep}
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNextStep}
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: API Access */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Access</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="apiUsage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Primary API Usage <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="apiUsage"
                            name="apiUsage"
                            value={formData.apiUsage}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 border ${errors.apiUsage ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
                            required
                            aria-label="Select primary API usage"
                          >
                            <option value="">Select primary API usage</option>
                            {apiUsageOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.apiUsage && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.apiUsage}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="expectedRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Expected Monthly API Requests <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="expectedRequests"
                            name="expectedRequests"
                            value={formData.expectedRequests}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 border ${errors.expectedRequests ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
                            required
                            aria-label="Select expected monthly API requests"
                          >
                            <option value="">Select expected volume</option>
                            {requestOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.expectedRequests && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.expectedRequests}</p>
                          )}
                        </div>
                        
                        {/* API Documentation Preview */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Documentation Preview</h3>
                            <Link href="/docs/api" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center text-sm">
                              View Full Documentation
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                          
                          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                            <pre className="text-green-400 text-sm"><code>{`// Example API Request
const response = await fetch('https://api.halalchain.com/v1/certifications/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    certificate_number: 'HC-12345678'
  })
});

const data = await response.json();
console.log(data.isValid); // true or false`}</code></pre>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Code className="h-4 w-4 mr-2" />
                            <span>Access to full API documentation and sandbox environment after registration</span>
                          </div>
                        </div>
                        
                        {/* CAPTCHA */}
                        <Captcha 
                          onVerify={handleCaptchaVerify} 
                          onError={handleCaptchaError} 
                        />
                        
                        {/* Terms and Conditions */}
                        <div className="space-y-4">
                          <Checkbox
                            id="agreeTerms"
                            name="agreeTerms"
                            label={
                              <span>
                                I agree to the{' '}
                                <Link href="/terms" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400">
                                  Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400">
                                  Privacy Policy
                                </Link>
                              </span>
                            }
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            error={errors.agreeTerms}
                            required
                          />
                          
                          <Checkbox
                            id="agreeApiTerms"
                            name="agreeApiTerms"
                            label={
                              <span>
                                I agree to the{' '}
                                <Link href="/api-terms" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400">
                                  API Terms of Use
                                </Link>{' '}
                                and will not exceed rate limits or misuse the API
                              </span>
                            }
                            checked={formData.agreeApiTerms}
                            onChange={handleChange}
                            error={errors.agreeApiTerms}
                            required
                          />
                          
                          <Checkbox
                            id="receiveUpdates"
                            name="receiveUpdates"
                            label="I would like to receive API updates, documentation changes, and developer newsletters"
                            checked={formData.receiveUpdates}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handlePrevStep}
                        >
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          isLoading={isLoading}
                        >
                          Complete Registration
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                    <Check size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Registration Complete!
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your developer account has been created successfully. Redirecting to your dashboard...
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 animate-progress"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}