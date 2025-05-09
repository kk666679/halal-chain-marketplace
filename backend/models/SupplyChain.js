const mongoose = require('mongoose');

const SupplyChainSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: [true, 'Please provide a batch ID'],
    unique: true,
    trim: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Please provide a unit']
  },
  status: {
    type: String,
    enum: ['created', 'processing', 'in_transit', 'delivered', 'rejected'],
    default: 'created'
  },
  origin: {
    name: {
      type: String,
      required: [true, 'Please provide origin name']
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
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
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  destination: {
    name: {
      type: String,
      required: [true, 'Please provide destination name']
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
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
    },
    estimatedArrival: Date
  },
  trackingHistory: [{
    location: {
      name: String,
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
      },
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
    status: {
      type: String,
      enum: [
        'sourced', 'manufactured', 'packaged', 'quality_checked', 
        'shipped', 'in_transit', 'delivered', 'stored', 'processed'
      ]
    },
    handler: {
      name: String,
      role: String,
      organization: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String,
    attachments: [{
      name: String,
      fileUrl: String,
      fileType: String
    }]
  }],
  halalCompliance: {
    isCompliant: {
      type: Boolean,
      default: true
    },
    certificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
    },
    inspectionDate: Date,
    inspectorName: String,
    notes: String
  },
  qualityChecks: [{
    checkType: String,
    performedBy: String,
    date: Date,
    result: {
      type: String,
      enum: ['passed', 'failed', 'pending']
    },
    notes: String
  }],
  temperature: [{
    value: Number,
    unit: {
      type: String,
      enum: ['celsius', 'fahrenheit']
    },
    timestamp: Date,
    location: String
  }],
  humidity: [{
    value: Number,
    unit: {
      type: String,
      enum: ['percentage']
    },
    timestamp: Date,
    location: String
  }],
  blockchainReferences: [{
    transactionId: String,
    blockNumber: Number,
    timestamp: Date,
    contractAddress: String,
    eventType: String,
    ipfsHash: String
  }],
  qrCode: {
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

// Geospatial indexes for location-based queries
SupplyChainSchema.index({ 'origin.coordinates': '2dsphere' });
SupplyChainSchema.index({ 'destination.coordinates': '2dsphere' });
SupplyChainSchema.index({ 'trackingHistory.location.coordinates': '2dsphere' });

// Other indexes for better query performance
SupplyChainSchema.index({ batchId: 1 });
SupplyChainSchema.index({ product: 1 });
SupplyChainSchema.index({ vendor: 1 });
SupplyChainSchema.index({ status: 1 });
SupplyChainSchema.index({ 'halalCompliance.isCompliant': 1 });

// Update the updatedAt field
SupplyChainSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SupplyChain', SupplyChainSchema);