import React from 'react';
import { Scale, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Terms & Conditions
          </h1>
          <p className="font-body text-lg text-gray-600 mb-12">
            Please read these terms carefully before using our services. By using Velvet Coin, you agree to these terms.
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
                Contact Us
              </h3>
              <p className="font-body text-gray-600 mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="space-y-2 font-body text-gray-600">
                <li>Email: legal@velvetcoin.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>
                  Address: 123 Fashion Avenue<br />
                  New York, NY 10001<br />
                  United States
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Velvet Coin, you agree to be bound by these Terms & Conditions and all applicable laws and regulations.",
      "If you do not agree with any part of these terms, you may not use our services.",
    ],
  },
  {
    title: "Cryptocurrency Payments",
    content: [
      "All cryptocurrency transactions are final and non-reversible once confirmed on the blockchain.",
      "Exchange rates for cryptocurrency payments are locked at the time of checkout for a limited period.",
      "We are not responsible for any losses due to cryptocurrency price fluctuations or incorrect wallet addresses.",
    ],
  },
  {
    title: "Product Authentication",
    content: [
      "All products sold on Velvet Coin are guaranteed to be authentic luxury items.",
      "We work directly with brands and authorized resellers to ensure product authenticity.",
      "Each item undergoes rigorous authentication by our expert team before shipping.",
    ],
  },
  {
    title: "User Accounts",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You must provide accurate and complete information when creating an account.",
      "We reserve the right to suspend or terminate accounts that violate our terms.",
    ],
  },
];

const features = [
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "We operate in compliance with all applicable laws and regulations.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "Advanced security measures protect your transactions and data.",
  },
  {
    icon: AlertCircle,
    title: "Risk Disclosure",
    description: "Understanding cryptocurrency risks and market volatility.",
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "24/7 customer support for any questions or concerns.",
  },
];

export default Terms;