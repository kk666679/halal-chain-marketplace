"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDiscord } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const solutions = [
    { name: 'Certification', href: '/certification' },
    { name: 'Supply Chain', href: '/supply-chain' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Neural Interface', href: '/neural-interface' },
    { name: 'Quantum Security', href: '/quantum-security' }
  ];
  
  const regions = [
    { name: 'ASEAN', href: '/integrations/regional?region=asean' },
    { name: 'Australia', href: '/integrations/regional?region=australia' },
    { name: 'Dubai', href: '/integrations/regional?region=dubai' },
    { name: 'GCC', href: '/integrations/regional?region=gcc' },
    { name: 'MENA', href: '/integrations/regional?region=mena' },
    { name: 'EU', href: '/integrations/regional?region=eu' },
    { name: 'China', href: '/integrations/regional?region=china' },
    { name: 'Russia', href: '/integrations/regional?region=russia' }
  ];
  
  const portals = [
    { name: 'Government', href: '/portals/government' },
    { name: 'Developer', href: '/portals/developer' },
    { name: 'Vendor', href: '/portals/vendor' },
    { name: 'Education', href: '/portals/education' },
    { name: 'Research', href: '/portals/research' },
    { name: 'Standards', href: '/portals/standards' }
  ];
  
  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Contact', href: '/contact' }
  ];
  
  const legal = [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Compliance', href: '/compliance' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-10 w-40">
                <Image
                  src="/images/halalchain.png"
                  alt="HalalChain"
                  fill
                  style={{objectFit: "contain"}}
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              HalalChain is revolutionizing halal certification and supply chain transparency through 
              quantum-secure blockchain technology, neural interfaces, and AI-powered verification.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
              <a href="https://discord.gg/ZRnFwr64" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaDiscord size={20} />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Regions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Regions</h3>
            <ul className="space-y-2">
              {regions.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Portals</h3>
            <ul className="space-y-2">
              {portals.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-500 mr-3" size={20} />
              <span className="text-gray-400">35, Jalan 18/34, Taman Sri Serdang, Seri Kembangan, Selangor, Malaysia</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-green-500 mr-3" size={20} />
              <span className="text-gray-400">+60104351747</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-green-500 mr-3" size={20} />
              <span className="text-gray-400">admin@chemmara.com</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} HalalChain. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex items-center mr-6">
              <span className="text-gray-400 text-sm mr-2">Language:</span>
              <select className="bg-gray-800 text-gray-400 text-sm rounded-md border-none focus:ring-0">
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="ms">Bahasa Melayu</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
            <div className="flex items-center">
              <Image
                src="/images/halal-certified-badge.png"
                alt="Halal Certified"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}