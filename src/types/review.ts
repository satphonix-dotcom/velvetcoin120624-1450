import type { User } from './auth';

export interface Review {
  id: string;
  user: User;
  product: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verifiedPurchase: boolean;
  helpful: Array<{ user: string }>;
  reported: Array<{
    user: string;
    reason: string;
    createdAt: string;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  rating: number;
  title: string;
  content: string;
  images?: File[];
}

export interface ReviewStats {
  avgRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}