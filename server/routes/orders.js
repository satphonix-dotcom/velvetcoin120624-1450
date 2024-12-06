import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order.js';

const router = express.Router();

router.use(protect);

router.post('/', validateRequest(createOrderSchema), createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);

// Admin only routes
router.patch(
  '/:id/status',
  restrictTo('admin'),
  validateRequest(updateOrderStatusSchema),
  updateOrderStatus
);

export default router;