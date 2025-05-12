'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    setVideoPlaying(true);
  };

  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              <span className="gradient-text">Blockchain-Powered</span> Halal Certification Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
              Revolutionizing halal certification with blockchain technology, AI-powered multi-agent systems, and neural interfaces for transparent and authentic halal products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/certification" 
                className="btn-primary"
              >
                Get Certified
              </Link>
              <Link 
                href="/verify" 
                className="btn-secondary"
              >
                Verify Products
              </Link>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <Image 
                  src="/images/avatars/user-1.jpg" 
                  alt="User" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-white dark:border-gray-800"
                />
                <Image 
                  src="/images/avatars/user-2.jpg" 
                  alt="User" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-white dark:border-gray-800"
                />
                <Image 
                  src="/images/avatars/user-3.jpg" 
                  alt="User" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-white dark:border-gray-800"
                />
              </div>
              <div className="ml-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Trusted by</span>
                <p className="font-medium text-gray-900 dark:text-white">500+ Halal Businesses</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Video/Image */}
          <div className="lg:w-1/2 relative">
            <div className="glass-card shadow-soft overflow-hidden">
              {videoPlaying ? (
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="HalalChain Introduction" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              ) : (
                <div className="relative cursor-pointer" onClick={playVideo}>
                  <Image 
                    src="/images/hero-image.jpg" 
                    alt="HalalChain Platform" 
                    width={600} 
                    height={400} 
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary hover:bg-primary/90 transition-all duration-300 rounded-full p-4 shadow-lg animate-pulse-glow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                    <p className="font-medium">Watch how it works</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-primary/20 backdrop-blur-sm dark:bg-primary/30 rounded-full p-4 shadow-soft animate-float">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary/20 backdrop-blur-sm dark:bg-secondary/30 rounded-full p-4 shadow-soft animate-float" style={{ animationDelay: '0.5s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary dark:text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="url(#gradient)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 179, 149, 0.1)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
              <stop offset="100%" stopColor="rgba(130, 106, 249, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}