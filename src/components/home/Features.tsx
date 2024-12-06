import React from 'react';
import { Shield, Truck, CheckCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
    },
    {
      icon: Truck,
      title: 'Verified Delivery',
    },
    {
      icon: CheckCircle,
      title: 'Authentic Products',
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <feature.icon size={32} strokeWidth={1} className="mb-4" />
              <h3 className="font-heading font-heading2 text-lg tracking-wider">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;