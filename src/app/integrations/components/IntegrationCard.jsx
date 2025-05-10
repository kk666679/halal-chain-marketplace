import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function IntegrationCard({ integration }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start">
          <div className="bg-gray-100 rounded-full p-3 mr-4">
            {integration.icon}
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-xl font-bold">{integration.name}</h3>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {integration.version}
              </span>
              {integration.beta && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  Beta
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-2">{integration.description}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">FEATURES</h4>
          <ul className="space-y-2">
            {integration.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <Link 
            href={integration.documentation}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Documentation →
          </Link>
          {integration.demo && (
            <Link 
              href={integration.demo}
              className="text-emerald-600 hover:text-emerald-800 font-medium"
            >
              Try Demo →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}