import mongoose from 'mongoose';

const promotionUsageSchema = new mongoose.Schema({
  promotion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  },
  usedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
promotionUsageSchema.index({ promotion: 1, user: 1 });
promotionUsageSchema.index({ order: 1 });

export const PromotionUsage = mongoose.model('PromotionUsage', promotionUsageSchema);