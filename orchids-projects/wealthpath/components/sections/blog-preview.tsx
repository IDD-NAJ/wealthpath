'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string
  author: string
  category: string
  tags: string[]
  readTimeMinutes: number
  publishedAt: string | Date | null
}

interface BlogPreviewProps {
  posts: BlogPost[]
  config?: { title?: string; subtitle?: string }
}

export default function BlogPreview({ posts, config = {} }: BlogPreviewProps) {
  if (!posts.length) return null
  const { title = 'Travel & Finance Insights', subtitle = 'Expert guides, tips, and destination reviews' } = config

  return (
    <section className="bg-secondary/20 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal" />
              <span className="text-sm font-semibold uppercase tracking-widest text-teal">
                From the Blog
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80 md:flex"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-0.5 text-xs font-semibold text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-2 font-semibold text-foreground leading-snug group-hover:text-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Read more articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
