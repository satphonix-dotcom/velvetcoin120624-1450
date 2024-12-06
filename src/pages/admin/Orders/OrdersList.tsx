import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { DataTable } from '../../../components/admin/DataTable';
import type { Order } from '../../../types/order';

const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const columns = [
    {
      header: 'Order ID',
      cell: ({ row }) => (
        <Link
          to={`/admin/orders/${row.original.id}`}
          className="font-body font-semibold hover:text-gray-600"
        >
          #{row.original.id}
        </Link>
      ),
    },
    {
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <p className="font-body">{row.original.shippingAddress.fullName}</p>
          <p className="font-body text-sm text-gray-500">
            {format(new Date(row.original.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
      ),
    },
    {
      header: 'Total',
      cell: ({ row }) => (
        <div>
          <p className="font-body">${row.original.total.usd.toLocaleString()}</p>
          <p className="font-body text-sm text-gray-500">
            {row.original.paymentMethod === 'eth'
              ? `${row.original.total.eth.toFixed(4)} ETH`
              : `${row.original.total.btc.toFixed(4)} BTC`
            }
          </p>
        </div>
      ),
    },
    {
      header: 'Payment',
      cell: ({ row }) => (
        <span className={`inline-block px-2 py-1 text-xs rounded-full font-body ${
          row.original.paymentStatus === 'completed'
            ? 'bg-green-100 text-green-800'
            : row.original.paymentStatus === 'processing'
            ? 'bg-blue-100 text-blue-800'
            : row.original.paymentStatus === 'failed'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.paymentStatus.charAt(0).toUpperCase() + row.original.paymentStatus.slice(1)}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={(e) => handleStatusChange(row.original.id, e.target.value as Order['status'])}
          className="w-full px-2 py-1 border border-gray-200 rounded font-body text-sm focus:ring-0 focus:border-gray-300"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
  ];

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    console.log('Update order status:', { orderId, status });
    // Handle status update
  };

  // This would normally come from an API
  const orders: Order[] = [
    {
      id: '1234',
      vendorId: 'v1',
      customerId: 'c1',
      items: [
        {
          productId: 'p1',
          name: 'GG Marmont Bag',
          quantity: 1,
          price: {
            usd: 2300,
            eth: 1.0132,
            btc: 0.0527,
          },
        },
      ],
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shippingAddress: {
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        phone: '+1 (555) 123-4567',
      },
      paymentMethod: 'eth',
      paymentStatus: 'completed',
      transactionHash: '0x123...',
      total: {
        usd: 2300,
        eth: 1.0132,
        btc: 0.0527,
      },
    },
    // Add more sample orders
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          Orders
        </h1>
        <p className="font-body text-gray-600">
          Manage and track customer orders
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          />
        </div>
        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg font-body appearance-none bg-white focus:ring-0 focus:border-gray-300"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <DataTable
        data={orders}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
};

export default OrdersList;