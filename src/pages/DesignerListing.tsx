import React from 'react';
import { Link } from 'react-router-dom';

const DesignerListing = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Our Designers
          </h1>
          <p className="font-body text-lg text-gray-600">
            Discover our curated selection of the world's most prestigious fashion houses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designers.map((designer) => (
            <Link
              key={designer.id}
              to={`/designer/${designer.id}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="font-heading font-heading1 text-2xl tracking-wider mb-2">
                {designer.name}
              </h2>
              <p className="font-body text-gray-600 mb-4">
                {designer.description}
              </p>
              <p className="font-body text-sm text-gray-500">
                {designer.productCount} Products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const designers = [
  {
    id: 'gucci',
    name: 'GUCCI',
    description: 'Iconic Italian luxury fashion house known for contemporary design and timeless elegance.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    productCount: 248,
  },
  {
    id: 'bottega-veneta',
    name: 'BOTTEGA VENETA',
    description: 'Masters of leather craftsmanship, bringing modern luxury to traditional techniques.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    productCount: 156,
  },
  {
    id: 'saint-laurent',
    name: 'SAINT LAURENT',
    description: 'Parisian fashion house defining modern luxury with bold, sophisticated designs.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    productCount: 189,
  },
  {
    id: 'balenciaga',
    name: 'BALENCIAGA',
    description: 'Innovative fashion house known for avant-garde designs and streetwear influence.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    productCount: 203,
  },
  {
    id: 'prada',
    name: 'PRADA',
    description: 'Italian luxury fashion house combining traditional craftsmanship with modern innovation.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    productCount: 275,
  },
  {
    id: 'loewe',
    name: 'LOEWE',
    description: 'Spanish luxury house celebrated for exceptional leather goods and artistic vision.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    productCount: 142,
  },
];

export default DesignerListing;