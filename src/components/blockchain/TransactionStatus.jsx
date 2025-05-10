"use client";

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TransactionStatus({
  status = 'pending', // pending, success, error, confirmed
  txHash,
  blockExplorerUrl = 'https://etherscan.io/tx/',
  onConfirmed,
  className,
  ...props
}) {
  const [confirmations, setConfirmations] = useState(0);
  const [requiredConfirmations] = useState(3);
  
  // Simulate confirmations for demo purposes
  useEffect(() => {
    if (status === 'success' && txHash) {
      const interval = setInterval(() => {
        setConfirmations(prev => {
          const next = prev + 1;
          if (next >= requiredConfirmations) {
            clearInterval(interval);
            if (onConfirmed) onConfirmed();
            return requiredConfirmations;
          }
          return next;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [status, txHash, requiredConfirmations, onConfirmed]);
  
  // Status configurations
  const statusConfig = {
    pending: {
      icon: Loader2,
      iconClass: 'text-amber-500 dark:text-amber-400 animate-spin',
      bgClass: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      textClass: 'text-amber-800 dark:text-amber-300',
      title: 'Transaction Pending',
      description: 'Your transaction is being processed on the blockchain.'
    },
    success: {
      icon: CheckCircle,
      iconClass: 'text-green-500 dark:text-green-400',
      bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      textClass: 'text-green-800 dark:text-green-300',
      title: 'Transaction Successful',
      description: 'Your transaction has been submitted successfully.'
    },
    error: {
      icon: XCircle,
      iconClass: 'text-red-500 dark:text-red-400',
      bgClass: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      textClass: 'text-red-800 dark:text-red-300',
      title: 'Transaction Failed',
      description: 'There was an error processing your transaction.'
    },
    confirmed: {
      icon: CheckCircle,
      iconClass: 'text-green-500 dark:text-green-400',
      bgClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      textClass: 'text-green-800 dark:text-green-300',
      title: 'Transaction Confirmed',
      description: 'Your transaction has been confirmed on the blockchain.'
    }
  };
  
  const currentStatus = statusConfig[status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;
  
  return (
    <div
      className={cn(
        "rounded-md border p-4",
        currentStatus.bgClass,
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <StatusIcon className={cn("h-5 w-5", currentStatus.iconClass)} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={cn("text-sm font-medium", currentStatus.textClass)}>
            {currentStatus.title}
          </h3>
          <div className={cn("mt-2 text-sm", currentStatus.textClass)}>
            <p>{currentStatus.description}</p>
            
            {status === 'success' && (
              <div className="mt-2">
                <div className="flex items-center">
                  <span className="mr-2">Confirmations:</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: requiredConfirmations }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-2 w-2 rounded-full",
                          i < confirmations
                            ? "bg-green-500 dark:bg-green-400"
                            : "bg-gray-300 dark:bg-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2">
                    {confirmations}/{requiredConfirmations}
                  </span>
                </div>
              </div>
            )}
            
            {txHash && (
              <div className="mt-2">
                <a
                  href={`${blockExplorerUrl}${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  View on Block Explorer
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}