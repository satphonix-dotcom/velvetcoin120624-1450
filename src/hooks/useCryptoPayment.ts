import { useCallback, useState } from 'react';
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { cryptoService } from '../services/crypto';
import { orderService } from '../services/orders';
import type { Order } from '../types/order';
import type { CryptoType, PaymentIntent } from '../types/payment';

const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
];

export function useCryptoPayment() {
  const { address, isConnected } = useAccount();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>('ETH');

  // Get balance for selected crypto
  const { data: balance } = useBalance({
    address,
    token: cryptoService.isToken(selectedCrypto) 
      ? cryptoService.getTokenContract(selectedCrypto)
      : undefined,
    enabled: isConnected,
  });

  // Setup ERC20 contract write
  const { write: writeToken } = useContractWrite({
    address: cryptoService.getTokenContract(selectedCrypto),
    abi: ERC20_ABI,
    functionName: 'transfer',
    enabled: cryptoService.isToken(selectedCrypto),
  });

  // Monitor transaction status
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: paymentIntent?.transactionHash as `0x${string}`,
    enabled: Boolean(paymentIntent?.transactionHash),
    onSuccess: async (transaction) => {
      try {
        await cryptoService.verifyPayment(paymentIntent!.id, {
          transactionHash: transaction.hash,
          cryptoType: selectedCrypto
        });
        setPaymentStatus('success');
      } catch (error) {
        setPaymentStatus('error');
        console.error('Payment verification failed:', error);
      }
    },
  });

  const processPayment = useCallback(async (order: Order) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setPaymentStatus('processing');

      // Create payment intent
      const intent = await cryptoService.createPayment({
        orderId: order.id,
        amount: order.total,
        selectedCrypto
      });

      setPaymentIntent(intent);

      // Handle payment based on crypto type
      let hash: string;
      if (cryptoService.isToken(selectedCrypto)) {
        // ERC20 token transfer
        const amount = cryptoService.parseCryptoAmount(
          order.total[selectedCrypto].toString(),
          selectedCrypto
        );
        const tx = await writeToken({
          args: [intent.receivingAddresses[selectedCrypto], amount]
        });
        hash = tx.hash;
      } else {
        // Native crypto transfer (ETH/BTC)
        const tx = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: address,
            to: intent.receivingAddresses[selectedCrypto],
            value: parseEther(order.total[selectedCrypto].toString()),
          }],
        });
        hash = tx;
      }

      // Update payment intent with transaction hash
      await cryptoService.verifyPayment(intent.id, {
        transactionHash: hash,
        cryptoType: selectedCrypto
      });

      // Update order status
      await orderService.updateStatus(order.id, 'processing');

      return hash;
    } catch (error) {
      setPaymentStatus('error');
      throw error;
    }
  }, [isConnected, address, selectedCrypto, writeToken]);

  return {
    processPayment,
    paymentStatus,
    isConfirming,
    balance,
    isConnected,
    selectedCrypto,
    setSelectedCrypto,
    supportedCryptos: ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'] as CryptoType[],
  };
}