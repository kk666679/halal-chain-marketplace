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
    const { message, history = [] } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Prepare conversation history for the AI
    const conversationHistory = history.map(entry => ({
      role: entry.isUser ? 'user' : 'assistant',
      content: entry.message
    }));
    
    // Add the current message
    conversationHistory.push({
      role: 'user',
      content: message
    });
    
    // Add system message for context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful assistant for HalalChain, a blockchain-powered halal certification and supply chain platform. 
      Provide accurate information about halal certification, blockchain technology, and supply chain management. 
      If you don't know the answer, be honest about it.`
    };
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [systemMessage, ...conversationHistory],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    // Extract the response
    const responseMessage = completion.choices[0].message.content;
    
    // Log the interaction (in a real app, you might want to store this in a database)
    console.log(`User: ${message}`);
    console.log(`AI: ${responseMessage}`);
    
    // Return the response
    return NextResponse.json({
      message: responseMessage,
      timestamp: new Date().toISOString()
    });
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