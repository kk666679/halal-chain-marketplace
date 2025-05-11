'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function IntegrationCard({ integration }) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            {integration.icon}
          </div>
          {integration.new && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              New
            </span>
          )}
        </div>
        
        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {integration.name}
        </h3>
        
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {integration.description}
        </p>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Key Features:</p>
          <ul className="mt-2 space-y-1">
            {integration.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <FaCheckCircle className="h-4 w-4 text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {integration.version}
          </span>
          
          <Link 
            href={integration.documentation}
            className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Documentation
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}