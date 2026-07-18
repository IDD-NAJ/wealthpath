import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { getPublishedBlogPosts } from '@/app/actions/blog'

export const metadata = {
  title: 'Travel & Finance Blog - WealthPath',
  description: 'Expert tips, destination guides, and financial strategies for savvy travelers.',
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(100)

  const featured = posts.filter((p) => p.featured)
  const recent = posts.filter((p) => !p.featured).slice(0, 12)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Travel & Finance Blog</h1>
            <p className="text-lg text-muted-foreground">
              Expert tips, destination guides, and financial strategies for savvy travelers
            </p>
          </div>

          {featured.length > 0 && (
            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Featured Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featured.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden bg-secondary">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex gap-2">
                        <span className="inline-block rounded-full bg-teal/10 px-2 py-1 text-xs font-medium text-teal">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-teal transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.read_time_minutes} min read
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at || '').toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Latest Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden bg-secondary">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <span className="inline-block w-fit rounded-full bg-teal/10 px-2 py-1 text-xs font-medium text-teal">
                        {post.category}
                      </span>
                      <h3 className="text-sm font-bold text-foreground group-hover:text-teal transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.read_time_minutes} min
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
