// This file is used to redirect to the Next.js application
// It's useful for platforms that expect a traditional Node.js entry point

console.log('Starting Halal Chain Marketplace...');

// Check if we're in development or production
if (process.env.NODE_ENV === 'production') {
  // In production, use the Next.js server
  require('./.next/standalone/server.js');
} else {
  // In development, use the Next.js dev command
  const { spawn } = require('child_process');
  const nextDev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  nextDev.on('close', (code) => {
    console.log(`Next.js dev process exited with code ${code}`);
    process.exit(code);
  });
}