'use client'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Clock, Calendar, User } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getBlogPostBySlug } from '@/app/actions/blog'

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', params.slug],
    queryFn: () => getBlogPostBySlug(params.slug),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 py-16">
          <div className="h-96 bg-secondary/50 rounded-lg animate-pulse" />
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto max-w-2xl px-4 py-16">
          <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-4 py-16">
          {/* Cover image */}
          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 space-y-4 border-b border-border pb-8">
            <div className="inline-block rounded-full bg-teal/10 px-3 py-1 text-sm font-medium text-teal">
              {post.category}
            </div>
            <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.read_time_minutes} min read
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map((line) => {
                    if (line.startsWith('##')) {
                      return `<h2 className="text-2xl font-bold text-foreground mt-8 mb-4">${line.replace(/^##\s?/, '')}</h2>`
                    }
                    if (line.startsWith('###')) {
                      return `<h3 className="text-xl font-bold text-foreground mt-6 mb-3">${line.replace(/^###\s?/, '')}</h3>`
                    }
                    if (line.startsWith('- ')) {
                      return `<li className="text-muted-foreground">${line.replace(/^-\s?/, '')}</li>`
                    }
                    if (line.trim() === '') {
                      return ''
                    }
                    return `<p className="text-muted-foreground leading-relaxed mb-4">${line}</p>`
                  })
                  .join(''),
              }}
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="space-y-4 border-t border-border pt-8">
              <h3 className="font-semibold text-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-block rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground hover:bg-teal/10 hover:text-teal transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
