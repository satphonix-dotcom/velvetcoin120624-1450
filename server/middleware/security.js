import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { AppError } from '../utils/appError.js';

export const securityMiddleware = [
  // Set security HTTP headers
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.etherscan.io", "wss://mainnet.infura.io"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https:", "data:"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"]
      }
    }
  }),

  // Data sanitization against NoSQL query injection
  mongoSanitize(),

  // Data sanitization against XSS
  xss(),

  // Custom security middleware
  (req, res, next) => {
    // Add security headers
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(self)'
    );

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /union\s+select/i,
      /exec\s*\(/i,
      /<script>/i,
      /javascript:/i,
      /data:/i
    ];

    const requestData = JSON.stringify({
      body: req.body,
      query: req.query,
      params: req.params
    });

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(requestData)) {
        throw new AppError('Suspicious request detected', 403);
      }
    }

    next();
  }
];