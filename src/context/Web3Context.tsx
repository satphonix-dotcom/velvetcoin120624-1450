import React, { createContext, useContext, useState, useEffect } from 'react';
import { walletKit } from '../config/web3';

interface Web3ContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  address?: string;
  balance: {
    eth?: string;
    formatted?: string;
  };
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<{ eth?: string; formatted?: string }>({});

  useEffect(() => {
    // Initialize WalletKit and restore session if exists
    const init = async () => {
      try {
        const session = await walletKit.getSession();
        if (session) {
          setIsConnected(true);
          setAddress(session.address);
          // Fetch balance here if needed
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    };

    init();
  }, []);

  const connect = async () => {
    try {
      const session = await walletKit.connect();
      setIsConnected(true);
      setAddress(session.address);
      // Fetch balance here if needed
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      await walletKit.disconnect();
      setIsConnected(false);
      setAddress(undefined);
      setBalance({});
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connect,
        disconnect,
        isConnected,
        address,
        balance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};