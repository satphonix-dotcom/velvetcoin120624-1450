import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { DataTable } from '../../../components/admin/DataTable';
import type { UserProfile } from '../../../types/auth';

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const columns = [
    {
      header: 'User',
      cell: ({ row }) => (
        <Link
          to={`/admin/users/${row.original.id}`}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="font-body text-gray-600">
              {row.original.firstName.charAt(0)}
              {row.original.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-body font-semibold">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="font-body text-sm text-gray-500">{row.original.email}</p>
          </div>
        </Link>
      ),
    },
    {
      header: 'Role',
      cell: ({ row }) => (
        <select
          value={row.original.role}
          onChange={(e) => handleRoleChange(row.original.id, e.target.value as UserProfile['role'])}
          className="px-2 py-1 border border-gray-200 rounded font-body text-sm focus:ring-0 focus:border-gray-300"
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      header: 'Joined',
      cell: ({ row }) => (
        <p className="font-body text-sm text-gray-600">
          {format(new Date(row.original.createdAt), 'MMM d, yyyy')}
        </p>
      ),
    },
    {
      header: 'Status',
      cell: ({ row }) => (
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSuspendUser(row.original.id)}
            className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-red-600"
          >
            Suspend
          </button>
        </div>
      ),
    },
  ];

  const handleRoleChange = (userId: string, role: UserProfile['role']) => {
    console.log('Update user role:', { userId, role });
    // Handle role update
  };

  const handleSuspendUser = (userId: string) => {
    console.log('Suspend user:', userId);
    // Handle user suspension
  };

  // This would normally come from an API
  const users: UserProfile[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'vendor',
      createdAt: '2024-02-01T15:30:00Z',
      updatedAt: '2024-02-01T15:30:00Z',
    },
    // Add more sample users
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          Users
        </h1>
        <p className="font-body text-gray-600">
          Manage user accounts and permissions
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
          />
        </div>
        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg font-body appearance-none bg-white focus:ring-0 focus:border-gray-300"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="vendor">Vendors</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      <DataTable
        data={users}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
};

export default UsersList;