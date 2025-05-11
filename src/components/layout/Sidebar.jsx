"use client";

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Home, 
  Package, 
  Award, 
  Truck, 
  Users, 
  Settings, 
  HelpCircle, 
  BarChart2, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openMenus, setOpenMenus] = useState({});

  // Define navigation items based on user role
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { 
      name: 'Products', 
      href: '/dashboard/products', 
      icon: Package,
      submenu: [
        { name: 'All Products', href: '/dashboard/products' },
        { name: 'Add Product', href: '/dashboard/products/add' },
        { name: 'Categories', href: '/dashboard/products/categories' },
      ]
    },
    { 
      name: 'Certifications', 
      href: '/dashboard/certifications', 
      icon: Award,
      submenu: [
        { name: 'All Certifications', href: '/dashboard/certifications' },
        { name: 'Pending', href: '/dashboard/certifications/pending' },
        { name: 'Approved', href: '/dashboard/certifications/approved' },
        { name: 'Rejected', href: '/dashboard/certifications/rejected' },
      ]
    },
    { 
      name: 'Supply Chain', 
      href: '/dashboard/supply-chain', 
      icon: Truck,
      submenu: [
        { name: 'Overview', href: '/dashboard/supply-chain' },
        { name: 'Track Product', href: '/dashboard/supply-chain/track' },
        { name: 'Add Event', href: '/dashboard/supply-chain/add-event' },
      ]
    },
    { 
      name: 'Analytics', 
      href: '/dashboard/analytics', 
      icon: BarChart2,
      roles: ['admin', 'certifier']
    },
    { 
      name: 'Users', 
      href: '/dashboard/users', 
      icon: Users,
      roles: ['admin']
    },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ];

  // Toggle submenu
  const toggleSubmenu = (name) => {
    setOpenMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Check if a menu item should be visible based on user role
  const isVisible = (item) => {
    if (!item.roles) return true;
    if (!session?.user?.role) return false;
    return item.roles.includes(session.user.role);
  };

  // Check if a route is active
  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    return pathname?.startsWith(href) && href !== '/dashboard';
  };

  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute right-4 top-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {session?.user?.name || 'Welcome back'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          <ul className="space-y-1">
            {navigation.map((item) => {
              if (!isVisible(item)) return null;
              
              const Icon = item.icon;
              const active = isActive(item.href);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openMenus[item.name];
              
              return (
                <li key={item.name}>
                  {hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
                          active
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {isSubmenuOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      
                      {isSubmenuOpen && (
                        <ul className="mt-1 pl-8 space-y-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.name}>
                              <Link
                                href={subitem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                                  pathname === subitem.href
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                )}
                              >
                                {subitem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        active
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}