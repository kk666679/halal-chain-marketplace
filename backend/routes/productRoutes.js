const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct,
  getVendorProducts
} = require('../controllers/productController');
const { authenticate, authorize } = require('../config/middleware');
const { USER_ROLES } = require('../config/constants');
const { validation } = require('../config/validation');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post(
  '/', 
  authenticate, 
  authorize(USER_ROLES.VENDOR), 
  validation.product.create, 
  createProduct
);

router.put(
  '/:id', 
  authenticate, 
  authorize(USER_ROLES.VENDOR, USER_ROLES.ADMIN), 
  updateProduct
);

router.delete(
  '/:id', 
  authenticate, 
  authorize(USER_ROLES.VENDOR, USER_ROLES.ADMIN), 
  deleteProduct
);

router.get(
  '/vendor/products', 
  authenticate, 
  authorize(USER_ROLES.VENDOR), 
  getVendorProducts
);

module.exports = router;