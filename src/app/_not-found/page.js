'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Home, ArrowRight, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Popular pages for suggestions
  const popularPages = [
    { title: 'Halal Certification', path: '/certification' },
    { title: 'Supply Chain Verification', path: '/supply-chain/verify' },
    { title: 'Marketplace', path: '/marketplace' },
    { title: 'Regional Integrations', path: '/integrations/regional' },
    { title: 'Contact Us', path: '/contact' },
    { title: 'About HalalChain', path: '/about' }
  ];

  // Simulate search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = popularPages.filter(page => 
          page.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <div className="relative h-40 w-40 mx-auto mb-6">
                <Image
                  src="/images/halalchain.svg"
                  alt="HalalChain Logo"
                  fill
                  priority
                  className="dark:invert"
                />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span className="text-emerald-600">404</span> - Page Not Found
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              We couldn't find the page you're looking for. It might have been moved, 
              deleted, or perhaps never existed.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
          >
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search for what you were looking for:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
                  </div>
                )}
              </div>
            </div>
            
            {suggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Search Results:
                </h3>
                <ul className="space-y-2">
                  {suggestions.map((page, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link 
                        href={page.path}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="flex-grow text-gray-800 dark:text-gray-200">{page.title}</span>
                        <ArrowRight className="h-4 w-4 text-emerald-600" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Popular Pages:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popularPages.map((page, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
                  >
                    <Link 
                      href={page.path}
                      className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                    >
                      <span className="flex-grow text-gray-800 dark:text-gray-200">{page.title}</span>
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              <Home className="h-5 w-5 mr-2" />
              Return to Homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-emerald-600 bg-transparent px-6 py-3 text-base font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              Contact Support
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} HalalChain Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}