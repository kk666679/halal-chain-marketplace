/**
 * Validation configuration
 * Provides validation functions for request data
 */

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate phone number
const isValidPhone = (phone) => {
  // Basic international phone format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

// Validate URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Validate Ethereum address
const isValidEthAddress = (address) => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

// Validate request body against schema
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};

// Common validation middleware
const validation = {
  // User validation
  user: {
    register: (req, res, next) => {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, email and password'
        });
      }
      
      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email'
        });
      }
      
      if (!isValidPassword(password)) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long and include uppercase, lowercase, number and special character'
        });
      }
      
      next();
    },
    
    login: (req, res, next) => {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password'
        });
      }
      
      next();
    }
  },
  
  // Product validation
  product: {
    create: (req, res, next) => {
      const { name, description, category } = req.body;
      
      if (!name || !description || !category) {
        return res.status(400).json({
          success: false,
          message: 'Please provide name, description and category'
        });
      }
      
      next();
    }
  },
  
  // Certification validation
  certification: {
    create: (req, res, next) => {
      const { productId, certifierName, expiryDate } = req.body;
      
      if (!productId || !certifierName || !expiryDate) {
        return res.status(400).json({
          success: false,
          message: 'Please provide productId, certifierName and expiryDate'
        });
      }
      
      if (!isValidObjectId(productId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }
      
      const expiry = new Date(expiryDate);
      if (isNaN(expiry.getTime()) || expiry <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Expiry date must be a valid future date'
        });
      }
      
      next();
    }
  }
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidUrl,
  isValidEthAddress,
  isValidObjectId,
  validateSchema,
  validation
};