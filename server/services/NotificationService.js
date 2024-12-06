import { sendEmail } from '../utils/email.js';

export class NotificationService {
  static async sendOrderConfirmation(order) {
    await sendEmail({
      to: order.customer.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      template: 'orderConfirmation',
      data: { order }
    });
  }

  static async sendOrderStatusUpdate(order) {
    await sendEmail({
      to: order.customer.email,
      subject: `Order Status Update - ${order.orderNumber}`,
      template: 'orderStatus',
      data: { order }
    });
  }

  static async sendLowStockAlert(inventory) {
    // Send notification to admin/vendor
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert',
      template: 'lowStock',
      data: { inventory }
    });
  }
}