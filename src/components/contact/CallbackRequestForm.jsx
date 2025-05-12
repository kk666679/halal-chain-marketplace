'use client';

import { useState } from 'react';
import { FaPhone, FaCalendarAlt, FaClock, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CallbackRequestForm = ({
  title = 'Request a Callback',
  description = 'Leave your details and we\'ll call you back at your preferred time.',
  theme = 'primary',
  variant = 'default',
  onSubmit = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [timePreference, setTimePreference] = useState('anytime');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle time preference selection
  const handleTimePreferenceChange = (preference) => {
    setTimePreference(preference);
    
    // Clear custom date/time if "anytime" is selected
    if (preference === 'anytime') {
      setFormData(prev => ({ ...prev, date: '', time: '' }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // If onSubmit prop is provided, call it with form data
      if (onSubmit) {
        await onSubmit({
          ...formData,
          timePreference
        });
      }
      
      // Show success message
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          message: ''
        });
        setTimePreference('anytime');
      }, 5000);
    } catch (error) {
      console.error('Error submitting callback request:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Theme styles
  const themeStyles = {
    primary: {
      bg: 'bg-white',
      border: 'border-emerald-200',
      heading: 'text-emerald-800',
      button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      focus: 'focus:ring-emerald-500 focus:border-emerald-500',
      activeTab: 'bg-emerald-100 text-emerald-800',
      success: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    secondary: {
      bg: 'bg-white',
      border: 'border-gray-200',
      heading: 'text-gray-800',
      button: 'bg-gray-800 hover:bg-gray-900 text-white',
      focus: 'focus:ring-gray-500 focus:border-gray-500',
      activeTab: 'bg-gray-100 text-gray-800',
      success: 'bg-gray-50 text-gray-800 border-gray-200'
    },
    accent: {
      bg: 'bg-white',
      border: 'border-amber-200',
      heading: 'text-amber-800',
      button: 'bg-amber-500 hover:bg-amber-600 text-white',
      focus: 'focus:ring-amber-500 focus:border-amber-500',
      activeTab: 'bg-amber-100 text-amber-800',
      success: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  };
  
  // Variant styles
  const variantStyles = {
    default: 'rounded-xl shadow-md p-6',
    compact: 'rounded-lg shadow-sm p-4',
    minimal: 'rounded border p-4',
    elevated: 'rounded-xl shadow-lg p-6'
  };
  
  // Get tomorrow's date in YYYY-MM-DD format for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${themeStyles[theme].bg} ${themeStyles[theme].border} border ${variantStyles[variant]}`}
    >
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${themeStyles[theme].success} p-6 rounded-lg border text-center`}
        >
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FaCheck className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Thank You!</h3>
          <p className="text-sm">
            Your callback request has been received. We'll call you at your preferred time.
          </p>
        </motion.div>
      ) : (
        <>
          <h3 className={`text-xl font-bold mb-2 ${themeStyles[theme].heading}`}>{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                  required
                />
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                    required
                  />
                </div>
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                />
              </div>
              
              {/* Time Preference Tabs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When should we call you? *
                </label>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleTimePreferenceChange('anytime')}
                    className={`flex-1 py-2 text-sm font-medium ${timePreference === 'anytime' ? themeStyles[theme].activeTab : 'bg-white text-gray-700'}`}
                  >
                    Anytime
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTimePreferenceChange('specific')}
                    className={`flex-1 py-2 text-sm font-medium ${timePreference === 'specific' ? themeStyles[theme].activeTab : 'bg-white text-gray-700'}`}
                  >
                    Specific Time
                  </button>
                </div>
              </div>
              
              {/* Date and Time (if specific time is selected) */}
              {timePreference === 'specific' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={tomorrowFormatted}
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                        required={timePreference === 'specific'}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                        required={timePreference === 'specific'}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${themeStyles[theme].focus} focus:outline-none`}
                  placeholder="Let us know what you'd like to discuss..."
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${themeStyles[theme].button} py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeStyles[theme].focus} transition-colors`}
                >
                  {loading ? 'Submitting...' : 'Request Callback'}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default CallbackRequestForm;