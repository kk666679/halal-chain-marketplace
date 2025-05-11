'use client';

import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, StopCircle, RefreshCw, ExternalLink } from 'lucide-react';

/**
 * QR Code Scanner Component for Halal Product Verification
 * 
 * This component provides a QR code scanner to verify halal products
 * and view their supply chain information.
 */
export default function QRScanner({ onScanSuccess, onScanError }) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [error, setError] = useState(null);
  
  // Initialize scanner on component mount
  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode('qr-reader');
    setHtml5QrCode(qrCodeScanner);
    
    // Get available cameras
    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices && devices.length) {
          setCameras(devices);
          setSelectedCamera(devices[0].id);
        } else {
          setError('No camera devices found');
        }
      })
      .catch(err => {
        setError('Error getting cameras: ' + err.message);
      });
      
    // Cleanup on unmount
    return () => {
      if (qrCodeScanner && qrCodeScanner.isScanning) {
        qrCodeScanner.stop().catch(err => console.error('Error stopping scanner:', err));
      }
    };
  }, []);
  
  // Start scanning
  const startScanner = () => {
    if (!html5QrCode || !selectedCamera) return;
    
    setScanning(true);
    setScanResult(null);
    setError(null);
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    };
    
    html5QrCode.start(
      selectedCamera,
      config,
      handleScanSuccess,
      handleScanError
    ).catch(err => {
      setError('Error starting scanner: ' + err.message);
      setScanning(false);
    });
  };
  
  // Stop scanning
  const stopScanner = () => {
    if (html5QrCode && html5QrCode.isScanning) {
      html5QrCode.stop()
        .then(() => {
          setScanning(false);
        })
        .catch(err => {
          console.error('Error stopping scanner:', err);
          setScanning(false);
        });
    }
  };
  
  // Handle successful scan
  const handleScanSuccess = (decodedText, decodedResult) => {
    stopScanner();
    setScanResult(decodedText);
    
    // Parse the URL to extract product and certification info
    try {
      const url = new URL(decodedText);
      const productId = url.pathname.split('/').pop();
      const certificationId = url.searchParams.get('cert');
      const batchNumber = url.searchParams.get('batch');
      const trackSupplyChain = url.searchParams.get('track') === 'true';
      
      const result = {
        url: decodedText,
        productId,
        certificationId,
        batchNumber,
        trackSupplyChain
      };
      
      if (onScanSuccess) {
        onScanSuccess(result);
      }
    } catch (err) {
      setError('Invalid QR code format');
      if (onScanError) {
        onScanError('Invalid QR code format');
      }
    }
  };
  
  // Handle scan error
  const handleScanError = (errorMessage) => {
    console.error('QR Scan Error:', errorMessage);
    if (onScanError) {
      onScanError(errorMessage);
    }
  };
  
  // Reset scanner
  const resetScanner = () => {
    setScanResult(null);
    setError(null);
  };
  
  // Handle camera change
  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
    if (scanning) {
      stopScanner();
      setTimeout(() => {
        startScanner();
      }, 500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Scan Halal Product QR Code</h3>
      
      {/* Camera Selection */}
      {cameras.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Camera</label>
          <select
            value={selectedCamera}
            onChange={handleCameraChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={scanning}
          >
            {cameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.label}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Scanner Container */}
      <div className="mb-4">
        <div 
          id="qr-reader" 
          className="w-full max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden"
          style={{ minHeight: '300px' }}
        ></div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Scan Result */}
      {scanResult && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">QR Code Scanned Successfully</h4>
          <p className="text-sm text-gray-600 break-all mb-2">{scanResult}</p>
          <a 
            href={scanResult} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
          >
            Open Link <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        {!scanning ? (
          <button
            onClick={startScanner}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center"
            disabled={!selectedCamera}
          >
            <Camera className="h-5 w-5 mr-2" />
            Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition flex items-center"
          >
            <StopCircle className="h-5 w-5 mr-2" />
            Stop Scanning
          </button>
        )}
        
        {(scanResult || error) && (
          <button
            onClick={resetScanner}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition flex items-center"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Reset
          </button>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Scan a halal product QR code to verify its certification and view its supply chain journey.</p>
      </div>
    </div>
  );
}