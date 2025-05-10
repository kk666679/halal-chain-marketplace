"use client";

import { useState } from 'react';
import { Wallet, ExternalLink, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useWeb3 } from './Web3Provider';
import { formatAddress } from '@/lib/utils';
import Modal from '../modals/Modal';
import Button from '../forms/Button';

export default function ConnectWalletButton({
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  showAddress = true,
  className,
  ...props
}) {
  const { account, isConnected, isLoading, connectWallet, disconnectWallet, error } = useWeb3();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleConnect = async () => {
    if (window.ethereum) {
      await connectWallet();
    } else {
      setIsModalOpen(true);
    }
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Wallet options for the modal
  const walletOptions = [
    {
      name: 'MetaMask',
      icon: '/images/wallets/metamask.svg',
      description: 'Connect to your MetaMask wallet',
      downloadUrl: 'https://metamask.io/download/',
    },
    {
      name: 'Coinbase Wallet',
      icon: '/images/wallets/coinbase.svg',
      description: 'Connect to your Coinbase wallet',
      downloadUrl: 'https://www.coinbase.com/wallet',
    },
    {
      name: 'WalletConnect',
      icon: '/images/wallets/walletconnect.svg',
      description: 'Connect using WalletConnect',
      downloadUrl: 'https://walletconnect.com/',
    },
  ];

  return (
    <>
      {isConnected ? (
        <Button
          variant="outline"
          size={size}
          fullWidth={fullWidth}
          leftIcon={CheckCircle}
          onClick={handleDisconnect}
          className={className}
          {...props}
        >
          {showAddress ? formatAddress(account) : 'Connected'}
        </Button>
      ) : (
        <Button
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          leftIcon={Wallet}
          onClick={handleConnect}
          isLoading={isLoading}
          className={className}
          {...props}
        >
          Connect Wallet
        </Button>
      )}
      
      {/* No wallet detected modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Connect Wallet"
        size="md"
      >
        <div className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                    Connection Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <p className="text-gray-600 dark:text-gray-400">
            You need a Web3 wallet to connect. Please install one of the following wallets:
          </p>
          
          <div className="space-y-3 mt-4">
            {walletOptions.map((wallet) => (
              <a
                key={wallet.name}
                href={wallet.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="h-10 w-10 flex-shrink-0 bg-white rounded-full p-1 border border-gray-200 dark:border-gray-700">
                  <img src={wallet.icon} alt={wallet.name} className="h-full w-full" />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {wallet.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {wallet.description}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </a>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have a wallet?{' '}
              <button
                onClick={closeModal}
                className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium"
              >
                Refresh the page
              </button>{' '}
              after installation.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}