'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';

export default function RegistrationSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const [redirectType, setRedirectType] = useState('');
  
  useEffect(() => {
    // Determine user type from URL or localStorage
    const path = window.location.pathname;
    let userType = 'customer';
    
    if (path.includes('vendor')) {
      userType = 'vendor';
    } else if (path.includes('developer')) {
      userType = 'developer';
    }
    
    setRedirectType(userType);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect based on user type
          if (userType === 'vendor') {
            window.location.href = '/dashboard/vendor';
          } else if (userType === 'developer') {
            window.location.href = '/dashboard/developer';
          } else {
            window.location.href = '/dashboard';
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getTitle = () => {
    switch (redirectType) {
      case 'vendor':
        return 'Vendor Registration Successful!';
      case 'developer':
        return 'Developer Registration Successful!';
      default:
        return 'Registration Successful!';
    }
  };
  
  const getMessage = () => {
    switch (redirectType) {
      case 'vendor':
        return 'Your vendor account has been created. You can now access the vendor dashboard to manage your products and certifications.';
      case 'developer':
        return 'Your developer account has been created. You can now access the developer dashboard to manage your API keys and integrations.';
      default:
        return 'Your account has been created. You can now explore halal-certified products and track their authenticity.';
    }
  };
  
  const getNextSteps = () => {
    switch (redirectType) {
      case 'vendor':
        return [
          'Complete your vendor profile',
          'Upload your product catalog',
          'Apply for halal certification',
          'Connect with the HalalChain marketplace'
        ];
      case 'developer':
        return [
          'Generate your API keys',
          'Explore the API documentation',
          'Test in the sandbox environment',
          'Implement the integration'
        ];
      default:
        return [
          'Complete your profile',
          'Set your preferences',
          'Explore halal-certified products',
          'Download the mobile app for on-the-go verification'
        ];
    }
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
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-6">
                <Check size={40} />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {getTitle()}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {getMessage()}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Next Steps
                </h2>
                
                <ul className="space-y-4">
                  {getNextSteps().map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-left">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You will be redirected to your dashboard in <span className="font-semibold">{countdown}</span> seconds.
              </p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
                <div 
                  className="bg-green-500 h-2 rounded-full animate-progress"
                  style={{ animationDuration: '5s' }}
                ></div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Link 
                  href={redirectType === 'vendor' ? '/dashboard/vendor' : redirectType === 'developer' ? '/dashboard/developer' : '/dashboard'}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}