import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  LogOut
} from 'lucide-react';
import Logo from '../Logo/Logo';

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/vendor/products', icon: Package },
    { name: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <Logo variant="header" className="text-black" />
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body transition-colors ${
                      location.pathname === item.href
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} strokeWidth={1.5} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 font-body hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut size={20} strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;