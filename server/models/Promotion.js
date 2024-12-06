import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'bogo', 'shipping'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  minimumPurchase: {
    type: Number,
    default: 0
  },
  maximumDiscount: {
    type: Number
  },
  usageLimit: {
    perUser: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  usageCount: {
    type: Number,
    default: 0
  },
  conditions: {
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    categories: [String],
    designers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designer'
    }],
    userTypes: [{
      type: String,
      enum: ['new', 'returning', 'vip']
    }]
  },
  stackable: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
promotionSchema.index({ code: 1 });
promotionSchema.index({ startDate: 1, endDate: 1 });
promotionSchema.index({ active: 1 });

// Validate dates
promotionSchema.pre('save', function(next) {
  if (this.startDate >= this.endDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

export const Promotion = mongoose.model('Promotion', promotionSchema);