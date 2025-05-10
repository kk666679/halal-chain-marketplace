'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto text-center">
        <Link href="/" className="inline-block">
          <Image 
            src="/images/logo.png" 
            alt="HalalChain" 
            width={200} 
            height={50} 
            className="mx-auto"
          />
        </Link>
        
        <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto flex items-center justify-center">
            <FaCheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Registration Successful!</h1>
          
          <p className="mt-2 text-gray-600">
            Thank you for registering with HalalChain Marketplace. Your application has been received and is being reviewed by our team.
          </p>
          
          <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4 text-left">
            <h2 className="text-sm font-medium text-green-800">What happens next?</h2>
            <ul className="mt-2 text-sm text-green-700 list-disc pl-5 space-y-1">
              <li>Our team will review your application within 1-2 business days</li>
              <li>You'll receive an email confirmation at the address you provided</li>
              <li>Once approved, you'll be able to access your vendor dashboard</li>
              <li>You can then start listing your halal-certified products</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Return to Home
            </Link>
          </div>
          
          <div className="mt-4">
            <Link 
              href="/contact"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Have questions? Contact our support team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}