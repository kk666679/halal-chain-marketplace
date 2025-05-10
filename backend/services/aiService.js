const { generateAIResponse, generateEmbedding, AI_MODELS } = require('../config/ai');
const logger = require('../config/logger');

/**
 * AI Service
 * Handles interactions with AI models for various features
 */
class AIService {
  /**
   * Generate a halal certification assessment
   * @param {Object} productData - Product data for assessment
   * @returns {Promise<Object>} - Assessment result
   */
  async assessCertification(productData) {
    try {
      const { name, description, ingredients, category } = productData;
      
      // Create prompt for certification assessment
      const prompt = `
        Please assess if the following product is likely to meet halal certification requirements:
        
        Product Name: ${name}
        Category: ${category}
        Description: ${description}
        Ingredients: ${ingredients.map(i => `${i.name} (Source: ${i.source || 'Not specified'})`).join(', ')}
        
        Provide a detailed assessment including:
        1. Overall halal compliance likelihood (High, Medium, Low)
        2. Potential issues or concerns
        3. Recommendations for certification
        4. Required documentation
      `;
      
      const response = await generateAIResponse(prompt, {
        model: AI_MODELS.DEFAULT,
        temperature: 0.2,
        maxTokens: 800,
        systemPrompt: 'You are an expert in halal certification standards and requirements. Provide accurate and detailed assessments based on Islamic dietary laws and certification standards.'
      });
      
      logger.info('Generated halal certification assessment', { productId: productData._id });
      
      return {
        assessment: response,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Failed to generate certification assessment', { error, productId: productData._id });
      throw error;
    }
  }
  
  /**
   * Generate supply chain recommendations
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} - Recommendations
   */
  async generateSupplyChainRecommendations(productData) {
    try {
      const { name, category } = productData;
      
      // Create prompt for supply chain recommendations
      const prompt = `
        Please provide supply chain recommendations for the following halal product:
        
        Product Name: ${name}
        Category: ${category}
        
        Provide recommendations for:
        1. Raw material sourcing
        2. Processing requirements
        3. Storage and transportation
        4. Packaging considerations
        5. Traceability measures
      `;
      
      const response = await generateAIResponse(prompt, {
        model: AI_MODELS.DEFAULT,
        temperature: 0.3,
        maxTokens: 800,
        systemPrompt: 'You are an expert in halal supply chain management. Provide practical and detailed recommendations for maintaining halal integrity throughout the supply chain.'
      });
      
      logger.info('Generated supply chain recommendations', { productId: productData._id });
      
      return {
        recommendations: response,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Failed to generate supply chain recommendations', { error, productId: productData._id });
      throw error;
    }
  }
  
  /**
   * Generate product description
   * @param {Object} productData - Basic product data
   * @returns {Promise<string>} - Generated description
   */
  async generateProductDescription(productData) {
    try {
      const { name, category, ingredients } = productData;
      
      // Create prompt for product description
      const prompt = `
        Generate a compelling product description for the following halal product:
        
        Product Name: ${name}
        Category: ${category}
        Ingredients: ${ingredients ? ingredients.map(i => i.name).join(', ') : 'Not specified'}
        
        The description should:
        1. Highlight the halal aspects
        2. Be engaging and marketable
        3. Include key benefits
        4. Be approximately 150-200 words
      `;
      
      const response = await generateAIResponse(prompt, {
        model: AI_MODELS.FAST,
        temperature: 0.7,
        maxTokens: 300,
        systemPrompt: 'You are a marketing expert specializing in halal products. Create compelling and accurate product descriptions.'
      });
      
      logger.info('Generated product description', { productName: name });
      
      return response;
    } catch (error) {
      logger.error('Failed to generate product description', { error, productName: productData.name });
      throw error;
    }
  }
  
  /**
   * Generate text embeddings for semantic search
   * @param {string} text - Text to generate embeddings for
   * @returns {Promise<Array<number>>} - Embedding vector
   */
  async getTextEmbedding(text) {
    try {
      const embedding = await generateEmbedding(text);
      return embedding;
    } catch (error) {
      logger.error('Failed to generate text embedding', { error });
      throw error;
    }
  }
}

module.exports = new AIService();