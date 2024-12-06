import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Privacy Policy
          </h1>
          <p className="font-body text-lg text-gray-600 mb-12">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
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
                Your Rights
              </h3>
              <ul className="space-y-3">
                {rights.map((right, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    <span className="font-body text-gray-600">{right}</span>
                  </li>
                ))}
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
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, including name, email address, shipping address, and payment information.",
      "We also collect information about your cryptocurrency transactions, wallet addresses, and shopping preferences.",
      "Our website uses cookies and similar technologies to enhance your shopping experience and analyze site usage.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use your information to process orders, provide customer support, and communicate about your purchases.",
      "Your data helps us personalize your shopping experience and improve our services.",
      "We may use your information to detect and prevent fraud or unauthorized access.",
    ],
  },
  {
    title: "Information Sharing",
    content: [
      "We never sell your personal information to third parties.",
      "We share your information only with trusted service providers who assist in operating our platform.",
      "We may disclose information when required by law or to protect our rights and safety.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information.",
      "All payment data is encrypted using secure protocols.",
      "We regularly review and update our security practices to maintain data protection.",
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "Your personal information is protected using industry-leading security measures.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "All payment and cryptocurrency transactions are encrypted end-to-end.",
  },
  {
    icon: Eye,
    title: "Privacy Controls",
    description: "Manage your privacy preferences and control your data sharing options.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Access, update, or delete your personal information at any time.",
  },
];

const rights = [
  "Right to access your personal information",
  "Right to correct inaccurate data",
  "Right to request deletion of your data",
  "Right to object to data processing",
  "Right to data portability",
  "Right to withdraw consent",
];

export default Privacy;