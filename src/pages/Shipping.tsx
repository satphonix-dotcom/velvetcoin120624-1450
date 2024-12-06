import React from 'react';
import { Truck, Clock, Globe, DollarSign } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Shipping Policy
          </h1>
          <p className="font-body text-lg text-gray-600 mb-12">
            We partner with premium logistics providers to ensure your luxury items reach you safely and securely.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading font-heading1 text-2xl tracking-wider mb-4">
                  {section.title}
                </h2>
                <div className="font-body text-gray-600 space-y-4">
                  {section.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-heading2 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-body text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Shipping Methods",
    content: [
      "We offer complimentary express shipping on all orders over $500. For orders under $500, standard shipping rates apply based on your location.",
      "All orders are processed and shipped within 1-2 business days. Once your order has been shipped, you will receive a confirmation email with tracking information.",
    ],
  },
  {
    title: "International Shipping",
    content: [
      "We ship to most countries worldwide. International orders may be subject to import duties and taxes, which are the responsibility of the customer.",
      "Delivery times for international orders typically range from 3-7 business days, depending on the destination and customs clearance process.",
    ],
  },
  {
    title: "Secure Packaging",
    content: [
      "All items are carefully inspected, authenticated, and securely packaged before shipping to ensure they arrive in perfect condition.",
      "Our luxury items are packaged in premium boxes with protective materials to maintain their quality during transit.",
    ],
  },
];

const features = [
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Fast and secure shipping with real-time tracking for peace of mind.",
  },
  {
    icon: Clock,
    title: "Processing Time",
    description: "Orders are processed within 1-2 business days of payment confirmation.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We ship to most countries worldwide with reliable courier partners.",
  },
  {
    icon: DollarSign,
    title: "Free Shipping",
    description: "Complimentary express shipping on all orders over $500.",
  },
];

export default Shipping;