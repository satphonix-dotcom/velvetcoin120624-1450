import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  error,
  onRetry
}) => {
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <ErrorMessage 
          message={error}
          className="max-w-md"
        />
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-black text-white font-body hover:bg-gray-900"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="font-body text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;