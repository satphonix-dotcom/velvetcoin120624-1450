import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { WishlistService } from '../services/WishlistService.js';

const router = express.Router();

// Get user's wishlist
router.get('/',
  auth,
  async (req, res) => {
    try {
      const wishlist = await WishlistService.getWishlist(req.user._id);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Add product to wishlist
router.post('/:productId',
  auth,
  [
    body('notifyOnPriceChange').optional().isBoolean(),
    body('notifyOnLowStock').optional().isBoolean(),
    body('priceThreshold').optional().isObject()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const wishlist = await WishlistService.addToWishlist(
        req.user._id,
        req.params.productId,
        req.body
      );
      res.json(wishlist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Remove product from wishlist
router.delete('/:productId',
  auth,
  async (req, res) => {
    try {
      await WishlistService.removeFromWishlist(
        req.user._id,
        req.params.productId
      );
      res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Update wishlist item preferences
router.patch('/:productId',
  auth,
  [
    body('notifyOnPriceChange').optional().isBoolean(),
    body('notifyOnLowStock').optional().isBoolean(),
    body('priceThreshold').optional().isObject()
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const wishlist = await WishlistService.updateWishlistItem(
        req.user._id,
        req.params.productId,
        req.body
      );
      res.json(wishlist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;