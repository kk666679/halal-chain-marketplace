const mongoose = require('mongoose');

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
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'food', 'beverages', 'meat', 'dairy', 'bakery', 'snacks', 
      'condiments', 'frozen', 'canned', 'health', 'beauty', 
      'household', 'clothing', 'other'
    ]
  },
  subCategory: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  discountPrice: {
    type: Number
  },
  currency: {
    type: String,
    default: 'USD'
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Please provide a unit'],
    enum: ['kg', 'g', 'l', 'ml', 'pcs', 'box', 'pack', 'other']
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'g', 'lb', 'oz']
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'in', 'm']
    }
  },
  images: [{
    url: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String
  }],
  ingredients: [{
    name: String,
    source: String,
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
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  allergens: [{
    type: String
  }],
  storageInstructions: {
    type: String
  },
  shelfLife: {
    value: Number,
    unit: {
      type: String,
      enum: ['days', 'months', 'years']
    }
  },
  manufacturingDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  batchNumber: {
    type: String
  },
  barcode: {
    type: String
  },
  qrCode: {
    type: String
  },
  halalCertification: {
    isCertified: {
      type: Boolean,
      default: false
    },
    certificationId: {
      type: String
    },
    certifiedBy: {
      type: String
    },
    certificationDate: {
      type: Date
    },
    expiryDate: {
      type: Date
    },
    documentUrl: {
      type: String
    },
    blockchainReference: {
      type: String
    }
  },
  supplyChain: {
    origin: {
      country: String,
      region: String,
      facility: String
    },
    processingLocations: [{
      name: String,
      location: String,
      date: Date,
      process: String
    }],
    distributionPath: [{
      location: String,
      date: Date,
      handler: String
    }],
    blockchainReferences: [{
      transactionId: String,
      timestamp: Date,
      eventType: String
    }]
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Update the updatedAt field
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ vendor: 1 });
ProductSchema.index({ 'halalCertification.isCertified': 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ salesCount: -1 });

module.exports = mongoose.model('Product', ProductSchema);