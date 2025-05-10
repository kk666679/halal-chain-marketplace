const mongoose = require('mongoose');
const { PRODUCT_CATEGORIES } = require('../config/constants');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: PRODUCT_CATEGORIES
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String
  }],
  mainImage: {
    type: String
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    source: {
      type: String
    },
    isHalal: {
      type: Boolean,
      default: true
    }
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    sugar: Number,
    sodium: Number
  },
  price: {
    type: Number,
    min: [0, 'Price must be above 0']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  blockchainId: {
    type: String
  },
  metadataURI: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for certifications
ProductSchema.virtual('certifications', {
  ref: 'Certification',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Virtual for supply chain events
ProductSchema.virtual('supplyChainEvents', {
  ref: 'SupplyChainEvent',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Index for search
ProductSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', ProductSchema);