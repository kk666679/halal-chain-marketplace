// inventory_agent.js

/**
 * Monitors inventory levels and provides real-time tracking with alerting capabilities
 * @param {string} sku - Stock Keeping Unit to monitor
 * @param {Object} [options] - Configuration options
 * @param {number} [options.threshold=10] - Low inventory threshold
 * @param {number} [options.pollInterval=3600000] - Polling interval in ms (default 1 hour)
 * @param {function} [options.alertCallback] - Function to call when alerts trigger
 * @returns {Object} - Inventory monitoring instance with control methods
 */
function monitorInventory(sku, options = {}) {
  // Configuration with defaults
  const config = {
    threshold: options.threshold || 10,
    pollInterval: options.pollInterval || 3600000, // 1 hour
    alertCallback: options.alertCallback || defaultAlertHandler
  };

  // State tracking
  let inventoryLevel = 0;
  let pollingInterval;
  let isMonitoring = false;

  // Internal functions
  function defaultAlertHandler(level) {
    console.warn(`ALERT: Low inventory for ${sku}! Current level: ${level}`);
  }

  async function checkInventory() {
    try {
      // In a real implementation, this would call your inventory API
      const newLevel = await fetchInventoryLevel(sku);
      
      inventoryLevel = newLevel;
      console.log(`Inventory check for ${sku}: ${inventoryLevel} units`);

      if (inventoryLevel <= config.threshold) {
        config.alertCallback(inventoryLevel);
      }
    } catch (error) {
      console.error(`Failed to check inventory for ${sku}:`, error.message);
    }
  }

  // Public methods
  const instance = {
    /**
     * Start monitoring inventory
     */
    start: function() {
      if (isMonitoring) {
        console.log(`Already monitoring ${sku}`);
        return;
      }

      console.log(`Starting inventory monitoring for ${sku}`);
      isMonitoring = true;
      checkInventory(); // Immediate first check
      pollingInterval = setInterval(checkInventory, config.pollInterval);
    },

    /**
     * Stop monitoring inventory
     */
    stop: function() {
      if (!isMonitoring) return;
      
      console.log(`Stopping inventory monitoring for ${sku}`);
      clearInterval(pollingInterval);
      isMonitoring = false;
    },

    /**
     * Get current inventory level (last fetched value)
     * @returns {number} Current inventory level
     */
    getCurrentLevel: function() {
      return inventoryLevel;
    },

    /**
     * Update monitoring configuration
     * @param {Object} newOptions - New configuration options
     */
    updateConfig: function(newOptions) {
      Object.assign(config, newOptions);
      console.log(`Updated configuration for ${sku}`);
    }
  };

  return instance;
}

// Mock API function - replace with actual inventory service call
async function fetchInventoryLevel(sku) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate varying inventory levels (50 ± random 40)
  return Math.floor(50 + (Math.random() * 40 - 20));
}

module.exports = { monitorInventory };
