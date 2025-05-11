import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define paths that require authentication
  const protectedPaths = [
    '/dashboard',
    '/admin',
    '/vendor/dashboard',
  ];
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(prefix => 
    path.startsWith(prefix)
  );
  
  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // If the path is protected and there is no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.halal-chain.com;"
  );
  
  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico|images/|api/).*)',
  ],
};