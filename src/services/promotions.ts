import api from './api';
import type { Promotion, PromotionValidation } from '../types/promotion';
import type { Cart } from '../types/cart';

export const promotionService = {
  async getActivePromotions() {
    const response = await api.get('/promotions');
    return response.data as Promotion[];
  },

  async validatePromotion(code: string, cart: Cart) {
    const response = await api.post('/promotions/validate', {
      code,
      cart
    });
    return response.data as PromotionValidation;
  },

  async createPromotion(data: Partial<Promotion>) {
    const response = await api.post('/promotions', data);
    return response.data as Promotion;
  },

  async updatePromotion(id: string, data: Partial<Promotion>) {
    const response = await api.patch(`/promotions/${id}`, data);
    return response.data as Promotion;
  },

  async deletePromotion(id: string) {
    await api.delete(`/promotions/${id}`);
  }
};