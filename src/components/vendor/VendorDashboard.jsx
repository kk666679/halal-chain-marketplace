'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Package, 
  FileCheck, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ShoppingCart,
  Users,
  Star
} from 'lucide-react';

export default function VendorDashboard({ vendor }) {
  // Mock data - in a real app, this would come from API
  const dashboardData = {
    totalProducts: 24,
    pendingCertifications: 3,
    activeCertifications: 18,
    rejectedCertifications: 1,
    totalSales: 12580,
    monthlyRevenue: 4350,
    averageRating: 4.7,
    totalOrders: 156,
    pendingOrders: 8,
    completedOrders: 142,
    cancelledOrders: 6,
    recentOrders: [
      { id: 'ORD-7829', date: '2023-11-28', customer: 'Ahmad Yusof', amount: 245.00, status: 'delivered' },
      { id: 'ORD-7830', date: '2023-11-27', customer: 'Sarah Johnson', amount: 120.50, status: 'processing' },
      { id: 'ORD-7825', date: '2023-11-26', customer: 'Mohammed Ali', amount: 350.75, status: 'delivered' },
      { id: 'ORD-7820', date: '2023-11-25', customer: 'Fatima Hassan', amount: 89.99, status: 'delivered' },
    ],
    recentCertifications: [
      { id: 'CERT-123', product: 'Organic Honey', submittedDate: '2023-11-20', status: 'approved' },
      { id: 'CERT-124', product: 'Halal Beef Cuts', submittedDate: '2023-11-22', status: 'pending' },
      { id: 'CERT-125', product: 'Natural Dates', submittedDate: '2023-11-24', status: 'approved' },
      { id: 'CERT-126', product: 'Spice Mix', submittedDate: '2023-11-26', status: 'rejected' },
    ]
  };

  const [timeRange, setTimeRange] = useState('month');

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'pending':
        return 'text-amber-600 bg-amber-100';
      case 'rejected':
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, {vendor?.name || 'Vendor'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            href="/dashboard/products/add" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Add New Product
          </Link>
          <Link 
            href="/dashboard/certifications/new" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Request Certification
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
              <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Certifications</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.activeCertifications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900">
              <ShoppingCart className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${dashboardData.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Certification Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Pending</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.pendingCertifications}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Approved</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.activeCertifications}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Rejected</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.rejectedCertifications}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Pending</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.pendingOrders}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Completed</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.completedOrders}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Cancelled</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.cancelledOrders}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-2">
                <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Average Rating</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{dashboardData.averageRating}/5</span>
            </div>
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mr-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Total Customers</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">87</span>
            </div>
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-2">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">Total Sales</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">${dashboardData.totalSales.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
              View all
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Certifications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Certifications</h3>
            <Link href="/dashboard/certifications" className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
              View all
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Submitted Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.recentCertifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <Link href={`/dashboard/certifications/${cert.id}`}>
                      {cert.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {cert.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(cert.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}