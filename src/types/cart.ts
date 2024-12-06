export interface CartItem {
  id: string;
  productId: string;
  name: string;
  designer: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  cryptoPrice: {
    btc: number;
    eth: number;
  };
}

export interface CartState {
  items: CartItem[];
  currency: 'usd' | 'btc' | 'eth';
}