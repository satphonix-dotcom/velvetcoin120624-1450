import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth.js';
import { Designer } from '../models/Designer.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Get all designers
router.get('/', async (req, res) => {
  try {
    const designers = await Designer.find();
    res.json(designers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get designer by ID with products
router.get('/:id', async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id).populate('products');
    
    if (!designer) {
      return res.status(404).json({ error: 'Designer not found' });
    }
    
    res.json(designer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create designer (admin only)
router.post('/',
  auth,
  checkRole(['admin']),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('coverImage').trim().notEmpty().withMessage('Cover image is required'),
    body('about').isArray().withMessage('About must be an array of strings')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const designer = new Designer(req.body);
      await designer.save();
      res.status(201).json(designer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Update designer (admin only)
router.patch('/:id',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const designer = await Designer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!designer) {
        return res.status(404).json({ error: 'Designer not found' });
      }
      
      res.json(designer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete designer (admin only)
router.delete('/:id',
  auth,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const designer = await Designer.findByIdAndDelete(req.params.id);
      
      if (!designer) {
        return res.status(404).json({ error: 'Designer not found' });
      }
      
      res.json({ message: 'Designer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;