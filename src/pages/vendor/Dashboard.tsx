import React from 'react';
import { BarChart3, Package, ShoppingBag, Wallet } from 'lucide-react';
import type { VendorDashboardData } from '../../types/vendor';

interface DashboardProps {
  data: VendorDashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const stats = [
    {
      label: 'Total Products',
      value: data.stats.totalProducts,
      icon: Package,
    },
    {
      label: 'Total Orders',
      value: data.stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      label: 'Revenue (USD)',
      value: `$${data.stats.totalRevenue.usd.toLocaleString()}`,
      icon: Wallet,
    },
    {
      label: 'Average Rating',
      value: data.stats.averageRating.toFixed(1),
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
            Welcome back, {data.profile.name}
          </h1>
          <p className="font-body text-gray-600">
            Here's what's happening with your store today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-gray-600">{stat.label}</span>
              <stat.icon size={24} strokeWidth={1} className="text-gray-400" />
            </div>
            <p className="font-heading font-heading1 text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-heading font-heading1 text-xl mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {data.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-body font-semibold">Order #{order.id}</p>
                  <p className="font-body text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body">${order.total.usd.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="font-heading font-heading1 text-xl mb-6">Recent Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-body font-semibold">{product.name}</p>
                  <p className="font-body text-sm text-gray-500">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;