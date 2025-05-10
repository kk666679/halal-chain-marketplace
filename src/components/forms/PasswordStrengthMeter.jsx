import { Check } from 'lucide-react';

export default function PasswordStrengthMeter({ password }) {
  // Calculate password strength score (0-4)
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(4, score);
  };
  
  const passwordStrength = getPasswordStrength(password);
  const passwordStrengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const passwordStrengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Password strength:</p>
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${passwordStrengthColors[passwordStrength]}`}
            style={{ width: `${(passwordStrength + 1) * 20}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 w-16">
          {passwordStrengthLabels[passwordStrength]}
        </span>
      </div>
      
      <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
        <li className={`flex items-center ${password?.length >= 8 ? 'text-green-500 dark:text-green-400' : ''}`}>
          {password?.length >= 8 ? <Check size={14} className="mr-1" /> : '•'} At least 8 characters
        </li>
        <li className={`flex items-center ${/(?=.*[a-z])(?=.*[A-Z])/.test(password || '') ? 'text-green-500 dark:text-green-400' : ''}`}>
          {/(?=.*[a-z])(?=.*[A-Z])/.test(password || '') ? <Check size={14} className="mr-1" /> : '•'} Uppercase and lowercase letters
        </li>
        <li className={`flex items-center ${/(?=.*\d)/.test(password || '') ? 'text-green-500 dark:text-green-400' : ''}`}>
          {/(?=.*\d)/.test(password || '') ? <Check size={14} className="mr-1" /> : '•'} At least one number
        </li>
        <li className={`flex items-center ${/(?=.*[@$!%*?&])/.test(password || '') ? 'text-green-500 dark:text-green-400' : ''}`}>
          {/(?=.*[@$!%*?&])/.test(password || '') ? <Check size={14} className="mr-1" /> : '•'} At least one special character
        </li>
      </ul>
    </div>
  );
}