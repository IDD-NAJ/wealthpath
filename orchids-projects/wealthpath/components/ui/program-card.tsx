'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/ui/star-rating'
import { CommissionBadge, ProgramBadge, EditorsBadge } from '@/components/ui/affiliate-badge'
import type { AffiliateProgram } from '@/lib/affiliate-data'

interface ProgramCardProps {
  program: AffiliateProgram
  variant?: 'default' | 'compact' | 'featured'
  index?: number
  className?: string
}

export function ProgramCard({ program, variant = 'default', index = 0, className }: ProgramCardProps) {
  if (variant === 'compact') {
    return <CompactCard program={program} index={index} className={className} />
  }
  if (variant === 'featured') {
    return <FeaturedCard program={program} index={index} className={className} />
  }
  return <DefaultCard program={program} index={index} className={className} />
}

function DefaultCard({ program, index, className }: { program: AffiliateProgram; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-card-hover',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">
            {program.logo}
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-foreground leading-tight">{program.name}</h3>
            <span className="text-xs text-muted-foreground">{program.category}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {program.badge && <ProgramBadge badge={program.badge} />}
          {program.editorsPick && !program.badge && <EditorsBadge />}
        </div>
      </div>

      {/* Rating */}
      <StarRating
        rating={program.rating}
        reviewCount={program.reviewCount}
        size="sm"
        className="mb-3"
      />

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {program.tagline}
      </p>

      {/* Commission badge */}
      <div className="mb-4">
        <CommissionBadge commission={program.commission} />
      </div>

      {/* Key stats */}
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-secondary p-3">
        <div>
          <p className="text-xs text-muted-foreground">Cookie</p>
          <p className="text-sm font-semibold">{program.cookieDuration} days</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Payout</p>
          <p className="text-sm font-semibold">{program.payoutFrequency}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-2">
        <Link href={`/programs/${program.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-1.5 rounded-xl font-medium">
            Review
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
        <a
          href={program.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1"
        >
          <Button size="sm" className="w-full gap-1.5 rounded-xl bg-teal-600 font-medium text-white hover:bg-teal-700">
            Visit
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </motion.div>
  )
}

function CompactCard({ program, index, className }: { program: AffiliateProgram; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={cn(
        'group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-teal-200 hover:shadow-md',
        className
      )}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-xl">
        {program.logo}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-sm font-bold truncate">{program.name}</h3>
          {program.badge && <ProgramBadge badge={program.badge} />}
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <StarRating rating={program.rating} size="sm" showLabel={false} />
          <span className="text-xs text-muted-foreground">{program.rating}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs font-medium text-teal-700">{program.commission}</span>
        </div>
      </div>
      <Link href={`/programs/${program.slug}`}>
        <Button variant="ghost" size="sm" className="flex-shrink-0 gap-1 rounded-lg">
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </motion.div>
  )
}

function FeaturedCard({ program, index, className }: { program: AffiliateProgram; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border-2 border-teal-200 bg-card p-7 shadow-lg transition-shadow hover:shadow-teal-glow',
        className
      )}
    >
      {/* Highlight bar */}
      <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-teal-600" />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-3xl shadow-sm">
            {program.logo}
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">{program.name}</h3>
            <span className="text-sm text-muted-foreground">{program.category}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {program.badge && <ProgramBadge badge={program.badge} />}
          {program.editorsPick && <EditorsBadge />}
        </div>
      </div>

      <StarRating rating={program.rating} reviewCount={program.reviewCount} size="md" className="mb-3" />

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{program.tagline}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        <CommissionBadge commission={program.commission} variant="highlight" />
        <span className="inline-flex items-center rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-foreground border border-border">
          {program.cookieDuration}-day cookie
        </span>
      </div>

      <div className="flex gap-3">
        <Link href={`/programs/${program.slug}`} className="flex-1">
          <Button variant="outline" className="w-full rounded-xl font-medium">
            Read Review
          </Button>
        </Link>
        <a href={program.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex-1">
          <Button className="w-full rounded-xl bg-teal-600 font-medium text-white hover:bg-teal-700">
            Visit Site
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </Button>
        </a>
      </div>
    </motion.div>
  )
}
