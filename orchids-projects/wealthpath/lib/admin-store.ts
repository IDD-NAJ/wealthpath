// Comprehensive admin data store with all entities for the WealthPath admin dashboard

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "subscriber" | "student"
  status: "active" | "suspended" | "pending"
  avatar: string
  joinedDate: string
  lastLogin: string
  coursesEnrolled: number
  totalSpent: number
}

export interface AdminArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  status: "published" | "draft" | "scheduled"
  author: string
  createdAt: string
  updatedAt: string
  views: number
  featured: boolean
  metaTitle: string
  metaDescription: string
  links: ArticleLink[]
}

export interface ArticleLink {
  id: string
  label: string
  url: string
  type: "resource" | "affiliate" | "signup" | "tool"
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  status: "active" | "draft" | "archived"
  enrollments: number
  modules: CourseModule[]
  rating: number
  createdAt: string
}

export interface CourseModule {
  id: string
  title: string
  lessons: { id: string; title: string; duration: string; type: "video" | "text" | "quiz" }[]
}

export interface StudentProgress {
  id: string
  studentName: string
  studentEmail: string
  courseId: string
  courseName: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  quizScore: number
  timeSpent: string
  lastAccessed: string
  status: "in-progress" | "completed" | "not-started"
}

export interface Payment {
  id: string
  userId: string
  userName: string
  amount: number
  currency: string
  status: "completed" | "pending" | "refunded" | "failed"
  type: "subscription" | "course" | "one-time"
  description: string
  date: string
  method: string
}

export interface Subscription {
  id: string
  name: string
  price: number
  interval: "monthly" | "yearly"
  features: string[]
  subscriberCount: number
  status: "active" | "inactive"
  revenue: number
}

export interface ScheduledContent {
  id: string
  title: string
  type: "article" | "email" | "social"
  scheduledDate: string
  status: "scheduled" | "published" | "failed" | "cancelled"
  author: string
}

export interface Campaign {
  id: string
  name: string
  subject: string
  status: "draft" | "sending" | "sent" | "scheduled"
  recipients: number
  openRate: number
  clickRate: number
  sentDate: string
  segment: string
}

export interface Affiliate {
  id: string
  name: string
  email: string
  code: string
  status: "active" | "pending" | "inactive"
  clicks: number
  conversions: number
  earnings: number
  commissionRate: number
  joinedDate: string
  lastPayout: string
}

export interface SupportTicket {
  id: string
  subject: string
  userName: string
  userEmail: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  createdAt: string
  lastReply: string
  messages: { sender: string; text: string; date: string }[]
}

export interface Coupon {
  id: string
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minPurchase: number
  maxUses: number
  usedCount: number
  expiryDate: string
  status: "active" | "expired" | "disabled"
  applicableTo: string
}

export interface Certificate {
  id: string
  studentName: string
  courseName: string
  issueDate: string
  certificateId: string
  status: "issued" | "revoked"
  templateName: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "push" | "email" | "in-app"
  segment: string
  status: "sent" | "scheduled" | "draft"
  sentDate: string
  openRate: number
}

export interface Language {
  id: string
  code: string
  name: string
  nativeName: string
  status: "active" | "inactive"
  completionPercent: number
  translatedKeys: number
  totalKeys: number
}

export interface Integration {
  id: string
  name: string
  description: string
  icon: string
  status: "connected" | "disconnected" | "error"
  category: string
  configFields: { key: string; label: string; value: string; type: "text" | "password" | "url" }[]
}

export interface ABTest {
  id: string
  name: string
  page: string
  status: "running" | "completed" | "paused" | "draft"
  startDate: string
  endDate: string
  variants: { name: string; traffic: number; conversions: number; views: number }[]
  winner: string | null
}

export interface AuditLogEntry {
  id: string
  user: string
  action: string
  target: string
  details: string
  timestamp: string
  ip: string
}

export interface FlaggedContent {
  id: string
  type: "comment" | "review" | "article"
  content: string
  reportedBy: string
  reason: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  articleTitle: string
}

export interface SEORedirect {
  id: string
  from: string
  to: string
  type: "301" | "302"
  status: "active" | "inactive"
}

export interface KeywordRanking {
  keyword: string
  position: number
  previousPosition: number
  url: string
  volume: number
  change: number
}

// --- DEMO DATA ---

