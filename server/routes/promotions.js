import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { PromotionService } from '../services/PromotionService.js';

const router = express.Router();

// Get active promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await PromotionService.getActivePromotions();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate promotion code
router.post('/validate',
  auth,
  [
    body('code').trim().notEmpty().withMessage('Promotion code is required'),
    body('cart').isObject().withMessage('Cart is required')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const promotion = await PromotionService.validatePromotion(
        req.body.code,
        req.user._id,
        req.body.cart
      );

      const discount = PromotionService.calculateDiscount(
        promotion,
        req.body.cart
      );

      res.json({ promotion, discount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Admin routes
router.post('/',
  auth,
  checkRole(['admin']),
  [
    body('code').trim().notEmpty().withMessage('Code is required'),
    body('type').isIn(['percentage', 'fixed', 'bogo', 'shipping'])
      .withMessage('Invalid promotion type'),
    body('value').isFloat({ min: 0 }).withMessage('Invalid value'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('endDate').isISO8601().withMessage('Invalid end date')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const promotion = await PromotionService.createPromotion(req.body);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.patch('/:id',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const promotion = await PromotionService.updatePromotion(
        req.params.id,
        req.body
      );
      res.json(promotion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete('/:id',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      await PromotionService.deletePromotion(req.params.id);
      res.json({ message: 'Promotion deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;