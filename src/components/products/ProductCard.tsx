import React from 'react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-heading font-heading2 text-sm tracking-wider">{product.designer}</h3>
        <p className="font-body text-sm">{product.name}</p>
        <div className="flex justify-between items-center">
          <p className="font-body text-sm">${product.price.toLocaleString()}</p>
          <p className="font-body text-sm text-gray-500">
            {product.cryptoPrice.btc.toFixed(4)} BTC
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;