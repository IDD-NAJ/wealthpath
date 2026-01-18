"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Shield, 
  Clock, 
  CreditCard, 
  ArrowRight,
  Star,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your airtime and data credited within seconds of payment confirmation.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Bank-grade encryption protects all your transactions and personal data.",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Buy airtime and data anytime, anywhere. We never close.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Pay with Mobile Money, cards, or your wallet balance.",
  },
]

const stats = [
  { value: "2M+", label: "Transactions" },
  { value: "500K+", label: "Happy Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9", label: "App Rating", icon: Star },
]

const networks = [
  { name: "MTN", color: "#FFCC00", discount: "2%" },
  { name: "Vodafone", color: "#E60000", discount: "2%" },
  { name: "AirtelTigo", color: "#E40046", discount: "3%" },
]

const testimonials = [
  {
    name: "Kwame Asante",
    role: "Business Owner",
    content: "TopUp has made managing airtime for my staff so easy. The bulk purchase feature is a game changer!",
    rating: 5,
  },
  {
    name: "Ama Serwaa",
    role: "Student",
    content: "Best data prices I have found online. The app is super fast and reliable.",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    role: "Freelancer",
    content: "I love how I can schedule recurring purchases. Never run out of data anymore!",
    rating: 5,
  },
]

const faqs = [
  {
    question: "How fast is the delivery?",
    answer: "Most transactions are completed within 5 seconds. In rare cases of network delays, it may take up to 5 minutes.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit cards (Mastercard, Visa), and wallet balance.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes! We use bank-grade encryption and are PCI DSS compliant. We never store your card details.",
  },
  {
    question: "Can I get a refund?",
    answer: "If a transaction fails, your money is automatically refunded to your wallet within minutes.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                <span>Instant airtime & data delivery</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
                Buy Airtime & Data{" "}
                <span className="text-primary">Instantly</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                The fastest way to top up your phone. Purchase airtime and data bundles for MTN, Vodafone, and AirtelTigo with instant delivery and the best rates in Ghana.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                    {stat.icon && <stat.icon className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Networks Section */}
        <section id="networks" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                All Major Networks Supported
              </h2>
              <p className="mt-4 text-muted-foreground">
                Top up any Ghanaian mobile network with the best discounts
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              {networks.map((network) => (
                <Card key={network.name} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
                      style={{ backgroundColor: network.color }}
                    >
                      {network.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{network.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Up to <span className="font-semibold text-accent">{network.discount}</span> discount on data
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Why Choose TopUp?
              </h2>
              <p className="mt-4 text-muted-foreground">
                We make buying airtime and data simple, fast, and affordable
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 bg-muted/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing/CTA Section */}
        <section id="pricing" className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                No hidden fees. No subscription required. Pay only for what you buy.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-center">
                  <div className="text-4xl font-bold text-primary-foreground">0%</div>
                  <p className="mt-2 text-sm text-primary-foreground/80">Platform Fee</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-center">
                  <div className="text-4xl font-bold text-primary-foreground">3%</div>
                  <p className="mt-2 text-sm text-primary-foreground/80">Max Discount</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-center">
                  <div className="text-4xl font-bold text-primary-foreground">Free</div>
                  <p className="mt-2 text-sm text-primary-foreground/80">Account Creation</p>
                </div>
              </div>
              <Button size="lg" variant="secondary" asChild className="mt-10">
                <Link href="/register">
                  Start Saving Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Loved by Ghanaians
              </h2>
              <p className="mt-4 text-muted-foreground">
                See what our customers have to say
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="p-6">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Got questions? We have answers
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join over 500,000 Ghanaians who trust TopUp for their airtime and data needs.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
