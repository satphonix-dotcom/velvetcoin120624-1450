import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/appError.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
  handler: (req, res) => {
    throw new AppError('Too many requests, please try again later.', 429);
  }
});

// Stricter limit for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: { error: 'Too many login attempts, please try again later.' },
  handler: (req, res) => {
    throw new AppError('Too many login attempts, please try again later.', 429);
  }
});

// Payment endpoint limiter
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 payment attempts per hour
  message: { error: 'Too many payment attempts, please try again later.' },
  handler: (req, res) => {
    throw new AppError('Too many payment attempts, please try again later.', 429);
  }
});