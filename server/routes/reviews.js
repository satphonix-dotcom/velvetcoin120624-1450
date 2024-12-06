import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { ReviewService } from '../services/ReviewService.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get reviews for a product
router.get('/product/:productId',
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
      
      const reviews = await ReviewService.getProductReviews(productId, {
        page: Number(page),
        limit: Number(limit),
        sort
      });
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Create review
router.post('/:productId',
  auth,
  upload.array('images', 5),
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').trim().notEmpty().withMessage('Title is required')
      .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('content').trim().notEmpty().withMessage('Content is required')
      .isLength({ max: 1000 }).withMessage('Content must be less than 1000 characters')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const review = await ReviewService.createReview({
        user: req.user._id,
        product: req.params.productId,
        ...req.body,
        images: req.files?.map(file => file.path)
      });
      
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Update review
router.patch('/:reviewId',
  auth,
  [
    body('rating').optional().isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('title').optional().trim()
      .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('content').optional().trim()
      .isLength({ max: 1000 }).withMessage('Content must be less than 1000 characters')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const review = await ReviewService.updateReview(
        req.params.reviewId,
        req.user._id,
        req.body
      );
      
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete review
router.delete('/:reviewId',
  auth,
  async (req, res) => {
    try {
      await ReviewService.deleteReview(req.params.reviewId, req.user._id);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Mark review as helpful
router.post('/:reviewId/helpful',
  auth,
  async (req, res) => {
    try {
      const review = await ReviewService.markHelpful(
        req.params.reviewId,
        req.user._id
      );
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Report review
router.post('/:reviewId/report',
  auth,
  [
    body('reason').trim().notEmpty().withMessage('Reason is required')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const review = await ReviewService.reportReview(
        req.params.reviewId,
        req.user._id,
        req.body.reason
      );
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Admin routes
router.patch('/:reviewId/status',
  auth,
  checkRole(['admin']),
  [
    body('status').isIn(['approved', 'rejected'])
      .withMessage('Invalid status')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const review = await ReviewService.updateReviewStatus(
        req.params.reviewId,
        req.body.status
      );
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;