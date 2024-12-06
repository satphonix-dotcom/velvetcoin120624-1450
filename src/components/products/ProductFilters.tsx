import React from 'react';
import { Search } from 'lucide-react';
import Select from '../common/Select';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
  ];

  const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'btc', label: 'BTC' },
    { value: 'eth', label: 'ETH' },
  ];

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
      <div className="flex-1 max-w-md relative">
        <Search 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
        />
      </div>

      <div className="flex items-center gap-4">
        <Select
          options={sortOptions}
          className="w-48"
          defaultValue="newest"
        />
        <Select
          options={currencyOptions}
          className="w-32"
          defaultValue="usd"
        />
      </div>
    </div>
  );
};

export default ProductFilters;