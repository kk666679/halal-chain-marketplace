/**
 * Analyzes supplier performance with comprehensive metrics and scoring
 * @param {string|Array} supplierIds - Single supplier ID or array of IDs to analyze
 * @param {Object} [options] - Analysis options
 * @param {string} [options.timeRange='last90days'] - Time range for analysis
 * @param {Array} [options.metrics=['quality', 'delivery', 'cost']] - Metrics to include
 * @param {boolean} [options.compareIndustry=false] - Compare against industry benchmarks
 * @returns {Promise<Object>} - Supplier performance analysis
 */
async function analyzeSupplier(supplierIds, options = {}) {
  // Validate inputs
  if (!supplierIds || (Array.isArray(supplierIds) && supplierIds.length === 0)) {
    throw new Error('At least one supplier ID must be provided');
  }

  const config = {
    timeRange: options.timeRange || 'last90days',
    metrics: options.metrics || ['quality', 'delivery', 'cost'],
    compareIndustry: options.compareIndustry || false,
    includeDetails: options.includeDetails !== false
  };

  const isMulti = Array.isArray(supplierIds);
  console.log(`Analyzing ${isMulti ? supplierIds.length + ' suppliers' : 'supplier ' + supplierIds}...`);

  try {
    // 1. Get raw supplier data
    const supplierData = await fetchSupplierData(supplierIds, config.timeRange);

    // 2. Calculate performance metrics
    const analysis = isMulti 
      ? await analyzeMultipleSuppliers(supplierData, config)
      : await analyzeSingleSupplier(supplierData, config);

    // 3. Add industry benchmarks if requested
    if (config.compareIndustry) {
      analysis.benchmarks = await getIndustryBenchmarks(config.metrics);
    }

    // 4. Generate recommendations
    analysis.recommendations = generateRecommendations(analysis);

    console.log(`Supplier analysis completed for ${analysis.supplierCount} suppliers`);
    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...analysis
    };

  } catch (error) {
    console.error('Supplier analysis failed:', error.message);
    return {
      success: false,
      error: error.message,
      errorCode: 'SUP_ANALYSIS_FAILED',
      timestamp: new Date().toISOString()
    };
  }
}

// Core analysis functions
async function analyzeSingleSupplier(data, config) {
  const metrics = calculateMetrics(data, config);
  const score = calculateOverallScore(metrics);

  return {
    supplierId: data.supplierId,
    supplierName: data.supplierName,
    timeRange: config.timeRange,
    score: score,
    metrics: metrics,
    grade: calculateGrade(score),
    ...(config.includeDetails && { details: getDetailedAnalysis(data) })
  };
}

async function analyzeMultipleSuppliers(data, config) {
  const results = [];
  let topScore = 0;
  let topSupplier = null;

  for (const supplier of data) {
    const analysis = await analyzeSingleSupplier(supplier, config);
    results.push(analysis);
    
    if (analysis.score > topScore) {
      topScore = analysis.score;
      topSupplier = analysis.supplierId;
    }
  }

  return {
    supplierCount: results.length,
    topPerformer: topSupplier,
    averageScore: calculateAverageScore(results),
    suppliers: results,
    comparison: compareSuppliers(results)
  };
}

// Metric calculations
function calculateMetrics(data, config) {
  const metrics = {};
  
  if (config.metrics.includes('quality')) {
    metrics.quality = {
      score: calculateQualityScore(data.qualityReports),
      defectRate: data.defectRate,
      returnRate: data.returnRate,
      inspectionsPassed: data.inspectionsPassed
    };
  }

  if (config.metrics.includes('delivery')) {
    metrics.delivery = {
      score: calculateDeliveryScore(data.shipments),
      onTimeRate: data.onTimeDeliveryRate,
      averageDelay: data.averageDelayDays,
      completeness: data.orderCompleteness
    };
  }

  if (config.metrics.includes('cost')) {
    metrics.cost = {
      score: calculateCostScore(data.pricingHistory),
      priceStability: data.priceVariance,
      costReduction: data.annualCostReduction,
      valueIndex: data.valueForMoney
    };
  }

  return metrics;
}

function calculateOverallScore(metrics) {
  const weights = {
    quality: 0.4,
    delivery: 0.35,
    cost: 0.25
  };

  return Object.entries(metrics).reduce((total, [metric, data]) => {
    return total + (data.score * weights[metric]);
  }, 0);
}

