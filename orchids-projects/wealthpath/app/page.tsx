import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedArticles } from "@/components/featured-articles"
import { LatestArticles } from "@/components/latest-articles"
import { CategoriesOverview } from "@/components/categories-overview"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedArticles />
        <CategoriesOverview />
        <LatestArticles />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
