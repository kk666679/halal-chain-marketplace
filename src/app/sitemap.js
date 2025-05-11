export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://halal-chain.com';
  
  // Define your main routes
  const routes = [
    '',
    '/about',
    '/blog',
    '/certification',
    '/contact',
    '/dashboard',
    '/download',
    '/help',
    '/integrations',
    '/login',
    '/marketplace',
    '/register',
    '/supply-chain',
    '/vendor',
    '/verify',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}