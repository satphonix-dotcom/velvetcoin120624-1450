export interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'shipping';
  value: number;
  description: string;
  startDate: string;
  endDate: string;
  minimumPurchase?: number;
  maximumDiscount?: number;
  usageLimit?: {
    perUser?: number;
    total?: number;
  };
  usageCount: number;
  conditions?: {
    products?: string[];
    categories?: string[];
    designers?: string[];
    userTypes?: Array<'new' | 'returning' | 'vip'>;
  };
  stackable: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionValidation {
  promotion: Promotion;
  discount: number;
}