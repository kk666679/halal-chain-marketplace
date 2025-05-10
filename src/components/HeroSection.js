import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat animate-slide"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            NEW FOR 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            HalalChain Marketplace <span className="text-yellow-300">Quantum Edition</span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">
            Next-Generation Halal Certification & Supply Chain Platform
          </h2>
          <p className="text-lg mb-8">
            Ensuring authenticity and transparency in halal products through quantum-secure blockchain verification, 
            neural-symbolic AI, and carbon-neutral supply chain management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/marketplace" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center">
              <span>Explore Marketplace</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/vendor/register" className="bg-transparent hover:bg-green-700 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Become a Vendor
            </Link>
          </div>
          
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="/images/user1.png" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="/images/user2.png" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="/images/user3.png" alt="User" />
            </div>
            <p className="ml-4 text-sm">
              <span className="font-bold">10,000+</span> vendors worldwide
            </p>
            <div className="ml-6 flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm">
                <span className="font-bold">4.9/5</span> rating
              </p>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80">
            {videoPlaying ? (
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/halal-chain-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <>
                <Image 
                  src="/images/halal-chain-hero.png" 
                  alt="HalalChain Platform Visualization" 
                  fill
                  style={{objectFit: "contain"}}
                  priority
                  className="drop-shadow-2xl"
                />
                <button 
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Trusted by section */}
      <div className="bg-green-900 bg-opacity-50 py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-green-100 text-sm mb-4">TRUSTED BY LEADING ORGANIZATIONS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img src="/images/partner1.png" alt="Partner" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/images/partner2.png" alt="Partner" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/images/partner3.png" alt="Partner" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/images/partner4.png" alt="Partner" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/images/partner5.png" alt="Partner" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}