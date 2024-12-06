import api from './api';
import type { Product } from '../types/product';

export const productService = {
  async getAll(params?: { category?: string; designer?: string }) {
    const response = await api.get('/products', { params });
    return response.data as Product[];
  },

  async getById(id: string) {
    const response = await api.get(`/products/${id}`);
    return response.data as Product;
  },

  async create(data: FormData) {
    const response = await api.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data as Product;
  },

  async update(id: string, data: Partial<Product>) {
    const response = await api.patch(`/products/${id}`, data);
    return response.data as Product;
  },

  async delete(id: string) {
    await api.delete(`/products/${id}`);
  }
};