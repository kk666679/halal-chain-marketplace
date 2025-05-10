'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import InputField from '@/components/forms/InputField';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import Captcha from '@/components/forms/Captcha';
import TwoFactorSetup from '@/components/forms/TwoFactorSetup';

export default function CustomerRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    preferences: [],
    agreeTerms: false,
    receiveUpdates: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Dietary preferences options
  const dietaryPreferences = [
    { id: 'halal_only', label: 'Halal Only' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'organic', label: 'Organic' },
    { id: 'no_preservatives', label: 'No Preservatives' },
    { id: 'no_artificial_flavors', label: 'No Artificial Flavors' },
    { id: 'local_sourced', label: 'Locally Sourced' },
    { id: 'sustainable', label: 'Sustainable Practices' }
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
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeTerms' || name === 'receiveUpdates') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle dietary preferences checkboxes
        const updatedPreferences = checked
          ? [...formData.preferences, name]
          : formData.preferences.filter(pref => pref !== name);
        
        setFormData(prev => ({ ...prev, preferences: updatedPreferences }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
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
    
    // Validate captcha
    if (!captchaVerified) {
      newErrors.captcha = 'Please complete the CAPTCHA verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Move to 2FA setup step
      setCurrentStep(2);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTwoFactorComplete = () => {
    setRegistrationComplete(true);
    // Redirect to success page after a short delay
    setTimeout(() => {
      window.location.href = '/register/success';
    }, 2000);
  };
  
  const handleTwoFactorSkip = () => {
    setRegistrationComplete(true);
    // Redirect to success page after a short delay
    setTimeout(() => {
      window.location.href = '/register/success';
    }, 2000);
  };

  // Calculate password strength score (0-4)
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(4, score);
  };
  
  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const passwordStrengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Create Your Customer Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join HalalChain to discover and verify authentic halal products.</p>
          </div>
          
          {/* Registration Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {currentStep > 1 ? <Check size={16} /> : 1}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  currentStep >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  Account Details
                </div>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${
                currentStep > 1 ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {currentStep > 2 ? <Check size={16} /> : 2}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  currentStep >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  Security Setup
                </div>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${
                currentStep > 2 ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  registrationComplete ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {registrationComplete ? <Check size={16} /> : 3}
                </div>
                <div className={`ml-2 text-sm font-medium ${
                  registrationComplete ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  Complete
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {errors.form && (
                <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 rounded-md p-4 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}
              
              {currentStep === 1 && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
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
                        id="phone"
                        name="phone"
                        type="tel"
                        label="Phone Number (optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  
                  {/* Account Security */}
                  <div>
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
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Password strength:</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${passwordStrengthColors[passwordStrength]}`}
                              style={{ width: `${(passwordStrength + 1) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 w-16">
                            {passwordStrengthLabels[passwordStrength]}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Location */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location (Optional)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                          aria-label="Select your country"
                        >
                          <option value="">Select a country</option>
                          {countries.map(country => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <InputField
                        id="city"
                        name="city"
                        label="City"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dietary Preferences</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dietaryPreferences.map(preference => (
                        <Checkbox
                          key={preference.id}
                          id={preference.id}
                          name={preference.id}
                          label={preference.label}
                          checked={formData.preferences.includes(preference.id)}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* CAPTCHA */}
                  <div>
                    <Captcha 
                      onVerify={handleCaptchaVerify} 
                      onError={handleCaptchaError} 
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
                  
                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      fullWidth
                      size="lg"
                    >
                      Continue to Security Setup
                    </Button>
                    
                    <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <Link href="/login" className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              )}
              
              {currentStep === 2 && (
                <TwoFactorSetup 
                  onComplete={handleTwoFactorComplete}
                  onSkip={handleTwoFactorSkip}
                />
              )}
              
              {registrationComplete && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                    <Check size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Registration Complete!
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your account has been created successfully. Redirecting to your dashboard...
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