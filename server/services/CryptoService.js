import { createPublicClient, http, parseUnits, formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { ethers } from 'ethers';
import { AppError } from '../utils/appError.js';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

// ERC20 Token ABI (minimal interface for transfer)
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
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

// Token decimals
const DECIMALS = {
  ETH: 18,
  BTC: 8,
  USDT: 6,
  USDC: 6,
  DAI: 18
};

export class CryptoService {
  static async getCurrentPrices() {
    try {
      // In production, fetch from a price oracle or API (e.g., CoinGecko)
      return {
        ETH: 2500.00,
        BTC: 45000.00,
        USDT: 1.00,
        USDC: 1.00,
        DAI: 1.00
      };
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      throw new AppError('Failed to fetch crypto prices', 500);
    }
  }

  static async verifyTransaction({ hash, amount, recipient, cryptoType, tokenContract }) {
    try {
      const transaction = await publicClient.getTransaction({ hash });
      
      if (!transaction) {
        return false;
      }

      // Verify recipient
      if (transaction.to?.toLowerCase() !== recipient.toLowerCase()) {
        return false;
      }

      // Verify amount based on crypto type
      if (this.isToken(cryptoType)) {
        // For ERC20 tokens
        const data = transaction.input;
        const iface = new ethers.Interface(ERC20_ABI);
        const decoded = iface.decodeFunctionData('transfer', data);
        
        const tokenAmount = formatUnits(
          decoded.args._value.toString(),
          DECIMALS[cryptoType]
        );

        // Check amount with 0.1% tolerance for price fluctuations
        const tolerance = 0.001;
        const difference = Math.abs(Number(tokenAmount) - amount);
        if (difference / amount > tolerance) {
          return false;
        }
      } else {
        // For native ETH
        const txAmount = formatUnits(transaction.value, DECIMALS.ETH);
        const tolerance = 0.001;
        const difference = Math.abs(Number(txAmount) - amount);
        if (difference / amount > tolerance) {
          return false;
        }
      }

      // Verify confirmations
      const block = await publicClient.getBlock({ blockHash: transaction.blockHash });
      const latestBlock = await publicClient.getBlockNumber();
      const confirmations = Number(latestBlock) - Number(block.number);
      
      // Require at least 3 confirmations
      return confirmations >= 3;
    } catch (error) {
      console.error('Transaction verification failed:', error);
      return false;
    }
  }

  static isToken(cryptoType) {
    return ['USDT', 'USDC', 'DAI'].includes(cryptoType);
  }

  static getTokenContract(cryptoType) {
    // ERC-20 token contract addresses on mainnet
    const contracts = {
      USDT: process.env.USDT_CONTRACT_ADDRESS,
      USDC: process.env.USDC_CONTRACT_ADDRESS,
      DAI: process.env.DAI_CONTRACT_ADDRESS
    };
    return contracts[cryptoType];
  }

  static formatCryptoAmount(amount, cryptoType) {
    const decimals = DECIMALS[cryptoType];
    return formatUnits(parseUnits(amount.toString(), decimals), decimals);
  }

  static parseCryptoAmount(amount, cryptoType) {
    const decimals = DECIMALS[cryptoType];
    return parseUnits(amount.toString(), decimals);
  }

  static async validatePaymentAmount(payment) {
    try {
      const prices = await this.getCurrentPrices();
      const { amount, selectedCrypto } = payment;

      // Calculate expected USD value
      const usdValue = amount[selectedCrypto] * prices[selectedCrypto];
      const expectedUsdValue = amount.USD;

      // Allow 1% tolerance for price fluctuations
      const tolerance = 0.01;
      const difference = Math.abs(usdValue - expectedUsdValue);
      
      if (difference / expectedUsdValue > tolerance) {
        throw new AppError('Payment amount validation failed', 400);
      }

      return true;
    } catch (error) {
      console.error('Payment validation failed:', error);
      throw error;
    }
  }
}