export const demoUsers: AdminUser[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@example.com", role: "student", status: "active", avatar: "SC", joinedDate: "2025-08-15", lastLogin: "2026-02-12", coursesEnrolled: 3, totalSpent: 297 },
  { id: "u2", name: "James Miller", email: "james@example.com", role: "subscriber", status: "active", avatar: "JM", joinedDate: "2025-06-20", lastLogin: "2026-02-10", coursesEnrolled: 1, totalSpent: 99 },
  { id: "u3", name: "Emma Wilson", email: "emma@example.com", role: "editor", status: "active", avatar: "EW", joinedDate: "2025-03-10", lastLogin: "2026-02-14", coursesEnrolled: 0, totalSpent: 0 },
  { id: "u4", name: "Alex Rodriguez", email: "alex@example.com", role: "student", status: "active", avatar: "AR", joinedDate: "2025-09-01", lastLogin: "2026-02-11", coursesEnrolled: 5, totalSpent: 495 },
  { id: "u5", name: "Lisa Park", email: "lisa@example.com", role: "student", status: "suspended", avatar: "LP", joinedDate: "2025-07-22", lastLogin: "2026-01-15", coursesEnrolled: 2, totalSpent: 198 },
  { id: "u6", name: "David Brown", email: "david@example.com", role: "subscriber", status: "active", avatar: "DB", joinedDate: "2025-11-05", lastLogin: "2026-02-13", coursesEnrolled: 0, totalSpent: 49 },
  { id: "u7", name: "Maria Garcia", email: "maria@example.com", role: "admin", status: "active", avatar: "MG", joinedDate: "2025-01-01", lastLogin: "2026-02-14", coursesEnrolled: 0, totalSpent: 0 },
  { id: "u8", name: "Tom Nakamura", email: "tom@example.com", role: "student", status: "pending", avatar: "TN", joinedDate: "2026-02-10", lastLogin: "2026-02-10", coursesEnrolled: 0, totalSpent: 0 },
  { id: "u9", name: "Rachel Green", email: "rachel@example.com", role: "student", status: "active", avatar: "RG", joinedDate: "2025-10-18", lastLogin: "2026-02-09", coursesEnrolled: 4, totalSpent: 396 },
  { id: "u10", name: "Kevin O'Brien", email: "kevin@example.com", role: "subscriber", status: "active", avatar: "KO", joinedDate: "2025-12-01", lastLogin: "2026-02-08", coursesEnrolled: 1, totalSpent: 149 },
  { id: "u11", name: "Priya Patel", email: "priya@example.com", role: "student", status: "active", avatar: "PP", joinedDate: "2025-05-14", lastLogin: "2026-02-14", coursesEnrolled: 6, totalSpent: 594 },
  { id: "u12", name: "Chris Taylor", email: "chris@example.com", role: "editor", status: "active", avatar: "CT", joinedDate: "2025-04-08", lastLogin: "2026-02-13", coursesEnrolled: 0, totalSpent: 0 },
]

