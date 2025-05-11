'use client';

import React, { useState } from 'react';
import { Search, Check, AlertCircle } from 'lucide-react';

export default function CertificationVerifier() {
  const [certificationId, setCertificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      if (certificationId.startsWith('MUI') || certificationId.startsWith('JAKIM') || 
          certificationId.startsWith('CIA') || certificationId.startsWith('HSC')) {
        setVerificationResult({
          valid: true,
          details: {
            id: certificationId,
            issuer: certificationId.startsWith('MUI') ? 'Majelis Ulama Indonesia' : 
                   certificationId.startsWith('JAKIM') ? 'Department of Islamic Development Malaysia' :
                   certificationId.startsWith('CIA') ? 'China Islamic Association' : 'Halal Standard Committee Russia',
            issuedDate: '2023-01-15',
            expiryDate: '2025-01-14',
            product: 'Sample Product',
            company: 'Sample Company Ltd.',
            status: 'Active',
            blockchainVerified: true,
            blockchainTxHash: '0x3f5a4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f'
          }
        });
      } else {
        setVerificationResult({
          valid: false,
          error: 'Invalid certification ID or certification not found'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Certification Verification Tool</h3>
      <p className="text-gray-600 mb-6">
        Verify the authenticity of halal certifications from ASEAN, China, and Russia certification bodies.
      </p>
      
      <form onSubmit={handleVerify} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Enter certification ID (e.g., MUI12345, JAKIM67890)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={certificationId}
              onChange={(e) => setCertificationId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Verify
              </span>
            )}
          </button>
        </div>
      </form>
      
      {verificationResult && (
        <div className={`border ${verificationResult.valid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} rounded-lg p-4`}>
          {verificationResult.valid ? (
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="ml-3 text-lg font-medium text-green-800">Valid Certification</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Certification ID</p>
                  <p className="font-medium">{verificationResult.details.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Issuing Authority</p>
                  <p className="font-medium">{verificationResult.details.issuer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium">{verificationResult.details.issuedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">{verificationResult.details.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-medium">{verificationResult.details.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{verificationResult.details.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">{verificationResult.details.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blockchain Verification</p>
                  <p className="font-medium flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    Verified on Blockchain
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-gray-500">Blockchain Transaction Hash</p>
                <p className="font-mono text-xs break-all">{verificationResult.details.blockchainTxHash}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-medium text-red-800">Invalid Certification</h4>
                <p className="text-red-600">{verificationResult.error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}