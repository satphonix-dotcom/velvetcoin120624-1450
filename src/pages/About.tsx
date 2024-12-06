import React from 'react';
import { Shield, Wallet, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            About Velvet Coin
          </h1>
          <p className="font-body text-lg text-gray-600">
            Bridging the gap between luxury fashion and cryptocurrency, creating a seamless shopping experience for the modern consumer.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="font-heading font-heading1 text-3xl tracking-wider mb-6">
              Our Mission
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-6">
              At Velvet Coin, we believe in making luxury fashion accessible to cryptocurrency enthusiasts while maintaining the highest standards of authenticity and service.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              We partner with renowned designers and brands to bring you a curated selection of the finest luxury goods, all available for purchase with your preferred cryptocurrency.
            </p>
          </div>
          <div className="aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
              alt="Luxury Shopping Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <feature.icon size={32} strokeWidth={1} />
              </div>
              <h3 className="font-heading font-heading2 text-xl mb-4">
                {feature.title}
              </h3>
              <p className="font-body text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-gray-50 p-12 lg:p-24">
          <h2 className="font-heading font-heading1 text-3xl tracking-wider text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-heading font-heading2 text-xl mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Shield,
    title: 'Guaranteed Authenticity',
    description: 'Every item is thoroughly verified by our expert team to ensure authenticity.',
  },
  {
    icon: Wallet,
    title: 'Crypto Payments',
    description: 'Seamlessly pay with your preferred cryptocurrency using our secure payment system.',
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    description: 'We deliver luxury goods to cryptocurrency enthusiasts worldwide.',
  },
];

const values = [
  {
    title: 'Innovation',
    description: 'Pioneering the integration of cryptocurrency in luxury retail.',
  },
  {
    title: 'Quality',
    description: 'Uncompromising commitment to product quality and authenticity.',
  },
  {
    title: 'Trust',
    description: 'Building lasting relationships through transparency and reliability.',
  },
  {
    title: 'Service',
    description: 'Providing exceptional customer service at every touchpoint.',
  },
];

export default About;