// Helper functions
async function fetchSupplierData(supplierIds, timeRange) {
  console.log(`Fetching data for ${Array.isArray(supplierIds) ? supplierIds.length : 1} suppliers`);
  
  // Simulate API/database calls
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const isMulti = Array.isArray(supplierIds);
  const mockData = {
    supplierId: isMulti ? supplierIds[0] : supplierIds,
    supplierName: `Supplier ${Math.floor(Math.random() * 1000)}`,
    qualityReports: generateQualityReports(timeRange),
    shipments: generateShipmentData(timeRange),
    pricingHistory: generatePricingHistory(timeRange)
  };

  if (isMulti) {
    return supplierIds.map(id => ({
      ...mockData,
      supplierId: id,
      supplierName: `Supplier ${id.substring(id.length - 3)}`
    }));
  }
  
  return mockData;
}

function generateQualityReports(timeRange) {
  // Generate mock quality data
  return {
    defectRate: Math.random() * 0.1, // 0-10%
    returnRate: Math.random() * 0.05, // 0-5%
    inspectionsPassed: Math.floor(Math.random() * 100)
  };
}

function generateShipmentData(timeRange) {
  // Generate mock delivery data
  return {
    onTimeDeliveryRate: 0.8 + Math.random() * 0.2, // 80-100%
    averageDelayDays: Math.random() * 2,
    orderCompleteness: 0.9 + Math.random() * 0.1 // 90-100%
  };
}

function generatePricingHistory(timeRange) {
  // Generate mock cost data
  return {
    priceVariance: Math.random() * 0.15, // 0-15%
    annualCostReduction: Math.random() * 0.1, // 0-10%
    valueForMoney: 0.7 + Math.random() * 0.3 // 70-100%
  };
}

function calculateQualityScore(data) {
  return 100 * (0.6 * (1 - data.defectRate) + 0.3 * (1 - data.returnRate) + 0.1 * (data.inspectionsPassed / 100));
}

function calculateDeliveryScore(data) {
  return 100 * (0.5 * data.onTimeDeliveryRate + 0.3 * (1 - (data.averageDelay / 5)) + 0.2 * data.orderCompleteness);
}

function calculateCostScore(data) {
  return 100 * (0.4 * (1 - data.priceVariance) + 0.3 * data.annualCostReduction + 0.3 * data.valueForMoney);
}

function calculateGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function calculateAverageScore(results) {
  return results.reduce((sum, r) => sum + r.score, 0) / results.length;
}

function compareSuppliers(results) {
  // Generate comparative analysis
  return {
    qualityRange: calculateMetricRange(results, 'quality'),
    deliveryRange: calculateMetricRange(results, 'delivery'),
    costRange: calculateMetricRange(results, 'cost')
  };
}

function calculateMetricRange(results, metric) {
  const values = results.map(r => r.metrics[metric].score);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    average: values.reduce((sum, v) => sum + v, 0) / values.length
  };
}

async function getIndustryBenchmarks(metrics) {
  // Simulate fetching industry data
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const benchmarks = {};
  if (metrics.includes('quality')) {
    benchmarks.quality = {
      averageDefectRate: 0.08,
      topQuartileDefectRate: 0.03
    };
  }
  if (metrics.includes('delivery')) {
    benchmarks.delivery = {
      averageOnTimeRate: 0.85,
      topQuartileOnTimeRate: 0.95
    };
  }
  if (metrics.includes('cost')) {
    benchmarks.cost = {
      averagePriceVariance: 0.12,
      topQuartilePriceVariance: 0.05
    };
  }
  return benchmarks;
}

function generateRecommendations(analysis) {
  const recs = [];
  
  if (analysis.grade === 'F') {
    recs.push('Consider replacing this supplier');
  } else if (analysis.grade === 'D') {
    recs.push('Require improvement plan from supplier');
  }
  
  if (analysis.metrics.quality?.score < 70) {
    recs.push('Implement additional quality inspections');
  }
  
  if (analysis.metrics.delivery?.score < 75) {
    recs.push('Negotiate better delivery terms or add penalties');
  }
  
  if (analysis.metrics.cost?.score > 85) {
    recs.push('Consider increasing order volume with this supplier');
  }
  
  return recs.length > 0 ? recs : ['Supplier meets all performance standards'];
}

module.exports = { analyzeSupplier };
