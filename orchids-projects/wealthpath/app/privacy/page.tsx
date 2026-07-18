import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: July 18, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                WealthPath ("we," "us," "our," or "Company") operates the wealthpath.com website. This page informs you of
                our policies regarding the collection, use, and disclosure of personal data when you use our Service and
                the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">2. Information Collection and Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our Service
                to you.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="text-muted-foreground leading-relaxed space-y-2">
                <li>• Email address</li>
                <li>• Cookies and Usage Data</li>
                <li>• Browser type and version</li>
                <li>• Pages visited and time spent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">3. Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                WealthPath uses the collected data for various purposes:
              </p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 mt-3">
                <li>• To provide and maintain our Service</li>
                <li>• To notify you about changes to our Service</li>
                <li>• To allow you to participate in interactive features</li>
                <li>• To provide customer support</li>
                <li>• To gather analysis or valuable information so we can improve our Service</li>
                <li>• To monitor the usage of our Service</li>
                <li>• To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our Service and hold certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">5. Security of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at support@wealthpath.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
