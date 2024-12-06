import type { Product } from './product';

export interface Designer {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  about: string[];
  details: Record<string, string>;
  products: Product[];
}

export interface DesignerListItem {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}