import Link from "next/link"
import { ExternalLink, ArrowRight, LinkIcon } from "lucide-react"
import type { Article } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"

interface ArticleSidebarProps {
  article: Article
  relatedArticles: Article[]
}

export function ArticleSidebar({ article, relatedArticles }: ArticleSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
      {article.inlineLinks.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <LinkIcon className="h-4 w-4" />
            Resources in This Article
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {article.inlineLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-md bg-secondary p-3 transition-colors hover:bg-accent"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground group-hover:text-foreground">
                      {link.text}
                    </p>
                    {link.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {link.description}
                      </p>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground">Related Articles</h3>
          <div className="mt-2">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.id} article={related} variant="compact" />
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border bg-primary p-6">
        <h3 className="text-sm font-semibold text-primary-foreground">Manage This Article</h3>
        <p className="mt-2 text-xs leading-relaxed text-primary-foreground/60">
          Add links, edit content, and manage resources through the admin panel.
        </p>
        <Link
          href={`/admin?article=${article.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground/80"
        >
          Open in Admin
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
