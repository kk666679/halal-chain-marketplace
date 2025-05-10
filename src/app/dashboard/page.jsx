"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Package, 
  Award, 
  Truck, 
  Users, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useWeb3 } from '@/components/blockchain/Web3Provider';
import { formatAddress } from '@/lib/utils';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { account, isConnected, connectWallet } = useWeb3();
  const [stats, setStats] = useState({
    products: 0,
    certifications: 0,
    supplyChainEvents: 0,
    users: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          setStats({
            products: 24,
            certifications: 18,
            supplyChainEvents: 56,
            users: 12
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (status !== 'authenticated') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to access the dashboard.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, {session.user?.name || 'User'}!
        </p>
      </div>

      {/* Wallet connection alert */}
      {!isConnected && (
        <div className="mb-8 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Wallet not connected
              </h3>
              <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                <p>
                  Connect your wallet to access blockchain features like product registration and certification verification.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-md p-3">
                <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Products
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.products}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link
                href="/dashboard/products"
                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                View all products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-md p-3">
                <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Certifications
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.certifications}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link
                href="/dashboard/certifications"
                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                View all certifications
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-md p-3">
                <Truck className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Supply Chain Events
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.supplyChainEvents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link
                href="/dashboard/supply-chain"
                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                View supply chain
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900 rounded-md p-3">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stats.users}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link
                href="/dashboard/users"
                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                View all users
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain info */}
      {isConnected && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Blockchain Connection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Connected Account
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatAddress(account, 8)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Network
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Ethereum Mainnet
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Contract Address
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatAddress(process.env.NEXT_PUBLIC_HALAL_CERTIFICATION_CONTRACT || '0x0000000000000000000000000000000000000000', 8)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Block Explorer
              </p>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
              >
                View on Etherscan
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  New certification request received
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Halal Chicken Nuggets - ABC Foods
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                2 hours ago
              </div>
            </div>
          </li>
          <li className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  New product added
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organic Halal Beef - XYZ Farms
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                5 hours ago
              </div>
            </div>
          </li>
          <li className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Truck className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Supply chain event recorded
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Halal Chicken Nuggets - Processing stage
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                1 day ago
              </div>
            </div>
          </li>
          <li className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Certification verified on blockchain
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Halal Certification #HC-12345678
                </p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                2 days ago
              </div>
            </div>
          </li>
        </ul>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/dashboard/activity"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 flex items-center"
          >
            View all activity
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}