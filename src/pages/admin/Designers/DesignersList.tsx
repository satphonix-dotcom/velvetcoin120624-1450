import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { DataTable } from '../../../components/admin/DataTable';
import type { Designer } from '../../../types/designer';
import { designers } from '../../../data/designers';

const DesignersList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      header: 'Designer',
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100">
            <img
              src={row.original.coverImage}
              alt={row.original.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-body font-semibold">{row.original.name}</p>
            <p className="font-body text-sm text-gray-500">
              {row.original.products.length} Products
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Description',
      cell: ({ row }) => (
        <p className="font-body text-sm text-gray-600 line-clamp-2">
          {row.original.description}
        </p>
      ),
    },
    {
      header: 'Details',
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-body text-sm">
            <span className="text-gray-500">Founded:</span>{' '}
            {row.original.details.Founded}
          </p>
          <p className="font-body text-sm">
            <span className="text-gray-500">Origin:</span>{' '}
            {row.original.details.Origin}
          </p>
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/designers/${row.original.id}/edit`}
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
            Designers
          </h1>
          <p className="font-body text-gray-600">
            Manage your designer brands
          </p>
        </div>
        <Link
          to="/admin/designers/new"
          className="flex items-center gap-2 bg-black text-white px-6 py-3 font-body hover:bg-gray-900 transition-colors"
        >
          <Plus size={20} strokeWidth={1.5} />
          Add Designer
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search designers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          />
        </div>
      </div>

      <DataTable
        data={designers}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
};

export default DesignersList;