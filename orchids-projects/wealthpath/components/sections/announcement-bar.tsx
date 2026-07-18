'use client'

import Link from 'next/link'
import { useState } from 'react'
import { X } from 'lucide-react'

interface AnnouncementBarProps {
  config: {
    text?: string
    link?: string
    cta?: string
    bgColor?: string
  }
}

export default function AnnouncementBar({ config }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const { text = '', link = '', cta = 'Shop Now' } = config

  return (
    <div className="relative z-50 bg-teal text-white text-sm font-medium">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5">
        <span className="text-center text-white/90">{text}</span>
        {link && (
          <Link
            href={link}
            className="shrink-0 rounded-full border border-white/40 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            {cta} &rarr;
          </Link>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 transition-colors hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
