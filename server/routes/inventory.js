import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { InventoryService } from '../services/InventoryService.js';

const router = express.Router();

// Get inventory levels
router.get('/',
  auth,
  checkRole(['admin', 'vendor']),
  async (req, res) => {
    try {
      const result = await InventoryService.getInventoryLevels(req.query);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Adjust inventory
router.post('/adjust',
  auth,
  checkRole(['admin', 'vendor']),
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('adjustment').isInt().withMessage('Adjustment must be an integer'),
    body('reason').notEmpty().withMessage('Reason is required')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { productId, adjustment, reason } = req.body;
      const inventory = await InventoryService.adjustInventory(
        productId,
        adjustment,
        reason
      );
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Check availability
router.get('/check/:productId',
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { quantity, size } = req.query;
      
      const available = await InventoryService.checkAvailability(
        productId,
        Number(quantity),
        size
      );
      
      res.json({ available });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;