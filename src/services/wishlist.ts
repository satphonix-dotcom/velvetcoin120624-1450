import api from './api';
import type { Wishlist, WishlistPreferences } from '../types/wishlist';

export const wishlistService = {
  async getWishlist() {
    const response = await api.get('/wishlist');
    return response.data as Wishlist;
  },

  async addToWishlist(productId: string, preferences?: WishlistPreferences) {
    const response = await api.post(`/wishlist/${productId}`, preferences);
    return response.data as Wishlist;
  },

  async removeFromWishlist(productId: string) {
    await api.delete(`/wishlist/${productId}`);
  },

  async updatePreferences(productId: string, preferences: WishlistPreferences) {
    const response = await api.patch(`/wishlist/${productId}`, preferences);
    return response.data as Wishlist;
  }
};