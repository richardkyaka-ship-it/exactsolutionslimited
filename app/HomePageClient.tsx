'use client'

import HeroSection from '@/components/home/HeroSection'
import NavigationMatrix from '@/components/home/NavigationMatrix'
import ProjectCarousel from '@/components/home/ProjectCarousel'
import ProductsHighlight from '@/components/home/ProductsHighlight'
import ConversionSection from '@/components/home/ConversionSection'
import HomeFooter from '@/components/home/HomeFooter'

export default function HomePageClient() {
  return (
    <main className="bg-black text-white selection:bg-primary selection:text-white overflow-x-hidden">
      <HeroSection />
      <NavigationMatrix />
      <ProjectCarousel />
      <ProductsHighlight />
      <ConversionSection />
      <HomeFooter />
    </main>
  )
}

