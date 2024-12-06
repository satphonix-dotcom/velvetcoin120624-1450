import express from 'express';
import { protect } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { paymentLimiter } from '../middleware/rateLimit.js';
import {
  validatePaymentAmount,
  checkPaymentExpiration,
  verifyTokenContract
} from '../middleware/payment.js';
import {
  getPrices,
  createPayment,
  verifyPayment
} from '../controllers/cryptoController.js';
import {
  createPaymentSchema,
  verifyPaymentSchema
} from '../validators/crypto.js';

const router = express.Router();

// Public routes
router.get('/prices', getPrices);

// Protected routes
router.use(protect);
router.use(paymentLimiter);

router.post(
  '/payments',
  validateRequest(createPaymentSchema),
  validatePaymentAmount,
  createPayment
);

router.post(
  '/payments/:id/verify',
  validateRequest(verifyPaymentSchema),
  checkPaymentExpiration,
  verifyTokenContract,
  verifyPayment
);

export default router;