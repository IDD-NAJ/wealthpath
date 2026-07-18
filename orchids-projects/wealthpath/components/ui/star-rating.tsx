import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  reviewCount?: number
  className?: string
}

const sizeMap = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

const textSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export function StarRating({
  rating,
  max = 5,
  size = 'md',
  showLabel = true,
  reviewCount,
  className,
}: StarRatingProps) {
  const filled = Math.floor(rating)
  const partial = rating % 1
  const empty = max - filled - (partial > 0 ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: filled }).map((_, i) => (
          <StarIcon key={`full-${i}`} fill="full" className={sizeMap[size]} />
        ))}
        {partial > 0 && (
          <StarIcon fill="partial" partial={partial} className={sizeMap[size]} />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <StarIcon key={`empty-${i}`} fill="empty" className={sizeMap[size]} />
        ))}
      </div>
      {showLabel && (
        <span className={cn('font-semibold text-foreground', textSizeMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn('text-muted-foreground', textSizeMap[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}

interface StarIconProps {
  fill: 'full' | 'partial' | 'empty'
  partial?: number
  className?: string
}

function StarIcon({ fill, partial = 0, className }: StarIconProps) {
  const id = `partial-${Math.random().toString(36).slice(2)}`

  if (fill === 'empty') {
    return (
      <svg
        className={cn('text-muted-foreground/30', className)}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  if (fill === 'full') {
    return (
      <svg
        className={cn('text-gold-400', className)}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  }

  // Partial star
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id}>
          <stop offset={`${partial * 100}%`} stopColor="hsl(43 74% 52%)" />
          <stop offset={`${partial * 100}%`} stopColor="hsl(215 25% 45% / 0.3)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}
