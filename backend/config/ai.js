/**
 * AI configuration
 * Manages OpenAI API integration for AI features
 */

const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('./env');

// Create OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

// AI models configuration
const AI_MODELS = {
  DEFAULT: 'gpt-4o',
  FAST: 'gpt-3.5-turbo',
  EMBEDDING: 'text-embedding-3-small'
};

// Generate AI response
const generateAIResponse = async (prompt, options = {}) => {
  try {
    const {
      model = AI_MODELS.DEFAULT,
      temperature = 0.7,
      maxTokens = 500,
      systemPrompt = 'You are an expert in halal certification and supply chain management.'
    } = options;

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature,
      max_tokens: maxTokens
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};

// Generate text embeddings for semantic search
const generateEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: AI_MODELS.EMBEDDING,
      input: text
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
};

module.exports = {
  openai,
  AI_MODELS,
  generateAIResponse,
  generateEmbedding
};