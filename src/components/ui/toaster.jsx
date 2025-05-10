'use client';

import { useEffect, useState } from 'react';
import { Toast, ToastClose, ToastTitle, ToastDescription } from './toast';

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Listen for toast events
    const handleToast = (event) => {
      const { title, description, variant = 'default', duration = 5000 } = event.detail;
      
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, title, description, variant, duration };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);
      
      // Auto dismiss after duration
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, duration);
    };
    
    window.addEventListener('toast', handleToast);
    
    return () => {
      window.removeEventListener('toast', handleToast);
    };
  }, []);
  
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant} className="animate-in slide-in-from-right">
          <div className="flex flex-col gap-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose onClick={() => removeToast(toast.id)} />
        </Toast>
      ))}
    </div>
  );
}

export function useToast() {
  const toast = ({ title, description, variant, duration }) => {
    const event = new CustomEvent('toast', {
      detail: {
        title,
        description,
        variant,
        duration,
      },
    });
    
    window.dispatchEvent(event);
  };
  
  return {
    toast,
    success: (props) => toast({ ...props, variant: 'success' }),
    error: (props) => toast({ ...props, variant: 'error' }),
    warning: (props) => toast({ ...props, variant: 'warning' }),
    info: (props) => toast({ ...props, variant: 'info' }),
  };
}