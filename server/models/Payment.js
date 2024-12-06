import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    USD: { type: Number, required: true },
    ETH: { type: Number, required: true },
    BTC: { type: Number, required: true },
    USDT: { type: Number, required: true },
    USDC: { type: Number, required: true },
    DAI: { type: Number, required: true }
  },
  selectedCrypto: {
    type: String,
    enum: ['ETH', 'BTC', 'USDT', 'USDC', 'DAI'],
    required: true
  },
  receivingAddresses: {
    ETH: String,
    BTC: String,
    USDT: String,
    USDC: String,
    DAI: String
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  transactionHash: String,
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
paymentSchema.index({ order: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: 1 });
paymentSchema.index({ expiresAt: 1 });

// Automatically expire pending payments
paymentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Payment = mongoose.model('Payment', paymentSchema);