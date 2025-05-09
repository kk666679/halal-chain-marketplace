import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/images/halal-chain-logo-white.png" 
                  alt="HalalChain Logo" 
                  fill
                  style={{objectFit: "contain"}}
                />
              </div>
              <span className="text-xl font-bold text-white">HalalChain</span>
            </Link>
            <p className="text-gray-400 mb-4">
              A blockchain-powered halal certification and supply chain platform ensuring authenticity and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/halalchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://facebook.com/halalchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com/halalchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com/company/halalchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/halalchain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white transition duration-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-gray-400 hover:text-white transition duration-300">
                  Vendors
                </Link>
              </li>
              <li>
                <Link href="/certification" className="text-gray-400 hover:text-white transition duration-300">
                  Certification
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Portals</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portals/government" className="text-gray-400 hover:text-white transition duration-300">
                  Government Portal
                </Link>
              </li>
              <li>
                <Link href="/portals/developer" className="text-gray-400 hover:text-white transition duration-300">
                  Developer Hub
                </Link>
              </li>
              <li>
                <Link href="/portals/vendor" className="text-gray-400 hover:text-white transition duration-300">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-400 hover:text-white transition duration-300">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/blockchain/explorer" className="text-gray-400 hover:text-white transition duration-300">
                  Blockchain Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Chemmara Enterprise</span>
                <span className="block">Jalan Halal 1, Seri Kembangan</span>
                <span className="block">Kuala Lumpur, Malaysia</span>
              </li>
              <li className="text-gray-400">
                <span className="block">Email: info@halal-chain.com</span>
                <span className="block">Phone: +60104351747</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Send Message
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HalalChain. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}