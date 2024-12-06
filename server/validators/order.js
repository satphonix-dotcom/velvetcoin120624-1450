import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      product: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().positive('Quantity must be positive'),
      size: z.string().optional()
    })
  ).min(1, 'At least one item is required'),
  
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone number is required')
  }),
  
  paymentMethod: z.enum(['eth', 'btc', 'usdt', 'usdc', 'dai'])
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ])
});