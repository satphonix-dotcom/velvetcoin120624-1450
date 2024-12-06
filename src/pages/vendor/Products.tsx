import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.designer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-heading1 text-3xl tracking-wider">Products</h1>
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3 font-body hover:bg-gray-900 transition-colors">
          <Plus size={20} strokeWidth={1} />
          Add Product
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          />
        </div>
        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg font-body appearance-none bg-white focus:ring-0 focus:border-gray-300"
          >
            <option value="all">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
            <option value="jewelry">Jewelry</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-heading font-heading2">Product</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Category</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Price</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Crypto Price</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-0">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-body font-semibold">{product.name}</p>
                      <p className="font-body text-sm text-gray-500">{product.designer}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 font-body">{product.category}</td>
                <td className="py-4 px-6 font-body">${product.price.toLocaleString()}</td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="font-body text-sm">
                      {product.cryptoPrice.eth.toFixed(4)} ETH
                    </p>
                    <p className="font-body text-sm text-gray-500">
                      {product.cryptoPrice.btc.toFixed(4)} BTC
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-body">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;