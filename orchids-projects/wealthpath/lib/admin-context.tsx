'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { 
  AdminUser, AdminArticle, Course, Subscription, StudentProgress, 
  Payment, Campaign, Affiliate, SupportTicket, Coupon, Certificate,
  Notification, demoUsers, demoArticles, demoCourses, demoPayments,
  demoSubscriptions, demoStudentProgress, demoCampaigns, demoAffiliates,
  demoSupportTickets, demoCoupons, demoCertificates, demoNotifications
} from './admin-store'

interface AdminState {
  users: AdminUser[]
  articles: AdminArticle[]
  courses: Course[]
  payments: Payment[]
  subscriptions: Subscription[]
  studentProgress: StudentProgress[]
  campaigns: Campaign[]
  affiliates: Affiliate[]
  supportTickets: SupportTicket[]
  coupons: Coupon[]
  certificates: Certificate[]
  notifications: Notification[]
}

interface AdminContextType {
  isAuthenticated: boolean
  currentAdmin: AdminUser | null
  state: AdminState
  login: (email: string, password: string) => boolean
  logout: () => void
  
  // Article management
  addArticle: (article: Omit<AdminArticle, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateArticle: (id: string, updates: Partial<AdminArticle>) => void
  deleteArticle: (id: string) => void
  generateArticleWithAI: (topic: string, category: string) => Promise<void>
  
  // User management
  updateUser: (id: string, updates: Partial<AdminUser>) => void
  deleteUser: (id: string) => void
  
  // Course management
  addCourse: (course: Omit<Course, 'id'>) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
  deleteCourse: (id: string) => void
  
  // Student management
  updateStudentProgress: (studentId: string, courseId: string, progress: number) => void
  
  // Subscription management
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void
  cancelSubscription: (id: string) => void
  
  // Coupon management
  addCoupon: (code: string, discount: number, expiresAt: string) => void
  deactivateCoupon: (code: string) => void
  
  // Marketing
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void
  updateCampaignMetrics: (id: string, metrics: Partial<Campaign['metrics']>) => void
  
  // Affiliate management
  addAffiliate: (partner: Omit<Affiliate, 'id'>) => void
  updateAffiliateCommission: (id: string, rate: number) => void
  
  // Moderation
  approveContent: (contentId: string) => void
  rejectContent: (contentId: string, reason: string) => void
  
  // Notifications
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void
  clearNotifications: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const initialState: AdminState = {
  users: demoUsers,
  articles: demoArticles,
  courses: demoCourses,
  payments: demoPayments,
  subscriptions: demoSubscriptions,
  studentProgress: demoStudentProgress,
  campaigns: demoCampaigns,
  affiliates: demoAffiliates,
  supportTickets: demoSupportTickets,
  coupons: demoCoupons,
  certificates: demoCertificates,
  notifications: demoNotifications,
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('admin_auth')
    return stored === 'true'
  })
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('admin_user')
    return stored ? JSON.parse(stored) : null
  })
  const [state, setState] = useState<AdminState>(initialState)

  const login = useCallback((email: string, password: string) => {
    if (email === 'admin@wealthpath.com' && password === 'Admin@2024') {
      const admin = demoUsers.find(u => u.role === 'admin')
      if (admin) {
        setCurrentAdmin(admin)
        setIsAuthenticated(true)
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_auth', 'true')
          localStorage.setItem('admin_user', JSON.stringify(admin))
        }
        return true
      }
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentAdmin(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_auth')
      localStorage.removeItem('admin_user')
    }
  }, [])

  const addArticle = useCallback((article: Omit<AdminArticle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArticle: AdminArticle = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setState(prev => ({ ...prev, articles: [...prev.articles, newArticle] }))
  }, [])

  const updateArticle = useCallback((id: string, updates: Partial<AdminArticle>) => {
    setState(prev => ({
      ...prev,
      articles: prev.articles.map(a => 
        a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
      )
    }))
  }, [])

  const deleteArticle = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      articles: prev.articles.filter(a => a.id !== id)
    }))
  }, [])

  const generateArticleWithAI = useCallback(async (topic: string, category: string) => {
    // Simulate AI generation with a mock response
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockArticles: Record<string, string> = {
      'freelancing': `# Top ${topic} Strategies for Success\n\nDiscover proven methods to build a thriving freelancing career. This comprehensive guide covers...\n\n## Key Points\n- Build a strong portfolio\n- Set competitive rates\n- Maintain client relationships\n- Scale your business efficiently`,
      'investing': `# Understanding ${topic} Investments\n\nLearn how to make smart investment decisions. This article covers:\n\n## Investment Fundamentals\n- Risk assessment\n- Portfolio diversification\n- Market analysis\n- Long-term growth strategies`,
      'ecommerce': `# Building Your ${topic} Store\n\nStart your online business today. Essential steps:\n\n## Getting Started\n- Platform selection\n- Product sourcing\n- Marketing strategy\n- Customer service excellence`,
    }

    const content = mockArticles[category] || `# ${topic}\n\nThis is an AI-generated article about ${topic}. Key insights:\n\n## Main Topics\n- Strategy and planning\n- Implementation steps\n- Best practices\n- Success metrics`

    const newArticle: AdminArticle = {
      id: Date.now().toString(),
      title: `${topic} - AI Generated`,
      slug: topic.toLowerCase().replace(/\s+/g, '-'),
      content,
      category,
      author: currentAdmin?.name || 'AI Generator',
      excerpt: `Learn about ${topic} with this AI-generated comprehensive guide.`,
      featured: false,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      tags: [category],
      metaTitle: `${topic} - AI Generated`,
      metaDescription: `Learn about ${topic} with this AI-generated comprehensive guide.`,
      links: []
    }

    setState(prev => ({ ...prev, articles: [...prev.articles, newArticle] }))
  }, [currentAdmin])

  const updateUser = useCallback((id: string, updates: Partial<AdminUser>) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => 
        u.id === id ? { ...u, ...updates } : u
      )
    }))
  }, [])

  const deleteUser = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== id)
    }))
  }, [])

  const addCourse = useCallback((course: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
    }
    setState(prev => ({ ...prev, courses: [...prev.courses, newCourse] }))
  }, [])

  const updateCourse = useCallback((id: string, updates: Partial<Course>) => {
    setState(prev => ({
      ...prev,
      courses: prev.courses.map(c => 
        c.id === id ? { ...c, ...updates } : c
      )
    }))
  }, [])

  const deleteCourse = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      courses: prev.courses.filter(c => c.id !== id)
    }))
  }, [])

  const updateStudentProgress = useCallback((studentId: string, courseId: string, progress: number) => {
    setState(prev => ({
      ...prev,
      studentProgress: prev.studentProgress.map(sp => 
        sp.studentId === studentId && sp.courseId === courseId
          ? { ...sp, progress: Math.min(100, Math.max(0, progress)) }
          : sp
      )
    }))
  }, [])

  const addSubscription = useCallback((subscription: Omit<Subscription, 'id'>) => {
    const newSub: Subscription = {
      ...subscription,
      id: Date.now().toString(),
    }
    setState(prev => ({ ...prev, subscriptions: [...prev.subscriptions, newSub] }))
  }, [])

  const cancelSubscription = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      subscriptions: prev.subscriptions.map(s => 
        s.id === id ? { ...s, status: 'cancelled' } : s
      )
    }))
  }, [])

  const addCoupon = useCallback((code: string, discount: number, expiresAt: string) => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code,
      discountPercent: discount,
      maxUses: 100,
      usedCount: 0,
      expiresAt,
      active: true
    }
    setState(prev => ({ ...prev, coupons: [...prev.coupons, newCoupon] }))
  }, [])

  const deactivateCoupon = useCallback((code: string) => {
    setState(prev => ({
      ...prev,
      coupons: prev.coupons.map(c => 
        c.code === code ? { ...c, active: false } : c
      )
    }))
  }, [])

  const addCampaign = useCallback((campaign: Omit<Campaign, 'id'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
    }
    setState(prev => ({ ...prev, campaigns: [...prev.campaigns, newCampaign] }))
  }, [])

  const updateCampaignMetrics = useCallback((id: string, metrics: Partial<Campaign['metrics']>) => {
    setState(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(c => 
        c.id === id ? { ...c, metrics: { ...c.metrics, ...metrics } } : c
      )
    }))
  }, [])

  const addAffiliate = useCallback((partner: Omit<Affiliate, 'id'>) => {
    const newPartner: Affiliate = {
      ...partner,
      id: Date.now().toString(),
    }
    setState(prev => ({ ...prev, affiliates: [...prev.affiliates, newPartner] }))
  }, [])

  const updateAffiliateCommission = useCallback((id: string, rate: number) => {
    setState(prev => ({
      ...prev,
      affiliates: prev.affiliates.map(a => 
        a.id === id ? { ...a, commissionRate: rate } : a
      )
    }))
  }, [])

  const approveContent = useCallback((contentId: string) => {
    // In real implementation, this would update moderation queue
    addNotification('Content approved successfully', 'success')
  }, [])

  const rejectContent = useCallback((contentId: string, reason: string) => {
    // In real implementation, this would update moderation queue
    addNotification(`Content rejected: ${reason}`, 'warning')
  }, [])

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    }
    setState(prev => ({ ...prev, notifications: [newNotif, ...prev.notifications] }))
  }, [])

  const clearNotifications = useCallback(() => {
    setState(prev => ({ ...prev, notifications: [] }))
  }, [])

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      currentAdmin,
      state,
      login,
      logout,
      addArticle,
      updateArticle,
      deleteArticle,
      generateArticleWithAI,
      updateUser,
      deleteUser,
      addCourse,
      updateCourse,
      deleteCourse,
      updateStudentProgress,
      addSubscription,
      cancelSubscription,
      addCoupon,
      deactivateCoupon,
      addCampaign,
      updateCampaignMetrics,
      addAffiliate,
      updateAffiliateCommission,
      approveContent,
      rejectContent,
      addNotification,
      clearNotifications
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
