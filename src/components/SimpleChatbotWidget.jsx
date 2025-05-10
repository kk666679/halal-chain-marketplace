"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';

// This is a simplified version of the chatbot widget without markdown and other advanced features
// Use this as a fallback if the full version causes deployment issues

export default function SimpleChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();
  
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('halalChainChatHistory');
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse saved chat history', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('halalChainChatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add welcome message if chat is being opened for the first time
    if (!isOpen && chatHistory.length === 0) {
      const welcomeMessage = {
        message: "👋 Assalamu alaikum! I'm the HalalChain AI Assistant. I can help you with halal certification, blockchain technology, and our platform features. How can I assist you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
        id: generateMessageId()
      };
      
      setChatHistory([welcomeMessage]);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      message: message.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
      id: generateMessageId()
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
          history: chatHistory.map(msg => ({
            message: msg.message,
            isUser: msg.isUser,
            timestamp: msg.timestamp
          }))
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      const botResponse = {
        message: data.message,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString(),
        id: generateMessageId()
      };
      
      setChatHistory(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      setChatHistory(prev => [
        ...prev,
        {
          message: "I'm sorry, I'm having trouble connecting right now. Please try again later or check your internet connection.",
          isUser: false,
          timestamp: new Date().toISOString(),
          id: generateMessageId()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    localStorage.removeItem('halalChainChatHistory');
    
    // Add welcome message
    const welcomeMessage = {
      message: "👋 Assalamu alaikum! I'm the HalalChain AI Assistant. I can help you with halal certification, blockchain technology, and our platform features. How can I assist you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
      id: generateMessageId()
    };
    
    setChatHistory([welcomeMessage]);
  };

  const generateMessageId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          {/* Chat header */}
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="font-medium">HalalChain Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 p-1"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`mb-4 ${chat.isUser ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block max-w-[85%] rounded-lg p-3 ${
                    chat.isUser
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700'
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
              <div className="mb-4">
                <div className="inline-block p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-4 py-2 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}