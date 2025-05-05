/**
 * Processes payments with support for multiple payment methods and fraud checks
 * @param {Object} paymentData - Payment information
 * @param {string} paymentData.orderId - Associated order ID
 * @param {number} paymentData.amount - Payment amount
 * @param {string} paymentData.currency - Currency code (e.g., 'USD')
 * @param {Object} paymentData.method - Payment method details
 * @param {string} paymentData.method.type - Type (credit_card, paypal, etc.)
 * @param {Object} paymentData.customer - Customer information
 * @param {Object} [options] - Processing options
 * @param {boolean} [options.retryOnDecline=true] - Whether to retry declined payments
 * @param {number} [options.maxRetries=2] - Maximum retry attempts
 * @returns {Promise<Object>} - Payment processing result
 */
async function processPayment(paymentData, options = {}) {
  // Validate payment data
  if (!paymentData?.orderId || !paymentData.amount || !paymentData.currency || !paymentData.method) {
    throw new Error('Invalid payment data: missing required fields');
  }

  if (paymentData.amount <= 0) {
    throw new Error('Payment amount must be greater than zero');
  }

  const config = {
    retryOnDecline: options.retryOnDecline !== false,
    maxRetries: options.maxRetries || 2,
    timeout: options.timeout || 10000 // 10 seconds
  };

  console.log(`Processing payment for order ${paymentData.orderId} (${paymentData.currency}${paymentData.amount.toFixed(2)})`);

  try {
    // 1. Validate payment method
    validatePaymentMethod(paymentData.method);

    // 2. Check for fraud indicators
    const fraudCheck = await runFraudChecks(paymentData);
    if (fraudCheck.riskLevel === 'high') {
      throw new Error('Payment declined due to fraud risk');
    }

    // 3. Process payment (with retry logic)
    let attempt = 0;
    let lastError;
    
    while (attempt <= config.maxRetries) {
      attempt++;
      try {
        const result = await attemptPaymentProcessing(paymentData, config.timeout);
        
        // 4. Generate receipt
        const receipt = generateReceipt({
          ...paymentData,
          transactionId: result.transactionId,
          processedAt: new Date().toISOString()
        });

        console.log(`Payment processed successfully for order ${paymentData.orderId}`);
        return {
          success: true,
          transactionId: result.transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          method: paymentData.method.type,
          fraudScore: fraudCheck.score,
          receipt: receipt,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        lastError = error;
        if (!config.retryOnDecline || attempt >= config.maxRetries) break;
        console.log(`Retrying payment (attempt ${attempt + 1})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
      }
    }

    throw lastError || new Error('Payment processing failed');

  } catch (error) {
    console.error(`Payment failed for order ${paymentData.orderId}:`, error.message);
    
    // Log failed payment attempt
    await logPaymentAttempt(paymentData, false, error.message);

    return {
      success: false,
      orderId: paymentData.orderId,
      error: error.message,
      errorCode: getErrorCode(error),
      timestamp: new Date().toISOString()
    };
  }
}

// Helper functions

function validatePaymentMethod(method) {
  const validTypes = ['credit_card', 'paypal', 'bank_transfer', 'crypto'];
  if (!validTypes.includes(method.type)) {
    throw new Error(`Invalid payment method: ${method.type}`);
  }

  if (method.type === 'credit_card') {
    if (!method.cardNumber || !method.expiry || !method.cvv) {
      throw new Error('Credit card details incomplete');
    }
    if (method.cardNumber.replace(/\s/g, '').length !== 16) {
      throw new Error('Invalid credit card number');
    }
  }
}

async function runFraudChecks(paymentData) {
  console.log('Running fraud checks...');
  // Mock fraud detection - would integrate with services like Stripe Radar or Sift
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const riskScore = Math.random() * 100;
  const riskLevel = riskScore > 80 ? 'high' : riskScore > 50 ? 'medium' : 'low';
  
  return {
    score: riskScore,
    riskLevel: riskLevel,
    indicators: riskLevel !== 'low' ? ['unusual_amount', 'new_customer'] : []
  };
}

async function attemptPaymentProcessing(paymentData, timeout) {
  console.log(`Attempting ${paymentData.method.type} payment...`);
  
  // Simulate processing delay and potential failure
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Simulate 5% chance of timeout
      if (Math.random() < 0.05) {
        reject(new Error('Payment processing timeout'));
      } else {
        resolve();
      }
    }, timeout * 0.8); // Use 80% of timeout for simulated processing

    // Simulate 10% chance of payment decline
    setTimeout(() => {
      clearTimeout(timer);
      if (Math.random() < 0.1) {
        reject(new Error('Payment declined by issuer'));
      } else {
        resolve();
      }
    }, Math.random() * timeout * 0.7);
  });

  // If we get here, payment was successful
  return {
    transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    processorResponse: 'approved'
  };
}

function generateReceipt(paymentInfo) {
  return {
    id: `RCPT-${paymentInfo.transactionId}`,
    orderId: paymentInfo.orderId,
    amount: paymentInfo.amount,
    currency: paymentInfo.currency,
    method: paymentInfo.method.type,
    date: paymentInfo.processedAt,
    items: [
      {
        description: `Payment for order ${paymentInfo.orderId}`,
        amount: paymentInfo.amount
      }
    ]
  };
}

async function logPaymentAttempt(paymentData, success, errorMessage = null) {
  // Would store in database in real implementation
  console.log(`Logged payment attempt: Order ${paymentData.orderId} - ${
    success ? 'Success' : 'Failed: ' + errorMessage
  }`);
}

function getErrorCode(error) {
  const errorMap = {
    'timeout': 'PT001',
    'declined': 'PD001',
    'fraud': 'PF001',
    'invalid': 'PI001'
  };
  
  for (const [keyword, code] of Object.entries(errorMap)) {
    if (error.message.toLowerCase().includes(keyword)) return code;
  }
  return 'PE001'; // General error code
}

module.exports = { processPayment };