export const demoArticles: AdminArticle[] = [
  { id: "a1", title: "10 Proven Ways to Make Money Online in 2026", slug: "make-money-online-2026", excerpt: "Discover the most effective online income streams...", content: "The digital economy continues to expand, offering unprecedented opportunities for individuals to generate income from anywhere in the world. In this comprehensive guide, we explore ten proven methods that have helped thousands of people build sustainable online income streams.\n\n## 1. Freelancing on Specialized Platforms\n\nFreelancing remains one of the most accessible ways to earn money online. Platforms like Upwork, Fiverr, and Toptal connect skilled professionals with clients worldwide.\n\n## 2. Starting an E-commerce Store\n\nWith platforms like Shopify and WooCommerce, launching an online store has never been easier. Focus on niche products with strong demand.\n\n## 3. Content Creation and Monetization\n\nYouTube, TikTok, and blogging continue to offer significant revenue potential through advertising, sponsorships, and digital products.\n\n## 4. Online Tutoring and Coaching\n\nLeverage your expertise by offering one-on-one or group coaching sessions through platforms like Teachable or Zoom.\n\n## 5. Affiliate Marketing\n\nPromote products you believe in and earn commissions on every sale made through your unique referral links.", category: "Freelancing", tags: ["online income", "freelancing", "2026"], status: "published", author: "Maria Garcia", createdAt: "2026-01-15", updatedAt: "2026-02-01", views: 15420, featured: true, metaTitle: "10 Proven Ways to Make Money Online in 2026 | WealthPath", metaDescription: "Discover proven strategies for making money online in 2026.", links: [{ id: "l1", label: "Upwork", url: "https://upwork.com", type: "tool" }, { id: "l2", label: "Shopify Free Trial", url: "https://shopify.com", type: "affiliate" }] },
  { id: "a2", title: "Stock Market Investing for Beginners", slug: "stock-market-investing-beginners", excerpt: "A comprehensive guide to getting started with stock investing...", content: "Investing in the stock market is one of the most effective ways to build long-term wealth. This guide walks you through everything you need to know as a beginner.\n\n## Understanding the Basics\n\nThe stock market is a marketplace where shares of publicly traded companies are bought and sold. When you buy a stock, you're purchasing a small ownership stake in that company.\n\n## Getting Started\n\nOpen a brokerage account, start with index funds, and invest consistently over time.", category: "Investing", tags: ["stocks", "investing", "beginners"], status: "published", author: "Emma Wilson", createdAt: "2026-01-08", updatedAt: "2026-01-20", views: 12350, featured: true, metaTitle: "Stock Market Investing for Beginners | WealthPath", metaDescription: "Learn how to start investing in the stock market.", links: [{ id: "l3", label: "Robinhood", url: "https://robinhood.com", type: "signup" }] },
  { id: "a3", title: "Building a Passive Income Portfolio", slug: "passive-income-portfolio", excerpt: "Learn how to create multiple streams of passive income...", content: "Passive income is money earned with minimal ongoing effort. Building a diversified passive income portfolio requires initial work but can provide financial freedom over time.\n\n## Dividend Stocks\n\nInvest in companies that pay regular dividends for consistent cash flow.\n\n## Real Estate Investment Trusts\n\nREITs allow you to invest in real estate without managing properties.", category: "Passive Income", tags: ["passive income", "portfolio", "dividends"], status: "published", author: "Maria Garcia", createdAt: "2025-12-20", updatedAt: "2026-01-05", views: 9870, featured: false, metaTitle: "Building a Passive Income Portfolio | WealthPath", metaDescription: "Create multiple streams of passive income.", links: [] },
  { id: "a4", title: "Real Estate Investing: A Complete Guide", slug: "real-estate-investing-guide", excerpt: "Everything you need to know about real estate investing...", content: "Real estate has created more millionaires than any other asset class. This guide covers everything from rental properties to REITs and real estate syndications.", category: "Real Estate", tags: ["real estate", "rental", "property"], status: "published", author: "Chris Taylor", createdAt: "2025-11-15", updatedAt: "2025-12-10", views: 8340, featured: true, metaTitle: "Real Estate Investing Guide | WealthPath", metaDescription: "Complete guide to real estate investing strategies.", links: [] },
  { id: "a5", title: "Cryptocurrency Trading Strategies for 2026", slug: "crypto-trading-2026", excerpt: "Advanced strategies for cryptocurrency trading...", content: "The cryptocurrency market continues to mature, offering both opportunities and risks. Learn proven trading strategies for navigating this volatile market.", category: "Investing", tags: ["crypto", "trading", "bitcoin"], status: "draft", author: "Emma Wilson", createdAt: "2026-02-05", updatedAt: "2026-02-10", views: 0, featured: false, metaTitle: "Crypto Trading Strategies 2026 | WealthPath", metaDescription: "Advanced cryptocurrency trading strategies.", links: [] },
  { id: "a6", title: "Starting a Successful YouTube Channel", slug: "start-youtube-channel", excerpt: "Step-by-step guide to building a profitable YouTube channel...", content: "YouTube remains one of the best platforms for building an audience and generating income. This guide covers everything from niche selection to monetization.", category: "Online Business", tags: ["youtube", "content creation", "monetization"], status: "published", author: "Maria Garcia", createdAt: "2025-10-25", updatedAt: "2025-11-15", views: 7210, featured: false, metaTitle: "Start a YouTube Channel | WealthPath", metaDescription: "How to start and grow a profitable YouTube channel.", links: [] },
  { id: "a7", title: "Mastering Affiliate Marketing", slug: "mastering-affiliate-marketing", excerpt: "Learn how to build a successful affiliate marketing business...", content: "Affiliate marketing allows you to earn commissions by promoting other companies' products. Learn the strategies that top affiliates use to generate six-figure incomes.", category: "Freelancing", tags: ["affiliate", "marketing", "commissions"], status: "scheduled", author: "Chris Taylor", createdAt: "2026-02-12", updatedAt: "2026-02-12", views: 0, featured: false, metaTitle: "Mastering Affiliate Marketing | WealthPath", metaDescription: "Build a successful affiliate marketing business.", links: [] },
  { id: "a8", title: "Side Hustles That Actually Pay Well", slug: "side-hustles-pay-well", excerpt: "Discover side hustles that can significantly boost your income...", content: "Not all side hustles are created equal. We've analyzed dozens of options and identified the ones that offer the best return on your time investment.", category: "Side Hustles", tags: ["side hustle", "extra income", "gig economy"], status: "published", author: "Maria Garcia", createdAt: "2025-09-18", updatedAt: "2025-10-05", views: 11200, featured: true, metaTitle: "Best Side Hustles | WealthPath", metaDescription: "Side hustles that actually pay well in 2026.", links: [] },
]

