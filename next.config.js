/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure output for better deployment
  output: 'standalone',
  // Increase memory limit for large builds
  experimental: {
    typedRoutes: true,
    largePageDataBytes: 256 * 1000, // 256KB
    serverComponentsExternalPackages: ['ethers'],
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
  // Improved image optimization
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;