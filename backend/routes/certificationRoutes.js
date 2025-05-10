const express = require('express');
const router = express.Router();
const { 
  createCertification, 
  getCertifications, 
  getCertification, 
  updateCertificationStatus,
  verifyCertification
} = require('../controllers/certificationController');
const { authenticate, authorize } = require('../config/middleware');
const { USER_ROLES } = require('../config/constants');
const { validation } = require('../config/validation');

// Public routes
router.get('/verify/:certificateNumber', verifyCertification);

// Protected routes
router.post(
  '/', 
  authenticate, 
  authorize(USER_ROLES.CERTIFIER), 
  validation.certification.create, 
  createCertification
);

router.get(
  '/', 
  authenticate, 
  authorize(USER_ROLES.ADMIN, USER_ROLES.CERTIFIER, USER_ROLES.VENDOR), 
  getCertifications
);

router.get(
  '/:id', 
  authenticate, 
  authorize(USER_ROLES.ADMIN, USER_ROLES.CERTIFIER, USER_ROLES.VENDOR), 
  getCertification
);

router.put(
  '/:id/status', 
  authenticate, 
  authorize(USER_ROLES.ADMIN, USER_ROLES.CERTIFIER), 
  updateCertificationStatus
);

module.exports = router;