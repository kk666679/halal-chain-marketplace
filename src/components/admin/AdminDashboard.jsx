'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShoppingBag, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Globe,
  Truck
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - in a real app, this would come from API
  const dashboardData = {
    totalUsers: 1248,
    newUsersToday: 24,
    totalVendors: 87,
    pendingVendors: 12,
    totalProducts: 1563,
    pendingCertifications: 28,
    activeCertifications: 1245,
    rejectedCertifications: 43,
    totalOrders: 3256,
    recentOrders: [
      { id: 'ORD-7829', date: '2023-11-28', customer: 'Ahmad Yusof', amount: 245.00, status: 'delivered' },
      { id: 'ORD-7830', date: '2023-11-27', customer: 'Sarah Johnson', amount: 120.50, status: 'processing' },
      { id: 'ORD-7825', date: '2023-11-26', customer: 'Mohammed Ali', amount: 350.75, status: 'delivered' },
      { id: 'ORD-7820', date: '2023-11-25', customer: 'Fatima Hassan', amount: 89.99, status: 'delivered' },
    ],
    recentCertifications: [
      { id: 'CERT-123', product: 'Organic Honey', vendor: 'Natural Foods Co.', submittedDate: '2023-11-20', status: 'approved' },
      { id: 'CERT-124', product: 'Halal Beef Cuts', vendor: 'Premium Meats Ltd.', submittedDate: '2023-11-22', status: 'pending' },
      { id: 'CERT-125', product: 'Natural Dates', vendor: 'Desert Farms', submittedDate: '2023-11-24', status: 'approved' },
      { id: 'CERT-126', product: 'Spice Mix', vendor: 'Global Spices Inc.', submittedDate: '2023-11-26', status: 'rejected' },
    ]
  };

  const [timeRange, setTimeRange] = useState('month');

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
      case 'approved':
        return 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30';
      case 'processing':
      case 'pending':
        return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
      case 'rejected':
      case 'cancelled':
        return 'text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of marketplace performance and activities
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                timeRange === 'week'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                timeRange === 'month'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                timeRange === 'year'
                  ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-700 dark:border-indigo-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6 transition-all hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/40">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.totalUsers}</p>
                <p className="ml-2 text-xs text-emerald-600 dark:text-emerald-400">+{dashboardData.newUsersToday} today</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6 transition-all hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/40">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <ShoppingBag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Vendors</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.totalVendors}</p>
                <p className="ml-2 text-xs text-amber-600 dark:text-amber-400">{dashboardData.pendingVendors} pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6 transition-all hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/40">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifications</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.activeCertifications}</p>
                <p className="ml-2 text-xs text-amber-600 dark:text-amber-400">{dashboardData.pendingCertifications} pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6 transition-all hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/40">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/30">
              <TrendingUp className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{dashboardData.totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-white" />
              Platform Analytics
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>User Growth</span>
                <span>+24%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Vendor Retention</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Certification Rate</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Globe className="h-5 w-5 mr-2 text-white" />
              Global Reach
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Malaysia</span>
                <span>42%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Middle East</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Other Regions</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Truck className="h-5 w-5 mr-2 text-white" />
              Supply Chain Health
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Traceability</span>
                <span>96%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>On-time Delivery</span>
                <span>89%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Quality Compliance</span>
                <span>94%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    <Link href={`/admin/orders/${order.id}`}>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Certification Requests</h3>
            <Link href="/admin/certifications" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
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
                  Vendor
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    <Link href={`/admin/certifications/${cert.id}`}>
                      {cert.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {cert.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {cert.vendor}
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