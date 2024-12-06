import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { DataTable } from '../../../components/admin/DataTable';
import type { Product } from '../../../types/product';

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const columns = [
    {
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100">
            <img
              src={row.original.imageUrl}
              alt={row.original.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-body font-semibold">{row.original.name}</p>
            <p className="font-body text-sm text-gray-500">{row.original.designer}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Price',
      cell: ({ row }) => (
        <div>
          <p className="font-body">${row.original.price.toLocaleString()}</p>
          <p className="font-body text-sm text-gray-500">
            {row.original.cryptoPrice.btc.toFixed(4)} BTC
          </p>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: () => (
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/products/${row.original.id}/edit`}
            className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={() => console.log('Delete:', row.original.id)}
            className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // This would normally come from an API
  const products: Product[] = [
    {
      id: '1',
      name: 'GG Marmont Bag',
      designer: 'GUCCI',
      price: 2300,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80',
      category: 'Bags',
      cryptoPrice: {
        btc: 0.0527,
        eth: 1.0132,
      },
    },
    // Add more sample products
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
            Products
          </h1>
          <p className="font-body text-gray-600">
            Manage your product catalog
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-black text-white px-6 py-3 font-body hover:bg-gray-900 transition-colors"
        >
          <Plus size={20} strokeWidth={1.5} />
          Add Product
        </Link>
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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

      <DataTable
        data={products}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
};

export default ProductsList;