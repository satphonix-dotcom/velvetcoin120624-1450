import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';
import { validateInput, sanitizeHtml } from '../utils/security.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest('Validation failed', 
      errors.array().reduce((acc, err) => {
        acc[err.param] = err.msg;
        return acc;
      }, {})
    );
  }
  next();
};

export const validateRequestBody = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        throw ApiError.badRequest('Validation failed', result.error.flatten());
      }
      req.validatedBody = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const sanitizeOutput = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => sanitizeOutput(item));
  }
  
  if (data && typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      // Remove sensitive fields
      if (!['password', 'salt', '__v', 'privateKey'].includes(key)) {
        sanitized[key] = sanitizeOutput(value);
      }
    }
    return sanitized;
  }
  
  // Sanitize strings to prevent XSS
  if (typeof data === 'string') {
    return sanitizeHtml(data);
  }
  
  return data;
};

export const validateWalletAddress = (address) => {
  return validateInput(address, 'walletAddress');
};

export const validateEmail = (email) => {
  return validateInput(email, 'email');
};

export const validatePassword = (password) => {
  return validateInput(password, 'password');
};