"use client";

import { useState, useEffect } from 'react';
import { Wallet, ExternalLink, AlertCircle, CheckCircle, Loader2, Shield, Copy, Check } from 'lucide-react';
import { useWeb3 } from './Web3Provider';
import { formatAddress } from '@/lib/utils';
import Modal from '../modals/Modal';
import Button from '../forms/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConnectWalletButton({
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  showAddress = true,
  showBalance = false,
  showNetworkBadge = false,
  className,
  ...props
}) {
  const { 
    account, 
    isConnected, 
    isLoading, 
    connectWallet, 
    disconnectWallet, 
    error,
    chainId,
    balance,
    switchNetwork
  } = useWeb3();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [networkName, setNetworkName] = useState('');
  
  // Get network name based on chainId
  useEffect(() => {
    if (!chainId) return;
    
    const networks = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      43114: 'Avalanche',
      42161: 'Arbitrum',
      10: 'Optimism',
      8453: 'Base'
    };
    
    setNetworkName(networks[chainId] || `Chain ID: ${chainId}`);
  }, [chainId]);
  
  const handleConnect = async () => {
    if (window.ethereum) {
      await connectWallet();
    } else {
      setIsModalOpen(true);
    }
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
    setIsDetailsModalOpen(false);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const openDetailsModal = () => {
    if (isConnected) {
      setIsDetailsModalOpen(true);
    }
  };
  
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Wallet options for the modal
  const walletOptions = [
    {
      name: 'MetaMask',
      icon: '/images/wallets/metamask.svg',
      description: 'Connect to your MetaMask wallet',
      downloadUrl: 'https://metamask.io/download/',
      popular: true,
    },
    {
      name: 'Coinbase Wallet',
      icon: '/images/wallets/coinbase.svg',
      description: 'Connect to your Coinbase wallet',
      downloadUrl: 'https://www.coinbase.com/wallet',
      popular: true,
    },
    {
      name: 'WalletConnect',
      icon: '/images/wallets/walletconnect.svg',
      description: 'Connect using WalletConnect',
      downloadUrl: 'https://walletconnect.com/',
      popular: true,
    },
    {
      name: 'Trust Wallet',
      icon: '/images/wallets/trustwallet.svg',
      description: 'Connect to your Trust wallet',
      downloadUrl: 'https://trustwallet.com/',
    },
    {
      name: 'Ledger',
      icon: '/images/wallets/ledger.svg',
      description: 'Connect your Ledger hardware wallet',
      downloadUrl: 'https://www.ledger.com/',
    },
    {
      name: 'Rainbow',
      icon: '/images/wallets/rainbow.svg',
      description: 'Connect to your Rainbow wallet',
      downloadUrl: 'https://rainbow.me/',
    },
  ];
  
  // Network options
  const networkOptions = [
    { id: 1, name: 'Ethereum', icon: '/images/networks/ethereum.svg' },
    { id: 137, name: 'Polygon', icon: '/images/networks/polygon.svg' },
    { id: 56, name: 'BSC', icon: '/images/networks/bsc.svg' },
    { id: 43114, name: 'Avalanche', icon: '/images/networks/avalanche.svg' },
    { id: 42161, name: 'Arbitrum', icon: '/images/networks/arbitrum.svg' },
    { id: 10, name: 'Optimism', icon: '/images/networks/optimism.svg' },
    { id: 8453, name: 'Base', icon: '/images/networks/base.svg' },
  ];

  return (
    <>
      {isConnected ? (
        <div className="relative">
          <Button
            variant="outline"
            size={size}
            fullWidth={fullWidth}
            leftIcon={showNetworkBadge ? null : CheckCircle}
            onClick={openDetailsModal}
            className={className}
            {...props}
          >
            {showNetworkBadge && (
              <div className="flex items-center mr-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">{networkName}</span>
              </div>
            )}
            {showAddress ? formatAddress(account) : 'Connected'}
            {showBalance && balance && (
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                ({parseFloat(balance).toFixed(4)} ETH)
              </span>
            )}
          </Button>
        </div>
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
            <div className="flex items-center mb-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Popular</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700 ml-3"></div>
            </div>
            
            {walletOptions.filter(w => w.popular).map((wallet) => (
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
            
            <div className="flex items-center mt-6 mb-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">More Options</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700 ml-3"></div>
            </div>
            
            {walletOptions.filter(w => !w.popular).map((wallet) => (
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
      
      {/* Wallet details modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        title="Wallet Details"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-4">
              <Shield className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Connected Wallet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your wallet is connected to HalalChain
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Address</span>
              <div className="flex items-center">
                <button
                  onClick={copyAddress}
                  className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 p-1"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <a
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 p-1"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
              {account}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Network</h4>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {networkName}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Balance</h4>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Loading...'}
              </p>
            </div>
          </div>
          
          {/* Network switching */}
          {switchNetwork && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Switch Network
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {networkOptions.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => switchNetwork(network.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-md border ${
                      chainId === network.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                  >
                    <img src={network.icon} alt={network.name} className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {network.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="danger"
              onClick={handleDisconnect}
              fullWidth
            >
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}