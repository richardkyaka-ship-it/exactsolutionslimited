import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import Preloader from '@/components/Preloader'
import { SWRProvider } from '@/components/providers/SWRProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Exact Solutions Limited - Under Development',
  description: 'Exact Solutions Limited - Website Under Development',
  // Next.js 14 automatically detects icon.svg in app directory
  // No need to manually configure if file is named icon.svg and in app/
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-inter antialiased bg-black text-white min-h-screen overflow-x-hidden`} suppressHydrationWarning>
        <SWRProvider>
          <Preloader />
          <Navigation />
          <main className="relative">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </SWRProvider>
      </body>
    </html>
  )
}
