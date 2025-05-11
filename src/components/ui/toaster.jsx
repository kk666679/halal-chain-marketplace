'use client';

import { useToast } from './use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export function Toaster() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 p-4 max-h-screen overflow-hidden flex flex-col gap-2 w-full sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`rounded-lg shadow-lg p-4 flex items-start ${
              toast.variant === 'success'
                ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : toast.variant === 'error'
                ? 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                : toast.variant === 'warning'
                ? 'bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                : 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            {toast.variant === 'success' && (
              <FaCheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            {toast.variant === 'error' && (
              <FaExclamationCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            {toast.variant === 'warning' && (
              <FaExclamationCircle className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            {toast.variant === 'default' && (
              <FaInfoCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            )}
            
            <div className="flex-1">
              {toast.title && (
                <h3 className={`font-medium ${
                  toast.variant === 'success'
                    ? 'text-green-800 dark:text-green-200'
                    : toast.variant === 'error'
                    ? 'text-red-800 dark:text-red-200'
                    : toast.variant === 'warning'
                    ? 'text-amber-800 dark:text-amber-200'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {toast.title}
                </h3>
              )}
              {toast.description && (
                <p className={`mt-1 text-sm ${
                  toast.variant === 'success'
                    ? 'text-green-700 dark:text-green-300'
                    : toast.variant === 'error'
                    ? 'text-red-700 dark:text-red-300'
                    : toast.variant === 'warning'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {toast.description}
                </p>
              )}
            </div>
            
            <button
              onClick={() => dismissToast(toast.id)}
              className={`ml-3 flex-shrink-0 rounded-md p-1 ${
                toast.variant === 'success'
                  ? 'text-green-500 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900'
                  : toast.variant === 'error'
                  ? 'text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900'
                  : toast.variant === 'warning'
                  ? 'text-amber-500 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}