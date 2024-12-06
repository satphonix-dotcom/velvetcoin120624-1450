import { z } from 'zod';

const productBaseSchema = {
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  designer: z.string().min(1, 'Designer is required'),
  price: z.number().positive('Price must be positive'),
  category: z.enum(['clothing', 'shoes', 'bags', 'jewelry', 'accessories']),
  description: z.string().optional(),
  details: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  cryptoPrice: z.object({
    btc: z.number().positive('BTC price must be positive'),
    eth: z.number().positive('ETH price must be positive'),
  }),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
};

export const createProductSchema = z.object({
  ...productBaseSchema,
});

export const updateProductSchema = z.object({
  ...productBaseSchema,
}).partial();