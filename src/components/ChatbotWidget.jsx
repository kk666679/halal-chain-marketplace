"use client";

'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Mic, 
  MicOff,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Sparkles,
  Bot,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isImageAttached, setIsImageAttached] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatMode, setChatMode] = useState('general'); // general, certification, technical
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { theme } = useTheme();
  
  // Speech recognition setup
  const [recognition, setRecognition] = useState(null);
  
  useEffect(() => {
    // Initialize speech recognition if supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setMessage(transcript);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

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

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  // Set initial suggestions based on chat mode
  useEffect(() => {
    updateSuggestions();
  }, [chatMode]);

  const updateSuggestions = () => {
    switch(chatMode) {
      case 'certification':
        setSuggestions([
          "How do I get my product halal certified?",
          "What are the requirements for halal certification?",
          "How long does the certification process take?",
          "What's the difference between halal and kosher?"
        ]);
        break;
      case 'technical':
        setSuggestions([
          "How does blockchain verify halal products?",
          "What is the quantum security feature?",
          "How do neural interfaces work with your platform?",
          "Can you explain your multi-agent AI system?"
        ]);
        break;
      default: // general
        setSuggestions([
          "Tell me about HalalChain",
          "How can I verify a halal product?",
          "What makes your platform unique?",
          "How do I become a vendor?"
        ]);
    }
  };

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
      setShowSuggestions(true);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!message.trim() && !attachedImage) return;
    
    // Add user message to chat
    const userMessage = {
      message: message.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
      id: generateMessageId(),
      image: attachedImage
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setShowSuggestions(false);
    setIsImageAttached(false);
    setAttachedImage(null);
    
    try {
      // Prepare the request body
      const requestBody = {
        message: userMessage.message,
        history: chatHistory.map(msg => ({
          message: msg.message,
          isUser: msg.isUser,
          timestamp: msg.timestamp
        })),
        mode: chatMode
      };
      
      // Add image if present
      if (userMessage.image) {
        requestBody.image = userMessage.image;
      }
      
      // Send message to API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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
        id: generateMessageId(),
        sources: data.sources || []
      };
      
      setChatHistory(prev => [...prev, botResponse]);
      
      // Generate new suggestions based on the conversation
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      }
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

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    handleSubmit();
  };

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setMessage('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachedImage(reader.result);
      setIsImageAttached(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFeedback = (messageId, isPositive) => {
    setFeedbackGiven(prev => ({
      ...prev,
      [messageId]: isPositive ? 'positive' : 'negative'
    }));
    
    // In a real app, you would send this feedback to your API
    // to improve the assistant's responses
    fetch('/api/chatbot/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageId,
        feedback: isPositive ? 'positive' : 'negative',
        message: chatHistory.find(msg => msg.id === messageId)?.message
      }),
    }).catch(error => {
      console.error('Error sending feedback:', error);
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
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
    setShowSuggestions(true);
    updateSuggestions();
  };

  const changeChatMode = (mode) => {
    setChatMode(mode);
    
    // Add a system message about the mode change
    const modeMessages = {
      general: "I've switched to general assistance mode. Ask me anything about HalalChain!",
      certification: "I'm now in certification specialist mode. I can help with all your halal certification questions.",
      technical: "Technical support mode activated. I can help with blockchain, integration, and technical questions."
    };
    
    setChatHistory(prev => [
      ...prev,
      {
        message: modeMessages[mode],
        isUser: false,
        timestamp: new Date().toISOString(),
        id: generateMessageId()
      }
    ]);
    
    setShowSuggestions(true);
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
          className={`${
            isExpanded 
              ? 'fixed inset-4 max-w-4xl mx-auto' 
              : 'absolute bottom-16 right-0 w-80 sm:w-96 h-[500px]'
          } bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300`}
          ref={chatContainerRef}
        >
          {/* Chat header */}
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="mr-2" size={20} />
              <h3 className="font-medium">HalalChain Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleExpand}
                className="text-white hover:text-gray-200 p-1"
                aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
              >
                {isExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                )}
              </button>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Mode selector */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => changeChatMode('general')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                chatMode === 'general'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => changeChatMode('certification')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                chatMode === 'certification'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Certification
            </button>
            <button
              onClick={() => changeChatMode('technical')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                chatMode === 'technical'
                  ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Technical
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
                  className={`inline-block max-w-[85%] rounded-lg ${
                    chat.isUser
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* Message content */}
                  <div className="p-3">
                    {chat.image && (
                      <div className="mb-2 rounded overflow-hidden">
                        <Image 
                          src={chat.image} 
                          alt="Uploaded image" 
                          width={200} 
                          height={200} 
                          className="max-w-full h-auto"
                        />
                      </div>
                    )}
                    
                    <div className={`prose ${chat.isUser ? 'prose-invert' : ''} max-w-none prose-sm`}>
                      <ReactMarkdown>
                        {chat.message}
                      </ReactMarkdown>
                    </div>
                    
                    {/* Sources if available */}
                    {chat.sources && chat.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Sources:</p>
                        <ul className="mt-1 space-y-1">
                          {chat.sources.map((source, idx) => (
                            <li key={idx} className="text-xs">
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                {source.title || source.url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Message actions (only for assistant messages) */}
                  {!chat.isUser && (
                    <div className="flex justify-end items-center px-3 py-1 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                      {/* Feedback buttons */}
                      <div className="flex space-x-2 mr-2">
                        <button
                          onClick={() => handleFeedback(chat.id, true)}
                          className={`p-1 rounded-full ${
                            feedbackGiven[chat.id] === 'positive'
                              ? 'text-green-600 bg-green-100 dark:bg-green-900/30'
                              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                          }`}
                          aria-label="Thumbs up"
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleFeedback(chat.id, false)}
                          className={`p-1 rounded-full ${
                            feedbackGiven[chat.id] === 'negative'
                              ? 'text-red-600 bg-red-100 dark:bg-red-900/30'
                              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                          }`}
                          aria-label="Thumbs down"
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                      
                      {/* Copy button */}
                      <button
                        onClick={() => copyToClipboard(chat.message)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Copy to clipboard"
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}
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
            
            {/* Suggested questions */}
            {showSuggestions && suggestions.length > 0 && !isLoading && (
              <div className="mt-4 mb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat actions */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
            <button
              onClick={clearChat}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Clear chat"
            >
              <RefreshCw size={16} />
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-2 ${
                isImageAttached 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              aria-label="Attach image"
            >
              <ImageIcon size={16} />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </button>
            
            {recognition && (
              <button
                onClick={toggleListening}
                className={`p-2 ${
                  isListening 
                    ? 'text-red-600 dark:text-red-400 animate-pulse' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}
            
            <button
              onClick={() => window.open('/help/chatbot', '_blank')}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Help"
            >
              <HelpCircle size={16} />
            </button>
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your message..."}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading || isListening}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-4 py-2 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading || (!message.trim() && !attachedImage)}
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </form>
          
          {/* Attached image preview */}
          {isImageAttached && (
            <div className="absolute bottom-16 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Attached Image</span>
                <button
                  onClick={() => {
                    setIsImageAttached(false);
                    setAttachedImage(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="relative h-20 w-full">
                <Image
                  src={attachedImage}
                  alt="Attached image"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Minimized indicator when chat is open but window is collapsed */}
      {isOpen && !isExpanded && (
        <div className="absolute bottom-16 right-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded-t-lg">
          <Sparkles size={12} className="inline mr-1" />
          <span>AI Assistant active</span>
        </div>
      )}
    </div>
  );
}