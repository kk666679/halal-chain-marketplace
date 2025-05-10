import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Process chatbot requests
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, history = [], mode = 'general', image } = body;
    
    if (!message && !image) {
      return NextResponse.json(
        { error: 'Message or image is required' },
        { status: 400 }
      );
    }

    // Prepare conversation history for the AI
    const conversationHistory = history.map(entry => ({
      role: entry.isUser ? 'user' : 'assistant',
      content: entry.message
    }));
    
    // Add the current message
    let userMessage = message || "Please analyze this image";
    
    // If there's an image, we need to use the vision model
    if (image) {
      const messages = [
        {
          role: 'system',
          content: getSystemPrompt(mode, true)
        },
        ...conversationHistory,
        {
          role: 'user',
          content: [
            { type: 'text', text: userMessage },
            {
              type: 'image_url',
              image_url: {
                url: image,
                detail: 'high'
              }
            }
          ]
        }
      ];
      
      // Call OpenAI Vision API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages,
        max_tokens: 800,
        temperature: 0.7,
      });
      
      // Extract the response
      const responseMessage = completion.choices[0].message.content;
      
      // Return the response
      return NextResponse.json({
        message: responseMessage,
        timestamp: new Date().toISOString(),
        suggestions: generateSuggestions(mode, message, responseMessage)
      });
    } else {
      // Standard text-based conversation
      const messages = [
        {
          role: 'system',
          content: getSystemPrompt(mode)
        },
        ...conversationHistory,
        {
          role: 'user',
          content: userMessage
        }
      ];
      
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages,
        max_tokens: 800,
        temperature: 0.7,
        functions: [
          {
            name: "get_halal_certification_info",
            description: "Get information about halal certification standards, processes, and requirements",
            parameters: {
              type: "object",
              properties: {
                certification_type: {
                  type: "string",
                  enum: ["general", "food", "cosmetics", "pharmaceuticals", "logistics"],
                  description: "The type of certification being inquired about"
                },
                region: {
                  type: "string",
                  description: "The geographical region for certification standards"
                }
              },
              required: ["certification_type"]
            }
          },
          {
            name: "get_blockchain_verification_details",
            description: "Get details about how blockchain verification works for halal products",
            parameters: {
              type: "object",
              properties: {
                aspect: {
                  type: "string",
                  enum: ["traceability", "authentication", "transparency", "security", "implementation"],
                  description: "The specific aspect of blockchain verification"
                }
              },
              required: ["aspect"]
            }
          }
        ],
        function_call: "auto"
      });
      
      // Extract the response
      let responseMessage = completion.choices[0].message.content;
      let sources = [];
      
      // Check if a function was called
      if (completion.choices[0].message.function_call) {
        const functionCall = completion.choices[0].message.function_call;
        
        // Handle function calls
        if (functionCall.name === "get_halal_certification_info") {
          const args = JSON.parse(functionCall.arguments);
          const certInfo = await getHalalCertificationInfo(args.certification_type, args.region);
          responseMessage = certInfo.response;
          sources = certInfo.sources;
        } else if (functionCall.name === "get_blockchain_verification_details") {
          const args = JSON.parse(functionCall.arguments);
          const blockchainInfo = await getBlockchainVerificationDetails(args.aspect);
          responseMessage = blockchainInfo.response;
          sources = blockchainInfo.sources;
        }
      }
      
      // Log the interaction (in a real app, you might want to store this in a database)
      console.log(`User (${mode} mode): ${message}`);
      console.log(`AI: ${responseMessage}`);
      
      // Return the response
      return NextResponse.json({
        message: responseMessage,
        timestamp: new Date().toISOString(),
        suggestions: generateSuggestions(mode, message, responseMessage),
        sources
      });
    }
  } catch (error) {
    console.error('Chatbot API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

/**
 * Get the appropriate system prompt based on the chat mode
 * @param {string} mode - The chat mode (general, certification, technical)
 * @param {boolean} isVision - Whether this is for vision API
 * @returns {string} - The system prompt
 */
function getSystemPrompt(mode, isVision = false) {
  const basePrompt = `You are a helpful assistant for HalalChain, a blockchain-powered halal certification and supply chain platform.
  Always be respectful and use Islamic greetings when appropriate. Provide accurate information and cite sources when possible.
  If you don't know the answer, be honest about it.`;
  
  const visionAddition = isVision ? 
    `You can analyze images related to halal products, certification documents, and supply chain processes.
    When analyzing images, focus on relevant details for halal certification and compliance.` : '';
  
  switch (mode) {
    case 'certification':
      return `${basePrompt}
      ${visionAddition}
      You specialize in halal certification standards, processes, and requirements.
      You can explain the differences between certification bodies, standards across different countries,
      and the specific requirements for different product categories.
      Use formal language and be precise about certification requirements.
      Refer to specific standards and regulations when applicable.`;
    
    case 'technical':
      return `${basePrompt}
      ${visionAddition}
      You specialize in the technical aspects of HalalChain, including blockchain technology,
      quantum-resistant security, neural interfaces, and our multi-agent AI system.
      You can explain how our technology ensures transparency, traceability, and authenticity in the halal supply chain.
      Use technical language when appropriate but be able to explain complex concepts in simpler terms when needed.`;
    
    default: // general
      return `${basePrompt}
      ${visionAddition}
      You provide general information about HalalChain, our services, and how users can benefit from our platform.
      You can help with basic questions about halal certification, our marketplace, and how to get started.
      Use friendly, conversational language and focus on being helpful to both consumers and potential vendors.`;
  }
}

/**
 * Generate contextual suggestions based on the conversation
 * @param {string} mode - The chat mode
 * @param {string} userMessage - The user's message
 * @param {string} aiResponse - The AI's response
 * @returns {string[]} - Array of suggested questions
 */
function generateSuggestions(mode, userMessage, aiResponse) {
  // Default suggestions based on mode
  const defaultSuggestions = {
    general: [
      "Tell me about HalalChain",
      "How can I verify a halal product?",
      "What makes your platform unique?",
      "How do I become a vendor?"
    ],
    certification: [
      "How do I get my product halal certified?",
      "What are the requirements for halal certification?",
      "How long does the certification process take?",
      "What's the difference between halal and kosher?"
    ],
    technical: [
      "How does blockchain verify halal products?",
      "What is the quantum security feature?",
      "How do neural interfaces work with your platform?",
      "Can you explain your multi-agent AI system?"
    ]
  };
  
  // For a real implementation, you would use NLP to generate contextual suggestions
  // based on the conversation. For now, we'll return the default suggestions.
  return defaultSuggestions[mode] || defaultSuggestions.general;
}

/**
 * Get information about halal certification
 * @param {string} certificationType - The type of certification
 * @param {string} region - The geographical region
 * @returns {Object} - Response and sources
 */
async function getHalalCertificationInfo(certificationType, region = 'global') {
  // In a real implementation, this would fetch data from a database or API
  const certificationInfo = {
    general: {
      response: `# Halal Certification Overview\n\nHalal certification is a process that verifies products meet Islamic dietary laws and are permissible for Muslim consumption. The certification process typically involves:\n\n1. **Application submission** - Companies submit detailed information about ingredients, processes, and facilities\n2. **Document review** - Certification bodies review all documentation\n3. **Site inspection** - Physical inspection of production facilities\n4. **Laboratory testing** - Testing of products for haram (forbidden) substances\n5. **Certification decision** - Issuance of certification if all requirements are met\n\nCertification must be renewed periodically, usually annually, to ensure continued compliance.`,
      sources: [
        { title: "HalalChain Certification Guide", url: "/certification/guide" },
        { title: "Global Halal Standards", url: "/resources/halal-standards" }
      ]
    },
    food: {
      response: `# Food Halal Certification Requirements\n\nFor food products, halal certification requires:\n\n- **Ingredients**: All ingredients must be halal-compliant with no pork, alcohol, or their derivatives\n- **Processing aids**: All processing aids must be halal\n- **Equipment**: Production equipment must not be contaminated with haram substances\n- **Storage & Transport**: Proper segregation from non-halal products\n- **Slaughtering**: For meat products, animals must be slaughtered according to Islamic law\n\nCommon challenges include hidden ingredients, cross-contamination, and ensuring halal integrity throughout the supply chain.`,
      sources: [
        { title: "Food Certification Standards", url: "/certification/food-standards" },
        { title: "Halal Ingredients Database", url: "/resources/ingredients" }
      ]
    },
    cosmetics: {
      response: `# Cosmetics Halal Certification\n\nFor cosmetic products, halal certification focuses on:\n\n- **Ingredients**: Free from alcohol, animal fats, and other haram substances\n- **Testing**: No animal testing\n- **Manufacturing**: Dedicated equipment or proper cleaning procedures\n- **Packaging**: Materials must not contain haram substances\n\nCosmetic products often contain ingredients derived from animals or alcohol, which require halal alternatives.`,
      sources: [
        { title: "Cosmetics Certification Guide", url: "/certification/cosmetics" },
        { title: "Halal Alternatives for Cosmetic Ingredients", url: "/resources/cosmetic-ingredients" }
      ]
    }
  };
  
  return certificationInfo[certificationType] || certificationInfo.general;
}

/**
 * Get details about blockchain verification
 * @param {string} aspect - The specific aspect of blockchain verification
 * @returns {Object} - Response and sources
 */
async function getBlockchainVerificationDetails(aspect) {
  // In a real implementation, this would fetch data from a database or API
  const blockchainInfo = {
    traceability: {
      response: `# Blockchain Traceability in HalalChain\n\nHalalChain's blockchain traceability system creates an immutable record of a product's journey through the supply chain. Each transaction is recorded as a block, creating a transparent history that cannot be altered.\n\n## Key features:\n\n- **Real-time tracking**: Monitor products from source to consumer\n- **QR code integration**: Consumers can scan products to view the complete supply chain journey\n- **Timestamp verification**: Every step is timestamped and cryptographically secured\n- **Supplier accountability**: All supply chain participants are verified and accountable\n\nThis system ensures that halal integrity is maintained throughout the entire supply chain process.`,
      sources: [
        { title: "HalalChain Traceability System", url: "/technology/traceability" },
        { title: "Blockchain in Supply Chain Management", url: "/resources/blockchain-scm" }
      ]
    },
    authentication: {
      response: `# Blockchain Authentication for Halal Products\n\nHalalChain's authentication system uses blockchain to verify the authenticity of halal certifications and products. This prevents counterfeiting and ensures consumers can trust halal claims.\n\n## Authentication methods:\n\n- **Digital certificates**: Stored on blockchain with cryptographic signatures\n- **Smart contracts**: Automatically verify compliance with halal standards\n- **Decentralized verification**: Multiple nodes must confirm authenticity\n- **Quantum-resistant cryptography**: Protection against future quantum computing threats\n\nThe system allows instant verification of certification status and product authenticity.`,
      sources: [
        { title: "Authentication Technology", url: "/technology/authentication" },
        { title: "Quantum-Resistant Blockchain", url: "/technology/quantum-security" }
      ]
    }
  };
  
  return blockchainInfo[aspect] || {
    response: `# Blockchain Technology in HalalChain\n\nHalalChain uses advanced blockchain technology to ensure transparency, security, and trust in the halal certification process. Our distributed ledger technology creates an immutable record of certification and supply chain data that cannot be altered or falsified.\n\nThis provides stakeholders with reliable information about product origins, processing methods, and certification status.`,
    sources: [
      { title: "HalalChain Technology Overview", url: "/technology" },
      { title: "Blockchain for Halal Certification", url: "/resources/blockchain-certification" }
    ]
  };
}