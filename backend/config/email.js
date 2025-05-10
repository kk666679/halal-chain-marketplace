/**
 * Email configuration
 * Manages email sending functionality
 */

const nodemailer = require('nodemailer');
const { 
  EMAIL_SERVICE, 
  EMAIL_HOST, 
  EMAIL_PORT, 
  EMAIL_USER, 
  EMAIL_PASSWORD,
  EMAIL_FROM,
  NODE_ENV
} = require('./env');

// Create email transporter
const createTransporter = () => {
  // For development, use ethereal.email (fake SMTP service)
  if (NODE_ENV === 'development' && !EMAIL_HOST) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER || 'ethereal.user@ethereal.email',
        pass: EMAIL_PASSWORD || 'ethereal_pass'
      }
    });
  }
  
  // For production, use configured email service
  return nodemailer.createTransport({
    service: EMAIL_SERVICE,
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const message = {
      from: `HalalChain <${EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };
    
    const info = await transporter.sendMail(message);
    
    if (NODE_ENV === 'development') {
      console.log('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Email templates
const EMAIL_TEMPLATES = {
  WELCOME: {
    subject: 'Welcome to HalalChain Marketplace',
    generateHtml: (name) => `
      <h1>Welcome to HalalChain Marketplace!</h1>
      <p>Hello ${name},</p>
      <p>Thank you for joining HalalChain Marketplace. We're excited to have you on board!</p>
      <p>With our platform, you can:</p>
      <ul>
        <li>Verify halal certifications</li>
        <li>Track products through the supply chain</li>
        <li>Connect with verified halal vendors</li>
      </ul>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>The HalalChain Team</p>
    `
  },
  PASSWORD_RESET: {
    subject: 'Password Reset Request',
    generateHtml: (name, resetUrl) => `
      <h1>Password Reset Request</h1>
      <p>Hello ${name},</p>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The HalalChain Team</p>
    `
  },
  CERTIFICATION_APPROVED: {
    subject: 'Halal Certification Approved',
    generateHtml: (name, productName) => `
      <h1>Certification Approved!</h1>
      <p>Hello ${name},</p>
      <p>We're pleased to inform you that your halal certification for "${productName}" has been approved.</p>
      <p>You can now view and share your certification on the HalalChain Marketplace.</p>
      <p>Best regards,<br>The HalalChain Team</p>
    `
  }
};

module.exports = {
  sendEmail,
  EMAIL_TEMPLATES
};