"use client";

import { cn } from '@/lib/utils';

export default function FormSection({
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  contentClassName,
  ...props
}) {
  return (
    <div className={cn("border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden", className)} {...props}>
      {(title || description) && (
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          {title && (
            <h3 className={cn("text-lg font-medium text-gray-900 dark:text-white", titleClassName)}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn("mt-1 text-sm text-gray-500 dark:text-gray-400", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      )}
      <div className={cn("px-6 py-5", contentClassName)}>
        {children}
      </div>
    </div>
  );
}