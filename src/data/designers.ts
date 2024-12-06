import type { Designer } from '../types/designer';

export const designers: Designer[] = [
  {
    id: 'gucci',
    name: 'GUCCI',
    description: 'Iconic Italian luxury fashion house known for contemporary design and timeless elegance.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    about: [
      'Founded in Florence in 1921, Gucci has evolved from a household name in Italy to one of the world\'s most renowned luxury fashion houses.',
      'Under the creative direction of Alessandro Michele, the House has redefined luxury for the 21st century, reinforcing its position as one of the world\'s most desirable fashion houses.',
      'Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail.',
    ],
    details: {
      'Founded': '1921',
      'Origin': 'Florence, Italy',
      'Creative Director': 'Sabato De Sarno',
      'Specialties': 'Ready-to-wear, Leather goods',
      'Parent Company': 'Kering',
    },
    products: [
      {
        id: 'g1',
        name: 'GG Marmont Bag',
        designer: 'GUCCI',
        price: 2300,
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80',
        category: 'Bags',
        cryptoPrice: {
          btc: 0.0527,
          eth: 1.0132,
        },
      },
      {
        id: 'g2',
        name: 'Horsebit 1955 Loafer',
        designer: 'GUCCI',
        price: 890,
        imageUrl: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?auto=format&fit=crop&q=80',
        category: 'Shoes',
        cryptoPrice: {
          btc: 0.0204,
          eth: 0.3921,
        },
      },
      {
        id: 'g3',
        name: 'GG Wool Cardigan',
        designer: 'GUCCI',
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80',
        category: 'Clothing',
        cryptoPrice: {
          btc: 0.0412,
          eth: 0.7932,
        },
      },
    ],
  },
];