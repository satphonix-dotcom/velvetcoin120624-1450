export interface Order {
  id: string;
  vendorId: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  paymentMethod: 'eth' | 'btc';
  paymentStatus: PaymentStatus;
  transactionHash?: string;
  total: {
    usd: number;
    eth: number;
    btc: number;
  };
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: {
    usd: number;
    eth: number;
    btc: number;
  };
  size?: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';