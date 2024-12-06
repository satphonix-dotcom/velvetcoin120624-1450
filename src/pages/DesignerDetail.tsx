import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { designers } from '../data/designers';

const DesignerDetail = () => {
  const { id } = useParams();
  const designer = designers.find((d) => d.id === id);

  if (!designer) {
    return <div>Designer not found</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[#1C1C1C] text-white">
        <div className="absolute inset-0">
          <img
            src={designer.coverImage}
            alt={designer.name}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-heading font-heading1 text-4xl lg:text-6xl tracking-wider mb-6">
              {designer.name}
            </h1>
            <p className="font-body text-lg lg:text-xl text-gray-200">
              {designer.description}
            </p>
          </div>
        </div>
      </section>

      {/* Designer Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-heading1 text-3xl tracking-wider mb-6">
                About {designer.name}
              </h2>
              <div className="font-body text-gray-600 space-y-4">
                {designer.about.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-gray-50 p-8">
                <h3 className="font-heading font-heading2 text-xl mb-6">
                  Designer Details
                </h3>
                <ul className="space-y-4">
                  {Object.entries(designer.details).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="font-body text-gray-600">{key}</span>
                      <span className="font-body font-semibold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-heading1 text-3xl tracking-wider mb-12">
            Latest Collections
          </h2>
          <ProductGrid products={designer.products} />
        </div>
      </section>
    </div>
  );
};

export default DesignerDetail;