export const demoCourses: Course[] = [
  { id: "c1", title: "Complete Guide to Online Freelancing", description: "Master the art of freelancing and build a sustainable online career.", instructor: "Maria Garcia", price: 99, status: "active", enrollments: 342, rating: 4.8, createdAt: "2025-06-01", modules: [{ id: "m1", title: "Getting Started", lessons: [{ id: "le1", title: "Welcome & Course Overview", duration: "8 min", type: "video" }, { id: "le2", title: "Setting Up Your Profile", duration: "15 min", type: "video" }, { id: "le3", title: "Quiz: Freelancing Basics", duration: "5 min", type: "quiz" }] }, { id: "m2", title: "Finding Clients", lessons: [{ id: "le4", title: "Platform Strategies", duration: "20 min", type: "video" }, { id: "le5", title: "Cold Outreach Techniques", duration: "18 min", type: "video" }, { id: "le6", title: "Building Your Portfolio", duration: "25 min", type: "text" }] }] },
  { id: "c2", title: "Stock Market Investing Masterclass", description: "Learn to invest in stocks like a professional trader.", instructor: "Emma Wilson", price: 149, status: "active", enrollments: 256, rating: 4.6, createdAt: "2025-07-15", modules: [{ id: "m3", title: "Market Fundamentals", lessons: [{ id: "le7", title: "How Markets Work", duration: "12 min", type: "video" }, { id: "le8", title: "Reading Financial Statements", duration: "22 min", type: "video" }] }, { id: "m4", title: "Technical Analysis", lessons: [{ id: "le9", title: "Chart Patterns", duration: "30 min", type: "video" }, { id: "le10", title: "Indicators & Signals", duration: "25 min", type: "video" }] }] },
  { id: "c3", title: "Real Estate Investment Bootcamp", description: "From zero to real estate investor in 8 weeks.", instructor: "Chris Taylor", price: 199, status: "active", enrollments: 178, rating: 4.9, createdAt: "2025-08-20", modules: [{ id: "m5", title: "Real Estate Basics", lessons: [{ id: "le11", title: "Types of Properties", duration: "15 min", type: "video" }, { id: "le12", title: "Financing Options", duration: "20 min", type: "video" }] }] },
  { id: "c4", title: "Passive Income Blueprint", description: "Build multiple streams of passive income.", instructor: "Maria Garcia", price: 79, status: "draft", enrollments: 0, rating: 0, createdAt: "2026-01-10", modules: [{ id: "m6", title: "Introduction", lessons: [{ id: "le13", title: "What is Passive Income?", duration: "10 min", type: "video" }] }] },
]

export const demoStudentProgress: StudentProgress[] = [
  { id: "sp1", studentName: "Sarah Chen", studentEmail: "sarah@example.com", courseId: "c1", courseName: "Complete Guide to Online Freelancing", progress: 75, lessonsCompleted: 4, totalLessons: 6, quizScore: 88, timeSpent: "4h 30m", lastAccessed: "2026-02-12", status: "in-progress" },
  { id: "sp2", studentName: "Alex Rodriguez", studentEmail: "alex@example.com", courseId: "c1", courseName: "Complete Guide to Online Freelancing", progress: 100, lessonsCompleted: 6, totalLessons: 6, quizScore: 95, timeSpent: "6h 15m", lastAccessed: "2026-02-08", status: "completed" },
  { id: "sp3", studentName: "Sarah Chen", studentEmail: "sarah@example.com", courseId: "c2", courseName: "Stock Market Investing Masterclass", progress: 50, lessonsCompleted: 2, totalLessons: 4, quizScore: 72, timeSpent: "2h 45m", lastAccessed: "2026-02-11", status: "in-progress" },
  { id: "sp4", studentName: "Rachel Green", studentEmail: "rachel@example.com", courseId: "c2", courseName: "Stock Market Investing Masterclass", progress: 25, lessonsCompleted: 1, totalLessons: 4, quizScore: 0, timeSpent: "1h 10m", lastAccessed: "2026-02-09", status: "in-progress" },
  { id: "sp5", studentName: "Priya Patel", studentEmail: "priya@example.com", courseId: "c3", courseName: "Real Estate Investment Bootcamp", progress: 100, lessonsCompleted: 2, totalLessons: 2, quizScore: 91, timeSpent: "3h 20m", lastAccessed: "2026-02-06", status: "completed" },
  { id: "sp6", studentName: "Kevin O'Brien", studentEmail: "kevin@example.com", courseId: "c1", courseName: "Complete Guide to Online Freelancing", progress: 33, lessonsCompleted: 2, totalLessons: 6, quizScore: 0, timeSpent: "1h 50m", lastAccessed: "2026-02-04", status: "in-progress" },
  { id: "sp7", studentName: "Alex Rodriguez", studentEmail: "alex@example.com", courseId: "c3", courseName: "Real Estate Investment Bootcamp", progress: 0, lessonsCompleted: 0, totalLessons: 2, quizScore: 0, timeSpent: "0m", lastAccessed: "2026-02-01", status: "not-started" },
  { id: "sp8", studentName: "Lisa Park", studentEmail: "lisa@example.com", courseId: "c2", courseName: "Stock Market Investing Masterclass", progress: 100, lessonsCompleted: 4, totalLessons: 4, quizScore: 83, timeSpent: "5h 00m", lastAccessed: "2026-01-20", status: "completed" },
]

