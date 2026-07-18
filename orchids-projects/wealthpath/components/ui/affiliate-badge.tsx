import { cn } from '@/lib/utils'
import { Clock, DollarSign, TrendingUp } from 'lucide-react'

interface CommissionBadgeProps {
  commission: string
  className?: string
  variant?: 'default' | 'highlight'
}

export function CommissionBadge({ commission, className, variant = 'default' }: CommissionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        variant === 'default'
          ? 'bg-teal-50 text-teal-700 border border-teal-200'
          : 'bg-teal-600 text-white',
        className
      )}
    >
      <TrendingUp className="h-3 w-3" />
      {commission}
    </span>
  )
}

interface CookieBadgeProps {
  days: number
  className?: string
}

export function CookieBadge({ days, className }: CookieBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-700 border border-navy-100',
        className
      )}
    >
      <Clock className="h-3 w-3" />
      {days}-day cookie
    </span>
  )
}

interface ProgramBadgeProps {
  badge: 'Best Overall' | 'Best Value' | 'Most Popular' | 'Top Rated' | 'New'
  className?: string
}

const badgeStyles: Record<string, string> = {
  'Best Overall': 'bg-gold-400 text-navy-950',
  'Best Value': 'bg-teal-600 text-white',
  'Most Popular': 'bg-blue-600 text-white',
  'Top Rated': 'bg-navy-800 text-white',
  'New': 'bg-emerald-500 text-white',
}

export function ProgramBadge({ badge, className }: ProgramBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide',
        badgeStyles[badge] ?? 'bg-muted text-muted-foreground',
        className
      )}
    >
      {badge}
    </span>
  )
}

interface EditorsBadgeProps {
  className?: string
}

export function EditorsBadge({ className }: EditorsBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-gold-400/15 px-2.5 py-1 text-xs font-semibold text-gold-600 border border-gold-300',
        className
      )}
    >
      <span>★</span>
      Editor&apos;s Pick
    </span>
  )
}
