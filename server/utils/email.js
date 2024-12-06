import nodemailer from 'nodemailer';
import { AppError } from './appError.js';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const templates = {
      orderConfirmation: (data) => `
        <h1>Order Confirmation - #${data.order.id}</h1>
        <p>Thank you for your order!</p>
        <p>Total Amount: $${data.order.total.usd}</p>
        <p>Payment Method: ${data.order.paymentMethod.toUpperCase()}</p>
      `,
      orderStatus: (data) => `
        <h1>Order Status Update - #${data.order.id}</h1>
        <p>Your order status has been updated to: ${data.order.status}</p>
      `,
      lowStock: (data) => `
        <h1>Low Stock Alert</h1>
        <p>Product ID: ${data.inventory.product}</p>
        <p>Current Quantity: ${data.inventory.quantity}</p>
        <p>Threshold: ${data.inventory.lowStockThreshold}</p>
      `
    };

    const html = templates[template](data);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new AppError('Failed to send email', 500);
  }
};