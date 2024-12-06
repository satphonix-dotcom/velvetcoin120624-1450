import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { AdminStats } from '../../types/admin';

const Dashboard = () => {
  // This would normally come from an API
  const stats: AdminStats = {
    totalRevenue: {
      usd: 1250000,
      btc: 28.5,
      eth: 450.75,
      growth: 12.5
    },
    totalOrders: {
      count: 1842,
      growth: 8.2
    },
    activeUsers: {
      count: 3256,
      growth: 15.3
    },
    conversionRate: {
      rate: 3.2,
      growth: 2.1
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          Dashboard
        </h1>
        <p className="font-body text-gray-600">
          Overview of your store's performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue.usd).toLocaleString()}`}
          change={stats.totalRevenue.growth}
          icon={DollarSign}
          crypto={`${stats.totalRevenue.btc.toFixed(2)} BTC / ${stats.totalRevenue.eth.toFixed(2)} ETH`}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.count.toLocaleString()}
          change={stats.totalOrders.growth}
          icon={BarChart3}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers.count.toLocaleString()}
          change={stats.activeUsers.growth}
          icon={Users}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate.rate}%`}
          change={stats.conversionRate.growth}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  crypto?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  crypto,
}) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <span className="font-body text-gray-600">{title}</span>
      <Icon size={24} strokeWidth={1.5} className="text-gray-400" />
    </div>
    <div className="space-y-2">
      <p className="font-heading font-heading1 text-2xl">{value}</p>
      {crypto && (
        <p className="font-body text-sm text-gray-500">{crypto}</p>
      )}
      <div className={`flex items-center gap-1 text-sm ${
        change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        <span>{change >= 0 ? '↑' : '↓'}</span>
        <span>{Math.abs(change)}%</span>
        <span className="text-gray-500">vs last month</span>
      </div>
    </div>
  </div>
);

const RecentOrders = () => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h2 className="font-heading font-heading1 text-xl mb-6">Recent Orders</h2>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
        >
          <div>
            <p className="font-body font-semibold">Order #{123456 + i}</p>
            <p className="font-body text-sm text-gray-500">
              {format(new Date(), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="font-body">$1,299.00</p>
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TopProducts = () => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h2 className="font-heading font-heading1 text-xl mb-6">Top Products</h2>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-gray-100">
            <img
              src={`https://images.unsplash.com/photo-${1584917865442 + i}-de89df76afd3?auto=format&fit=crop&q=80`}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-body font-semibold">Product Name</p>
            <p className="font-body text-sm text-gray-500">
              {125 - i} sales this month
            </p>
          </div>
          <div className="text-right">
            <p className="font-body">$899.00</p>
            <p className="font-body text-sm text-gray-500">
              0.0205 BTC
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;