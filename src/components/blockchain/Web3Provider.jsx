"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HalalCertificationABI from '@/contracts/abis/HalalCertification.json';
import SupplyChainABI from '@/contracts/abis/SupplyChain.json';

// Create context
const Web3Context = createContext();

export function useWeb3() {
  return useContext(Web3Context);
}

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contracts, setContracts] = useState({
    halalCertification: null,
    supplyChain: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Contract addresses - should come from environment variables in production
  const contractAddresses = {
    halalCertification: process.env.NEXT_PUBLIC_HALAL_CERTIFICATION_CONTRACT || '0x0000000000000000000000000000000000000000',
    supplyChain: process.env.NEXT_PUBLIC_SUPPLY_CHAIN_CONTRACT || '0x0000000000000000000000000000000000000000'
  };

  // Connect to wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask or another Ethereum wallet");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);

      // Create ethers provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // Get signer
      const signer = await provider.getSigner();
      setSigner(signer);

      // Get network
      const network = await provider.getNetwork();
      setNetwork(network);

      // Initialize contracts
      const halalCertification = new ethers.Contract(
        contractAddresses.halalCertification,
        HalalCertificationABI,
        signer
      );

      const supplyChain = new ethers.Contract(
        contractAddresses.supplyChain,
        SupplyChainABI,
        signer
      );

      setContracts({
        halalCertification,
        supplyChain
      });

      setIsConnected(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setError(error.message || "Failed to connect to wallet");
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setNetwork(null);
    setIsConnected(false);
    setContracts({
      halalCertification: null,
      supplyChain: null
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else {
          // Account changed, update state
          setAccount(accounts[0]);
          connectWallet(); // Reconnect with new account
        }
      });

      window.ethereum.on('chainChanged', () => {
        // Chain changed, refresh the page
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Value to be provided by context
  const value = {
    account,
    provider,
    signer,
    network,
    isConnected,
    contracts,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}