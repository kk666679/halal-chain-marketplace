import { useState, useEffect } from 'react';
import { Check, RefreshCw } from 'lucide-react';

export default function Captcha({ onVerify, onError }) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setError('');
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (error) setError('');
  };

  const handleVerify = () => {
    if (!userInput) {
      setError('Please enter the captcha text');
      if (onError) onError('Please enter the captcha text');
      return;
    }

    setIsLoading(true);

    // Simulate API verification with a slight delay
    setTimeout(() => {
      if (userInput.toLowerCase() === captchaText.toLowerCase()) {
        setIsVerified(true);
        if (onVerify) onVerify(true);
      } else {
        setError('Incorrect captcha. Please try again.');
        if (onError) onError('Incorrect captcha. Please try again.');
        generateCaptcha();
      }
      setIsLoading(false);
    }, 600);
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  return (
    <div className="w-full">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Security Verification
          </label>
          
          {!isVerified ? (
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-600 select-none relative">
                  {/* Captcha text with visual noise */}
                  <div className="font-mono text-lg tracking-widest text-center relative">
                    {captchaText.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className="inline-block transform"
                        style={{
                          transform: `rotate(${Math.random() * 20 - 10}deg)`,
                          color: `hsl(${Math.random() * 360}, 70%, 40%)`,
                          marginLeft: '2px',
                          marginRight: '2px'
                        }}
                      >
                        {char}
                      </span>
                    ))}
                    
                    {/* Visual noise lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute bg-gray-400 dark:bg-gray-500 opacity-30"
                          style={{
                            height: '1px',
                            width: '100%',
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 20 - 10}deg)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Refresh captcha"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Enter the text above"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  aria-label="Captcha input"
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    isLoading 
                      ? 'bg-emerald-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
              
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <Check size={18} className="mr-2" />
              <span className="font-medium">Verification successful</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}