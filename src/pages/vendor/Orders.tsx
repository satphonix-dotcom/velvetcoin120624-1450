import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { Order } from '../../types/order';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-heading1 text-3xl tracking-wider">Orders</h1>
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

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-heading font-heading2">Order ID</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Date</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Customer</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Total</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Payment</th>
              <th className="text-left py-4 px-6 font-heading font-heading2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 last:border-0">
                <td className="py-4 px-6 font-body font-semibold">#{order.id}</td>
                <td className="py-4 px-6 font-body text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 font-body">
                  {order.shippingAddress.fullName}
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="font-body">${order.total.usd.toLocaleString()}</p>
                    <p className="font-body text-sm text-gray-500">
                      {order.paymentMethod === 'eth'
                        ? `${order.total.eth.toFixed(4)} ETH`
                        : `${order.total.btc.toFixed(4)} BTC`
                      }
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-body ${
                    order.paymentStatus === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : order.paymentStatus === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : order.paymentStatus === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => {
                      // Handle status change
                      console.log('Status changed:', e.target.value);
                    }}
                    className="w-full px-2 py-1 border border-gray-200 rounded font-body text-sm focus:ring-0 focus:border-gray-300"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;