import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

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

export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  designer: z.string().min(1, 'Designer is required'),
  price: z.number().positive('Price must be positive'),
  category: z.enum(['clothing', 'shoes', 'bags', 'jewelry', 'accessories']),
  description: z.string().optional(),
  details: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  cryptoPrice: z.object({
    btc: z.number().positive(),
    eth: z.number().positive(),
  }),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    product: z.string(),
    quantity: z.number().int().positive(),
    size: z.string().optional(),
  })),
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
  paymentMethod: z.enum(['eth', 'btc']),
});

export const designerSchema = z.object({
  name: z.string().min(2, 'Designer name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  about: z.array(z.string()),
  details: z.object({
    founded: z.string(),
    origin: z.string(),
    creativeDirector: z.string(),
    specialties: z.string(),
    parentCompany: z.string().optional(),
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type DesignerFormData = z.infer<typeof designerSchema>;