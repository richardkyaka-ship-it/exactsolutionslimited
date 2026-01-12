'use client'

import HeroSection from '@/components/home/HeroSection'
import NavigationMatrix from '@/components/home/NavigationMatrix'
import UnifiedProjectsSection from '@/components/home/UnifiedProjectsSection'
import HomeFooter from '@/components/home/HomeFooter'

export default function HomePageClient() {
  return (
    <main className="bg-light dark:bg-dark text-light-text dark:text-dark-text-primary selection:bg-primary/20 selection:text-light-text dark:selection:text-dark-text-primary overflow-x-hidden">
      <HeroSection />
      <NavigationMatrix />
      <UnifiedProjectsSection />
      <HomeFooter />
    </main>
  )
}

