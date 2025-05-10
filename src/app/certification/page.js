'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle, FaFileAlt, FaQrcode, FaSearch, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineTimeline } from 'react-icons/md';
import CertificationVerifier from '@/components/certification/CertificationVerifier';

export default function CertificationPage() {
  const [activeTab, setActiveTab] = useState('verify');
  
  const tabs = [
    { id: 'verify', label: 'Verify Certificate', icon: FaSearch },
    { id: 'about', label: 'About Certification', icon: FaShieldAlt },
    { id: 'process', label: 'Certification Process', icon: MdOutlineTimeline },
    { id: 'standards', label: 'Halal Standards', icon: FaFileAlt },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Halal Certification Verification
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Verify the authenticity of halal certifications using our blockchain-powered verification system.
          Ensure products meet halal standards with transparent and immutable certification records.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-6 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-emerald-600 dark:text-emerald-500 border-b-2 border-emerald-600 dark:border-emerald-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CertificationVerifier />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Why Verify Halal Certification?
                </h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="font-medium text-gray-900 dark:text-white">Authenticity:</strong>{' '}
                      Confirm that products have genuine halal certification from recognized authorities.
                    </span>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="font-medium text-gray-900 dark:text-white">Transparency:</strong>{' '}
                      Access detailed information about the certification process and standards.
                    </span>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="font-medium text-gray-900 dark:text-white">Trust:</strong>{' '}
                      Build confidence in the halal integrity of products through blockchain verification.
                    </span>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="font-medium text-gray-900 dark:text-white">Compliance:</strong>{' '}
                      Ensure products meet religious and regulatory requirements for halal certification.
                    </span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Scan QR Code for Verification
                  </h3>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <FaQrcode className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Scan the QR code on product packaging for instant verification of halal certification status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              About Our Halal Certification
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              HalalChain provides blockchain-powered halal certification that ensures transparency, 
              authenticity, and traceability throughout the supply chain. Our certification process 
              adheres to strict Islamic dietary laws and international halal standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Blockchain Verification
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every certification is recorded on the blockchain, creating an immutable record 
                  that cannot be altered or falsified. This provides consumers with confidence in 
                  the authenticity of halal products.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Recognized Authorities
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We partner with globally recognized halal certification bodies to ensure our 
                  certifications meet international standards and are accepted worldwide.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/certification-process.png" 
                alt="Certification Process" 
                width={600} 
                height={300} 
                className="rounded-lg shadow-md"
              />
            </div>
            
            <div className="text-center">
              <Link 
                href="/certification/apply" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Apply for Certification
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Certification Process
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-900"></div>
              
              {/* Timeline steps */}
              <div className="space-y-12">
                {[
                  {
                    title: 'Application Submission',
                    description: 'Vendors submit detailed information about their products, ingredients, and manufacturing processes.'
                  },
                  {
                    title: 'Document Review',
                    description: 'Our certification team reviews all documentation to ensure compliance with halal standards.'
                  },
                  {
                    title: 'On-site Inspection',
                    description: 'Qualified inspectors visit the production facility to verify halal compliance in person.'
                  },
                  {
                    title: 'Laboratory Testing',
                    description: 'Product samples undergo laboratory testing to confirm the absence of haram (forbidden) substances.'
                  },
                  {
                    title: 'Certification Decision',
                    description: 'Based on all findings, a certification decision is made by a committee of halal experts.'
                  },
                  {
                    title: 'Blockchain Registration',
                    description: 'Approved certifications are registered on the blockchain for permanent, tamper-proof verification.'
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-gray-800"></div>
                    
                    {/* Content */}
                    <div className="ml-10">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'standards' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Halal Standards
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our halal certification follows strict standards based on Islamic dietary laws and international 
              halal guidelines. These standards ensure that products are prepared according to Islamic principles 
              and are safe for Muslim consumption.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Ingredient Requirements
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• All ingredients must be from halal sources</li>
                  <li>• No pork or pork by-products</li>
                  <li>• No alcohol or intoxicants</li>
                  <li>• Animal products must be from animals slaughtered according to Islamic law</li>
                  <li>• No blood or blood products</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Processing Standards
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Processing equipment must be free from non-halal contamination</li>
                  <li>• Separate storage and handling of halal products</li>
                  <li>• Proper cleaning procedures to prevent cross-contamination</li>
                  <li>• No contact with prohibited substances during processing</li>
                  <li>• Halal-compliant packaging materials</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Quality Assurance
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Regular audits and inspections</li>
                  <li>• Traceability throughout the supply chain</li>
                  <li>• Documentation of all ingredients and processes</li>
                  <li>• Laboratory testing for prohibited substances</li>
                  <li>• Continuous monitoring and verification</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Compliance Standards
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Adherence to local and international halal standards</li>
                  <li>• Compliance with food safety regulations</li>
                  <li>• Ethical business practices</li>
                  <li>• Transparent labeling and marketing</li>
                  <li>• Regular certification renewal and updates</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-5">
              <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                International Recognition
              </h3>
              <p className="text-emerald-700 dark:text-emerald-400">
                Our certification standards are recognized by major international halal certification bodies 
                and comply with the guidelines set by the Codex Alimentarius Commission, SMIIC (Standards and 
                Metrology Institute for Islamic Countries), and other relevant authorities.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}