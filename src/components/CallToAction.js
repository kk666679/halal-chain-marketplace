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
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Ready to Transform Your Halal Business?</h2>
          <p className="text-lg mb-8">
            Join the HalalChain ecosystem and revolutionize how you certify, track, and sell halal products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/register/vendor" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Register as Vendor
            </Link>
            <Link 
              href="/certification" 
              className="bg-secondary/90 text-white hover:bg-secondary px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
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
                className="flex-grow px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-inner border-0"
                required
              />
              <button
                type="submit"
                className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
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