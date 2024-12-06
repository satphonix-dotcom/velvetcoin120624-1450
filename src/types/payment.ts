export type CryptoType = 'ETH' | 'BTC' | 'USDT' | 'USDC' | 'DAI';

export interface CryptoPrice {
  [key: string]: number;
  ETH: number;
  BTC: number;
  USDT: number;
  USDC: number;
  DAI: number;
}

export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: CryptoPrice;
  receivingAddresses: {
    [key in CryptoType]: string;
  };
  selectedCrypto?: CryptoType;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  expiresAt: string;
  createdAt: string;
  transactionHash?: string;
}

export interface CreatePaymentData {
  orderId: string;
  amount: CryptoPrice;
  selectedCrypto: CryptoType;
}

export interface VerifyPaymentData {
  transactionHash: string;
  cryptoType: CryptoType;
}