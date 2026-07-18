'use client'

import { ReactNode, useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Button } from '@/components/ui/button'
import {
  BarChart3, BookOpen, Users, LogOut, Menu, X,
  PieChart, CreditCard, TrendingUp, Calendar, Megaphone, Share2,
  FileText, MessageSquare, Zap, Eye, Tag, Globe, Activity, Lock,
  ScrollText, DollarSign, Award, ChevronRight,
  LayoutDashboard, MapPin, Ticket, Star, HelpCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  icon: ReactNode
  section: string
}

const navGroups = [
  {
    label: 'Core',
    items: [
      { label: 'Overview', icon: <BarChart3 className="h-4 w-4" />, section: 'overview' },
      { label: 'Programs', icon: <Share2 className="h-4 w-4" />, section: 'affiliates' },
      { label: 'Analytics', icon: <PieChart className="h-4 w-4" />, section: 'analytics' },
      { label: 'SEO Tools', icon: <Eye className="h-4 w-4" />, section: 'seo' },
    ],
  },
  {
    label: 'Site CMS',
    items: [
      { label: 'Homepage Builder', icon: <LayoutDashboard className="h-4 w-4" />, section: 'homepage-builder' },
      { label: 'Destinations', icon: <MapPin className="h-4 w-4" />, section: 'destinations-cms' },
      { label: 'Deals', icon: <Ticket className="h-4 w-4" />, section: 'deals-cms' },
      { label: 'Blog Posts', icon: <BookOpen className="h-4 w-4" />, section: 'blog-cms' },
      { label: 'Testimonials', icon: <Star className="h-4 w-4" />, section: 'testimonials-cms' },
      { label: 'FAQs', icon: <HelpCircle className="h-4 w-4" />, section: 'faqs-cms' },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Articles', icon: <BookOpen className="h-4 w-4" />, section: 'articles' },
      { label: 'AI Generator', icon: <Zap className="h-4 w-4" />, section: 'ai-generator' },
      { label: 'Moderation', icon: <FileText className="h-4 w-4" />, section: 'moderation' },
    ],
  },
  {
    label: 'Users & Revenue',
    items: [
      { label: 'Users', icon: <Users className="h-4 w-4" />, section: 'users' },
      { label: 'Payments', icon: <CreditCard className="h-4 w-4" />, section: 'payments' },
      { label: 'Subscriptions', icon: <TrendingUp className="h-4 w-4" />, section: 'subscriptions' },
      { label: 'Coupons', icon: <Tag className="h-4 w-4" />, section: 'coupons' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Marketing', icon: <Megaphone className="h-4 w-4" />, section: 'marketing' },
      { label: 'Scheduler', icon: <Calendar className="h-4 w-4" />, section: 'scheduler' },
      { label: 'Support', icon: <MessageSquare className="h-4 w-4" />, section: 'support' },
      { label: 'Integrations', icon: <Globe className="h-4 w-4" />, section: 'integrations' },
    ],
  },
]

export interface AdminShellProps {
  children: ReactNode
  currentSection: string
  onSectionChange: (section: string) => void
}

export function AdminShell({ children, currentSection, onSectionChange }: AdminShellProps) {
  const router = useRouter()
  const { logout, currentAdmin } = useAdmin()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const currentLabel =
    navGroups.flatMap((g) => g.items).find((i) => i.section === currentSection)?.label || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        } flex flex-col border-r border-border/60 transition-all duration-300`}
        style={{ background: 'hsl(222 47% 8%)' }}
      >
        {/* Logo */}
        <div className="border-b border-white/8 px-5 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal">
              <span className="font-display text-sm font-bold text-white">W</span>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">WealthPath</p>
              <p className="text-[10px] text-white/40">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Admin info */}
        <div className="border-b border-white/8 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal">
              {currentAdmin?.name?.charAt(0) ?? 'A'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{currentAdmin?.name}</p>
              <p className="truncate text-[10px] text-white/40">{currentAdmin?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          <div className="space-y-5">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <button
                      key={item.section}
                      onClick={() => onSectionChange(item.section)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        currentSection === item.section
                          ? 'bg-teal text-white'
                          : 'text-white/50 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {currentSection === item.section && (
                        <ChevronRight className="ml-auto h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/8 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/40 transition-colors hover:bg-white/6 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-6"
          style={{ background: 'hsl(var(--card))' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="text-sm font-semibold text-foreground">{currentLabel}</span>
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View site &rarr;
          </Link>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-background/60">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
