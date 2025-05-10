'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorDashboard from '@/components/vendor/VendorDashboard';
import VendorProfile from '@/components/vendor/VendorProfile';
import VendorAnalytics from '@/components/vendor/VendorAnalytics';
import ProductForm from '@/components/vendor/ProductForm';
import CertificationRequest from '@/components/vendor/CertificationRequest';

export default function VendorPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock vendor data - in a real app, this would come from API/auth
  const vendorData = {
    id: '123456',
    name: 'Halal Foods Inc.',
    contactName: 'Ahmed Abdullah',
    email: 'ahmed@halalfoods.com',
    phone: '+60123456789',
    address: '123 Jalan Sultan',
    city: 'Kuala Lumpur',
    state: '',
    country: 'Malaysia',
    postalCode: '50000',
    website: 'https://halalfoods.com',
    description: 'Premium supplier of halal-certified food products since 2010. We specialize in organic, ethically sourced ingredients and traditional recipes with modern production methods.',
    logo: '/images/vendors/halal-foods-logo.png',
    certifications: ['Halal Certified', 'ISO 22000', 'HACCP'],
    joinDate: '2021-05-15',
    status: 'active'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Vendor Portal
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
            value="profile" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'profile' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'analytics' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="add-product" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'add-product' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Add Product
          </TabsTrigger>
          <TabsTrigger 
            value="certification" 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'certification' 
                ? 'bg-white dark:bg-gray-700 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Request Certification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <VendorDashboard vendor={vendorData} />
        </TabsContent>
        
        <TabsContent value="profile" className="mt-6">
          <VendorProfile initialData={vendorData} />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <VendorAnalytics />
        </TabsContent>
        
        <TabsContent value="add-product" className="mt-6">
          <ProductForm />
        </TabsContent>
        
        <TabsContent value="certification" className="mt-6">
          <CertificationRequest />
        </TabsContent>
      </Tabs>
    </div>
  );
}