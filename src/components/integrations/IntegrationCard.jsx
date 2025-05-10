'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function IntegrationCard({ platform, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full transition duration-200 ease-in-out",
        isActive ? "scale-105" : "hover:scale-105"
      )}
    >
      <div className={cn(
        "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center h-full",
        isActive ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""
      )}>
        <div className="relative h-12 w-12 mb-4">
          <Image 
            src={platform.icon || `/images/integrations/default-logo.svg`}
            alt={platform.name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white">{platform.name}</h3>
      </div>
    </button>
  );
}