import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import type { Product } from '../../../types/product';
import { useCart } from '../../../context/CartContext';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { state, addItem } = useCart();
  
  const getPrice = () => {
    switch (state.currency) {
      case 'btc':
        return `${product.cryptoPrice.btc.toFixed(4)} BTC`;
      case 'eth':
        return `${product.cryptoPrice.eth.toFixed(4)} ETH`;
      default:
        return `$${product.price.toLocaleString()}`;
    }
  };

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, 1, selectedSize);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">{product.name}</h1>
        <h2 className="font-heading font-heading2 text-xl tracking-wider text-gray-600">{product.designer}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-2xl">{getPrice()}</p>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={24} strokeWidth={1} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={24} strokeWidth={1} />
            </button>
          </div>
        </div>

        {product.sizes && (
          <div className="space-y-4">
            <p className="font-body text-sm">Size</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  } transition-colors font-body text-sm`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-4 font-body hover:bg-gray-900 transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {product.description && (
        <div className="space-y-4 pt-8 border-t border-gray-200">
          <h3 className="font-heading font-heading2 text-lg">Description</h3>
          <p className="font-body text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      )}

      {product.details && (
        <div className="space-y-4 pt-8 border-t border-gray-200">
          <h3 className="font-heading font-heading2 text-lg">Details</h3>
          <ul className="font-body text-gray-600 space-y-2">
            {product.details.map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;