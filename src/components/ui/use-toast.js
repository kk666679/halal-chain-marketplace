'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext({
  toast: () => {},
  dismissToast: () => {},
  toasts: []
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = 'default', duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        title,
        description,
        variant,
        duration,
      },
    ]);

    if (duration !== Infinity) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  };

  const dismissToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};