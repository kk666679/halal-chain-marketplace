import Image from 'next/image';
import { FaCheckCircle, FaShieldAlt, FaFileContract, FaQrcode } from 'react-icons/fa';

export default function BlockchainSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Blockchain Verification</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our blockchain technology ensures transparency, security, and authenticity throughout the halal supply chain.
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
                <h3 className="text-xl font-semibold mb-2">Immutable Certification Records</h3>
                <p className="text-gray-600">
                  Once a certification is issued and recorded on the blockchain, it cannot be altered or tampered with, 
                  ensuring the highest level of trust and security.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaFileContract className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
                <p className="text-gray-600">
                  Automated smart contracts enforce compliance with halal standards throughout the supply chain, 
                  triggering alerts for any deviations from established protocols.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaQrcode className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">QR Code Verification</h3>
                <p className="text-gray-600">
                  Each product includes a unique QR code that consumers can scan to instantly verify its halal 
                  certification status and view its complete supply chain journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">End-to-End Traceability</h3>
                <p className="text-gray-600">
                  Track every step of the product journey from source to shelf, with timestamped verification 
                  at each checkpoint to ensure halal integrity is maintained.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}