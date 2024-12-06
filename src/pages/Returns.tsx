import React from 'react';
import { RefreshCw, Shield, Clock, CheckCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Return Policy
          </h1>
          <p className="font-body text-lg text-gray-600 mb-12">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
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

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-heading font-heading1 text-xl mb-4">
                How to Initiate a Return
              </h3>
              <ol className="space-y-4">
                {returnSteps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-body text-sm">
                      {index + 1}
                    </span>
                    <p className="font-body text-gray-600">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Return Policy Overview",
    content: [
      "We offer a 14-day return period for all unused items in their original condition with tags attached.",
      "Returns are processed in the same payment method used for the original purchase, including cryptocurrency transactions.",
    ],
  },
  {
    title: "Conditions for Returns",
    content: [
      "Items must be unworn, unwashed, and in their original condition with all tags attached.",
      "All original packaging, including dust bags, boxes, and authentication cards, must be included.",
      "Items marked as 'Final Sale' or purchased during special promotions may not be eligible for return.",
    ],
  },
  {
    title: "Refund Process",
    content: [
      "Once we receive your return, our team will inspect the item within 2 business days.",
      "Approved returns will be refunded to your original payment method, including cryptocurrency wallets.",
      "Please allow 5-10 business days for the refund to appear in your account or wallet.",
    ],
  },
];

const features = [
  {
    icon: RefreshCw,
    title: "14-Day Returns",
    description: "Return eligible items within 14 days of delivery.",
  },
  {
    icon: Shield,
    title: "Quality Check",
    description: "All returns undergo thorough inspection to ensure quality.",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Returns are processed within 2 business days of receipt.",
  },
  {
    icon: CheckCircle,
    title: "Secure Refunds",
    description: "Refunds issued to original payment method, including crypto.",
  },
];

const returnSteps = [
  "Log in to your account and navigate to your order history.",
  "Select the item(s) you wish to return and provide a reason for the return.",
  "Print the provided return shipping label or request one if needed.",
  "Package the item(s) securely with all original tags and packaging.",
  "Drop off the package at an authorized shipping location.",
];

export default Returns;