```javascript
import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import { AnalyticsService } from '../services/AnalyticsService.js';

const router = express.Router();

// Get sales analytics
router.get('/sales',
  auth,
  checkRole(['admin', 'vendor']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getSalesAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get product analytics
router.get('/products',
  auth,
  checkRole(['admin', 'vendor']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getProductAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user analytics
router.get('/users',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getUserAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get search analytics
router.get('/search',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getSearchAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get promotion analytics
router.get('/promotions',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getPromotionAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get geographic analytics
router.get('/geographic',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const stats = await AnalyticsService.getGeographicAnalytics(req.query);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
```