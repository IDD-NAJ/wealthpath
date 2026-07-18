import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSection } from '@/components/sections/hero'
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { TrendingPrograms } from '@/components/sections/trending-programs'
import { EditorsPicks } from '@/components/sections/editors-picks'
import { LatestReviews } from '@/components/sections/latest-reviews'
import { BestComparisons } from '@/components/sections/best-comparisons'
import { NewsletterSection } from '@/components/sections/newsletter'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TrendingPrograms />
        <EditorsPicks />
        <LatestReviews />
        <BestComparisons />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
