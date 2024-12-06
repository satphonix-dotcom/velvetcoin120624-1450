import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CryptoPayment from '../payment/CryptoPayment';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, setCurrency, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const getItemPrice = (price: number, btcPrice: number, ethPrice: number) => {
    switch (state.currency) {
      case 'btc':
        return `${btcPrice.toFixed(4)} BTC`;
      case 'eth':
        return `${ethPrice.toFixed(4)} ETH`;
      default:
        return `$${price.toLocaleString()}`;
    }
  };

  const getTotalPrice = () => {
    const total = state.items.reduce((sum, item) => {
      switch (state.currency) {
        case 'btc':
          return sum + item.cryptoPrice.btc * item.quantity;
        case 'eth':
          return sum + item.cryptoPrice.eth * item.quantity;
        default:
          return sum + item.price * item.quantity;
      }
    }, 0);

    switch (state.currency) {
      case 'btc':
        return `${total.toFixed(4)} BTC`;
      case 'eth':
        return `${total.toFixed(4)} ETH`;
      default:
        return `$${total.toLocaleString()}`;
    }
  };

  const getTotalCrypto = () => {
    return {
      eth: state.items.reduce((sum, item) => sum + item.cryptoPrice.eth * item.quantity, 0),
      btc: state.items.reduce((sum, item) => sum + item.cryptoPrice.btc * item.quantity, 0),
    };
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setShowPayment(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} strokeWidth={1} />
              <h2 className="font-heading font-heading1 text-lg lg:text-xl tracking-wider">
                {showPayment ? 'Checkout' : 'Shopping Cart'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {showPayment ? (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <CryptoPayment
                amount={getTotalCrypto()}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 px-4 lg:py-6 lg:px-6 space-y-6">
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-body text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  state.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 lg:w-24 lg:h-32 bg-gray-100">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-heading font-heading2 text-sm">{item.designer}</h3>
                            <p className="font-body text-sm">{item.name}</p>
                            {item.size && (
                              <p className="font-body text-sm text-gray-500">Size: {item.size}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X size={16} strokeWidth={1} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Minus size={16} strokeWidth={1} />
                            </button>
                            <span className="px-4 font-body">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Plus size={16} strokeWidth={1} />
                            </button>
                          </div>
                          <p className="font-body text-sm lg:text-base">
                            {getItemPrice(
                              item.price * item.quantity,
                              item.cryptoPrice.btc * item.quantity,
                              item.cryptoPrice.eth * item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-gray-200 p-4 lg:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-sm">Currency:</span>
                      <select
                        value={state.currency}
                        onChange={(e) => setCurrency(e.target.value as 'usd' | 'btc' | 'eth')}
                        className="font-body text-sm border-none bg-transparent p-0 focus:ring-0"
                      >
                        <option value="usd">USD</option>
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                      </select>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm text-gray-500">Total</p>
                      <p className="font-heading font-heading1 text-lg">{getTotalPrice()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-black text-white py-3 lg:py-4 font-body hover:bg-gray-900 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;