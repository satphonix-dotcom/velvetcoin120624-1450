import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    notifyOnPriceChange: {
      type: Boolean,
      default: true
    },
    notifyOnLowStock: {
      type: Boolean,
      default: true
    },
    priceThreshold: {
      usd: Number,
      eth: Number,
      btc: Number
    }
  }]
}, {
  timestamps: true
});

// Ensure unique products per user
wishlistSchema.index({ user: 1, 'products.product': 1 }, { unique: true });

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);