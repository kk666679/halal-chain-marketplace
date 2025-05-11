'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CallToAction() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Subscribing email:', email);
    // Reset form
    setEmail('');
    // Show success message or redirect
  };

  return (
    <section className="bg-emerald-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Halal Business?</h2>
          <p className="text-lg mb-8">
            Join the HalalChain ecosystem and revolutionize how you certify, track, and sell halal products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/register/vendor" 
              className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Register as Vendor
            </Link>
            <Link 
              href="/certification" 
              className="bg-emerald-600 text-white hover:bg-emerald-800 px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-emerald-500"
            >
              Get Certified
            </Link>
          </div>
          
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                required
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-2 text-emerald-100">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}