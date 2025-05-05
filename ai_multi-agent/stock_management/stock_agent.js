/**
 * Updates inventory stock levels with transaction support and real-time synchronization
 * @param {Array} updates - Array of stock update operations
 * @param {Object} [options] - Update options
 * @param {boolean} [options.allowNegative=false] - Allow negative stock levels
 * @param {string} [options.reason='restock'] - Reason for update (restock, sale, return, etc.)
 * @param {string} [options.source='system'] - Source of update (system, manual, api)
 * @returns {Promise<Object>} - Stock update result
 */
async function updateStock(updates, options = {}) {
  // Validate inputs
  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error('Invalid updates: must be a non-empty array');
  }

  const config = {
    allowNegative: options.allowNegative || false,
    reason: options.reason || 'restock',
    source: options.source || 'system',
    transactionId: generateTransactionId()
  };

  console.log(`Beginning stock update (${config.transactionId})`);
  console.log(`Reason: ${config.reason}, Source: ${config.source}`);

  try {
    // 1. Validate all updates first
    await validateStockUpdates(updates, config);

    // 2. Process updates in transaction
    const results = await processStockUpdates(updates, config);

    // 3. Log inventory changes
    await logInventoryChanges(results, config);

    // 4. Trigger post-update hooks
    await triggerPostUpdateHooks(results, config);

    console.log(`Successfully updated ${results.length} stock items`);
    return {
      success: true,
      transactionId: config.transactionId,
      updatedItems: results.length,
      timestamp: new Date().toISOString(),
      results: results
    };

  } catch (error) {
    console.error(`Stock update failed (${config.transactionId}):`, error.message);
    
    // Revert any partial updates
    await revertStockUpdates(updates, config);

    return {
      success: false,
      transactionId: config.transactionId,
      error: error.message,
      errorCode: getStockErrorCode(error),
      timestamp: new Date().toISOString()
    };
  }
}

// Helper functions

async function validateStockUpdates(updates, config) {
  console.log('Validating stock updates...');
  
  // Check for duplicate SKUs
  const skus = new Set();
  for (const update of updates) {
    if (!update.sku || !update.quantity) {
      throw new Error('Each update must have sku and quantity');
    }
    
    if (typeof update.quantity !== 'number') {
      throw new Error(`Invalid quantity for SKU ${update.sku}`);
    }
    
    if (skus.has(update.sku)) {
      throw new Error(`Duplicate SKU found: ${update.sku}`);
    }
    skus.add(update.sku);
  }

  // Check current stock levels if we're deducting
  if (!config.allowNegative && config.reason === 'sale') {
    await verifyStockAvailability(updates);
  }
}

async function verifyStockAvailability(updates) {
  // In a real system, this would check current stock levels
  const unavailable = [];
  
  for (const update of updates) {
    if (update.quantity < 0) {
      const currentStock = await getCurrentStock(update.sku);
      if (currentStock < Math.abs(update.quantity)) {
        unavailable.push({
          sku: update.sku,
          requested: Math.abs(update.quantity),
          available: currentStock
        });
      }
    }
  }

  if (unavailable.length > 0) {
    throw new Error(`Insufficient stock for SKUs: ${
      unavailable.map(u => `${u.sku} (${u.available}/${u.requested})`).join(', ')
    }`);
  }
}

async function processStockUpdates(updates, config) {
  const results = [];
  
  for (const update of updates) {
    try {
      // In a real system, this would update the database
      const previousStock = await getCurrentStock(update.sku);
      const newStock = previousStock + update.quantity;
      
      if (!config.allowNegative && newStock < 0) {
        throw new Error(`Negative stock not allowed for ${update.sku}`);
      }

      // Simulate database update
      await simulateStockUpdate(update.sku, newStock);
      
      results.push({
        sku: update.sku,
        previousQuantity: previousStock,
        newQuantity: newStock,
        delta: update.quantity,
        status: 'success'
      });

    } catch (error) {
      results.push({
        sku: update.sku,
        status: 'failed',
        error: error.message
      });
      throw error; // Abort entire transaction on failure
    }
  }
  
  return results;
}

async function logInventoryChanges(results, config) {
  console.log('Logging inventory changes...');
  // Would store in audit log in real system
}

async function triggerPostUpdateHooks(results, config) {
  console.log('Triggering post-update hooks...');
  
  // Example hooks that would be implemented:
  if (config.reason === 'sale') {
    // await triggerLowStockNotifications(results);
  }
  
  if (config.reason === 'restock') {
    // await triggerBackInStockNotifications(results);
  }
}

async function revertStockUpdates(updates, config) {
  console.log('Reverting partial updates...');
  // Would restore previous values in real system
}

function generateTransactionId() {
  return `STK-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function getStockErrorCode(error) {
  const errorMap = {
    'insufficient': 'STK001',
    'negative': 'STK002',
    'invalid': 'STK003',
    'duplicate': 'STK004'
  };
  
  for (const [keyword, code] of Object.entries(errorMap)) {
    if (error.message.toLowerCase().includes(keyword)) return code;
  }
  return 'STK000'; // General error code
}

// Mock database functions
async function getCurrentStock(sku) {
  // Simulate database lookup
  await new Promise(resolve => setTimeout(resolve, 50));
  return Math.floor(Math.random() * 100) + 10; // Random stock between 10-110
}

async function simulateStockUpdate(sku, newQuantity) {
  // Simulate database update
  await new Promise(resolve => setTimeout(resolve, 100));
  // 2% chance of simulated failure
  if (Math.random() < 0.02) {
    throw new Error('Database update failed');
  }
}

module.exports = { updateStock };
