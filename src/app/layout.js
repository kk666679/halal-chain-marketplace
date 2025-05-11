import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import { Providers } from './providers';
import Script from 'next/script';
import SimpleChatbotWidget from '@/components/SimpleChatbotWidget';

// Font configuration with fallbacks
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

// Enhanced metadata for better SEO
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://halal-chain.com'),
  title: {
    default: 'HalalChain Marketplace - Blockchain-Powered Halal Certification Platform',
    template: '%s | HalalChain Marketplace'
  },
  description: 'A blockchain-powered halal certification and supply chain platform with AI-powered multi-agent system for transparent and authentic halal products.',
  keywords: ['halal', 'blockchain', 'certification', 'supply chain', 'AI', 'neural interface', 'quantum computing', 'halal verification', 'ethical sourcing'],
  authors: [{ name: 'HalalChain Team', url: 'https://halal-chain.com/team' }],
  creator: 'HalalChain',
  publisher: 'HalalChain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'HalalChain Marketplace',
    title: 'HalalChain Marketplace - Blockchain-Powered Halal Certification Platform',
    description: 'A blockchain-powered halal certification and supply chain platform with AI-powered multi-agent system for transparent and authentic halal products.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HalalChain Marketplace'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HalalChain Marketplace - Blockchain-Powered Halal Certification Platform',
    description: 'A blockchain-powered halal certification and supply chain platform with AI-powered multi-agent system for transparent and authentic halal products.',
    images: ['/images/og-image.jpg'],
    creator: '@HalalChain'
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-SA': '/ar-SA',
      'ms-MY': '/ms-MY',
      'id-ID': '/id-ID'
    }
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
          <SimpleChatbotWidget />
        </Providers>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `}
        </Script>
      </body>
    </html>
  );
}