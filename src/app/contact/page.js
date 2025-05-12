"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobeAsia, FaCheck, FaWhatsapp } from 'react-icons/fa';
import { ClickToCallButton, ContactCard, CallbackRequestForm } from '@/components/contact';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    userType: 'consumer'
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        userType: 'consumer'
      });
    }, 5000);
  };
  
  const offices = [
    {
      city: 'Dubai',
      address: 'Dubai Digital Park, Dubai Silicon Oasis',
      country: 'United Arab Emirates',
      phone: '+971 4 123 4567',
      whatsapp: '+971501234567',
      email: 'dubai@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
    },
    {
      city: 'Kuala Lumpur',
      address: 'Level 30, Menara Prestige, 1 Jalan Pinang',
      country: 'Malaysia',
      phone: '+60 3 2168 9999',
      whatsapp: '+60123456789',
      email: 'kl@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07'
    },
    {
      city: 'Jakarta',
      address: 'Menara Astra, Jl. Jend. Sudirman Kav. 5-6',
      country: 'Indonesia',
      phone: '+62 21 5082 0800',
      whatsapp: '+6281234567890',
      email: 'jakarta@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af'
    },
    {
      city: 'Sydney',
      address: '1 O\'Connell Street, Sydney CBD',
      country: 'Australia',
      phone: '+61 2 8123 4567',
      whatsapp: '+61412345678',
      email: 'sydney@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'
    },
    {
      city: 'Riyadh',
      address: 'King Fahd Road, Al Olaya District',
      country: 'Saudi Arabia',
      phone: '+966 11 123 4567',
      whatsapp: '+966501234567',
      email: 'riyadh@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6'
    },
    {
      city: 'London',
      address: '30 St Mary Axe, London EC3A 8BF',
      country: 'United Kingdom',
      phone: '+44 20 7123 4567',
      whatsapp: '+447123456789',
      email: 'london@halal-chain.com',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Have questions about HalalChain? Our team is here to help you with any inquiries about our platform, services, or partnership opportunities.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <FaPhone className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Our customer support team is available 24/7</p>
              <a href="tel:+97141234567" className="text-emerald-600 font-medium hover:underline transition-colors">+971 4 123 4567</a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <FaEnvelope className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll get back to you</p>
              <a href="mailto:info@halal-chain.com" className="text-emerald-600 font-medium hover:underline transition-colors">info@halal-chain.com</a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <FaWhatsapp className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat with us on WhatsApp for quick support</p>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline transition-colors">+971 50 123 4567</a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Global Offices Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Global Offices</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With offices across the globe, we're ready to assist you wherever you are. 
              Contact our regional teams for localized support and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <ContactCard
                key={index}
                name={office.city}
                title={`${office.address}, ${office.country}`}
                phoneNumber={office.phone}
                whatsappNumber={office.whatsapp}
                email={office.email}
                location={office.country}
                imageUrl={office.image}
                theme={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                variant={index % 2 === 0 ? 'default' : 'elevated'}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form and Callback Request */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              {submitted ? (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg mb-6">
                  <div className="flex items-center">
                    <FaCheck className="mr-2" />
                    <span className="font-medium">Thank you for your message!</span>
                  </div>
                  <p className="mt-2">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                      I am a: *
                    </label>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      <option value="consumer">Consumer</option>
                      <option value="vendor">Vendor</option>
                      <option value="certifier">Certification Body</option>
                      <option value="developer">Developer</option>
                      <option value="investor">Investor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Callback Request Form */}
            <div>
              <CallbackRequestForm 
                theme="primary"
                variant="elevated"
                onSubmit={(data) => console.log('Callback requested:', data)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3">How can I verify a halal certificate?</h3>
              <p className="text-gray-600">
                You can verify any halal certificate by scanning the QR code on the product or by entering the certificate ID on our verification portal. Our blockchain technology ensures that all certificates are authentic and tamper-proof.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3">How do I become a vendor on HalalChain?</h3>
              <p className="text-gray-600">
                To become a vendor, you need to register on our vendor portal, submit the required documentation, and complete the verification process. Our team will guide you through the certification process if your products are not yet certified.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3">What technologies do you use for verification?</h3>
              <p className="text-gray-600">
                We use a combination of blockchain, AI, quantum computing, and neural interface technologies to ensure the highest level of verification and transparency in the halal supply chain.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-3">How can I integrate with HalalChain?</h3>
              <p className="text-gray-600">
                We offer various integration options including REST APIs, SDKs, webhooks, and neural interface connections. Visit our integrations page or contact our developer support team for more information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Floating Click-to-Call Button */}
      <ClickToCallButton 
        phoneNumber="+97141234567"
        whatsappNumber="+971501234567"
        position="bottom-right"
        text="Need Help?"
        theme="primary"
        size="medium"
        pulsate={true}
      />
    </main>
  );
}