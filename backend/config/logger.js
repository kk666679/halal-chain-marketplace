/**
 * Logger configuration
 * Configures logging for the application
 */

const fs = require('fs');
const path = require('path');
const { NODE_ENV } = require('./env');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Log to file
const logToFile = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta
  };
  
  const logFile = path.join(logsDir, `${level}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

// Log to console
const logToConsole = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  
  let consoleMethod;
  switch (level) {
    case LOG_LEVELS.ERROR:
      consoleMethod = console.error;
      break;
    case LOG_LEVELS.WARN:
      consoleMethod = console.warn;
      break;
    case LOG_LEVELS.DEBUG:
      consoleMethod = console.debug;
      break;
    default:
      consoleMethod = console.log;
  }
  
  consoleMethod(`[${timestamp}] [${level.toUpperCase()}] ${message}`, meta);
};

// Logger function
const logger = {
  error: (message, meta = {}) => {
    logToConsole(LOG_LEVELS.ERROR, message, meta);
    logToFile(LOG_LEVELS.ERROR, message, meta);
  },
  
  warn: (message, meta = {}) => {
    logToConsole(LOG_LEVELS.WARN, message, meta);
    if (NODE_ENV !== 'development') {
      logToFile(LOG_LEVELS.WARN, message, meta);
    }
  },
  
  info: (message, meta = {}) => {
    logToConsole(LOG_LEVELS.INFO, message, meta);
    if (NODE_ENV === 'production') {
      logToFile(LOG_LEVELS.INFO, message, meta);
    }
  },
  
  debug: (message, meta = {}) => {
    if (NODE_ENV === 'development') {
      logToConsole(LOG_LEVELS.DEBUG, message, meta);
    }
  },
  
  // Log API requests
  request: (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
      
      // Log based on status code
      if (res.statusCode >= 500) {
        logger.error(message, { ip: req.ip });
      } else if (res.statusCode >= 400) {
        logger.warn(message, { ip: req.ip });
      } else {
        logger.info(message);
      }
    });
    
    next();
  }
};

module.exports = logger;