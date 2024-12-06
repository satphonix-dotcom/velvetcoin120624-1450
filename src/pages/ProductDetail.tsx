import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/products/detail/ProductGallery';
import ProductInfo from '../components/products/detail/ProductInfo';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useProduct } from '../hooks/useProducts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error, refetch } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <ErrorMessage message={error || 'Product not found'} />
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-black text-white font-body hover:bg-gray-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-16 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ProductGallery 
          images={product.images || [product.imageUrl]} 
          name={product.name} 
        />
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;