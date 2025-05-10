"use client";

import { useState, useRef } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, Clock, ExternalLink, Camera, QrCode, Loader2 } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import InputField from '../forms/InputField';
import Button from '../buttons/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificationVerifier({
  onVerify,
  isLoading = false,
  className,
  enableQrScanner = true,
  ...props
}) {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scannerIntervalRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!certificateNumber) {
      setError('Please enter a certificate number');
      return;
    }
    
    try {
      // If onVerify is provided, use it to get the result
      if (onVerify) {
        const result = await onVerify(certificateNumber);
        setVerificationResult(result);
      } else {
        // Mock verification for demo purposes
        setTimeout(() => {
          // Simulate a successful verification
          if (certificateNumber.startsWith('HC-')) {
            setVerificationResult({
              isValid: true,
              certification: {
                certificateNumber,
                status: 'approved',
                product: {
                  name: 'Halal Chicken Nuggets',
                  category: 'Processed Foods'
                },
                certifier: {
                  name: 'Global Halal Authority'
                },
                vendor: {
                  name: 'ABC Foods Inc.'
                },
                issuedDate: new Date(2023, 5, 15),
                expiryDate: new Date(2024, 5, 15),
                blockchainTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
              }
            });
          } else {
            setVerificationResult({
              isValid: false,
              message: 'Certificate not found or invalid'
            });
          }
        }, 1000);
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    }
  };
  
  const handleReset = () => {
    setCertificateNumber('');
    setVerificationResult(null);
    setError('');
  };
  
  // Start QR code scanner
  const startScanner = async () => {
    setIsScanning(true);
    setError('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start scanning for QR codes
        scannerIntervalRef.current = setInterval(() => {
          if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Here you would use a QR code library to scan the canvas
            // For this example, we'll simulate finding a QR code after a few seconds
            setTimeout(() => {
              if (isScanning) {
                stopScanner();
                setCertificateNumber('HC-12345678');
                handleSubmit({ preventDefault: () => {} });
              }
            }, 3000);
          }
        }, 500);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };
  
  // Stop QR code scanner
  const stopScanner = () => {
    if (scannerIntervalRef.current) {
      clearInterval(scannerIntervalRef.current);
    }
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };
  
  // Status configuration for verification result
  const getStatusConfig = (status) => {
    const configs = {
      approved: {
        icon: CheckCircle,
        color: 'text-green-500 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        label: 'Valid'
      },
      pending: {
        icon: Clock,
        color: 'text-amber-500 dark:text-amber-400',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        borderColor: 'border-amber-200 dark:border-amber-800',
        label: 'Pending'
      },
      rejected: {
        icon: XCircle,
        color: 'text-red-500 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        label: 'Invalid'
      },
      expired: {
        icon: AlertTriangle,
        color: 'text-gray-500 dark:text-gray-400',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        borderColor: 'border-gray-200 dark:border-gray-800',
        label: 'Expired'
      },
      revoked: {
        icon: XCircle,
        color: 'text-red-500 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        label: 'Revoked'
      }
    };
    
    return configs[status] || configs.rejected;
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden", className)} {...props}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <QrCode className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
          Verify Halal Certification
        </h2>
        
        <AnimatePresence mode="wait">
          {isScanning ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas 
                  ref={canvasRef} 
                  className="hidden"
                />
                <div className="absolute inset-0 border-2 border-emerald-500 opacity-50 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-emerald-500"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-emerald-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-emerald-500"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-emerald-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center bg-black bg-opacity-50 p-2 rounded">
                    <p>Scanning for QR code...</p>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}
              
              <Button
                variant="secondary"
                onClick={stopScanner}
                fullWidth
              >
                Cancel Scanning
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <InputField
                id="certificateNumber"
                name="certificateNumber"
                label="Certificate Number"
                placeholder="Enter certificate number (e.g., HC-12345678)"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                error={error}
                icon={Search}
                required
              />
              
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  fullWidth
                >
                  Verify Certificate
                </Button>
                
                {enableQrScanner && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={startScanner}
                    rightIcon={Camera}
                  >
                    Scan QR
                  </Button>
                )}
                
                {verificationResult && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        
        {/* Verification Result */}
        <AnimatePresence>
          {verificationResult && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className={cn(
                "border rounded-lg overflow-hidden",
                verificationResult.isValid 
                  ? "border-green-200 dark:border-green-800" 
                  : "border-red-200 dark:border-red-800"
              )}>
                {/* Result Header */}
                <div className={cn(
                  "px-4 py-3 flex items-center",
                  verificationResult.isValid 
                    ? "bg-green-50 dark:bg-green-900/20" 
                    : "bg-red-50 dark:bg-red-900/20"
                )}>
                  {verificationResult.isValid ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                      <span className="font-medium text-green-800 dark:text-green-300">
                        Valid Certification
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                      <span className="font-medium text-red-800 dark:text-red-300">
                        Invalid Certification
                      </span>
                    </>
                  )}
                </div>
                
                {/* Result Content */}
                {verificationResult.isValid && verificationResult.certification ? (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Certificate Number
                        </h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {verificationResult.certification.certificateNumber}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </h3>
                        <div className="mt-1 flex items-center">
                          {(() => {
                            const status = getStatusConfig(verificationResult.certification.status);
                            const StatusIcon = status.icon;
                            return (
                              <>
                                <StatusIcon className={cn("h-4 w-4 mr-1", status.color)} />
                                <span className={status.color}>{status.label}</span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Product
                        </h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {verificationResult.certification.product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {verificationResult.certification.product.category}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Vendor
                        </h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {verificationResult.certification.vendor.name}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Certifier
                        </h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {verificationResult.certification.certifier.name}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Validity Period
                        </h3>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {formatDate(verificationResult.certification.issuedDate)} - {formatDate(verificationResult.certification.expiryDate)}
                        </p>
                      </div>
                    </div>
                    
                    {verificationResult.certification.blockchainTxHash && (
                      <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                        <a
                          href={`https://etherscan.io/tx/${verificationResult.certification.blockchainTxHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                        >
                          Verified on Blockchain
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {verificationResult.message || 'Certificate not found or invalid.'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}