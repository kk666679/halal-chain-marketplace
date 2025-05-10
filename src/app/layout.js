import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://halal-chain.com'),
  title: {
    default: 'HalalChain Marketplace - Blockchain-Powered Halal Certification Platform',
    template: '%s | HalalChain Marketplace'
  },
  description: 'A blockchain-powered halal certification and supply chain platform with AI-powered multi-agent system for transparent and authentic halal products.',
  keywords: ['halal', 'blockchain', 'certification', 'supply chain', 'AI', 'neural interface', 'quantum computing'],
  authors: [{ name: 'HalalChain Team' }],
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
      'ar-SA': '/ar-SA'
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        
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
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}