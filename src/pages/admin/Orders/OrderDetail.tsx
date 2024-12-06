import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Order } from '../../../types/order';

const OrderDetail = () => {
  const { id } = useParams();

  // This would normally come from an API
  const order: Order = {
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
  };

  const orderTimeline = [
    {
      status: 'Order Placed',
      date: order.createdAt,
      icon: Package,
      completed: true,
    },
    {
      status: 'Processing',
      date: order.updatedAt,
      icon: Package,
      completed: order.status !== 'pending',
    },
    {
      status: 'Shipped',
      date: null,
      icon: Truck,
      completed: ['shipped', 'delivered'].includes(order.status),
    },
    {
      status: 'Delivered',
      date: null,
      icon: CheckCircle,
      completed: order.status === 'delivered',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Orders</span>
          </Link>
          <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
            Order #{order.id}
          </h1>
          <p className="font-body text-gray-600">
            Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
        <select
          value={order.status}
          onChange={(e) => console.log('Update status:', e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Timeline */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-heading font-heading2 text-xl mb-6">Order Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-200" />
            <div className="space-y-8">
              {orderTimeline.map((step, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <step.icon
                      size={16}
                      className={step.completed ? 'text-green-600' : 'text-gray-400'}
                    />
                  </div>
                  <div>
                    <p className="font-body font-semibold">{step.status}</p>
                    {step.date && (
                      <p className="font-body text-sm text-gray-500">
                        {format(new Date(step.date), 'MMM d, yyyy h:mm a')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-8">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-4">Customer</h2>
            <div className="space-y-2">
              <p className="font-body font-semibold">{order.shippingAddress.fullName}</p>
              <p className="font-body text-sm text-gray-600">{order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-4">Shipping Address</h2>
            <div className="space-y-2 font-body text-gray-600">
              <p>{order.shippingAddress.streetAddress}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-4">Payment</h2>
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm text-gray-600">Payment Method</p>
                <p className="font-body">
                  {order.paymentMethod.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="font-body text-sm text-gray-600">Transaction Hash</p>
                <p className="font-body text-sm font-mono">
                  {order.transactionHash}
                </p>
              </div>
              <div>
                <p className="font-body text-sm text-gray-600">Status</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full font-body ${
                  order.paymentStatus === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : order.paymentStatus === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="font-heading font-heading2 text-xl mb-6">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
              <div className="w-20 h-20 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80"
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-body font-semibold">{item.name}</p>
                <p className="font-body text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-body">${item.price.usd.toLocaleString()}</p>
                <p className="font-body text-sm text-gray-500">
                  {order.paymentMethod === 'eth'
                    ? `${item.price.eth.toFixed(4)} ETH`
                    : `${item.price.btc.toFixed(4)} BTC`
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <p className="font-body text-gray-600">Total</p>
            <div className="text-right">
              <p className="font-heading font-heading1 text-xl">
                ${order.total.usd.toLocaleString()}
              </p>
              <p className="font-body text-sm text-gray-500">
                {order.paymentMethod === 'eth'
                  ? `${order.total.eth.toFixed(4)} ETH`
                  : `${order.total.btc.toFixed(4)} BTC`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;