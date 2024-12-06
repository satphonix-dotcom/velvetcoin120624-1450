import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-heading font-heading1 text-4xl lg:text-5xl tracking-wider mb-6">
            Contact Us
          </h1>
          <p className="font-body text-lg text-gray-600">
            Have a question or need assistance? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="font-heading font-heading1 text-2xl tracking-wider mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-8 mb-12">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <item.icon size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="font-heading font-heading2 text-lg mb-2">
                      {item.label}
                    </h3>
                    <p className="font-body text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-video bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="Our Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-heading font-heading1 text-2xl tracking-wider mb-8">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-body text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-body text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block font-body text-sm mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 font-body hover:bg-gray-900 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@velvetcoin.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Fashion Avenue, New York, NY 10001',
  },
];

export default Contact;