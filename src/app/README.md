# HalalChain Marketplace App Directory

This directory contains the main application code for the HalalChain Marketplace, built with Next.js App Router.

## Directory Structure

- `app/` - Main application directory using Next.js App Router
  - `api/` - API routes for server-side functionality
  - `(auth)/` - Authentication-related pages (login, register, etc.)
  - `dashboard/` - Dashboard pages for users, vendors, and admins
  - `marketplace/` - Marketplace-related pages
  - `certification/` - Certification-related pages
  - `supply-chain/` - Supply chain tracking and verification pages
  - `layout.js` - Root layout component
  - `page.js` - Homepage component
  - `providers.js` - Context providers for the application
  - `globals.css` - Global CSS styles
  - `not-found.js` - 404 page
  - `error.js` - Error handling page
  - `loading.js` - Loading state component
  - `sitemap.js` - Dynamic sitemap generation
  - `robots.js` - Robots.txt configuration

## Key Features

- **App Router**: Utilizes Next.js App Router for file-based routing
- **Server Components**: Leverages React Server Components for improved performance
- **API Routes**: Implements API routes for server-side functionality
- **Authentication**: Includes authentication with NextAuth.js
- **Data Fetching**: Uses React Query for efficient data fetching and caching
- **Theming**: Supports light and dark mode with next-themes
- **SEO**: Includes metadata, sitemap, and robots.txt for improved SEO

## Best Practices

- Use Server Components by default for better performance
- Add 'use client' directive only when client-side interactivity is needed
- Implement proper error boundaries and loading states
- Follow the naming conventions for special files (layout, page, loading, error, etc.)
- Use metadata exports for SEO optimization
- Implement proper caching strategies with revalidation

## Development Guidelines

1. Create new routes by adding directories with `page.js` files
2. Use layouts for shared UI across multiple pages
3. Implement error handling with `error.js` files
4. Add loading states with `loading.js` files
5. Use server actions for form submissions when possible
6. Leverage route groups with parentheses for organizational purposes