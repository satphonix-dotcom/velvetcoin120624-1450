import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import VendorLayout from './components/vendor/VendorLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Web3Provider } from './context/Web3Context';
import { wagmiConfig } from './config/web3';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import DesignerListing from './pages/DesignerListing';
import DesignerDetail from './pages/DesignerDetail';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminDesigners from './pages/admin/Designers';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';

// Vendor Pages
import VendorDashboard from './pages/vendor/Dashboard';
import VendorProducts from './pages/vendor/Products';
import VendorOrders from './pages/vendor/Orders';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Web3Provider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/designers" element={<DesignerListing />} />
                    <Route path="/designer/:id" element={<DesignerDetail />} />
                  </Route>

                  {/* Vendor Routes */}
                  <Route
                    path="/vendor"
                    element={
                      <ProtectedRoute requiredRole="vendor">
                        <VendorLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<VendorDashboard />} />
                    <Route path="products/*" element={<VendorProducts />} />
                    <Route path="orders/*" element={<VendorOrders />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products/*" element={<AdminProducts />} />
                    <Route path="designers/*" element={<AdminDesigners />} />
                    <Route path="orders/*" element={<AdminOrders />} />
                    <Route path="users/*" element={<AdminUsers />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </Web3Provider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;