export const demoPayments: Payment[] = [
  { id: "p1", userId: "u1", userName: "Sarah Chen", amount: 99, currency: "USD", status: "completed", type: "course", description: "Complete Guide to Online Freelancing", date: "2025-08-15", method: "Credit Card" },
  { id: "p2", userId: "u1", userName: "Sarah Chen", amount: 149, currency: "USD", status: "completed", type: "course", description: "Stock Market Investing Masterclass", date: "2025-09-20", method: "Credit Card" },
  { id: "p3", userId: "u4", userName: "Alex Rodriguez", amount: 99, currency: "USD", status: "completed", type: "course", description: "Complete Guide to Online Freelancing", date: "2025-09-01", method: "PayPal" },
  { id: "p4", userId: "u4", userName: "Alex Rodriguez", amount: 199, currency: "USD", status: "completed", type: "course", description: "Real Estate Investment Bootcamp", date: "2025-10-05", method: "Credit Card" },
  { id: "p5", userId: "u5", userName: "Lisa Park", amount: 149, currency: "USD", status: "refunded", type: "course", description: "Stock Market Investing Masterclass", date: "2025-07-22", method: "Credit Card" },
  { id: "p6", userId: "u6", userName: "David Brown", amount: 49, currency: "USD", status: "completed", type: "subscription", description: "Pro Monthly Subscription", date: "2026-02-01", method: "Credit Card" },
  { id: "p7", userId: "u9", userName: "Rachel Green", amount: 149, currency: "USD", status: "completed", type: "course", description: "Stock Market Investing Masterclass", date: "2025-10-18", method: "PayPal" },
  { id: "p8", userId: "u10", userName: "Kevin O'Brien", amount: 99, currency: "USD", status: "pending", type: "course", description: "Complete Guide to Online Freelancing", date: "2026-02-12", method: "Bank Transfer" },
  { id: "p9", userId: "u11", userName: "Priya Patel", amount: 199, currency: "USD", status: "completed", type: "course", description: "Real Estate Investment Bootcamp", date: "2025-05-20", method: "Credit Card" },
  { id: "p10", userId: "u2", userName: "James Miller", amount: 99, currency: "USD", status: "completed", type: "subscription", description: "Pro Yearly Subscription", date: "2025-06-20", method: "Credit Card" },
]

export const demoSubscriptions: Subscription[] = [
  { id: "s1", name: "Free", price: 0, interval: "monthly", features: ["Access to free articles", "Weekly newsletter", "Community forum access"], subscriberCount: 2450, status: "active", revenue: 0 },
  { id: "s2", name: "Pro", price: 19, interval: "monthly", features: ["All free features", "Premium articles", "Course discounts (20%)", "Priority support", "Ad-free experience"], subscriberCount: 380, status: "active", revenue: 7220 },
  { id: "s3", name: "Enterprise", price: 99, interval: "monthly", features: ["All Pro features", "Unlimited course access", "1-on-1 mentoring sessions", "Custom learning paths", "Team management", "API access"], subscriberCount: 45, status: "active", revenue: 4455 },
]

export const demoScheduledContent: ScheduledContent[] = [
  { id: "sc1", title: "Mastering Affiliate Marketing", type: "article", scheduledDate: "2026-02-20", status: "scheduled", author: "Chris Taylor" },
  { id: "sc2", title: "Weekly Newsletter - Issue #47", type: "email", scheduledDate: "2026-02-17", status: "scheduled", author: "Maria Garcia" },
  { id: "sc3", title: "New Course Launch Announcement", type: "social", scheduledDate: "2026-02-25", status: "scheduled", author: "Maria Garcia" },
  { id: "sc4", title: "Tax Season Tips for Freelancers", type: "article", scheduledDate: "2026-03-01", status: "scheduled", author: "Emma Wilson" },
  { id: "sc5", title: "Valentine's Day Promo Email", type: "email", scheduledDate: "2026-02-14", status: "published", author: "Maria Garcia" },
  { id: "sc6", title: "Monthly Webinar Reminder", type: "email", scheduledDate: "2026-02-10", status: "published", author: "Chris Taylor" },
]

export const demoCampaigns: Campaign[] = [
  { id: "cm1", name: "Welcome Series", subject: "Welcome to WealthPath!", status: "sent", recipients: 450, openRate: 68, clickRate: 24, sentDate: "2026-02-01", segment: "New Users" },
  { id: "cm2", name: "Course Launch", subject: "New Course: Passive Income Blueprint", status: "scheduled", recipients: 2830, openRate: 0, clickRate: 0, sentDate: "2026-02-25", segment: "All Subscribers" },
  { id: "cm3", name: "Re-engagement", subject: "We miss you! Here's what's new", status: "sent", recipients: 320, openRate: 42, clickRate: 15, sentDate: "2026-01-15", segment: "Inactive 30+ Days" },
  { id: "cm4", name: "Pro Upsell", subject: "Unlock premium content with Pro", status: "draft", recipients: 0, openRate: 0, clickRate: 0, sentDate: "", segment: "Free Users" },
]

export const demoAffiliates: Affiliate[] = [
  { id: "af1", name: "TechReview Blog", email: "partner@techreview.com", code: "TECH20", status: "active", clicks: 4520, conversions: 89, earnings: 1780, commissionRate: 20, joinedDate: "2025-06-15", lastPayout: "2026-02-01" },
  { id: "af2", name: "Finance With Mike", email: "mike@fwm.com", code: "MIKE15", status: "active", clicks: 3200, conversions: 65, earnings: 975, commissionRate: 15, joinedDate: "2025-07-20", lastPayout: "2026-02-01" },
  { id: "af3", name: "Sarah's Money Tips", email: "sarah@moneytips.com", code: "SARAH25", status: "active", clicks: 2800, conversions: 42, earnings: 1050, commissionRate: 25, joinedDate: "2025-08-10", lastPayout: "2026-01-15" },
  { id: "af4", name: "Digital Nomad Hub", email: "info@dnhub.com", code: "DNH10", status: "pending", clicks: 0, conversions: 0, earnings: 0, commissionRate: 10, joinedDate: "2026-02-10", lastPayout: "" },
  { id: "af5", name: "Investor Daily", email: "ads@investordaily.com", code: "INVEST20", status: "inactive", clicks: 890, conversions: 12, earnings: 240, commissionRate: 20, joinedDate: "2025-04-01", lastPayout: "2025-11-01" },
]

