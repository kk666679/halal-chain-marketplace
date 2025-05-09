import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="w-full py-16 bg-green-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join the HalalChain Ecosystem?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Whether you're a vendor looking to expand your reach or a consumer seeking authentic halal products,
          HalalChain Marketplace provides the platform you need.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/marketplace" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
            Explore Marketplace
          </Link>
          <Link href="/vendor/register" className="bg-transparent hover:bg-green-600 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Become a Vendor
          </Link>
        </div>
      </div>
    </section>
  );
}