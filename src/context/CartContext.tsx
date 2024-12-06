import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartState, CartItem } from '../types/cart';
import type { Product } from '../types/product';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_CURRENCY'; payload: 'usd' | 'btc' | 'eth' }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, size?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCurrency: (currency: 'usd' | 'btc' | 'eth') => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  currency: 'usd',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      }

      const newItem: CartItem = {
        id: `${product.id}-${size || 'default'}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
        size,
        cryptoPrice: product.cryptoPrice,
      };

      return { ...state, items: [...state.items, newItem] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items, currency } = JSON.parse(savedCart);
      dispatch({ type: 'CLEAR_CART' });
      items.forEach((item: CartItem) => {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            product: {
              id: item.productId,
              name: item.name,
              designer: item.designer,
              price: item.price,
              imageUrl: item.imageUrl,
              category: '',
              cryptoPrice: item.cryptoPrice,
            },
            quantity: item.quantity,
            size: item.size,
          },
        });
      });
      dispatch({ type: 'SET_CURRENCY', payload: currency });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity: number, size?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const setCurrency = (currency: 'usd' | 'btc' | 'eth') => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, setCurrency, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};