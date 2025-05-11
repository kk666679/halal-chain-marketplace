/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  // Configure output for better deployment
  output: 'standalone',
  // Increase memory limit for large builds
  experimental: {
    typedRoutes: true,
    largePageDataBytes: 128 * 1000, // 128KB
  },
  // Configure webpack for polyfills and compatibility
  webpack: (config, { isServer }) => {
    // Fix for module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;