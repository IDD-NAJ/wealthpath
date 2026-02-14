"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from "lucide-react"
import type { Article } from "@/lib/data"

interface ArticleContentProps {
  article: Article
  categoryName?: string
}

function renderContent(content: string, inlineLinks: Article["inlineLinks"]) {
  const paragraphs = content.split("\n\n")

  return paragraphs.map((paragraph, pIdx) => {
    const trimmed = paragraph.trim()
    if (!trimmed) return null

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={pIdx}
          className="mb-4 mt-10 font-serif text-2xl font-bold text-foreground first:mt-0"
        >
          {trimmed.replace("## ", "")}
        </h2>
      )
    }

    let segments: React.ReactNode[] = [trimmed]

    inlineLinks.forEach((link) => {
      const newSegments: React.ReactNode[] = []
      segments.forEach((seg) => {
        if (typeof seg !== "string") {
          newSegments.push(seg)
          return
        }
        const parts = seg.split(link.text)
        parts.forEach((part, i) => {
          if (part) newSegments.push(part)
          if (i < parts.length - 1) {
            newSegments.push(
              <a
                key={`${link.id}-${i}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                title={link.description || link.text}
              >
                {link.text}
                <ExternalLink className="inline h-3 w-3 flex-shrink-0" />
              </a>
            )
          }
        })
      })
      segments = newSegments
    })

    return (
      <p key={pIdx} className="mb-6 text-base leading-relaxed text-muted-foreground">
        {segments}
      </p>
    )
  })
}

export function ArticleContent({ article, categoryName }: ArticleContentProps) {
  return (
    <article className="min-w-0">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <header className="mb-10">
        {categoryName && (
          <Link
            href={`/category/${article.category}`}
            className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            {categoryName}
          </Link>
        )}
        <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl text-balance">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(article.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </span>
        </div>
      </header>

      <div className="prose-custom">
        {renderContent(article.content, article.inlineLinks)}
      </div>
    </article>
  )
}
