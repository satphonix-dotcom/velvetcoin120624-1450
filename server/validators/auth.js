import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  shippingAddresses: z.array(
    z.object({
      fullName: z.string().min(1, 'Full name is required'),
      streetAddress: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
      country: z.string().min(1, 'Country is required'),
      phone: z.string().min(1, 'Phone is required'),
      isDefault: z.boolean().optional(),
    })
  ).optional(),
  cryptoWallets: z.object({
    eth: z.string().optional(),
    btc: z.string().optional(),
  }).optional(),
}).partial();