import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'NEW', path: '/products?category=new' },
    { name: 'Designers', path: '/designers' },
    { name: 'Clothing', path: '/products?category=clothing' },
    { name: 'Shoes', path: '/products?category=shoes' },
    { name: 'Bags', path: '/products?category=bags' },
    { name: 'Jewelry', path: '/products?category=jewelry' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <nav className="border-t border-gray-800 relative">
      {/* Mobile menu button */}
      <div className="lg:hidden px-4 py-2 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center justify-between px-16 py-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={clsx(
                'font-body text-[0.9rem] tracking-[0.15em] transition-colors uppercase',
                location.pathname === item.path ? 'text-white' : 'text-gray-400 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:hidden absolute top-full left-0 right-0 bg-[#1C1C1C] z-50 border-t border-gray-800`}
      >
        <ul className="px-4 py-2">
          {navItems.map((item) => (
            <li key={item.name} className="border-b border-gray-800 last:border-none">
              <Link
                to={item.path}
                className={clsx(
                  'block py-3 px-4 font-body text-[0.9rem] tracking-[0.15em] transition-colors uppercase',
                  location.pathname === item.path ? 'text-white bg-gray-800' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;