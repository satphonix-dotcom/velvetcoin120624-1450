import api from './api';
import type { Review, CreateReviewData } from '../types/review';

export const reviewService = {
  async getProductReviews(productId: string, params?: { page?: number; limit?: number }) {
    const response = await api.get(`/reviews/product/${productId}`, { params });
    return response.data;
  },

  async createReview(productId: string, data: CreateReviewData) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append('images', value);
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await api.post(`/reviews/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as Review;
  },

  async markHelpful(reviewId: string) {
    const response = await api.post(`/reviews/${reviewId}/helpful`);
    return response.data as Review;
  },

  async reportReview(reviewId: string, reason: string) {
    const response = await api.post(`/reviews/${reviewId}/report`, { reason });
    return response.data as Review;
  },
};