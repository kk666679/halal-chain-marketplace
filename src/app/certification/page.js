"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaSearch, FaQrcode, FaFileAlt, FaChain, FaShieldAlt } from 'react-icons/fa';

export default function Certification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('verify');

  // Mock function to simulate certificate verification
  const verifyCertificate = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for demonstration
      if (searchQuery.toLowerCase() === 'hc12345' || searchQuery.toLowerCase() === 'hc-12345') {
        setSearchResult({
          found: true,
          certificate: {
            id: 'HC-12345',
            productName: 'Premium Halal Beef',
            vendorName: 'Al-Baraka Farms',
            certifierName: 'Global Halal Authority',
            issuedDate: '2023-05-15',
            expiryDate: '2024-05-15',
            status: 'valid',
            blockchainTxId: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
            ipfsHash: 'QmW8FLpEMqLXxVuAD7Rp7HCFhRnGf8ybzK53xKnzqkFQKd',
            image: '/images/products/beef.png'
          }
        });
      } else if (searchQuery.toLowerCase() === 'hc67890' || searchQuery.toLowerCase() === 'hc-67890') {
        setSearchResult({
          found: true,
          certificate: {
            id: 'HC-67890',
            productName: 'Organic Halal Chicken',
            vendorName: 'Pure Poultry Co.',
            certifierName: 'International Halal Certification Board',
            issuedDate: '2023-08-22',
            expiryDate: '2024-08-22',
            status: 'valid',
            blockchainTxId: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
            ipfsHash: 'QmT9LpEMqLXxVuAD7Rp7HCFhRnGf8ybzK53xKnzqkFQKd',
            image: '/images/products/chicken.png'
          }
        });
      } else if (searchQuery.toLowerCase() === 'hc24680' || searchQuery.toLowerCase() === 'hc-24680') {
        setSearchResult({
          found: true,
          certificate: {
            id: 'HC-24680',
            productName: 'Halal Certified Honey',
            vendorName: 'Nature\'s Gold',
            certifierName: 'Global Halal Authority',
            issuedDate: '2023-03-10',
            expiryDate: '2024-03-10',
            status: 'valid',
            blockchainTxId: '0xd1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0',
            ipfsHash: 'QmR7LpEMqLXxVuAD7Rp7HCFhRnGf8ybzK53xKnzqkFQKd',
            image: '/images/products/honey.png'
          }
        });
      } else if (searchQuery.toLowerCase() === 'hc13579' || searchQuery.toLowerCase() === 'hc-13579') {
        setSearchResult({
          found: true,
          certificate: {
            id: 'HC-13579',
            productName: 'Halal Gummy Candies',
            vendorName: 'Sweet Delights',
            certifierName: 'International Halal Certification Board',
            issuedDate: '2022-11-05',
            expiryDate: '2023-11-05',
            status: 'expired',
            blockchainTxId: '0xg1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0',
            ipfsHash: 'QmP5LpEMqLXxVuAD7Rp7HCFhRnGf8ybzK53xKnzqkFQKd',
            image: '/images/products/gummies.png'
          }
        });
      } else {
        setSearchResult({
          found: false,
          message: 'No certificate found with the provided ID. Please check the ID and try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Halal Certification Verification</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Verify the authenticity of halal certifications using our blockchain-powered verification system.
            Ensuring transparency and trust in the halal supply chain.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-lg ${
              activeTab === 'verify'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('verify')}
          >
            Verify Certificate
          </button>
          <button
            className={`px-6 py-3 font-medium text-lg ${
              activeTab === 'about'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About Certification
          </button>
          <button
            className={`px-6 py-3 font-medium text-lg ${
              activeTab === 'process'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('process')}
          >
            Certification Process
          </button>
        </div>

        {/* Verify Certificate Tab */}
        {activeTab === 'verify' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Verify Halal Certificate</h2>
              <p className="text-gray-600 mb-6">
                Enter the certificate ID or scan the QR code to verify the authenticity of a halal certificate.
                All certificates are stored on the blockchain for maximum security and transparency.
              </p>
              
              <form onSubmit={verifyCertificate} className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Enter Certificate ID (e.g., HC-12345)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FaSearch className="mr-2" />
                        Verify
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center justify-center"
                  >
                    <FaQrcode className="mr-2" />
                    Scan QR
                  </button>
                </div>
              </form>
              
              <div className="text-sm text-gray-500">
                <p>Try these sample certificate IDs: HC-12345, HC-67890, HC-24680, HC-13579</p>
              </div>
            </div>
            
            {/* Search Results */}
            {searchResult && (
              <div className={`bg-white rounded-lg shadow-md p-6 mb-8 ${searchResult.found ? '' : 'border-l-4 border-red-500'}`}>
                {searchResult.found ? (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`text-2xl ${searchResult.certificate.status === 'valid' ? 'text-green-600' : 'text-red-600'} mr-3`}>
                        {searchResult.certificate.status === 'valid' ? <FaCheckCircle /> : <FaShieldAlt />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          Certificate {searchResult.certificate.id}
                        </h3>
                        <p className={`text-sm ${searchResult.certificate.status === 'valid' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                          {searchResult.certificate.status === 'valid' ? 'Valid Certificate' : 'Expired Certificate'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="mb-6">
                          <h4 className="text-gray-500 text-sm mb-1">Product Name</h4>
                          <p className="font-medium">{searchResult.certificate.productName}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-gray-500 text-sm mb-1">Vendor</h4>
                          <p className="font-medium">{searchResult.certificate.vendorName}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-gray-500 text-sm mb-1">Certifying Authority</h4>
                          <p className="font-medium">{searchResult.certificate.certifierName}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="text-gray-500 text-sm mb-1">Issue Date</h4>
                            <p className="font-medium">{searchResult.certificate.issuedDate}</p>
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-sm mb-1">Expiry Date</h4>
                            <p className={`font-medium ${searchResult.certificate.status === 'expired' ? 'text-red-600' : ''}`}>
                              {searchResult.certificate.expiryDate}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-gray-500 text-sm mb-1">Blockchain Reference</h4>
                          <p className="font-medium text-xs break-all text-blue-600">
                            {searchResult.certificate.blockchainTxId}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={searchResult.certificate.image}
                            alt={searchResult.certificate.productName}
                            fill
                            style={{objectFit: "cover"}}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Link href={`https://ipfs.io/ipfs/${searchResult.certificate.ipfsHash}`} target="_blank" className="flex-1">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                              <FaFileAlt className="mr-2" />
                              View Certificate
                            </button>
                          </Link>
                          <Link href={`https://etherscan.io/tx/${searchResult.certificate.blockchainTxId}`} target="_blank" className="flex-1">
                            <button className="w-full bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center">
                              <FaChain className="mr-2" />
                              View on Blockchain
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-red-600 text-5xl mb-4">
                      <FaShieldAlt className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Certificate Not Found</h3>
                    <p className="text-gray-600 mb-4">{searchResult.message}</p>
                    <p className="text-gray-500 text-sm">
                      If you believe this is an error, please contact our support team.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* About Certification Tab */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About HalalChain Certification</h2>
              <p className="text-gray-600 mb-6">
                HalalChain certification is a blockchain-based verification system that ensures the authenticity and 
                integrity of halal products throughout the supply chain. Our certification process is rigorous and 
                transparent, providing consumers with confidence in the halal status of products.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                      <span>Immutable blockchain records ensure certification cannot be tampered with</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                      <span>QR code verification allows instant authentication of products</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                      <span>Complete supply chain transparency from source to shelf</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                      <span>Regular audits and inspections by certified authorities</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-green-600 mt-1 mr-2" />
                      <span>Integration with global halal certification standards</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Certification Standards</h3>
                  <p className="text-gray-600 mb-4">
                    Our certification process adheres to the following international halal standards:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• OIC/SMIIC Halal Standards</li>
                    <li>• Malaysian Halal Standard (MS 1500)</li>
                    <li>• Singapore MUIS Halal Standards</li>
                    <li>• UAE Halal Standards (UAE.S 2055)</li>
                    <li>• Indonesian MUI Halal Standards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certification Process Tab */}
        {activeTab === 'process' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Certification Process</h2>
              <p className="text-gray-600 mb-8">
                Our certification process is comprehensive and rigorous to ensure that all products meet the highest 
                halal standards. Below is an overview of the steps involved in obtaining HalalChain certification.
              </p>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Application Submission</h3>
                    <p className="text-gray-600">
                      Vendors submit an application with detailed information about their products, ingredients, 
                      manufacturing processes, and existing halal certifications (if any).
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Document Review</h3>
                    <p className="text-gray-600">
                      Our certification team reviews all submitted documents to ensure compliance with halal 
                      requirements and standards. Additional information may be requested if needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">On-Site Inspection</h3>
                    <p className="text-gray-600">
                      Certified halal inspectors conduct on-site visits to verify production facilities, 
                      processes, ingredient storage, and handling procedures to ensure halal compliance.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Laboratory Testing</h3>
                    <p className="text-gray-600">
                      Product samples undergo laboratory testing to verify the absence of non-halal substances 
                      and confirm compliance with halal requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Certification Issuance</h3>
                    <p className="text-gray-600">
                      Upon successful completion of all verification steps, a halal certificate is issued and 
                      recorded on the blockchain with a unique identifier and QR code.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 flex-shrink-0">
                    <span className="text-green-700 text-2xl font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ongoing Monitoring</h3>
                    <p className="text-gray-600">
                      Regular audits and inspections are conducted to ensure continued compliance with halal 
                      standards. Certificates must be renewed annually.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link href="/vendor/certification-application" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block">
                  Apply for Certification
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}