const mongoose = require('mongoose');
const { SUPPLY_CHAIN_STAGES } = require('../config/constants');

const SupplyChainEventSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  stage: {
    type: String,
    enum: Object.values(SUPPLY_CHAIN_STAGES),
    required: [true, 'Please provide a supply chain stage']
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  attachments: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  temperature: {
    type: Number
  },
  humidity: {
    type: Number
  },
  additionalData: {
    type: mongoose.Schema.Types.Mixed
  },
  blockchainTxHash: {
    type: String
  },
  metadataURI: {
    type: String
  },
  previousEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupplyChainEvent'
  },
  nextEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupplyChainEvent'
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

// Index for geospatial queries
SupplyChainEventSchema.index({ location: '2dsphere' });

// Index for product and timestamp
SupplyChainEventSchema.index({ product: 1, timestamp: 1 });

module.exports = mongoose.model('SupplyChainEvent', SupplyChainEventSchema);