const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { UPLOAD_LIMITS } = require('../config/constants');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'misc';
    
    if (UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      folder = 'images';
    } else if (UPLOAD_LIMITS.ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
      folder = 'documents';
    }
    
    const destPath = path.join(uploadDir, folder);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    ...UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES,
    ...UPLOAD_LIMITS.ALLOWED_DOCUMENT_TYPES
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only images and documents are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: UPLOAD_LIMITS.IMAGE_SIZE_MB * 1024 * 1024 // Convert MB to bytes
  }
});

// Middleware for handling file uploads
const uploadMiddleware = {
  // Single file upload
  single: (fieldName) => upload.single(fieldName),
  
  // Multiple files upload
  array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  
  // Multiple fields with multiple files
  fields: (fields) => upload.fields(fields),
  
  // Handle upload errors
  handleError: (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File size exceeds the limit of ${UPLOAD_LIMITS.IMAGE_SIZE_MB}MB`
        });
      }
      
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    next();
  }
};

module.exports = uploadMiddleware;