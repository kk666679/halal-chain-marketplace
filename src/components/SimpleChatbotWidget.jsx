'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { useToast } from './ui/toaster';

export default function SimpleChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Welcome to HalalChain! How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example responses based on keywords
      let botResponse = "I'm not sure how to help with that. Could you provide more details?";
      
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('certification') || lowercaseInput.includes('certified')) {
        botResponse = "Our certification process ensures products meet strict halal standards. Would you like to learn more about how our blockchain verification works?";
      } else if (lowercaseInput.includes('blockchain') || lowercaseInput.includes('verify')) {
        botResponse = "HalalChain uses blockchain technology to create immutable records of certification, allowing consumers to verify product authenticity with complete confidence.";
      } else if (lowercaseInput.includes('integration') || lowercaseInput.includes('api')) {
        botResponse = "We offer comprehensive API access and integration options for e-commerce platforms and social media. Would you like me to direct you to our developer documentation?";
      } else if (lowercaseInput.includes('register') || lowercaseInput.includes('account')) {
        botResponse = "You can register as a customer, vendor, or developer. Each account type has different features tailored to your needs. Would you like to create an account now?";
      }
      
      const botMessage = {
        role: 'system',
        content: botResponse
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error({
        title: 'Error',
        description: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 ease-in-out"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chat window */}
      <div className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Chat header */}
        <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2" size={20} />
            <h3 className="font-medium">HalalChain Assistant</h3>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white/80 hover:text-white"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="p-4 h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : ''
              }`}
            >
              <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-gray-800 dark:text-gray-100 rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </>
  );
}