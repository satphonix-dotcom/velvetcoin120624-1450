import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm);

  const { 
    products, 
    isLoading, 
    error,
    refetch 
  } = useProducts({
    category,
    search: debouncedSearch
  });

  return (
    <div className="container mx-auto px-16 py-12">
      <div className="mb-12">
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-4">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
        </h1>
        <p className="font-body text-gray-600">
          Discover our curated collection of luxury items
        </p>
      </div>
      
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ProductGrid
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
};

export default ProductListing;