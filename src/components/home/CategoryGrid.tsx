import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'LUXURY WATCHES',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    link: '/products?category=watches',
  },
  {
    title: 'RARE BAGS',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80',
    link: '/products?category=bags',
  },
  {
    title: 'EXCLUSIVE SHOES',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80',
    link: '/products?category=shoes',
  },
  {
    title: 'DISTINCT CLOTHING',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
    link: '/products?category=clothing',
  },
  {
    title: 'TIMELESS JEWELRY',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80',
    link: '/products?category=jewelry',
  },
  {
    title: 'ACCESSORIES',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80',
    link: '/products?category=accessories',
  },
];

const CategoryGrid = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.link}
            className="group relative aspect-square overflow-hidden bg-gray-900"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-heading font-heading1 text-xl tracking-[0.2em] text-white mb-4">
                  {category.title}
                </h3>
                <span className="inline-block border border-white text-white px-6 py-2 text-sm tracking-wider">
                  VIEW
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;