"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/images/halal-chain-logo.png" 
                alt="HalalChain Logo" 
                fill
                style={{objectFit: "contain"}}
              />
            </div>
            <span className="text-xl font-bold text-green-700">HalalChain</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition duration-300">
              Marketplace
            </Link>
            <Link href="/vendors" className="text-gray-700 hover:text-green-600 transition duration-300">
              Vendors
            </Link>
            <Link href="/certification" className="text-gray-700 hover:text-green-600 transition duration-300">
              Certification
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition duration-300">
              About
            </Link>
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                Portals
              </button>
              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${isUserMenuOpen ? 'block' : 'hidden'}`}>
                <Link href="/portals/government" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                  Government Portal
                </Link>
                <Link href="/portals/developer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                  Developer Hub
                </Link>
                <Link href="/portals/vendor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">
                  Vendor Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FaSearch className="absolute left-3 text-gray-400" />
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-green-600 transition duration-300 relative">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-green-600 transition duration-300">
              <FaUser size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex items-center relative mb-4">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/marketplace" 
                className="text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                href="/vendors" 
                className="text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link 
                href="/certification" 
                className="text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Certification
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="py-2">
                <p className="font-semibold mb-2">Portals</p>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link 
                    href="/portals/government" 
                    className="text-gray-700 hover:text-green-600 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Government Portal
                  </Link>
                  <Link 
                    href="/portals/developer" 
                    className="text-gray-700 hover:text-green-600 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Developer Hub
                  </Link>
                  <Link 
                    href="/portals/vendor" 
                    className="text-gray-700 hover:text-green-600 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vendor Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex space-x-4 pt-2">
                <Link 
                  href="/cart" 
                  className="text-gray-700 hover:text-green-600 transition duration-300 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart size={20} className="mr-2" />
                  <span>Cart (0)</span>
                </Link>
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-green-600 transition duration-300 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser size={20} className="mr-2" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}