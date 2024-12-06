import { AppError } from '../utils/appError.js';
import { CryptoService } from '../services/CryptoService.js';
import { Payment } from '../models/Payment.js';

export const validatePaymentAmount = async (req, res, next) => {
  try {
    await CryptoService.validatePaymentAmount(req.body);
    next();
  } catch (error) {
    next(new AppError('Invalid payment amount', 400));
  }
};

export const checkPaymentExpiration = async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);
  
  if (!payment) {
    return next(new AppError('Payment not found', 404));
  }

  if (new Date() > payment.expiresAt) {
    return next(new AppError('Payment has expired', 400));
  }

  next();
};

export const verifyTokenContract = async (req, res, next) => {
  const { cryptoType } = req.body;
  
  if (CryptoService.isToken(cryptoType)) {
    const contractAddress = CryptoService.getTokenContract(cryptoType);
    if (!contractAddress) {
      return next(new AppError('Invalid token contract', 400));
    }
    req.tokenContract = contractAddress;
  }
  
  next();
};