'use client'

import { ReactNode, useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, BookOpen, Users, Settings, LogOut, Menu, X, 
  PieChart, CreditCard, TrendingUp, Calendar, Megaphone, Share2,
  FileText, MessageSquare, Zap, Eye, Tag, Globe, Activity, Lock,
  ScrollText, DollarSign, Award
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  icon: ReactNode
  section: string
  color?: string
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: <BarChart3 className="h-5 w-5" />, section: 'overview', color: 'from-blue-500 to-blue-600' },
  { label: 'Articles', icon: <BookOpen className="h-5 w-5" />, section: 'articles', color: 'from-purple-500 to-purple-600' },
  { label: 'AI Generator', icon: <Zap className="h-5 w-5" />, section: 'ai-generator', color: 'from-amber-500 to-amber-600' },
  { label: 'Users', icon: <Users className="h-5 w-5" />, section: 'users', color: 'from-green-500 to-green-600' },
  { label: 'Courses', icon: <BookOpen className="h-5 w-5" />, section: 'courses', color: 'from-indigo-500 to-indigo-600' },
  { label: 'Analytics', icon: <PieChart className="h-5 w-5" />, section: 'analytics', color: 'from-red-500 to-red-600' },
  { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, section: 'payments', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Subscriptions', icon: <TrendingUp className="h-5 w-5" />, section: 'subscriptions', color: 'from-cyan-500 to-cyan-600' },
  { label: 'Student Progress', icon: <Activity className="h-5 w-5" />, section: 'student-progress', color: 'from-fuchsia-500 to-fuchsia-600' },
  { label: 'Scheduler', icon: <Calendar className="h-5 w-5" />, section: 'scheduler', color: 'from-orange-500 to-orange-600' },
  { label: 'Marketing', icon: <Megaphone className="h-5 w-5" />, section: 'marketing', color: 'from-pink-500 to-pink-600' },
  { label: 'Affiliates', icon: <Share2 className="h-5 w-5" />, section: 'affiliates', color: 'from-teal-500 to-teal-600' },
  { label: 'SEO Tools', icon: <Eye className="h-5 w-5" />, section: 'seo', color: 'from-lime-500 to-lime-600' },
  { label: 'Moderation', icon: <FileText className="h-5 w-5" />, section: 'moderation', color: 'from-rose-500 to-rose-600' },
  { label: 'Support', icon: <MessageSquare className="h-5 w-5" />, section: 'support', color: 'from-sky-500 to-sky-600' },
  { label: 'Coupons', icon: <Tag className="h-5 w-5" />, section: 'coupons', color: 'from-violet-500 to-violet-600' },
  { label: 'Certificates', icon: <Award className="h-5 w-5" />, section: 'certificates', color: 'from-yellow-500 to-yellow-600' },
  { label: 'Notifications', icon: <ScrollText className="h-5 w-5" />, section: 'notifications', color: 'from-gray-500 to-gray-600' },
  { label: 'Languages', icon: <Globe className="h-5 w-5" />, section: 'languages', color: 'from-blue-400 to-blue-500' },
  { label: 'Integrations', icon: <Zap className="h-5 w-5" />, section: 'integrations', color: 'from-red-400 to-red-500' },
  { label: 'A/B Testing', icon: <BarChart3 className="h-5 w-5" />, section: 'ab-testing', color: 'from-green-400 to-green-500' },
  { label: 'Audit Log', icon: <Lock className="h-5 w-5" />, section: 'audit-log', color: 'from-purple-400 to-purple-500' },
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } flex flex-col border-r border-border bg-card transition-all duration-300 lg:w-64`}
      >
        {/* Logo */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <span className="font-serif text-lg font-bold text-primary-foreground">W</span>
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold">WealthPath</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="border-b border-border px-6 py-4">
          <p className="text-sm font-medium">{currentAdmin?.name}</p>
          <p className="text-xs text-muted-foreground">{currentAdmin?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onSectionChange(item.section)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentSection === item.section
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-secondary lg:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="text-lg font-semibold">
              {navItems.find(item => item.section === currentSection)?.label || 'Dashboard'}
            </div>
            <div className="w-10" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-secondary/30">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
