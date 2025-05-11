export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/admin/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://halal-chain.com'}/sitemap.xml`,
  };
}