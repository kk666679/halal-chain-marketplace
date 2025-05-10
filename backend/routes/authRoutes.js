const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  updateProfile, 
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require('../controllers/authController');
const { authenticate } = require('../config/middleware');
const { validation } = require('../config/validation');

// Public routes
router.post('/register', validation.user.register, register);
router.post('/login', validation.user.login, login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verifyemail/:verificationtoken', verifyEmail);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/updateprofile', authenticate, updateProfile);
router.put('/updatepassword', authenticate, updatePassword);

module.exports = router;