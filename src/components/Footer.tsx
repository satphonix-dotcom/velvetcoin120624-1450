import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const footerLinks = [
    { text: 'About Us', path: '/about' },
    { text: 'Shipping Policy', path: '/shipping' },
    { text: 'Return Policy', path: '/returns' },
    { text: 'Contact Us', path: '/contact' },
    { text: 'Privacy Policy', path: '/privacy' },
    { text: 'Terms & Conditions', path: '/terms' }
  ];

  return (
    <footer className="bg-[#1C1C1C] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="max-w-sm">
            <Logo showText={true} />
            <p className="mt-6 font-body text-gray-400">
              Experience luxury fashion with the convenience of cryptocurrency payments. 
              Shop the world's most coveted brands securely and seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-heading1 text-lg mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/products?category=new" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/designers" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                    Designers
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=clothing" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=bags" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                    Bags
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-heading1 text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-heading1 text-lg mb-4">Contact</h3>
              <ul className="space-y-3 font-body text-sm text-gray-400">
                <li>Email: support@velvetcoin.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>
                  123 Fashion Avenue<br />
                  New York, NY 10001<br />
                  United States
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="font-body text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Velvet Coin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;