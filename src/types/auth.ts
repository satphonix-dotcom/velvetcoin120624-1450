export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'vendor' | 'admin';
  createdAt: string;
  updatedAt: string;
  shippingAddresses?: Address[];
  cryptoWallets?: {
    eth?: string;
    btc?: string;
  };
}

export interface Address {
  id: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInData {
  email: string;
  password: string;
}