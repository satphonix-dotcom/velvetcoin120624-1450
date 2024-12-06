import api from './api';
import type { SignUpData, SignInData, UserProfile } from '../types/auth';

export const authService = {
  async register(data: SignUpData) {
    const response = await api.post('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async login(data: SignInData) {
    const response = await api.post('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data as UserProfile;
  },

  async updateProfile(data: Partial<UserProfile>) {
    const response = await api.patch('/auth/profile', data);
    return response.data as UserProfile;
  },

  logout() {
    localStorage.removeItem('token');
  }
};