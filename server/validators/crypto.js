import { z } from 'zod';

export const createPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  amount: z.object({
    USD: z.number().positive('USD amount must be positive'),
    ETH: z.number().positive('ETH amount must be positive'),
    BTC: z.number().positive('BTC amount must be positive'),
    USDT: z.number().positive('USDT amount must be positive'),
    USDC: z.number().positive('USDC amount must be positive'),
    DAI: z.number().positive('DAI amount must be positive')
  }),
  selectedCrypto: z.enum(['ETH', 'BTC', 'USDT', 'USDC', 'DAI'], {
    errorMap: () => ({ message: 'Invalid cryptocurrency selected' })
  })
});

export const verifyPaymentSchema = z.object({
  transactionHash: z.string()
    .regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash format'),
  cryptoType: z.enum(['ETH', 'BTC', 'USDT', 'USDC', 'DAI'], {
    errorMap: () => ({ message: 'Invalid cryptocurrency type' })
  })
});

// Schema for payment amount validation
export const validateAmountSchema = z.object({
  amount: z.object({
    USD: z.number().positive(),
    ETH: z.number().positive(),
    BTC: z.number().positive(),
    USDT: z.number().positive(),
    USDC: z.number().positive(),
    DAI: z.number().positive()
  }),
  selectedCrypto: z.enum(['ETH', 'BTC', 'USDT', 'USDC', 'DAI'])
});

// Schema for payment status updates
export const updatePaymentStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'failed'], {
    errorMap: () => ({ message: 'Invalid payment status' })
  })
});

// Schema for payment search/filtering
export const paymentFilterSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  cryptoType: z.enum(['ETH', 'BTC', 'USDT', 'USDC', 'DAI']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().positive().optional(),
  maxAmount: z.number().positive().optional()
}).refine(
  data => !(data.minAmount && data.maxAmount && data.minAmount > data.maxAmount),
  { message: 'Minimum amount cannot be greater than maximum amount' }
);