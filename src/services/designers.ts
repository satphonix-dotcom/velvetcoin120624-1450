import api from './api';
import type { Designer } from '../types/designer';

export const designerService = {
  async getAll() {
    const response = await api.get('/designers');
    return response.data as Designer[];
  },

  async getById(id: string) {
    const response = await api.get(`/designers/${id}`);
    return response.data as Designer;
  },

  async create(data: FormData) {
    const response = await api.post('/designers', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data as Designer;
  },

  async update(id: string, data: Partial<Designer>) {
    const response = await api.patch(`/designers/${id}`, data);
    return response.data as Designer;
  },

  async delete(id: string) {
    await api.delete(`/designers/${id}`);
  }
};