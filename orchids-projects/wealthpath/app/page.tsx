import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getEnabledHomepageSections } from '@/app/actions/homepage'
import { getFeaturedDeals } from '@/app/actions/deals'
import { getTrendingDestinations } from '@/app/actions/destinations'
import { getFeaturedBlogPosts } from '@/app/actions/blog'
import { getFeaturedTestimonials } from '@/app/actions/testimonials'
import { getFaqs } from '@/app/actions/faqs'

// DB-driven sections
import AnnouncementBar from '@/components/sections/announcement-bar'
import HeroSection from '@/components/sections/hero-section'
import FeaturedDeals from '@/components/sections/featured-deals'
import TrendingDestinations from '@/components/sections/trending-destinations'
import BlogPreview from '@/components/sections/blog-preview'
import TestimonialsSection from '@/components/sections/testimonials-section'
import FaqSection from '@/components/sections/faq-section'
import PartnerLogos from '@/components/sections/partner-logos'
import NewsletterSection from '@/components/sections/newsletter-section'
import TravelPlannerCta from '@/components/sections/travel-planner-cta'
import TravelCalculator from '@/components/sections/travel-calculator'
import CurrencyConverter from '@/components/sections/currency-converter'
import PackingChecklist from '@/components/sections/packing-checklist'

// Legacy static sections
import { FeaturedCategories } from '@/components/sections/featured-categories'
import { TrendingPrograms } from '@/components/sections/trending-programs'
import { EditorsPicks } from '@/components/sections/editors-picks'
import { LatestReviews } from '@/components/sections/latest-reviews'
import { BestComparisons } from '@/components/sections/best-comparisons'

export default async function HomePage() {
  const [sections, deals, destinations, posts, testimonials, faqs] = await Promise.all([
    getEnabledHomepageSections().catch(() => []),
    getFeaturedDeals().catch(() => []),
    getTrendingDestinations().catch(() => []),
    getFeaturedBlogPosts(6).catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getFaqs().catch(() => []),
  ])

  const sectionMap = Object.fromEntries(sections.map((s) => [s.key, s]))
  const cfg = (key: string) => ((sectionMap[key]?.config as Record<string, unknown>) ?? {})
  const on = (key: string) => Boolean(sectionMap[key])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {on('announcement_bar') && (
          <AnnouncementBar config={cfg('announcement_bar') as { text?: string; link?: string; cta?: string }} />
        )}
        {on('hero') && <HeroSection config={cfg('hero') as { headline?: string; subheading?: string }} />}
        {on('featured_categories') && <FeaturedCategories />}
        {on('featured_deals') && (
          <FeaturedDeals deals={deals} config={cfg('featured_deals') as { title?: string; subtitle?: string }} />
        )}
        {on('trending_destinations') && (
          <TrendingDestinations
            destinations={destinations}
            config={cfg('trending_destinations') as { title?: string; subtitle?: string }}
          />
        )}
        {on('trending_programs') && <TrendingPrograms />}
        {on('editors_picks') && <EditorsPicks />}
        {on('travel_planner_cta') && (
          <TravelPlannerCta config={cfg('travel_planner_cta') as { title?: string; subtitle?: string }} />
        )}
        {on('travel_calculator') && (
          <TravelCalculator config={cfg('travel_calculator') as { title?: string; subtitle?: string }} />
        )}
        {on('currency_converter') && (
          <CurrencyConverter config={cfg('currency_converter') as { title?: string; subtitle?: string }} />
        )}
        {on('packing_checklist') && (
          <PackingChecklist config={cfg('packing_checklist') as { title?: string; subtitle?: string }} />
        )}
        {on('latest_reviews') && <LatestReviews />}
        {on('best_comparisons') && <BestComparisons />}
        {on('travel_news') && (
          <BlogPreview posts={posts} config={cfg('travel_news') as { title?: string; subtitle?: string }} />
        )}
        {on('partner_logos') && (
          <PartnerLogos config={cfg('partner_logos') as { title?: string }} />
        )}
        {on('testimonials') && (
          <TestimonialsSection
            testimonials={testimonials}
            config={cfg('testimonials') as { title?: string; subtitle?: string }}
          />
        )}
        {on('faq') && (
          <FaqSection faqs={faqs} config={cfg('faq') as { title?: string }} />
        )}
        {on('newsletter') && (
          <NewsletterSection config={cfg('newsletter') as { title?: string; subtitle?: string }} />
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
