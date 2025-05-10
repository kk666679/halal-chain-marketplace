'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import InputField from '@/components/forms/InputField';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import TextArea from '@/components/forms/TextArea';
import FileUpload from '@/components/forms/FileUpload';
import Captcha from '@/components/forms/Captcha';
import PasswordStrengthMeter from '@/components/forms/PasswordStrengthMeter';
import ProgressSteps from '@/components/forms/ProgressSteps';
import TwoFactorSetup from '@/components/forms/TwoFactorSetup';

export default function VendorRegistrationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    website: '',
    description: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    taxId: '',
    businessLicense: null,
    halalCertificates: [],
    logo: null,
    agreeTerms: false,
    receiveUpdates: false,
    blockchainVerification: false
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
    { label: 'Company Info' },
    { label: 'Account' },
    { label: 'Business Details' },
    { label: 'Documents' },
    { label: 'Security' }
  ];
  
  // Business type options
  const businessTypes = [
    { value: 'manufacturer', label: 'Manufacturer' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'retailer', label: 'Retailer' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'food_service', label: 'Food Service' },
    { value: 'importer', label: 'Importer/Exporter' },
    { value: 'processor', label: 'Food Processor' },
    { value: 'other', label: 'Other' }
  ];
  
  // Country options
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'sg', label: 'Singapore' },
    { value: 'my', label: 'Malaysia' },
    { value: 'id', label: 'Indonesia' },
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'sa', label: 'Saudi Arabia' },
    { value: 'qa', label: 'Qatar' },
    { value: 'kw', label: 'Kuwait' },
    { value: 'tr', label: 'Turkey' },
    { value: 'eg', label: 'Egypt' },
    { value: 'pk', label: 'Pakistan' },
    { value: 'in', label: 'India' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      if (name === 'halalCertificates') {
        setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
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
      // Validate company information
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      // Validate phone format
      const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
      if (formData.phone && !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (step === 2) {
      // Validate account security
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      
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
    } else if (step === 3) {
      // Validate business details
      if (!formData.address.trim()) newErrors.address = 'Business address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
      if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
    } else if (step === 4) {
      // Validate documents
      if (!formData.businessLicense) newErrors.businessLicense = 'Business license is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    } else if (step === 5) {
      // Validate captcha
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
        window.location.href = '/vendor/register/success';
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
  
  const handleTwoFactorComplete = () => {
    handleSubmit({ preventDefault: () => {} });
  };
  
  const handleTwoFactorSkip = () => {
    handleSubmit({ preventDefault: () => {} });
  };
  
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    
    if (name === 'halalCertificates') {
      setFormData(prev => ({ ...prev, [name]: [...prev[name], ...Array.from(files)] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const removeFile = (name, index) => {
    if (name === 'halalCertificates') {
      const updatedFiles = [...formData.halalCertificates];
      updatedFiles.splice(index, 1);
      setFormData(prev => ({ ...prev, [name]: updatedFiles }));
    } else {
      setFormData(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo.svg" 
                alt="HalalChain Logo" 
                width={64} 
                height={64} 
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Vendor Registration</h1>
            <p className="text-gray-600 dark:text-gray-400">Join HalalChain as a verified halal product vendor.</p>
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
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Company Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Company Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          id="companyName"
                          name="companyName"
                          label="Company Name"
                          value={formData.companyName}
                          onChange={handleChange}
                          error={errors.companyName}
                          required
                          autoComplete="organization"
                        />
                        
                        <InputField
                          id="contactName"
                          name="contactName"
                          label="Contact Person"
                          value={formData.contactName}
                          onChange={handleChange}
                          error={errors.contactName}
                          required
                          autoComplete="name"
                        />
                        
                        <InputField
                          id="email"
                          name="email"
                          type="email"
                          label="Business Email"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          autoComplete="email"
                          required
                        />
                        
                        <InputField
                          id="phone"
                          name="phone"
                          type="tel"
                          label="Business Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          autoComplete="tel"
                          required
                        />
                        
                        <div className="md:col-span-2">
                          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Business Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 border ${errors.businessType ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
                            required
                            aria-label="Select business type"
                          >
                            <option value="">Select business type</option>
                            {businessTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.businessType && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessType}</p>
                          )}
                        </div>
                        
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
                          <TextArea
                            id="description"
                            name="description"
                            label="Company Description (optional)"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            rows={4}
                            placeholder="Tell us about your company and products..."
                          />
                        </div>
                      </div>
                      
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
                  
                  {/* Step 2: Account Security */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
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
                  
                  {/* Step 3: Business Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Business Details</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <InputField
                            id="address"
                            name="address"
                            label="Business Address"
                            value={formData.address}
                            onChange={handleChange}
                            error={errors.address}
                            required
                            autoComplete="street-address"
                          />
                        </div>
                        
                        <InputField
                          id="city"
                          name="city"
                          label="City"
                          value={formData.city}
                          onChange={handleChange}
                          error={errors.city}
                          required
                          autoComplete="address-level2"
                        />
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 border ${errors.country ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white`}
                            required
                            aria-label="Select country"
                            autoComplete="country"
                          >
                            <option value="">Select a country</option>
                            {countries.map(country => (
                              <option key={country.value} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
                          )}
                        </div>
                        
                        <InputField
                          id="postalCode"
                          name="postalCode"
                          label="Postal Code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          error={errors.postalCode}
                          required
                          autoComplete="postal-code"
                        />
                        
                        <InputField
                          id="taxId"
                          name="taxId"
                          label="Tax ID / Business Registration Number"
                          value={formData.taxId}
                          onChange={handleChange}
                          error={errors.taxId}
                          required
                        />
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
                  
                  {/* Step 4: Documents & Verification */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Documents & Verification</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Business License <span className="text-red-500">*</span>
                          </label>
                          <FileUpload
                            id="businessLicense"
                            name="businessLicense"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            error={errors.businessLicense}
                            maxSize={5}
                            value={formData.businessLicense ? [formData.businessLicense] : []}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Existing Halal Certificates (optional)
                          </label>
                          <FileUpload
                            id="halalCertificates"
                            name="halalCertificates"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            multiple
                            maxSize={10}
                            value={formData.halalCertificates}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company Logo (optional)
                          </label>
                          <FileUpload
                            id="logo"
                            name="logo"
                            accept=".jpg,.jpeg,.png,.svg"
                            onChange={handleFileUpload}
                            maxSize={2}
                            value={formData.logo ? [formData.logo] : []}
                          />
                        </div>
                        
                        {/* Blockchain verification option */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Enhanced Verification</h3>
                          <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                            Enable blockchain verification for your business to provide additional trust and transparency to your customers.
                          </p>
                          <Checkbox
                            id="blockchainVerification"
                            name="blockchainVerification"
                            label="Enable blockchain verification for my business"
                            checked={formData.blockchainVerification}
                            onChange={handleChange}
                          />
                        </div>
                        
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
                            id="receiveUpdates"
                            name="receiveUpdates"
                            label="I would like to receive updates about products, services, and promotions"
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
                          type="button"
                          onClick={handleNextStep}
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Security Verification */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Verification</h2>
                      
                      <div className="space-y-8">
                        {/* CAPTCHA */}
                        <Captcha 
                          onVerify={handleCaptchaVerify} 
                          onError={handleCaptchaError} 
                        />
                        
                        {/* Two-factor authentication setup */}
                        <TwoFactorSetup 
                          onComplete={handleTwoFactorComplete}
                          onSkip={handleTwoFactorSkip}
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handlePrevStep}
                        >
                          Previous
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
                    Your vendor account has been created successfully. Redirecting to your dashboard...
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