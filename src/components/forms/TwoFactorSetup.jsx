import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import InputField from './InputField';

export default function TwoFactorSetup({ onComplete, onSkip }) {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Mock QR code and secret key
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/HalalChain:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=HalalChain';
  const secretKey = 'JBSWY3DPEHPK3PXP';
  
  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleVerify = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 6-digit code is accepted
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        setStep(3);
        if (onComplete) onComplete();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Two-Factor Authentication Setup
      </h3>
      
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Enhance your account security by setting up two-factor authentication (2FA).
            This adds an extra layer of protection to your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium"
            >
              Set up 2FA
            </button>
            
            <button
              type="button"
              onClick={onSkip}
              className="px-4 py-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md font-medium"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </p>
            
            <div className="flex justify-center bg-white p-4 rounded-md mb-4">
              <div className="relative w-48 h-48">
                <Image
                  src={qrCodeUrl}
                  alt="2FA QR Code"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              2. Or manually enter this secret key in your app:
            </p>
            
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <code className="font-mono text-sm flex-1 text-gray-800 dark:text-gray-200">
                {secretKey}
              </code>
              <button
                type="button"
                onClick={handleCopySecret}
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md"
                aria-label="Copy secret key"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3. Enter the 6-digit verification code from your authenticator app:
            </p>
            
            <div className="space-y-4">
              <InputField
                id="verificationCode"
                name="verificationCode"
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6));
                  if (error) setError('');
                }}
                error={error}
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Enable 2FA'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
            <Check size={32} />
          </div>
          
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            Two-Factor Authentication Enabled
          </h4>
          
          <p className="text-gray-600 dark:text-gray-300">
            Your account is now protected with an additional layer of security.
            You'll need to enter a verification code each time you sign in.
          </p>
          
          <div className="pt-4">
            <button
              type="button"
              onClick={onComplete}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}