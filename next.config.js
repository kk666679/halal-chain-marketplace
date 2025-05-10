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
  webpack: (config) => {
    // This is needed for the markdown processing
    config.resolve.fallback = { fs: false };
    return config;
  },
  // Increase the memory limit for the build process
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },
};

module.exports = nextConfig;