'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { AdminShell } from './admin-shell'
import AdminOverview from './admin-sections/admin-overview'
import AdminArticles from './admin-sections/admin-articles'
import AdminAIGenerator from './admin-sections/admin-ai-generator'
import AdminUsers from './admin-sections/admin-users'
import AdminCourses from './admin-sections/admin-courses'
import AdminAnalytics from './admin-sections/admin-analytics'
import AdminPayments from './admin-sections/admin-payments'
import AdminSubscriptions from './admin-sections/admin-subscriptions'
import AdminStudentProgress from './admin-sections/admin-student-progress'
import AdminScheduler from './admin-sections/admin-scheduler'
import AdminMarketing from './admin-sections/admin-marketing'
import AdminAffiliates from './admin-sections/admin-affiliates'
import AdminSEO from './admin-sections/admin-seo'
import AdminModeration from './admin-sections/admin-moderation'
import AdminSupport from './admin-sections/admin-support'
import AdminCoupons from './admin-sections/admin-coupons'
import AdminCertificates from './admin-sections/admin-certificates'
import AdminNotifications from './admin-sections/admin-notifications'
import AdminLanguages from './admin-sections/admin-languages'
import AdminIntegrations from './admin-sections/admin-integrations'
import AdminABTesting from './admin-sections/admin-ab-testing'
import AdminAuditLog from './admin-sections/admin-audit-log'

export function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated } = useAdmin()
  const [currentSection, setCurrentSection] = useState('overview')
  const [mounted, setMounted] = useState(false)
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && !redirected) {
      setRedirected(true)
      router.push('/admin/login')
    }
  }, [isAuthenticated, mounted, redirected, router])

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'overview':
        return <AdminOverview />
      case 'articles':
        return <AdminArticles />
      case 'ai-generator':
        return <AdminAIGenerator />
      case 'users':
        return <AdminUsers />
      case 'courses':
        return <AdminCourses />
      case 'analytics':
        return <AdminAnalytics />
      case 'payments':
        return <AdminPayments />
      case 'subscriptions':
        return <AdminSubscriptions />
      case 'student-progress':
        return <AdminStudentProgress />
      case 'scheduler':
        return <AdminScheduler />
      case 'marketing':
        return <AdminMarketing />
      case 'affiliates':
        return <AdminAffiliates />
      case 'seo':
        return <AdminSEO />
      case 'moderation':
        return <AdminModeration />
      case 'support':
        return <AdminSupport />
      case 'coupons':
        return <AdminCoupons />
      case 'certificates':
        return <AdminCertificates />
      case 'notifications':
        return <AdminNotifications />
      case 'languages':
        return <AdminLanguages />
      case 'integrations':
        return <AdminIntegrations />
      case 'ab-testing':
        return <AdminABTesting />
      case 'audit-log':
        return <AdminAuditLog />
      default:
        return <AdminOverview />
    }
  }

  return (
    <AdminShell currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderSection()}
    </AdminShell>
  )
}
