"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobeAsia, FaCheck } from 'react-icons/fa';

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
      email: 'dubai@halal-chain.com'
    },
    {
      city: 'Kuala Lumpur',
      address: 'Level 30, Menara Prestige, 1 Jalan Pinang',
      country: 'Malaysia',
      phone: '+60 3 2168 9999',
      email: 'kl@halal-chain.com'
    },
    {
      city: 'Jakarta',
      address: 'Menara Astra, Jl. Jend. Sudirman Kav. 5-6',
      country: 'Indonesia',
      phone: '+62 21 5082 0800',
      email: 'jakarta@halal-chain.com'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions about HalalChain? Our team is here to help you with any inquiries about our platform, services, or partnership opportunities.
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaPhone className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Our customer support team is available 24/7</p>
              <a href="tel:+97141234567" className="text-green-600 font-medium">+971 4 123 4567</a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaEnvelope className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll get back to you</p>
              <a href="mailto:info@halal-chain.com" className="text-green-600 font-medium">info@halal-chain.com</a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaGlobeAsia className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Offices</h3>
              <p className="text-gray-600 mb-4">We have offices in 3 countries</p>
              <span className="text-green-600 font-medium">Dubai, Kuala Lumpur, Jakarta</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Global Offices</h2>
              <div className="bg-gray-200 rounded-xl overflow-hidden h-64 mb-8">
                {/* This would be replaced with an actual map component in a real app */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Interactive Map</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {offices.map((office, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">{office.city}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {office.address}, {office.country}
                    </p>
                    <div className="text-sm">
                      <p className="flex items-center mb-1">
                        <FaPhone className="mr-2 text-green-600" />
                        <span>{office.phone}</span>
                      </p>
                      <p className="flex items-center">
                        <FaEnvelope className="mr-2 text-green-600" />
                        <span>{office.email}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">How can I verify a halal certificate?</h3>
              <p className="text-gray-600">
                You can verify any halal certificate by scanning the QR code on the product or by entering the certificate ID on our verification portal. Our blockchain technology ensures that all certificates are authentic and tamper-proof.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">How do I become a vendor on HalalChain?</h3>
              <p className="text-gray-600">
                To become a vendor, you need to register on our vendor portal, submit the required documentation, and complete the verification process. Our team will guide you through the certification process if your products are not yet certified.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">What technologies do you use for verification?</h3>
              <p className="text-gray-600">
                We use a combination of blockchain, AI, quantum computing, and neural interface technologies to ensure the highest level of verification and transparency in the halal supply chain.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">How can I integrate with HalalChain?</h3>
              <p className="text-gray-600">
                We offer various integration options including REST APIs, SDKs, webhooks, and neural interface connections. Visit our integrations page or contact our developer support team for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}