export const demoSupportTickets: SupportTicket[] = [
  { id: "t1", subject: "Cannot access purchased course", userName: "Sarah Chen", userEmail: "sarah@example.com", status: "open", priority: "high", category: "Access Issue", createdAt: "2026-02-13", lastReply: "2026-02-13", messages: [{ sender: "Sarah Chen", text: "I purchased the Stock Market course yesterday but I still can't access it.", date: "2026-02-13" }] },
  { id: "t2", subject: "Refund request for duplicate purchase", userName: "Lisa Park", userEmail: "lisa@example.com", status: "in-progress", priority: "medium", category: "Billing", createdAt: "2026-02-10", lastReply: "2026-02-12", messages: [{ sender: "Lisa Park", text: "I was charged twice for the same course.", date: "2026-02-10" }, { sender: "Support Team", text: "We're looking into this. Can you share the transaction IDs?", date: "2026-02-12" }] },
  { id: "t3", subject: "Certificate not generated", userName: "Priya Patel", userEmail: "priya@example.com", status: "resolved", priority: "low", category: "Certificates", createdAt: "2026-02-05", lastReply: "2026-02-07", messages: [{ sender: "Priya Patel", text: "I completed the Real Estate course but no certificate was generated.", date: "2026-02-05" }, { sender: "Support Team", text: "Your certificate has been manually generated. Apologies for the delay.", date: "2026-02-07" }] },
  { id: "t4", subject: "Video not loading on mobile", userName: "Kevin O'Brien", userEmail: "kevin@example.com", status: "open", priority: "medium", category: "Technical", createdAt: "2026-02-14", lastReply: "2026-02-14", messages: [{ sender: "Kevin O'Brien", text: "Course videos are not loading on my iPhone. Safari browser.", date: "2026-02-14" }] },
]

export const demoCoupons: Coupon[] = [
  { id: "cp1", code: "WELCOME20", discountType: "percentage", discountValue: 20, minPurchase: 0, maxUses: 1000, usedCount: 342, expiryDate: "2026-12-31", status: "active", applicableTo: "All Courses" },
  { id: "cp2", code: "SUMMER50", discountType: "fixed", discountValue: 50, minPurchase: 100, maxUses: 200, usedCount: 200, expiryDate: "2025-09-30", status: "expired", applicableTo: "All Courses" },
  { id: "cp3", code: "PRO3MONTHS", discountType: "percentage", discountValue: 30, minPurchase: 0, maxUses: 500, usedCount: 87, expiryDate: "2026-06-30", status: "active", applicableTo: "Pro Subscription" },
  { id: "cp4", code: "LAUNCH10", discountType: "percentage", discountValue: 10, minPurchase: 0, maxUses: 100, usedCount: 0, expiryDate: "2026-03-31", status: "active", applicableTo: "Passive Income Blueprint" },
]

export const demoCertificates: Certificate[] = [
  { id: "cert1", studentName: "Alex Rodriguez", courseName: "Complete Guide to Online Freelancing", issueDate: "2026-02-08", certificateId: "WP-2026-0001", status: "issued", templateName: "Standard Completion" },
  { id: "cert2", studentName: "Priya Patel", courseName: "Real Estate Investment Bootcamp", issueDate: "2026-02-06", certificateId: "WP-2026-0002", status: "issued", templateName: "Standard Completion" },
  { id: "cert3", studentName: "Lisa Park", courseName: "Stock Market Investing Masterclass", issueDate: "2026-01-20", certificateId: "WP-2026-0003", status: "issued", templateName: "Standard Completion" },
]

export const demoNotifications: Notification[] = [
  { id: "n1", title: "New Course Available", message: "Check out our latest course on Passive Income Blueprint!", type: "push", segment: "All Users", status: "sent", sentDate: "2026-02-10", openRate: 45 },
  { id: "n2", title: "Weekly Digest", message: "Here are the top articles from this week...", type: "email", segment: "Subscribers", status: "sent", sentDate: "2026-02-09", openRate: 52 },
  { id: "n3", title: "Flash Sale Alert", message: "Get 30% off all courses for the next 48 hours!", type: "push", segment: "Students", status: "scheduled", sentDate: "2026-02-20", openRate: 0 },
  { id: "n4", title: "System Maintenance", message: "Scheduled maintenance on Feb 25 from 2-4 AM EST.", type: "in-app", segment: "All Users", status: "draft", sentDate: "", openRate: 0 },
]

