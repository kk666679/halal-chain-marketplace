"use client";

import { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add welcome message if chat is being opened for the first time
    if (!isOpen && chatHistory.length === 0) {
      setChatHistory([
        {
          message: "Hello! I'm the HalalChain assistant. How can I help you with halal certification or blockchain technology today?",
          isUser: false,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      message: message.trim(),
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.message,
          history: chatHistory
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      setChatHistory(prev => [
        ...prev,
        {
          message: data.message,
          isUser: false,
          timestamp: data.timestamp
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      setChatHistory(prev => [
        ...prev,
        {
          message: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          isUser: false,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-medium">HalalChain Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 ${chat.isUser ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    chat.isUser
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {chat.message}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${chat.isUser ? 'text-right' : ''}`}>
                  {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3">
                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white rounded-r-lg px-4 py-2 disabled:opacity-50"
              disabled={isLoading || !message.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}