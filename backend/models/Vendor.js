const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'Please provide a business name'],
    trim: true,
    maxlength: [100, 'Business name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a business description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  logo: {
    type: String,
    default: 'default-vendor-logo.jpg'
  },
  coverImage: {
    type: String,
    default: 'default-vendor-cover.jpg'
  },
  businessAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  contactEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  contactPhone: {
    type: String
  },
  website: {
    type: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  businessRegistrationNumber: {
    type: String,
    required: [true, 'Please provide a business registration number']
  },
  taxIdentificationNumber: {
    type: String
  },
  businessType: {
    type: String,
    enum: ['manufacturer', 'distributor', 'retailer', 'restaurant', 'other'],
    required: [true, 'Please specify the business type']
  },
  categories: [{
    type: String
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    documentUrl: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    }
  }],
  halalCertification: {
    certificateNumber: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    documentUrl: String,
    blockchainReference: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    }
  },
  bankInformation: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    swiftCode: String
  },
  walletAddress: {
    type: String,
    trim: true
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
  totalSales: {
    type: Number,
    default: 0
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    name: String,
    documentUrl: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
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

// Geospatial index for location-based queries
VendorSchema.index({ 'businessAddress.coordinates': '2dsphere' });

// Virtual for products
VendorSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'vendor',
  justOne: false
});

// Update the updatedAt field
VendorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Vendor', VendorSchema);