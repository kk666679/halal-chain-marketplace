'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserManagement from '@/components/admin/UserManagement';
import CertificationManagement from '@/components/admin/CertificationManagement';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Admin Portal
      </h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="dashboard" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'dashboard' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'users' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Users
          </TabsTrigger>
          <TabsTrigger 
            value="certifications" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'certifications' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Certifications
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'products' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Products
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'settings' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="certifications" className="mt-6">
          <CertificationManagement />
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Product Management</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Product management functionality will be implemented in the next phase.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Admin Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Settings functionality will be implemented in the next phase.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}