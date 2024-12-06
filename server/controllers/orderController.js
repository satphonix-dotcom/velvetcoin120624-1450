import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { InventoryService } from '../services/InventoryService.js';
import { NotificationService } from '../services/NotificationService.js';

export const createOrder = catchAsync(async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate products and calculate prices
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
      throw new AppError('One or more products not found', 400);
    }

    // Check inventory and create order items
    const orderItems = items.map(item => {
      const product = products.find(p => p._id.toString() === item.product);
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
    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod
    });

    // Reserve inventory
    await InventoryService.reserveInventory(order._id, orderItems);

    await session.commitTransaction();

    // Send notifications
    await NotificationService.sendOrderConfirmation(order);

    res.status(201).json({
      status: 'success',
      order
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

export const getMyOrders = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  
  const query = { customer: req.user._id };
  if (status) query.status = status;

  const orders = await Order.find(query)
    .populate('items.product')
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Order.countDocuments(query);

  res.json({
    status: 'success',
    results: orders.length,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    },
    orders
  });
});

export const getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('items.product')
    .populate('customer', 'firstName lastName email');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Check authorization
  if (req.user.role !== 'admin' && order.customer._id.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to view this order', 403);
  }

  res.json({
    status: 'success',
    order
  });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Validate status transition
  if (!isValidStatusTransition(order.status, status)) {
    throw new AppError('Invalid status transition', 400);
  }

  order.status = status;

  if (status === 'shipped') {
    order.estimatedDeliveryDate = calculateEstimatedDelivery();
  }

  await order.save();

  // Handle inventory and notifications
  if (status === 'cancelled') {
    await InventoryService.releaseInventory(order._id, order.items);
  } else if (status === 'delivered') {
    await InventoryService.commitInventory(order._id, order.items);
  }

  // Send notifications
  await NotificationService.sendOrderStatusUpdate(order);

  res.json({
    status: 'success',
    order
  });
});

function isValidStatusTransition(currentStatus, newStatus) {
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

function calculateEstimatedDelivery() {
  const date = new Date();
  date.setDate(date.getDate() + 5); // Default to 5 business days
  return date;
}