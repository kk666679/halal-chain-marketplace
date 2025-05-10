import Image from 'next/image';
import { FaCheckCircle, FaShieldAlt, FaFileContract, FaQrcode, FaNetworkWired, FaGlobeAsia } from 'react-icons/fa';

export default function BlockchainSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quantum-Resistant Blockchain Verification</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our post-quantum blockchain technology ensures transparency, security, and authenticity throughout the halal supply chain,
            even against the most advanced computational threats.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96">
            <Image
              src="/images/blockchain-diagram.png"
              alt="Blockchain Verification Process"
              fill
              style={{objectFit: "contain"}}
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaShieldAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quantum-Resistant Certification Records</h3>
                <p className="text-gray-600">
                  Our blockchain now uses post-quantum cryptographic algorithms to ensure certification records remain 
                  secure even against quantum computing attacks, providing future-proof security and trust.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaFileContract className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Smart Contracts</h3>
                <p className="text-gray-600">
                  Our next-generation smart contracts now include AI-driven compliance verification, automatically adapting 
                  to regulatory changes across different jurisdictions while maintaining halal standards.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaQrcode className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Holographic Verification</h3>
                <p className="text-gray-600">
                  Each product now includes a unique holographic QR code that consumers can scan with AR glasses or smartphones 
                  to instantly verify its halal certification status and view its complete supply chain journey in 3D.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaNetworkWired className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Cross-Chain Interoperability</h3>
                <p className="text-gray-600">
                  Our platform now seamlessly integrates with all major blockchain networks, enabling global verification 
                  and certification recognition across different halal certification authorities worldwide.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaGlobeAsia className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Regulatory Compliance</h3>
                <p className="text-gray-600">
                  Our blockchain now automatically adapts to regulatory changes in over 120 countries, ensuring 
                  products remain compliant with both halal standards and local regulations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}