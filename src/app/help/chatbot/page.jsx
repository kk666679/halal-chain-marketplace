'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, 
  Mic, 
  Image as ImageIcon, 
  ThumbsUp, 
  ThumbsDown, 
  Copy,
  Bot,
  Sparkles
} from 'lucide-react';

export default function ChatbotHelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            HalalChain AI Assistant Help
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn how to get the most out of our AI assistant to help with halal certification, 
            blockchain technology, and supply chain questions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bot className="mr-2" size={24} />
            About the AI Assistant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The HalalChain AI Assistant is powered by advanced artificial intelligence and has been trained on 
            halal certification standards, blockchain technology, and supply chain management. It can help you with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Understanding halal certification requirements and processes</li>
            <li>Learning about blockchain technology and how it ensures halal integrity</li>
            <li>Getting information about HalalChain's products and services</li>
            <li>Troubleshooting technical issues with our platform</li>
            <li>Finding resources and documentation</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Specialized Chat Modes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The AI Assistant offers three specialized modes to better serve your needs:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">General Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For general questions about HalalChain, our services, and basic information about halal certification.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Certification Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Specialized assistance for halal certification standards, requirements, and processes.
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Technical Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed help with blockchain technology, integration, and technical aspects of our platform.
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Switch between modes using the tabs at the top of the chat window to get the most relevant assistance.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="mr-2" size={24} />
            Features
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Text Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Type your questions or requests in the chat box and receive detailed responses with 
                  formatted text, lists, and links to resources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <Mic className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Voice Input</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click the microphone icon to use voice input instead of typing. Speak clearly and the 
                  assistant will transcribe your question and respond.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <ImageIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Image Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload images of products, labels, or certification documents for the AI to analyze. 
                  The assistant can extract information and provide insights based on visual content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <div className="flex">
                  <ThumbsUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <ThumbsDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400 ml-1" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Feedback System</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Rate responses with thumbs up or down to help us improve the assistant. Your feedback 
                  is valuable and helps train the AI to provide better answers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <Copy className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Copy to Clipboard</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Easily copy any response to your clipboard by clicking the copy icon. This is useful for 
                  saving information or sharing it with others.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tips for Better Results
          </h2>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium mr-3">1</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Be specific with your questions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instead of asking "Tell me about certification," try "What are the requirements for halal certification for a bakery in Malaysia?"
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium mr-3">2</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Use the right mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch to Certification mode for detailed certification questions or Technical mode for blockchain and technology questions.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium mr-3">3</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Provide context</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Include relevant details like product type, country, or specific standards you're interested in.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium mr-3">4</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Use images when relevant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload images of product labels, certificates, or ingredients lists for more accurate analysis.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium mr-3">5</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Follow up for clarification</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If the answer isn't clear, ask follow-up questions to get more specific information.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Privacy & Data Usage
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We take your privacy seriously. Here's how we handle your data:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li>Chat conversations are stored locally in your browser for continuity</li>
            <li>Images you upload are processed securely and not stored permanently</li>
            <li>We use anonymized conversation data to improve our AI assistant</li>
            <li>We do not share your conversations with third parties</li>
            <li>You can clear your chat history at any time using the refresh button</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-400">
            For more information, please see our{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Privacy Policy
            </Link>.
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions about using the AI Assistant?{' '}
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Contact our support team
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}