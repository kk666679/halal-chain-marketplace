import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            HalalChain Marketplace
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">
            Blockchain-Powered Halal Certification & Supply Chain Platform
          </h2>
          <p className="text-lg mb-8">
            Ensuring authenticity and transparency in halal products through blockchain verification and AI-powered supply chain management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/marketplace" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
              Explore Marketplace
            </Link>
            <Link href="/vendor/register" className="bg-transparent hover:bg-green-700 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Become a Vendor
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80">
            <Image 
              src="/images/halal-chain-hero.png" 
              alt="HalalChain Platform Visualization" 
              fill
              style={{objectFit: "contain"}}
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}