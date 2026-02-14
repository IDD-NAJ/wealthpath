'use client'

import { AdminDashboard } from '@/components/admin-dashboard'
import { AdminProvider } from '@/lib/admin-context'

export default function AdminDashboardPage() {
  return (
    <AdminProvider>
      <AdminDashboard />
    </AdminProvider>
  )
}
