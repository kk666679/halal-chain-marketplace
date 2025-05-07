import React, { useState } from 'react';
import { verifyCertification } from '../../utils/api';

const Certification = () => {
  const [certId, setCertId] = useState('');
  const [verificationResult, setResult] = useState(null);

  const handleVerification = async () => {
    try {
      const result = await verifyCertification(certId);
      setResult(result);
    } catch (error) {
      setResult({ valid: false, message: 'Verification failed' });
    }
  };

  return (
    <div className="certification-page">
      <h2>Halal Certification Verification</h2>
      <div className="verification-form">
        <input
          type="text"
          placeholder="Enter Certification ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        />
        <button onClick={handleVerification}>Verify Now</button>
        
        {verificationResult && (
          <div className={`result ${verificationResult.valid ? 'valid' : 'invalid'}`}>
            {verificationResult.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;