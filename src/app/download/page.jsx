import Image from 'next/image';
import Link from 'next/link';
import { 
  Smartphone, 
  QrCode, 
  Shield, 
  Map, 
  Search, 
  Bell, 
  CheckCircle, 
  Zap,
  Award,
  BarChart
} from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                HalalChain Mobile App
              </h1>
              <p className="text-xl mb-8 text-emerald-100">
                Verify halal products, track supply chains, and access certifications from anywhere, anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://play.google.com/store/apps/details?id=com.halalchain.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image 
                    src="/images/google-play-badge.png" 
                    alt="Get it on Google Play" 
                    width={200} 
                    height={60} 
                    className="h-14 w-auto"
                  />
                </a>
                
                <a 
                  href="https://apps.apple.com/app/halalchain/id1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Image 
                    src="/images/app-store-badge.png" 
                    alt="Download on the App Store" 
                    width={200} 
                    height={60} 
                    className="h-14 w-auto"
                  />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-[500px]">
                <div className="absolute inset-0 bg-black rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800">
                  <Image
                    src="/images/app-screenshot.png"
                    alt="HalalChain App Screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            App Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <QrCode className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Scan & Verify
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scan product QR codes to instantly verify halal certification status and authenticity.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Map className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Supply Chain Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track products from farm to table with detailed supply chain information and blockchain verification.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Product Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Search our extensive database of halal-certified products, vendors, and certifiers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Bell className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Alerts & Notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive alerts about certification changes, product recalls, or supply chain issues.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Offline Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Verify products even without an internet connection using our secure offline mode.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <BarChart className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access personalized analytics and insights about your halal product consumption patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* QR Code Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Scan to Download
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Use your phone's camera to scan the QR code and download the HalalChain app directly to your device.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Android</h3>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md w-32 h-32 flex items-center justify-center">
                    <Image 
                      src="/images/android-qr.png" 
                      alt="Android App QR Code" 
                      width={100} 
                      height={100} 
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">iOS</h3>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md w-32 h-32 flex items-center justify-center">
                    <Image 
                      src="/images/ios-qr.png" 
                      alt="iOS App QR Code" 
                      width={100} 
                      height={100} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <Image 
                  src="/images/app-devices.png" 
                  alt="HalalChain App on multiple devices" 
                  width={500} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white rounded-full p-4 shadow-lg">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/testimonials/user1.jpg" 
                    alt="User" 
                    width={50} 
                    height={50} 
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Ahmed K.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "This app has completely changed how I shop for halal products. The QR scanning feature makes it so easy to verify if a product is truly halal certified."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/testimonials/user2.jpg" 
                    alt="User" 
                    width={50} 
                    height={50} 
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Fatima R.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I love being able to see the entire supply chain journey of my food. It gives me peace of mind knowing exactly where my halal products come from."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/testimonials/user3.jpg" 
                    alt="User" 
                    width={50} 
                    height={50} 
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Omar J.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a restaurant owner, this app has been invaluable for verifying our suppliers. The offline verification feature is especially useful when I'm at markets with poor reception."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Download the HalalChain App Today
          </h2>
          <p className="text-xl mb-10 text-emerald-100 max-w-3xl mx-auto">
            Join thousands of users who trust HalalChain for verifying halal products and tracking supply chains.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://play.google.com/store/apps/details?id=com.halalchain.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image 
                src="/images/google-play-badge.png" 
                alt="Get it on Google Play" 
                width={200} 
                height={60} 
                className="h-14 w-auto"
              />
            </a>
            
            <a 
              href="https://apps.apple.com/app/halalchain/id1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image 
                src="/images/app-store-badge.png" 
                alt="Download on the App Store" 
                width={200} 
                height={60} 
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}