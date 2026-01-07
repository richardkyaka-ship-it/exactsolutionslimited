'use client'

import HeroSection from '@/components/home/HeroSection'
import NavigationMatrix from '@/components/home/NavigationMatrix'
import ProjectCarousel from '@/components/home/ProjectCarousel'
import ProductsHighlight from '@/components/home/ProductsHighlight'
import ConversionSection from '@/components/home/ConversionSection'
import HomeFooter from '@/components/home/HomeFooter'

export default function HomePageClient() {
  return (
    <main className="bg-light dark:bg-dark text-light-text dark:text-dark-text-primary selection:bg-primary selection:text-light-text dark:selection:text-dark-text-primary overflow-x-hidden">
      <HeroSection />
      <NavigationMatrix />
      <ProjectCarousel />
      <ProductsHighlight />
      <ConversionSection />
      <HomeFooter />
    </main>
  )
}

