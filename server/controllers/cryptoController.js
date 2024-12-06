import { Payment } from '../models/Payment.js';
import { Order } from '../models/Order.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { CryptoService } from '../services/CryptoService.js';
import { InventoryService } from '../services/InventoryService.js';
import { NotificationService } from '../services/NotificationService.js';

export const getPrices = catchAsync(async (req, res) => {
  const prices = await CryptoService.getCurrentPrices();
  res.json({
    status: 'success',
    prices
  });
});

export const createPayment = catchAsync(async (req, res) => {
  const { orderId, amount, selectedCrypto } = req.body;

  // Verify order exists and belongs to user
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  if (order.customer.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized', 403);
  }

  // Create payment intent
  const payment = await Payment.create({
    order: orderId,
    amount,
    selectedCrypto,
    receivingAddresses: {
      ETH: process.env.ETH_RECEIVING_ADDRESS,
      BTC: process.env.BTC_RECEIVING_ADDRESS,
      USDT: process.env.USDT_CONTRACT_ADDRESS,
      USDC: process.env.USDC_CONTRACT_ADDRESS,
      DAI: process.env.DAI_CONTRACT_ADDRESS
    },
    expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
  });

  res.status(201).json({
    status: 'success',
    payment
  });
});

export const verifyPayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { transactionHash, cryptoType } = req.body;

  const payment = await Payment.findById(id).populate('order');
  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  // Verify transaction
  const isValid = await CryptoService.verifyTransaction({
    hash: transactionHash,
    amount: payment.amount[cryptoType],
    recipient: payment.receivingAddresses[cryptoType],
    cryptoType,
    tokenContract: req.tokenContract
  });

  if (!isValid) {
    throw new AppError('Invalid transaction', 400);
  }

  // Update payment and order status
  payment.status = 'completed';
  payment.transactionHash = transactionHash;
  await payment.save();

  // Update order status
  payment.order.paymentStatus = 'completed';
  payment.order.status = 'confirmed';
  await payment.order.save();

  // Commit inventory
  await InventoryService.commitInventory(payment.order._id, payment.order.items);

  // Send confirmation
  await NotificationService.sendOrderConfirmation(payment.order);

  res.json({
    status: 'success',
    payment
  });
});