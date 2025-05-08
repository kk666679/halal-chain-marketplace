module.exports = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self' *.halal-chain.com"
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            }
          ]
        }
      ]
    }
  }