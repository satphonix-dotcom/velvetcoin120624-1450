import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designer',
    required: [true, 'Designer is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  images: [{
    type: String,
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['clothing', 'shoes', 'bags', 'jewelry', 'accessories'],
  },
  description: {
    type: String,
    trim: true,
  },
  details: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  cryptoPrice: {
    btc: {
      type: Number,
      required: true,
    },
    eth: {
      type: Number,
      required: true,
    },
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual populate reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// Index for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ vendor: 1, status: 1 });
productSchema.index({ designer: 1, status: 1 });

export const Product = mongoose.model('Product', productSchema);