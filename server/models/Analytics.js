```javascript
import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['pageView', 'productView', 'addToCart', 'purchase', 'search', 'promotion'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: String,
  data: {
    url: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    searchQuery: String,
    promotionCode: String,
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    revenue: {
      usd: Number,
      eth: Number,
      btc: Number
    },
    metadata: mongoose.Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  deviceInfo: {
    userAgent: String,
    platform: String,
    device: String,
    browser: String
  },
  location: {
    country: String,
    region: String,
    city: String,
    ip: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
analyticsSchema.index({ type: 1, timestamp: -1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ 'data.productId': 1, timestamp: -1 });
analyticsSchema.index({ 'location.country': 1 });

export const Analytics = mongoose.model('Analytics', analyticsSchema);
```