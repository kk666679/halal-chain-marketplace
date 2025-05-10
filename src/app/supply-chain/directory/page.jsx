import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Truck, 
  Package, 
  Factory, 
  ShoppingBag,
  ChevronRight,
  Star,
  Award
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SupplyChainDirectoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Supply Chain Directory
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Discover and connect with verified halal supply chain partners across the globe
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by company name, location, or certification type..."
                className="block w-full pl-10 pr-4 py-3 border border-transparent rounded-lg bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70 text-white"
              />
              <button className="absolute inset-y-0 right-0 px-4 text-white bg-emerald-700 hover:bg-emerald-800 rounded-r-lg flex items-center">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm">
                <option value="">All Categories</option>
                <option value="producer">Producers</option>
                <option value="processor">Processors</option>
                <option value="distributor">Distributors</option>
                <option value="retailer">Retailers</option>
                <option value="certifier">Certifiers</option>
              </select>
              
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm">
                <option value="">All Regions</option>
                <option value="asia">Asia</option>
                <option value="middle_east">Middle East</option>
                <option value="europe">Europe</option>
                <option value="north_america">North America</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
                <option value="south_america">South America</option>
              </select>
              
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm">
                <option value="">All Certifications</option>
                <option value="halal">Halal</option>
                <option value="organic">Organic</option>
                <option value="gmo_free">GMO-Free</option>
                <option value="fair_trade">Fair Trade</option>
              </select>
              
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm">
                <option value="">Sort By</option>
                <option value="rating">Rating</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Directory Listings */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Producer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/farm.jpg" 
                  alt="Organic Halal Farms" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Producer
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Organic Halal Farms
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Kuala Lumpur, Malaysia
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Halal Certified
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded">
                    Organic
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Specializing in organic halal meat and poultry production with sustainable farming practices.
                </p>
                <Link 
                  href="/supply-chain/directory/organic-halal-farms" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Processor Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/processor.jpg" 
                  alt="Global Halal Processing" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Processor
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Global Halal Processing
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Jakarta, Indonesia
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Halal Certified
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded">
                    ISO 22000
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  State-of-the-art halal food processing facility with blockchain-verified supply chain tracking.
                </p>
                <Link 
                  href="/supply-chain/directory/global-halal-processing" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Distributor Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/distributor.jpg" 
                  alt="HalalExpress Logistics" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Distributor
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    HalalExpress Logistics
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Dubai, UAE
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Halal Certified
                  </span>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs px-2 py-1 rounded">
                    Cold Chain
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Specialized in temperature-controlled logistics for halal food products with real-time tracking.
                </p>
                <Link 
                  href="/supply-chain/directory/halalexpress-logistics" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Retailer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/retailer.jpg" 
                  alt="Halal Harvest Market" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Retailer
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Halal Harvest Market
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.6</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    London, UK
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Halal Certified
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded">
                    Organic
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Premium halal grocery store with QR code scanning for product verification and supply chain transparency.
                </p>
                <Link 
                  href="/supply-chain/directory/halal-harvest-market" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Certifier Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/certifier.jpg" 
                  alt="Global Halal Authority" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Certifier
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Global Halal Authority
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Riyadh, Saudi Arabia
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded">
                    Accredited
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Blockchain Verified
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Leading halal certification authority with blockchain-based verification and global recognition.
                </p>
                <Link 
                  href="/supply-chain/directory/global-halal-authority" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Technology Provider Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 relative">
                <Image 
                  src="/images/supply-chain/tech.jpg" 
                  alt="HalalTech Solutions" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Technology
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    HalalTech Solutions
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Singapore
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                    IoT Provider
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                    Blockchain
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Providing IoT sensors and blockchain solutions for halal supply chain tracking and verification.
                </p>
                <Link 
                  href="/supply-chain/directory/halaltech-solutions" 
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View Profile
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-emerald-50 dark:bg-emerald-900/20 text-sm font-medium text-emerald-600 dark:text-emerald-400"
              >
                2
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                ...
              </span>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Global Supply Chain Map
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our interactive map to find halal supply chain partners in your region
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden h-96 relative">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">
                Interactive map loading...
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Directory CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join Our Supply Chain Directory
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Connect with potential partners, increase your visibility, and grow your business in the halal market
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register/vendor" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-gray-100"
              >
                Register as Vendor
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-emerald-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}