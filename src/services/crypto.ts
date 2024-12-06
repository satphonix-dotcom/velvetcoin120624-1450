import { parseEther, parseUnits, formatEther, formatUnits } from 'viem';
import type { Hash } from 'viem';
import api from './api';
import type { CryptoType, CryptoPrice, PaymentIntent, CreatePaymentData } from '../types/payment';

const DECIMALS = {
  ETH: 18,
  BTC: 8,
  USDT: 6,
  USDC: 6,
  DAI: 18,
};

export const cryptoService = {
  async getPrices(): Promise<CryptoPrice> {
    const response = await api.get('/crypto/prices');
    return response.data;
  },

  async createPayment(data: CreatePaymentData): Promise<PaymentIntent> {
    const response = await api.post('/crypto/payments', data);
    return response.data;
  },

  async verifyPayment(paymentId: string, data: { transactionHash: Hash; cryptoType: CryptoType }) {
    const response = await api.post(`/crypto/payments/${paymentId}/verify`, data);
    return response.data;
  },

  formatCryptoAmount(amount: number, cryptoType: CryptoType): string {
    const decimals = DECIMALS[cryptoType];
    return formatUnits(parseUnits(amount.toString(), decimals), decimals);
  },

  parseCryptoAmount(amount: string, cryptoType: CryptoType): bigint {
    const decimals = DECIMALS[cryptoType];
    return parseUnits(amount, decimals);
  },

  getTokenContract(cryptoType: CryptoType): string {
    // ERC-20 token contract addresses on mainnet
    const contracts = {
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    };
    return contracts[cryptoType as keyof typeof contracts] || '';
  },

  isToken(cryptoType: CryptoType): boolean {
    return ['USDT', 'USDC', 'DAI'].includes(cryptoType);
  }
};