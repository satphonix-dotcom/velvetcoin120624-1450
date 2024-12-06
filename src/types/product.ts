export interface Product {
  id: string;
  name: string;
  designer: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  images?: string[];
  cryptoPrice: {
    btc: number;
    eth: number;
  };
}