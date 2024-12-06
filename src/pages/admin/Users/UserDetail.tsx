import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import type { UserProfile } from '../../../types/auth';

const UserDetail = () => {
  const { id } = useParams();

  // This would normally come from an API
  const user: UserProfile = {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    shippingAddresses: [
      {
        id: 'addr1',
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        phone: '+1 (555) 123-4567',
        isDefault: true,
      },
    ],
    cryptoWallets: {
      eth: '0x1234...5678',
      btc: 'bc1qxy...zw9p',
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/admin/users"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span className="font-body">Back to Users</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-heading font-heading1 text-2xl text-gray-600">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="font-body text-gray-600">
                Member since {format(new Date(user.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <select
            value={user.role}
            onChange={(e) => console.log('Update role:', e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <span className="font-body">{user.email}</span>
              </div>
              {user.shippingAddresses?.[0] && (
                <>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-gray-400" />
                    <span className="font-body">{user.shippingAddresses[0].phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-gray-400 mt-1" />
                    <div className="font-body">
                      <p>{user.shippingAddresses[0].streetAddress}</p>
                      <p>
                        {user.shippingAddresses[0].city},{' '}
                        {user.shippingAddresses[0].state}{' '}
                        {user.shippingAddresses[0].postalCode}
                      </p>
                      <p>{user.shippingAddresses[0].country}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-6">Crypto Wallets</h2>
            {user.cryptoWallets && (
              <div className="space-y-4">
                {user.cryptoWallets.eth && (
                  <div className="flex items-center gap-3">
                    <Wallet size={20} className="text-gray-400" />
                    <div>
                      <p className="font-body text-sm text-gray-500">Ethereum</p>
                      <p className="font-body font-mono">{user.cryptoWallets.eth}</p>
                    </div>
                  </div>
                )}
                {user.cryptoWallets.btc && (
                  <div className="flex items-center gap-3">
                    <Wallet size={20} className="text-gray-400" />
                    <div>
                      <p className="font-body text-sm text-gray-500">Bitcoin</p>
                      <p className="font-body font-mono">{user.cryptoWallets.btc}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Activity & Stats */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-6">Account Status</h2>
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm text-gray-500">Status</p>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div>
                <p className="font-body text-sm text-gray-500">Last Login</p>
                <p className="font-body">March 15, 2024 10:30 AM</p>
              </div>
              <button
                onClick={() => console.log('Suspend user')}
                className="w-full px-4 py-2 border border-red-200 text-red-600 rounded font-body hover:bg-red-50 transition-colors"
              >
                Suspend Account
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-heading font-heading2 text-xl mb-6">Activity</h2>
            <div className="space-y-4">
              <div>
                <p className="font-body text-sm text-gray-500">Total Orders</p>
                <p className="font-heading font-heading1 text-2xl">12</p>
              </div>
              <div>
                <p className="font-body text-sm text-gray-500">Total Spent</p>
                <p className="font-heading font-heading1 text-2xl">$4,521</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;