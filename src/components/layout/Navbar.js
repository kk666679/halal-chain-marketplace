'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaSearch, FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const pathname = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Solutions', 
      href: '#',
      dropdown: [
        { name: 'Certification', href: '/certification' },
        { name: 'Supply Chain', href: '/supply-chain' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Neural Interface', href: '/neural-interface' },
        { name: 'Quantum Security', href: '/quantum-security' }
      ]
    },
    { 
      name: 'Portals', 
      href: '#',
      dropdown: [
        { name: 'Government', href: '/portals/government' },
        { name: 'Developer', href: '/portals/developer' },
        { name: 'Vendor', href: '/portals/vendor' },
        { name: 'Education', href: '/portals/education' },
        { name: 'Research', href: '/portals/research' },
        { name: 'Standards', href: '/portals/standards' }
      ]
    },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' }
  ];
  
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src={scrolled ? "/images/halalchain.svg" : "/images/halalchain.svg"}
                alt="HalalChain"
                fill
                style={{objectFit: "contain"}}
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
                      isActive(link.href) 
                        ? 'text-primary font-medium' 
                        : scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary-100'
                    }`}
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {link.name}
                    <FaChevronDown className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive(link.href) 
                        ? 'text-primary font-medium' 
                        : scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-primary-100'
                    }`}
                  >
                    {link.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
                  </Link>
                )}
                
                {/* Dropdown */}
                {link.dropdown && (
                  <div
                    className={`absolute left-0 mt-2 w-56 rounded-xl shadow-soft bg-white/95 backdrop-blur-md border border-gray-100 transition-all duration-300 ${
                      dropdownOpen === index ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <div className="py-1">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg mx-1 my-0.5"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Search and Login */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
              <FaSearch />
            </button>
            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Login
            </Link>
            <Link
              href="/vendor/register"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block animate-slide-down' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-soft rounded-b-2xl">
          {navLinks.map((link, index) => (
            <div key={index}>
              {link.dropdown ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${
                      isActive(link.href) ? 'text-green-600 bg-green-50 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                  >
                    <span>{link.name}</span>
                    {dropdownOpen === index ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                  
                  {dropdownOpen === index && (
                    <div className="ml-4 mt-2 space-y-1">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-green-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg ${
                    isActive(link.href) ? 'text-green-600 bg-green-50 font-medium' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <Link
              href="/login"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/vendor/register"
              className="block px-3 py-2 mt-1 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}