'use client';

import { cn } from '@/lib/utils';

export default function PlatformTabs({ activeRole, setActiveRole }) {
  const roles = [
    { id: 'customer', label: 'For Customers' },
    { id: 'vendor', label: 'For Vendors' },
    { id: 'developer', label: 'For Developers' }
  ];

  return (
    <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px" role="tablist">
        {roles.map((role) => (
          <li key={role.id} role="presentation">
            <button
              className={cn(
                "inline-block p-4 border-b-2 rounded-t-lg",
                activeRole === role.id
                  ? "border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              )}
              onClick={() => setActiveRole(role.id)}
              role="tab"
              aria-selected={activeRole === role.id}
            >
              {role.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}