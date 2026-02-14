import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MessageSquare, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - WealthPath",
  description: "Get in touch with the WealthPath team. We welcome your questions, suggestions, and feedback.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-primary px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              Get in Touch
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/60">
              Have a question, suggestion, or want to contribute? We would love to hear from you.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              <ContactForm />

              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Mail className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Email Us</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Send us an email and we will get back to you promptly.
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        hello@wealthpath.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <MessageSquare className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Content Suggestions</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Have a topic you would like us to cover? Let us know and we will consider it for future articles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Clock className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Response Time</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We typically respond within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
