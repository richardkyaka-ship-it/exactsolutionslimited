import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import Preloader from '@/components/Preloader'
import { SWRProvider } from '@/components/providers/SWRProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Exact Solutions Limited - Under Development',
  description: 'Exact Solutions Limited - Website Under Development',
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
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-light dark:bg-dark text-light-text dark:text-dark-text-primary min-h-screen overflow-x-hidden`} suppressHydrationWarning>
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