export const demoLanguages: Language[] = [
  { id: "lang1", code: "en", name: "English", nativeName: "English", status: "active", completionPercent: 100, translatedKeys: 1250, totalKeys: 1250 },
  { id: "lang2", code: "es", name: "Spanish", nativeName: "Espanol", status: "active", completionPercent: 85, translatedKeys: 1062, totalKeys: 1250 },
  { id: "lang3", code: "fr", name: "French", nativeName: "Francais", status: "active", completionPercent: 72, translatedKeys: 900, totalKeys: 1250 },
  { id: "lang4", code: "de", name: "German", nativeName: "Deutsch", status: "inactive", completionPercent: 45, translatedKeys: 562, totalKeys: 1250 },
  { id: "lang5", code: "pt", name: "Portuguese", nativeName: "Portugues", status: "active", completionPercent: 60, translatedKeys: 750, totalKeys: 1250 },
  { id: "lang6", code: "ja", name: "Japanese", nativeName: "Nihongo", status: "inactive", completionPercent: 20, translatedKeys: 250, totalKeys: 1250 },
]

export const demoIntegrations: Integration[] = [
  { id: "int1", name: "OpenAI", description: "AI-powered article generation and content assistance", icon: "Brain", status: "connected", category: "AI", configFields: [{ key: "apiKey", label: "API Key", value: "sk-demo...xxxx", type: "password" }, { key: "model", label: "Model", value: "gpt-4o", type: "text" }, { key: "orgId", label: "Organization ID", value: "org-demo123", type: "text" }] },
  { id: "int2", name: "Stripe", description: "Payment processing and subscription billing", icon: "CreditCard", status: "connected", category: "Payments", configFields: [{ key: "publishableKey", label: "Publishable Key", value: "pk_demo_xxxx", type: "text" }, { key: "secretKey", label: "Secret Key", value: "sk_demo_xxxx", type: "password" }, { key: "webhookSecret", label: "Webhook Secret", value: "whsec_demo", type: "password" }] },
  { id: "int3", name: "Neon Database", description: "Serverless PostgreSQL database", icon: "Database", status: "connected", category: "Database", configFields: [{ key: "connectionString", label: "Connection String", value: "postgres://demo:xxx@ep-xxx.us-east-2.aws.neon.tech/wealthpath", type: "password" }] },
  { id: "int4", name: "Resend", description: "Transactional and marketing email delivery", icon: "Mail", status: "disconnected", category: "Email", configFields: [{ key: "apiKey", label: "API Key", value: "", type: "password" }, { key: "fromEmail", label: "From Email", value: "", type: "text" }] },
  { id: "int5", name: "Google Analytics", description: "Website traffic and user behavior analytics", icon: "BarChart3", status: "connected", category: "Analytics", configFields: [{ key: "measurementId", label: "Measurement ID", value: "G-DEMO12345", type: "text" }] },
  { id: "int6", name: "Cloudinary", description: "Image and video management", icon: "Image", status: "disconnected", category: "Media", configFields: [{ key: "cloudName", label: "Cloud Name", value: "", type: "text" }, { key: "apiKey", label: "API Key", value: "", type: "text" }, { key: "apiSecret", label: "API Secret", value: "", type: "password" }] },
]

export const demoABTests: ABTest[] = [
  { id: "ab1", name: "Homepage Hero CTA", page: "/", status: "running", startDate: "2026-02-01", endDate: "2026-02-28", variants: [{ name: "Start Learning Free", traffic: 50, conversions: 145, views: 2100 }, { name: "Begin Your Journey", traffic: 50, conversions: 128, views: 2050 }], winner: null },
  { id: "ab2", name: "Pricing Page Layout", page: "/pricing", status: "completed", startDate: "2026-01-10", endDate: "2026-01-31", variants: [{ name: "3-Column Grid", traffic: 50, conversions: 89, views: 1500 }, { name: "Feature Comparison Table", traffic: 50, conversions: 112, views: 1480 }], winner: "Feature Comparison Table" },
  { id: "ab3", name: "Course CTA Button Color", page: "/courses", status: "paused", startDate: "2026-02-05", endDate: "2026-03-05", variants: [{ name: "Green Button", traffic: 33, conversions: 34, views: 600 }, { name: "Blue Button", traffic: 33, conversions: 31, views: 580 }, { name: "Orange Button", traffic: 34, conversions: 38, views: 610 }], winner: null },
]

