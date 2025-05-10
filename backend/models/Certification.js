const mongoose = require('mongoose');
const { CERTIFICATION_STATUS } = require('../config/constants');

const CertificationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  certifier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(CERTIFICATION_STATUS),
    default: CERTIFICATION_STATUS.PENDING
  },
  certificateNumber: {
    type: String,
    unique: true
  },
  issuedDate: {
    type: Date,
    default: null
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide an expiry date']
  },
  documents: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  inspectionDetails: {
    inspectionDate: Date,
    inspectorName: String,
    inspectionLocation: String,
    inspectionNotes: String
  },
  blockchainTxHash: {
    type: String
  },
  blockchainId: {
    type: String
  },
  metadataURI: {
    type: String
  },
  revocationReason: {
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
  timestamps: true
});

// Generate certificate number before saving
CertificationSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  // Generate a unique certificate number
  const prefix = 'HC';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  this.certificateNumber = `${prefix}-${timestamp}-${random}`;
  
  next();
});

// Index for searching
CertificationSchema.index({ certificateNumber: 1 });

module.exports = mongoose.model('Certification', CertificationSchema);