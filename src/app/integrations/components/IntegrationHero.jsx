import Image from 'next/image';
import Link from 'next/link';

export default function IntegrationHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">HalalChain Integration Hub</h1>
            <p className="text-xl mb-8">
              Connect your systems and applications to the HalalChain ecosystem with our comprehensive suite of APIs, SDKs, and integration tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/docs" className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
                View Documentation
              </Link>
              <Link href="/developer-portal" className="bg-transparent hover:bg-indigo-700 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Developer Portal
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-80 w-full">
              <Image
                src="/images/integration-hero.png"
                alt="Integration Diagram"
                fill
                style={{objectFit: "contain"}}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}