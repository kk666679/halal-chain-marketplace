import { Check } from 'lucide-react';

export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep > index + 1 
                ? 'bg-emerald-600 text-white' 
                : currentStep === index + 1 
                  ? 'bg-emerald-100 border-2 border-emerald-600 text-emerald-600 dark:bg-emerald-900 dark:border-emerald-500 dark:text-emerald-500' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}>
              {currentStep > index + 1 ? <Check size={20} /> : index + 1}
            </div>
            <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}