import mongoose from 'mongoose';
import { logSecurityEvent } from '../middleware/audit.js';

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  variants: [{
    size: String,
    color: String,
    quantity: Number,
    sku: String
  }],
  location: {
    warehouse: String,
    section: String,
    shelf: String
  },
  lastRestocked: Date,
  reservedQuantity: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Middleware to check low stock and trigger notifications
inventorySchema.post('save', async function(doc) {
  if (doc.quantity <= doc.lowStockThreshold) {
    logSecurityEvent('low_stock_alert', {
      productId: doc.product,
      sku: doc.sku,
      quantity: doc.quantity,
      threshold: doc.lowStockThreshold
    });
  }
});

// Method to reserve inventory for an order
inventorySchema.methods.reserve = async function(quantity) {
  if (this.quantity - this.reservedQuantity < quantity) {
    throw new Error('Insufficient inventory');
  }
  this.reservedQuantity += quantity;
  await this.save();
};

// Method to release reserved inventory
inventorySchema.methods.release = async function(quantity) {
  this.reservedQuantity = Math.max(0, this.reservedQuantity - quantity);
  await this.save();
};

// Method to commit reserved inventory (after order confirmation)
inventorySchema.methods.commit = async function(quantity) {
  if (this.reservedQuantity < quantity) {
    throw new Error('Invalid reservation commit');
  }
  this.quantity -= quantity;
  this.reservedQuantity -= quantity;
  await this.save();
};

export const Inventory = mongoose.model('Inventory', inventorySchema);