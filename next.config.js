/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['halal-chain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.halal-chain.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/halal-chain-marketplace',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;