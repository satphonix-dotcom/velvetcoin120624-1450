import type { Product } from './product';

export interface VendorProfile {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  location: string;
  establishedYear: number;
  categories: string[];
  rating: number;
  totalSales: number;
  cryptoWallets: {
    eth: string;
    btc: string;
  };
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: {
    usd: number;
    eth: number;
    btc: number;
  };
  averageRating: number;
}

export interface VendorDashboardData {
  profile: VendorProfile;
  stats: VendorStats;
  recentProducts: Product[];
  recentOrders: Order[];
}