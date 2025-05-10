"use client";

import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '../ChatbotWidget';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatbotWidget />
    </>
  );
}