export const demoAuditLog: AuditLogEntry[] = [
  { id: "al1", user: "Maria Garcia", action: "login", target: "Admin Dashboard", details: "Successful login", timestamp: "2026-02-14T09:00:00Z", ip: "192.168.1.1" },
  { id: "al2", user: "Maria Garcia", action: "update", target: "Article: 10 Proven Ways", details: "Updated content and meta description", timestamp: "2026-02-14T09:15:00Z", ip: "192.168.1.1" },
  { id: "al3", user: "Emma Wilson", action: "create", target: "Article: Crypto Trading 2026", details: "Created new draft article", timestamp: "2026-02-13T14:30:00Z", ip: "192.168.1.5" },
  { id: "al4", user: "Maria Garcia", action: "update", target: "User: Lisa Park", details: "Changed status from active to suspended", timestamp: "2026-02-12T11:00:00Z", ip: "192.168.1.1" },
  { id: "al5", user: "Chris Taylor", action: "create", target: "Course: Real Estate Bootcamp", details: "Published new course", timestamp: "2026-02-11T16:45:00Z", ip: "192.168.1.8" },
  { id: "al6", user: "Maria Garcia", action: "delete", target: "Coupon: FLASH15", details: "Deleted expired coupon", timestamp: "2026-02-10T10:20:00Z", ip: "192.168.1.1" },
  { id: "al7", user: "Emma Wilson", action: "update", target: "Integration: OpenAI", details: "Updated API key", timestamp: "2026-02-09T13:10:00Z", ip: "192.168.1.5" },
  { id: "al8", user: "Maria Garcia", action: "create", target: "Campaign: Welcome Series", details: "Created and sent email campaign", timestamp: "2026-02-08T09:30:00Z", ip: "192.168.1.1" },
  { id: "al9", user: "Chris Taylor", action: "update", target: "Affiliate: TechReview Blog", details: "Updated commission rate to 20%", timestamp: "2026-02-07T15:00:00Z", ip: "192.168.1.8" },
  { id: "al10", user: "Maria Garcia", action: "login", target: "Admin Dashboard", details: "Successful login", timestamp: "2026-02-06T08:45:00Z", ip: "192.168.1.1" },
]

export const demoFlaggedContent: FlaggedContent[] = [
  { id: "fc1", type: "comment", content: "This article is completely wrong and misleading!", reportedBy: "System Auto-Flag", reason: "Negative sentiment", status: "pending", createdAt: "2026-02-13", articleTitle: "Stock Market Investing for Beginners" },
  { id: "fc2", type: "review", content: "Worst course ever. Total scam. Don't waste your money.", reportedBy: "User Report", reason: "Inappropriate language", status: "pending", createdAt: "2026-02-12", articleTitle: "Complete Guide to Online Freelancing" },
  { id: "fc3", type: "comment", content: "Check out my website for FREE money! www.spam-site.com", reportedBy: "System Auto-Flag", reason: "Spam / Self-promotion", status: "rejected", createdAt: "2026-02-11", articleTitle: "10 Proven Ways to Make Money Online" },
  { id: "fc4", type: "comment", content: "Great article! Very helpful information.", reportedBy: "System Auto-Flag", reason: "False positive - positive review", status: "approved", createdAt: "2026-02-10", articleTitle: "Building a Passive Income Portfolio" },
]

export const demoSEORedirects: SEORedirect[] = [
  { id: "r1", from: "/blog/old-investing-guide", to: "/article/stock-market-investing-beginners", type: "301", status: "active" },
  { id: "r2", from: "/blog/freelance-tips", to: "/article/make-money-online-2026", type: "301", status: "active" },
  { id: "r3", from: "/pricing-old", to: "/categories", type: "302", status: "inactive" },
]

export const demoKeywordRankings: KeywordRanking[] = [
  { keyword: "make money online", position: 8, previousPosition: 12, url: "/article/make-money-online-2026", volume: 74000, change: 4 },
  { keyword: "stock market investing beginners", position: 5, previousPosition: 7, url: "/article/stock-market-investing-beginners", volume: 33100, change: 2 },
  { keyword: "passive income ideas", position: 15, previousPosition: 18, url: "/article/passive-income-portfolio", volume: 49500, change: 3 },
  { keyword: "real estate investing guide", position: 11, previousPosition: 9, url: "/article/real-estate-investing-guide", volume: 27100, change: -2 },
  { keyword: "side hustles 2026", position: 3, previousPosition: 5, url: "/article/side-hustles-pay-well", volume: 40500, change: 2 },
  { keyword: "freelancing tips", position: 22, previousPosition: 25, url: "/article/make-money-online-2026", volume: 18100, change: 3 },
]

// Analytics chart data
export const analyticsPageViews = [
  { date: "Jan 1", views: 1200 }, { date: "Jan 8", views: 1850 }, { date: "Jan 15", views: 2100 },
  { date: "Jan 22", views: 1950 }, { date: "Jan 29", views: 2400 }, { date: "Feb 5", views: 2800 },
  { date: "Feb 12", views: 3100 },
]

export const analyticsRevenue = [
  { month: "Sep", revenue: 4200 }, { month: "Oct", revenue: 5100 }, { month: "Nov", revenue: 4800 },
  { month: "Dec", revenue: 6200 }, { month: "Jan", revenue: 7400 }, { month: "Feb", revenue: 8900 },
]

export const analyticsTrafficSources = [
  { source: "Organic Search", value: 45, fill: "hsl(var(--chart-1))" },
  { source: "Direct", value: 25, fill: "hsl(var(--chart-2))" },
  { source: "Social Media", value: 18, fill: "hsl(var(--chart-3))" },
  { source: "Referral", value: 8, fill: "hsl(var(--chart-4))" },
  { source: "Email", value: 4, fill: "hsl(var(--chart-5))" },
]

export const analyticsDevices = [
  { device: "Desktop", value: 52 }, { device: "Mobile", value: 38 }, { device: "Tablet", value: 10 },
]
