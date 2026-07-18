import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CheckCircle2, Globe, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
          {/* Hero section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">About WealthPath</h1>
            <p className="text-lg text-muted-foreground">
              WealthPath is a trusted destination for travel deals, affiliate recommendations, and financial tools
              designed to help you explore the world without breaking the bank.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-lg border border-border bg-secondary/50 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe travel and financial wellness should be accessible to everyone. Our mission is to provide
              curated travel deals, expert guides, and affiliate partnerships that empower travelers to make informed
              decisions and maximize their budgets. Whether you're booking your first international flight or planning
              an around-the-world adventure, WealthPath is your companion every step of the way.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: <Globe className="h-6 w-6 text-teal" />,
                  title: 'Global Perspective',
                  desc: 'We curate deals and guides from every corner of the world, celebrating diverse cultures and experiences.',
                },
                {
                  icon: <Zap className="h-6 w-6 text-teal" />,
                  title: 'Innovation',
                  desc: 'We continuously improve our tools, calculators, and resources to give travelers an edge.',
                },
                {
                  icon: <Users className="h-6 w-6 text-teal" />,
                  title: 'Community',
                  desc: 'We believe in transparent partnerships and real reviews from real travelers.',
                },
                {
                  icon: <CheckCircle2 className="h-6 w-6 text-teal" />,
                  title: 'Trust',
                  desc: 'Every deal is verified, every guide is researched, and every recommendation is genuine.',
                },
              ].map((value) => (
                <div key={value.title} className="rounded-lg border border-border p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    {value.icon}
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
            <p className="text-muted-foreground">
              WealthPath is built by travel enthusiasts, finance experts, and technology professionals who are passionate
              about making global exploration accessible to all. Our editorial team spans six continents and speaks over
              20 languages, ensuring our content is authentic and culturally aware.
            </p>
          </div>

          {/* Transparency */}
          <div className="rounded-lg border border-border bg-teal/10 p-8 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Affiliate Disclosure</h2>
            <p className="text-muted-foreground">
              WealthPath earns commissions when you click affiliate links and make purchases or sign up for services.
              This never affects the price you pay — and often allows us to negotiate exclusive discounts not available
              elsewhere. We only recommend products and services we genuinely believe in and have vetted thoroughly.
            </p>
            <p className="text-sm text-muted-foreground">
              Full disclosure: Our affiliate partnerships are how we sustain this platform and continue publishing
              free guides, tools, and deal updates for our community.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-teal px-6 py-3 font-semibold text-white hover:bg-teal/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
