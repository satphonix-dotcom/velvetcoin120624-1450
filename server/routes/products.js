import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { createProductSchema, updateProductSchema } from '../validators/product.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Protected routes
router.use(protect);

// Vendor/Admin routes
router.post(
  '/',
  restrictTo('vendor', 'admin'),
  upload.array('images', 5),
  validateRequest(createProductSchema),
  createProduct
);

router.patch(
  '/:id',
  restrictTo('vendor', 'admin'),
  upload.array('images', 5),
  validateRequest(updateProductSchema),
  updateProduct
);

router.delete(
  '/:id',
  restrictTo('vendor', 'admin'),
  deleteProduct
);

export default router;