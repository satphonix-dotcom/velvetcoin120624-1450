import api from './api';
import type { Order } from '../types/order';

export const orderService = {
  async getAll() {
    const response = await api.get('/orders');
    return response.data as Order[];
  },

  async getMyOrders() {
    const response = await api.get('/orders/my-orders');
    return response.data as Order[];
  },

  async getById(id: string) {
    const response = await api.get(`/orders/${id}`);
    return response.data as Order;
  },

  async create(data: Omit<Order, 'id' | 'customer'>) {
    const response = await api.post('/orders', data);
    return response.data as Order;
  },

  async updateStatus(id: string, status: Order['status']) {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data as Order;
  },

  async updatePayment(id: string, paymentStatus: Order['paymentStatus'], transactionHash?: string) {
    const response = await api.patch(`/orders/${id}/payment`, {
      paymentStatus,
      transactionHash
    });
    return response.data as Order;
  }
};