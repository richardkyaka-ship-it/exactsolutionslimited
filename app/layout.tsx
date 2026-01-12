import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import Preloader from '@/components/Preloader'
import { SWRProvider } from '@/components/providers/SWRProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { validateEnvironment } from '@/lib/env'
import { OrganizationStructuredData } from '@/components/seo/StructuredData'

// Validate environment on server startup
try {
  validateEnvironment();
} catch (error) {
  // In production, we might want to continue with degraded functionality
  if (process.env.NODE_ENV === 'production') {
    console.error('Environment validation failed in production:', error);
    // Continue, but certain features will be disabled
  } else {
    // In development, fail fast with clear error message
    throw error;
  }
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Exact Solutions Limited | Industrial Equipment Kenya',
    template: '%s | Exact Solutions Limited'
  },
  description: 'Premium industrial solutions provider in Kenya: generators, shipping containers, metal fabrication, and custom industrial equipment.',
  keywords: [
    'industrial equipment Kenya',
    'generators Nairobi',
    'shipping containers Kenya',
    'metal fabrication Nairobi',
    'industrial solutions Kenya',
    'power generators East Africa',
    'reefer containers Mombasa',
    'aluminum fabrication Kenya',
    'stainless steel work Kenya',
    'B2B industrial supplier'
  ].join(', '),
  authors: [{ name: 'Exact Solutions Limited' }],
  creator: 'Exact Solutions Limited',
  publisher: 'Exact Solutions Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://exactsolutions.co.ke'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://exactsolutions.co.ke',
    siteName: 'Exact Solutions Limited',
    title: 'Exact Solutions Limited | Industrial Equipment Kenya',
    description: 'Premium industrial solutions provider in Kenya',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exact Solutions Limited - Industrial Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exact Solutions Limited | Industrial Equipment Kenya',
    description: 'Premium industrial solutions provider in Kenya',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var path = window.location.pathname;
                  var isAdmin = path.startsWith('/admin');
                  if (isAdmin) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#1a1a1a';
                  } else {
                    var theme = localStorage.getItem('theme');
                    var shouldBeDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    if (shouldBeDark) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-light dark:bg-dark text-light-text dark:text-dark-text-primary min-h-screen overflow-x-hidden`} suppressHydrationWarning>
        <OrganizationStructuredData />
        <ThemeProvider>
          <SWRProvider>
            <Preloader />
            <Navigation />
            <main className="relative">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
