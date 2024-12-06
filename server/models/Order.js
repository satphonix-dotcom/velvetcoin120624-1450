import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      usd: {
        type: Number,
        required: true
      },
      eth: {
        type: Number,
        required: true
      },
      btc: {
        type: Number,
        required: true
      }
    },
    size: String
  }],
  shippingAddress: {
    fullName: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['eth', 'btc', 'usdt', 'usdc', 'dai'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionHash: String,
  total: {
    usd: {
      type: Number,
      required: true
    },
    eth: {
      type: Number,
      required: true
    },
    btc: {
      type: Number,
      required: true
    }
  },
  notes: String,
  trackingNumber: String,
  estimatedDeliveryDate: Date,
  refundReason: String,
  cancelReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate order totals before saving
orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    this.total = this.items.reduce((acc, item) => ({
      usd: acc.usd + (item.price.usd * item.quantity),
      eth: acc.eth + (item.price.eth * item.quantity),
      btc: acc.btc + (item.price.btc * item.quantity)
    }), { usd: 0, eth: 0, btc: 0 });
  }
  next();
});

// Virtual for order number (e.g., VC-2024-0001)
orderSchema.virtual('orderNumber').get(function() {
  const timestamp = this._id.getTimestamp();
  const year = timestamp.getFullYear();
  const sequence = this._id.toString().slice(-4);
  return `VC-${year}-${sequence}`;
});

// Indexes for better query performance
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ 'items.product': 1 });

export const Order = mongoose.model('Order', orderSchema);