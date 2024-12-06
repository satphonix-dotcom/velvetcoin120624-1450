import type { Product } from './product';

export interface WishlistItem {
  product: Product;
  addedAt: string;
  notifyOnPriceChange: boolean;
  notifyOnLowStock: boolean;
  priceThreshold?: {
    usd?: number;
    eth?: number;
    btc?: number;
  };
}

export interface Wishlist {
  products: WishlistItem[];
}

export interface WishlistPreferences {
  notifyOnPriceChange?: boolean;
  notifyOnLowStock?: boolean;
  priceThreshold?: {
    usd?: number;
    eth?: number;
    btc?: number;
  };
}