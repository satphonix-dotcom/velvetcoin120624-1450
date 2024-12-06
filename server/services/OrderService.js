import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/api-error.js';
import { sendOrderConfirmation, sendShippingUpdate } from '../utils/email.js';

export class OrderService {
  static async createOrder(orderData, userId) {
    const session = await Order.startSession();
    session.startTransaction();

    try {
      // Validate products and calculate prices
      const productIds = orderData.items.map(item => item.product);
      const products = await Product.find({ _id: { $in: productIds } });

      if (products.length !== productIds.length) {
        throw ApiError.badRequest('One or more products not found');
      }

      // Create order items with current prices
      const items = orderData.items.map(item => {
        const product = products.find(p => p._id.toString() === item.product.toString());
        return {
          product: product._id,
          quantity: item.quantity,
          price: {
            usd: product.price,
            eth: product.cryptoPrice.eth,
            btc: product.cryptoPrice.btc
          },
          size: item.size
        };
      });

      // Create order
      const order = new Order({
        customer: userId,
        items,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
      });

      await order.save({ session });
      await session.commitTransaction();

      // Send confirmation email
      await sendOrderConfirmation(order);

      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async updateOrderStatus(orderId, status, userId, role) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    // Check authorization
    if (role !== 'admin' && order.customer.toString() !== userId) {
      throw ApiError.forbidden('Not authorized to update this order');
    }

    // Validate status transition
    if (!this.isValidStatusTransition(order.status, status)) {
      throw ApiError.badRequest('Invalid status transition');
    }

    order.status = status;
    if (status === 'shipped') {
      order.estimatedDeliveryDate = this.calculateEstimatedDelivery();
    }

    await order.save();

    // Send notifications
    if (status === 'shipped') {
      await sendShippingUpdate(order);
    }

    return order;
  }

  static async getOrdersByCustomer(userId, query = {}) {
    const { status, page = 1, limit = 10 } = query;
    const filter = { customer: userId };
    
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    return {
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async getOrderDetails(orderId, userId, role) {
    const order = await Order.findById(orderId)
      .populate('items.product')
      .populate('customer', 'firstName lastName email');

    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    // Check authorization
    if (role !== 'admin' && order.customer._id.toString() !== userId) {
      throw ApiError.forbidden('Not authorized to view this order');
    }

    return order;
  }

  static isValidStatusTransition(currentStatus, newStatus) {
    const transitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: []
    };

    return transitions[currentStatus]?.includes(newStatus) ?? false;
  }

  static calculateEstimatedDelivery() {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Default to 5 business days
    return date;
  }
}