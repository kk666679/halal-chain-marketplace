/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Updated for Next.js 15
    serverActions: true,
    typedRoutes: true,
    largePageDataBytes: 128 * 1000, // 128KB
    esmExternals: 'loose', // Help with ESM compatibility issues
  },
  // Ensure proper module resolution
  webpack: (config, { isServer }) => {
    // Fix for module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        os: require.resolve('os-browserify/browser'),
        assert: require.resolve('assert/'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
      };
    }
    
    return config;
  },
}

module.exports = nextConfig