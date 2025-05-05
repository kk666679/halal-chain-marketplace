/**
 * Processes customer orders with full inventory, payment, and fulfillment workflow
 * @param {Object} order - The order to process
 * @param {string} order.id - Order ID
 * @param {Array} order.items - Array of order items {sku, quantity, price}
 * @param {Object} order.customer - Customer information
 * @param {Object} order.shipping - Shipping details
 * @param {Object} [options] - Processing options
 * @param {boolean} [options.expressShipping=false] - Whether to use express shipping
 * @param {boolean} [options.giftWrap=false] - Whether to gift wrap the order
 * @returns {Promise<Object>} - Order processing result
 */
async function processOrder(order, options = {}) {
  // Validate order structure
  if (!order?.id || !order.items || !order.customer || !order.shipping) {
    throw new Error('Invalid order structure: missing required fields');
  }

  if (order.items.length === 0) {
    throw new Error('Order contains no items');
  }

  console.log(`Processing order #${order.id} for ${order.customer.name}...`);
  console.log(`${order.items.length} items, ${options.expressShipping ? 'Express' : 'Standard'} shipping`);

  try {
    // 1. Validate and reserve inventory
    const inventoryCheck = await checkInventory(order.items);
    if (!inventoryCheck.available) {
      throw new Error(`Insufficient inventory for SKU: ${inventoryCheck.unavailableItems.join(', ')}`);
    }

    // 2. Calculate totals
    const totals = calculateTotals(order, options);
    console.log(`Order totals: $${totals.total.toFixed(2)}`);

    // 3. Process payment
    const paymentResult = await processPayment({
      orderId: order.id,
      customer: order.customer,
      amount: totals.total,
      paymentMethod: order.paymentMethod
    });

    if (!paymentResult.success) {
      throw new Error(`Payment failed: ${paymentResult.message}`);
    }

    // 4. Generate fulfillment package
    const fulfillment = await createFulfillmentPackage(order, totals, options);

    // 5. Update order status
    await updateOrderStatus(order.id, 'processed', {
      paymentId: paymentResult.paymentId,
      trackingNumber: fulfillment.trackingNumber
    });

    // 6. Send notifications
    await sendNotifications(order, fulfillment, 'order_processed');

    console.log(`Successfully processed order #${order.id}`);
    console.log(`Tracking number: ${fulfillment.trackingNumber}`);

    return {
      success: true,
      orderId: order.id,
      status: 'processed',
      trackingNumber: fulfillment.trackingNumber,
      totals: totals,
      estimatedDelivery: fulfillment.estimatedDelivery,
      items: order.items.map(item => ({
        sku: item.sku,
        quantity: item.quantity,
        status: 'fulfilled'
      }))
    };

  } catch (error) {
    console.error(`Failed to process order #${order.id}:`, error.message);
    
    // Update order status to reflect failure
    await updateOrderStatus(order.id, 'failed', { error: error.message });

    // Restore inventory if payment failed after reservation
    await restoreInventory(order.items);

    return {
      success: false,
      orderId: order.id,
      status: 'failed',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Helper functions (would be implemented properly in a real system)

async function checkInventory(items) {
  console.log('Checking inventory for', items.length, 'items');
  // Mock implementation - in reality would check inventory system
  const unavailable = [];
  for (const item of items) {
    if (Math.random() < 0.05) { // 5% chance of being out of stock
      unavailable.push(item.sku);
    }
  }
  return {
    available: unavailable.length === 0,
    unavailableItems: unavailable
  };
}

function calculateTotals(order, options) {
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = options.expressShipping ? 15.99 : 5.99;
  const tax = subtotal * 0.08; // Example 8% tax
  const giftWrapFee = options.giftWrap ? 3.99 : 0;
  
  return {
    subtotal: subtotal,
    shipping: shippingCost,
    tax: tax,
    giftWrap: giftWrapFee,
    discount: 0, // Could add coupon logic
    total: subtotal + shippingCost + tax + giftWrapFee
  };
}

async function processPayment(paymentDetails) {
  console.log(`Processing payment of $${paymentDetails.amount.toFixed(2)}`);
  // Mock payment processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate 2% chance of payment failure
  if (Math.random() < 0.02) {
    return {
      success: false,
      message: 'Insufficient funds'
    };
  }
  
  return {
    success: true,
    paymentId: `PAY-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
    processedAt: new Date().toISOString()
  };
}

async function createFulfillmentPackage(order, totals, options) {
  console.log('Creating fulfillment package');
  // Mock fulfillment process
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    trackingNumber: `TRK-${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
    carrier: options.expressShipping ? 'FedEx Express' : 'USPS',
    estimatedDelivery: new Date(Date.now() + (options.expressShipping ? 2 : 5) * 24 * 60 * 60 * 1000).toISOString(),
    shippingCost: totals.shipping,
    items: order.items.map(item => item.sku)
  };
}

async function updateOrderStatus(orderId, status, metadata) {
  console.log(`Updating order ${orderId} status to ${status}`);
  // Would update database in real system
}

async function sendNotifications(order, fulfillment, eventType) {
  console.log(`Sending ${eventType} notification to ${order.customer.email}`);
  // Would send email/SMS in real system
}

async function restoreInventory(items) {
  console.log('Restoring inventory for failed order');
  // Would update inventory system in real implementation
}

module.exports = { processOrder };
