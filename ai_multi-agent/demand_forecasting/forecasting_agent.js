/**
 * Forecasts product demand based on historical data and seasonal trends
 * @param {Array} historicalData - Array of historical sales data
 * @param {Object} options - Configuration options
 * @param {number} [options.periods=12] - Number of periods to forecast
 * @param {number} [options.seasonality=12] - Seasonal cycle length
 * @param {number} [options.alpha=0.3] - Smoothing factor for level
 * @param {number} [options.beta=0.2] - Smoothing factor for trend
 * @param {number} [options.gamma=0.1] - Smoothing factor for seasonality
 * @returns {Object} - Forecast results with predicted values and metrics
 */
function forecastDemand(historicalData = [], options = {}) {
  console.log("Forecasting demand...");
  
  // Default options
  const {
    periods = 12,
    seasonality = 12,
    alpha = 0.3,
    beta = 0.2,
    gamma = 0.1
  } = options;

  // Validate input
  if (!Array.isArray(historicalData) || historicalData.length < 2) {
    throw new Error("Historical data must be an array with at least 2 data points");
  }

  if (historicalData.length < seasonality) {
    console.warn("Warning: Historical data is shorter than the seasonality period");
  }

  // Triple Exponential Smoothing (Holt-Winters method)
  const forecast = [];
  const seasons = Math.ceil(historicalData.length / seasonality);
  const seasonalIndices = Array(seasonality).fill(1);

  // Initial level, trend and seasonal indices
  let level = historicalData[0];
  let trend = (historicalData[1] - historicalData[0]) / 2;

  // Calculate initial seasonal indices
  for (let i = 0; i < seasonality; i++) {
    let sum = 0;
    for (let j = 0; j < seasons; j++) {
      const index = j * seasonality + i;
      if (index < historicalData.length) {
        sum += historicalData[index];
      }
    }
    seasonalIndices[i] = sum / seasons / (historicalData.reduce((a, b) => a + b, 0) / seasonality;
  }

  // Generate forecast
  for (let i = 0; i < periods; i++) {
    const seasonIndex = (historicalData.length + i) % seasonality;
    const prediction = (level + trend) * seasonalIndices[seasonIndex];
    forecast.push(prediction);

    // Update model parameters
    const currentIndex = historicalData.length + i;
    if (currentIndex < historicalData.length) {
      const observed = historicalData[currentIndex];
      const prevLevel = level;
      level = alpha * (observed / seasonalIndices[seasonIndex]) + (1 - alpha) * (level + trend);
      trend = beta * (level - prevLevel) + (1 - beta) * trend;
      seasonalIndices[seasonIndex] = gamma * (observed / (prevLevel + trend)) + (1 - gamma) * seasonalIndices[seasonIndex];
    }
  }

  // Calculate accuracy metrics
  const lastObserved = historicalData.slice(-seasonality);
  const lastForecast = forecast.slice(-seasonality);
  const errors = lastObserved.map((o, i) => o - lastForecast[i]);
  const mae = errors.reduce((sum, err) => sum + Math.abs(err), 0) / errors.length;
  const mse = errors.reduce((sum, err) => sum + err * err, 0) / errors.length;

  const result = {
    forecast,
    metrics: {
      MAE: mae,
      MSE: mse,
      RMSE: Math.sqrt(mse),
    },
    parameters: {
      method: "Holt-Winters Triple Exponential Smoothing",
      periods,
      seasonality,
      alpha,
      beta,
      gamma
    }
  };

  console.log("Demand forecast completed");
  console.log(`Next ${periods} periods forecast:`, forecast);
  console.log("Accuracy metrics:", result.metrics);

  return result;
}

module.exports = { forecastDemand };
