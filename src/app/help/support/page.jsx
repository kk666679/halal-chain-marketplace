'use client';

import { useState } from 'react';
import { FaHeadset, FaComments, FaQuestionCircle, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ClickToCallButton, ContactCard, CallbackRequestForm } from '@/components/contact';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('general');
  
  const supportTeam = [
    {
      name: 'Sarah Johnson',
      title: 'Customer Support Manager',
      phoneNumber: '+971 4 123 4567',
      whatsappNumber: '+971501234567',
      email: 'sarah.j@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      department: 'general'
    },
    {
      name: 'Mohammed Al-Farsi',
      title: 'Technical Support Lead',
      phoneNumber: '+971 4 123 4568',
      whatsappNumber: '+971501234568',
      email: 'mohammed.a@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      department: 'technical'
    },
    {
      name: 'Aisha Rahman',
      title: 'Certification Specialist',
      phoneNumber: '+971 4 123 4569',
      whatsappNumber: '+971501234569',
      email: 'aisha.r@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      department: 'certification'
    },
    {
      name: 'David Chen',
      title: 'Integration Support Engineer',
      phoneNumber: '+971 4 123 4570',
      whatsappNumber: '+971501234570',
      email: 'david.c@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
      department: 'technical'
    },
    {
      name: 'Fatima Zaidi',
      title: 'Vendor Relations Manager',
      phoneNumber: '+971 4 123 4571',
      whatsappNumber: '+971501234571',
      email: 'fatima.z@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
      department: 'vendor'
    },
    {
      name: 'John Smith',
      title: 'Global Support Coordinator',
      phoneNumber: '+971 4 123 4572',
      whatsappNumber: '+971501234572',
      email: 'john.s@halal-chain.com',
      location: 'Dubai, UAE',
      imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      department: 'general'
    }
  ];
  
  const filteredTeam = activeTab === 'all' 
    ? supportTeam 
    : supportTeam.filter(member => member.department === activeTab);
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">24/7 Customer Support</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our dedicated support team is here to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+97141234567" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                <FaPhoneAlt className="mr-2" />
                Call Support
              </a>
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                <FaComments className="mr-2" />
                Chat with Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from our various support options to get the help you need quickly and efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaHeadset className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Call Support</h3>
              <p className="text-gray-600 mb-6">
                Speak directly with our support team for immediate assistance with any issues or questions.
              </p>
              <a 
                href="tel:+97141234567" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Call Now
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaComments className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Chat</h3>
              <p className="text-gray-600 mb-6">
                Chat with our support team via WhatsApp for quick answers to your questions.
              </p>
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Chat
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaQuestionCircle className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Request Callback</h3>
              <p className="text-gray-600 mb-6">
                Leave your details and we'll call you back at your preferred time.
              </p>
              <button 
                onClick={() => document.getElementById('callback-section').scrollIntoView({ behavior: 'smooth' })}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Request Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Support Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Support Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Our dedicated specialists are ready to assist you with any questions or issues.
            </p>
            
            {/* Department Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Teams
              </button>
              <button 
                onClick={() => setActiveTab('general')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'general' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                General Support
              </button>
              <button 
                onClick={() => setActiveTab('technical')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'technical' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Technical Support
              </button>
              <button 
                onClick={() => setActiveTab('certification')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'certification' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Certification Support
              </button>
              <button 
                onClick={() => setActiveTab('vendor')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'vendor' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vendor Support
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeam.map((member, index) => (
              <ContactCard
                key={index}
                name={member.name}
                title={member.title}
                phoneNumber={member.phoneNumber}
                whatsappNumber={member.whatsappNumber}
                email={member.email}
                location={member.location}
                imageUrl={member.imageUrl}
                theme="secondary"
                variant="elevated"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Callback Request Section */}
      <section id="callback-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <CallbackRequestForm 
              title="Request a Support Callback"
              description="Leave your details and our support team will call you back at your preferred time."
              theme="secondary"
              variant="elevated"
              onSubmit={(data) => console.log('Support callback requested:', data)}
            />
          </div>
        </div>
      </section>
      
      {/* Floating Click-to-Call Button */}
      <ClickToCallButton 
        phoneNumber="+97141234567"
        whatsappNumber="+971501234567"
        position="bottom-right"
        text="Support"
        theme="secondary"
        size="medium"
        pulsate={true}
      />
    </main>
  );
}