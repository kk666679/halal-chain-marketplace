/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'halal-chain.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for the "Module not found: Can't resolve 'fs'" error
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

    // Add polyfills for web3 and other blockchain libraries
    config.plugins.push(
      new config.webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    );

    // Resolve monorepo workspace packages
    config.resolve.modules = [
      ...config.resolve.modules,
      'node_modules',
      'apps/backend/node_modules',
    ];

    return config;
  },
  // Increase the memory limit for the build process
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
    esmExternals: 'loose', // Help with ESM compatibility issues
  },
  transpilePackages: [
    'react-icons',
    'lucide-react',
    '@openzeppelin/contracts',
  ],
};

module.exports = nextConfig;