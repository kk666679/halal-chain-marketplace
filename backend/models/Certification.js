const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  certificationNumber: {
    type: String,
    required: [true, 'Please provide a certification number'],
    unique: true,
    trim: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  certifier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certifierName: {
    type: String,
    required: [true, 'Please provide certifier name']
  },
  certifierOrganization: {
    type: String,
    required: [true, 'Please provide certifier organization']
  },
  certificationType: {
    type: String,
    enum: ['product', 'vendor', 'facility', 'ingredient'],
    required: [true, 'Please specify certification type']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired', 'revoked'],
    default: 'pending'
  },
  issuedDate: {
    type: Date,
    required: [true, 'Please provide issue date']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide expiry date']
  },
  documents: [{
    name: String,
    documentUrl: String,
    documentType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  inspectionDetails: {
    inspectionDate: Date,
    inspectorName: String,
    inspectionLocation: String,
    inspectionNotes: String,
    complianceScore: Number
  },
  standards: [{
    name: String,
    version: String,
    complianceLevel: {
      type: String,
      enum: ['full', 'partial', 'non-compliant']
    }
  }],
  ingredients: [{
    name: String,
    source: String,
    isHalal: Boolean,
    notes: String
  }],
  processingMethods: [{
    name: String,
    isHalal: Boolean,
    notes: String
  }],
  blockchainReference: {
    transactionId: String,
    blockNumber: Number,
    timestamp: Date,
    contractAddress: String,
    ipfsHash: String
  },
  qrCode: {
    type: String
  },
  revocationDetails: {
    isRevoked: {
      type: Boolean,
      default: false
    },
    revokedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    revocationDate: Date,
    revocationReason: String
  },
  renewalHistory: [{
    previousCertificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
    },
    renewalDate: Date,
    renewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  notes: {
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
});

// Update the updatedAt field
CertificationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
CertificationSchema.index({ certificationNumber: 1 });
CertificationSchema.index({ product: 1 });
CertificationSchema.index({ vendor: 1 });
CertificationSchema.index({ status: 1 });
CertificationSchema.index({ expiryDate: 1 });
CertificationSchema.index({ 'blockchainReference.transactionId': 1 });

module.exports = mongoose.model('Certification', CertificationSchema);