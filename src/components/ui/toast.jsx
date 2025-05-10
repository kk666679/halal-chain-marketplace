import * as React from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border bg-white dark:bg-gray-800 dark:border-gray-700",
        success: "success group border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-800 text-green-800 dark:text-green-300",
        error: "error group border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-800 text-red-800 dark:text-red-300",
        warning: "warning group border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
        info: "info group border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 text-blue-800 dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Toast({ className, variant, ...props }) {
  return (
    <div
      className={toastVariants({ variant, className })}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }) {
  return (
    <div
      className={`inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.error]:border-red-300 group-[.error]:hover:border-red-400 group-[.error]:hover:bg-red-100 group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-50 group-[.success]:border-green-300 group-[.success]:hover:border-green-400 group-[.success]:hover:bg-green-100 group-[.success]:focus:ring-green-400 group-[.success]:focus:ring-offset-green-50 group-[.warning]:border-yellow-300 group-[.warning]:hover:border-yellow-400 group-[.warning]:hover:bg-yellow-100 group-[.warning]:focus:ring-yellow-400 group-[.warning]:focus:ring-offset-yellow-50 group-[.info]:border-blue-300 group-[.info]:hover:border-blue-400 group-[.info]:hover:bg-blue-100 group-[.info]:focus:ring-blue-400 group-[.info]:focus:ring-offset-blue-50 dark:ring-offset-gray-950 dark:focus:ring-gray-800 dark:group-[.error]:border-red-800 dark:group-[.error]:hover:border-red-700 dark:group-[.error]:hover:bg-red-800/20 dark:group-[.error]:focus:ring-red-800 dark:group-[.error]:focus:ring-offset-red-900 dark:group-[.success]:border-green-800 dark:group-[.success]:hover:border-green-700 dark:group-[.success]:hover:bg-green-800/20 dark:group-[.success]:focus:ring-green-800 dark:group-[.success]:focus:ring-offset-green-900 dark:group-[.warning]:border-yellow-800 dark:group-[.warning]:hover:border-yellow-700 dark:group-[.warning]:hover:bg-yellow-800/20 dark:group-[.warning]:focus:ring-yellow-800 dark:group-[.warning]:focus:ring-offset-yellow-900 dark:group-[.info]:border-blue-800 dark:group-[.info]:hover:border-blue-700 dark:group-[.info]:hover:bg-blue-800/20 dark:group-[.info]:focus:ring-blue-800 dark:group-[.info]:focus:ring-offset-blue-900 ${className}`}
      {...props}
    />
  );
}

function ToastClose({ className, ...props }) {
  return (
    <button
      className={`absolute right-2 top-2 rounded-md p-1 text-gray-500/50 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.error]:text-red-300 group-[.error]:hover:text-red-600 group-[.success]:text-green-300 group-[.success]:hover:text-green-600 group-[.warning]:text-yellow-300 group-[.warning]:hover:text-yellow-600 group-[.info]:text-blue-300 group-[.info]:hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-50 ${className}`}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
}

function ToastTitle({ className, ...props }) {
  return (
    <div
      className={`text-sm font-semibold ${className}`}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }) {
  return (
    <div
      className={`text-sm opacity-90 ${className}`}
      {...props}
    />
  );
}

export { Toast, ToastAction, ToastClose, ToastTitle, ToastDescription };