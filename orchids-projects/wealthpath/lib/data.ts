export interface InlineLink {
  id: string
  text: string
  url: string
  description?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  featured: boolean
  readTime: string
  date: string
  author: string
  inlineLinks: InlineLink[]
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  articleCount: number
}

export const categories: Category[] = [
  {
    id: "1",
    slug: "freelancing",
    name: "Freelancing",
    description: "Build a thriving freelance career and work on your own terms.",
    icon: "Briefcase",
    articleCount: 3,
  },
  {
    id: "2",
    slug: "investing",
    name: "Investing",
    description: "Grow your wealth through stocks, real estate, and alternative assets.",
    icon: "TrendingUp",
    articleCount: 3,
  },
  {
    id: "3",
    slug: "online-business",
    name: "Online Business",
    description: "Launch and scale profitable online ventures from anywhere.",
    icon: "Globe",
    articleCount: 3,
  },
  {
    id: "4",
    slug: "passive-income",
    name: "Passive Income",
    description: "Create income streams that generate revenue while you sleep.",
    icon: "Zap",
    articleCount: 2,
  },
  {
    id: "5",
    slug: "side-hustles",
    name: "Side Hustles",
    description: "Earn extra income alongside your main job with flexible side gigs.",
    icon: "Layers",
    articleCount: 2,
  },
  {
    id: "6",
    slug: "real-estate",
    name: "Real Estate",
    description: "Build wealth through property investment and rental income.",
    icon: "Home",
    articleCount: 2,
  },
]

export const articles: Article[] = [
  {
    id: "1",
    slug: "complete-guide-to-freelancing-2026",
    title: "The Complete Guide to Freelancing in 2026",
    excerpt: "Everything you need to know about starting and scaling a freelance career, from finding clients to setting rates and managing your business.",
    content: `Starting a freelance career can be one of the most rewarding decisions you make. In 2026, the freelance economy continues to expand, with more businesses seeking skilled independent professionals than ever before.

## Getting Started

The first step is identifying your marketable skills. Whether you're a writer, designer, developer, or consultant, there's demand for your expertise. Begin by creating a professional portfolio that showcases your best work.

## Finding Clients

Building a client base requires both active outreach and passive attraction. Start by optimizing your profiles on major freelancing platforms, then gradually build your own network through LinkedIn and industry events.

## Setting Your Rates

One of the biggest challenges freelancers face is pricing their services. Research market rates for your skill level and location, then factor in your experience, overhead costs, and desired income to arrive at competitive rates.

## Managing Your Business

As a freelancer, you're also a business owner. This means handling invoicing, taxes, contracts, and client relationships. Invest in tools that automate these processes so you can focus on what you do best.

## Scaling Your Income

Once you've established yourself, consider ways to increase your earnings. This could include raising your rates, specializing in a niche, creating digital products, or building a team of subcontractors.`,
    category: "freelancing",
    featured: true,
    readTime: "12 min read",
    date: "2026-02-10",
    author: "Sarah Mitchell",
    inlineLinks: [
      { id: "l1", text: "freelancing platforms", url: "https://example.com/platforms", description: "Top freelancing platforms comparison" },
      { id: "l2", text: "professional portfolio", url: "https://example.com/portfolio-guide", description: "How to build a portfolio" },
    ],
  },
  {
    id: "2",
    slug: "stock-market-investing-beginners",
    title: "Stock Market Investing for Beginners",
    excerpt: "A comprehensive introduction to stock market investing, covering key concepts, strategies, and tools to help you start building wealth through equities.",
    content: `Investing in the stock market remains one of the most effective ways to build long-term wealth. This guide covers everything a beginner needs to know to start investing with confidence.

## Understanding the Basics

The stock market is essentially a marketplace where shares of publicly traded companies are bought and sold. When you buy a stock, you're purchasing a small ownership stake in that company.

## Types of Investments

Beyond individual stocks, you can invest in ETFs (Exchange-Traded Funds), mutual funds, bonds, and index funds. Each has its own risk-reward profile, and a diversified portfolio typically includes a mix of these.

## Getting Started

To begin investing, you'll need to open a brokerage account. Look for platforms with low fees, educational resources, and user-friendly interfaces. Start with an amount you're comfortable with and invest consistently.

## Investment Strategies

Dollar-cost averaging is a popular strategy for beginners. By investing a fixed amount at regular intervals, you reduce the impact of market volatility on your portfolio over time.

## Risk Management

Never invest more than you can afford to lose. Diversify across different sectors and asset classes. Consider your time horizon and risk tolerance when making investment decisions.`,
    category: "investing",
    featured: true,
    readTime: "10 min read",
    date: "2026-02-08",
    author: "James Chen",
    inlineLinks: [
      { id: "l3", text: "brokerage account", url: "https://example.com/brokers", description: "Best online brokers" },
      { id: "l4", text: "Dollar-cost averaging", url: "https://example.com/dca", description: "DCA strategy explained" },
    ],
  },
  {
    id: "3",
    slug: "building-profitable-ecommerce-store",
    title: "Building a Profitable E-Commerce Store",
    excerpt: "Step-by-step guide to launching an e-commerce business, from choosing your niche to driving traffic and converting visitors into customers.",
    content: `E-commerce continues to grow at an unprecedented rate. Whether you're selling physical products, digital goods, or services, building an online store has never been more accessible.

## Choosing Your Niche

Success in e-commerce starts with selecting the right niche. Research market demand, competition levels, and profit margins. Focus on products you're passionate about or have expertise in.

## Setting Up Your Store

Modern e-commerce platforms make it easy to create a professional-looking store without coding experience. Choose a platform that fits your budget and needs, then customize your design and set up payment processing.

## Product Sourcing

You have several options for sourcing products: manufacturing your own, wholesale purchasing, dropshipping, or print-on-demand. Each method has its own advantages and challenges.

## Marketing Your Store

Driving traffic to your store is crucial. Leverage social media marketing, search engine optimization, email marketing, and paid advertising to reach your target audience.

## Scaling and Optimization

Use analytics to understand customer behavior and optimize your store's performance. Test different pricing strategies, product descriptions, and marketing channels to maximize conversions and revenue.`,
    category: "online-business",
    featured: true,
    readTime: "15 min read",
    date: "2026-02-05",
    author: "Emily Rodriguez",
    inlineLinks: [
      { id: "l5", text: "e-commerce platforms", url: "https://example.com/platforms", description: "Platform comparison guide" },
      { id: "l6", text: "dropshipping", url: "https://example.com/dropship", description: "Dropshipping 101" },
    ],
  },
  {
    id: "4",
    slug: "passive-income-streams-guide",
    title: "10 Passive Income Streams You Can Start Today",
    excerpt: "Explore proven passive income strategies that can generate consistent revenue with minimal ongoing effort once set up.",
    content: `Passive income is the holy grail of personal finance. While building passive income streams requires upfront effort, the long-term payoff can be substantial.

## What Is Passive Income?

Passive income is money earned with minimal ongoing effort. Unlike a traditional job where you trade time for money, passive income continues to flow even when you're not actively working.

## Digital Products

Creating and selling digital products like e-books, courses, templates, and software can generate significant passive income. Once created, these products can be sold repeatedly with minimal additional effort.

## Dividend Investing

Building a portfolio of dividend-paying stocks or funds provides regular income without selling your investments. Reinvesting dividends can accelerate wealth building through compound growth.

## Rental Income

Whether through traditional real estate or platforms for short-term rentals, owning property can generate consistent monthly income.

## Content Creation

Building a blog, YouTube channel, or podcast can generate passive income through advertising, sponsorships, and affiliate marketing once you've built an audience.`,
    category: "passive-income",
    featured: false,
    readTime: "8 min read",
    date: "2026-02-01",
    author: "Michael Torres",
    inlineLinks: [
      { id: "l7", text: "dividend-paying stocks", url: "https://example.com/dividends", description: "Best dividend stocks" },
    ],
  },
  {
    id: "5",
    slug: "real-estate-investing-strategies",
    title: "Real Estate Investing: Strategies for Every Budget",
    excerpt: "From REITs to rental properties, discover real estate investment strategies that work for investors at every income level.",
    content: `Real estate has long been one of the most reliable paths to building wealth. Whether you have $500 or $500,000, there's a real estate investment strategy that fits your budget.

## REITs (Real Estate Investment Trusts)

For investors with limited capital, REITs offer an accessible way to invest in real estate. You can buy shares of REITs through any brokerage account, gaining exposure to diversified real estate portfolios.

## Rental Properties

Purchasing rental properties can generate consistent monthly income and long-term appreciation. Success requires careful property selection, effective management, and understanding local market dynamics.

## House Hacking

House hacking involves living in a multi-unit property while renting out the other units. This strategy can significantly reduce or eliminate your housing costs while building equity.

## Real Estate Crowdfunding

Platforms for crowdfunding allow investors to pool capital for larger real estate projects. This provides access to commercial and residential deals that would otherwise require significant capital.

## Fix and Flip

Buying undervalued properties, renovating them, and selling for a profit can be highly lucrative. However, this strategy requires market knowledge, renovation expertise, and careful financial planning.`,
    category: "real-estate",
    featured: false,
    readTime: "11 min read",
    date: "2026-01-28",
    author: "Lisa Park",
    inlineLinks: [
      { id: "l8", text: "REITs", url: "https://example.com/reits", description: "Top REIT investments" },
      { id: "l9", text: "Real Estate Crowdfunding", url: "https://example.com/crowdfunding", description: "Crowdfunding platforms" },
    ],
  },
  {
    id: "6",
    slug: "top-side-hustles-2026",
    title: "Top Side Hustles That Actually Pay Well in 2026",
    excerpt: "Discover the most profitable side hustles you can start alongside your full-time job, with realistic income expectations and getting-started tips.",
    content: `A side hustle can provide extra income, help you develop new skills, and even evolve into a full-time business. Here are the most profitable side hustles for 2026.

## Freelance Writing and Content Creation

With businesses constantly needing fresh content, freelance writing remains a lucrative side hustle. Specialize in technical writing, copywriting, or content marketing to command higher rates.

## Online Tutoring and Coaching

If you have expertise in a particular subject, online tutoring and coaching can be highly profitable. Platforms connect you with students worldwide, and you can set your own schedule and rates.

## Graphic Design

Visual content is in high demand across every industry. If you have design skills, offering logo creation, social media graphics, and branding packages can generate significant side income.

## Web Development

Building websites and web applications for small businesses remains one of the highest-paying side hustles. Even basic web development skills can command premium rates.

## Consulting

Leveraging your professional expertise as a consultant allows you to charge premium hourly rates while helping businesses solve specific problems in your area of expertise.`,
    category: "side-hustles",
    featured: false,
    readTime: "9 min read",
    date: "2026-01-25",
    author: "David Kim",
    inlineLinks: [
      { id: "l10", text: "freelance writing", url: "https://example.com/writing", description: "Starting a writing career" },
    ],
  },
  {
    id: "7",
    slug: "affiliate-marketing-complete-guide",
    title: "Affiliate Marketing: From Zero to First Commission",
    excerpt: "Learn how to build a profitable affiliate marketing business, from choosing products to creating content that converts.",
    content: `Affiliate marketing offers one of the lowest-barrier entries into the world of online income. By promoting products and earning commissions, you can build a sustainable income stream.

## How Affiliate Marketing Works

At its core, affiliate marketing involves promoting someone else's products and earning a commission for every sale made through your unique referral link. It's a win-win for both parties.

## Choosing Your Niche

Success in affiliate marketing starts with selecting the right niche. Focus on topics you're knowledgeable about and that have strong commercial potential. Research affiliate programs in your chosen niche.

## Building Your Platform

Whether through a blog, YouTube channel, social media, or email list, you need a platform to reach your audience. Focus on providing genuine value and building trust before promoting products.

## Creating Converting Content

The best affiliate marketers create detailed product reviews, comparison guides, and how-to content that naturally incorporates affiliate recommendations.

## Scaling Your Earnings

As your audience grows, diversify your income by joining multiple affiliate programs, negotiating higher commission rates, and creating your own products to complement your affiliate offerings.`,
    category: "online-business",
    featured: false,
    readTime: "13 min read",
    date: "2026-01-20",
    author: "Rachel Green",
    inlineLinks: [
      { id: "l11", text: "affiliate programs", url: "https://example.com/affiliate", description: "Best affiliate programs" },
    ],
  },
  {
    id: "8",
    slug: "cryptocurrency-investing-guide",
    title: "Cryptocurrency Investing: A Balanced Approach",
    excerpt: "Navigate the world of cryptocurrency with practical advice on risk management, portfolio allocation, and long-term strategies.",
    content: `Cryptocurrency has emerged as a new asset class that offers both significant opportunities and risks. This guide provides a balanced perspective on investing in digital assets.

## Understanding Cryptocurrency

Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Bitcoin, Ethereum, and thousands of other cryptocurrencies are traded on various exchanges.

## Getting Started Safely

Before investing in cryptocurrency, educate yourself about the technology, risks, and regulatory landscape. Start with established cryptocurrencies and use reputable exchanges with strong security measures.

## Portfolio Allocation

Most financial advisors recommend limiting cryptocurrency exposure to a small percentage of your overall portfolio. This helps manage risk while still benefiting from potential upside.

## Security Best Practices

Securing your cryptocurrency is paramount. Use hardware wallets for long-term storage, enable two-factor authentication on all accounts, and never share your private keys.

## Long-Term Strategy

Rather than trying to time the market, consider a long-term buy-and-hold strategy for cryptocurrencies you believe have strong fundamentals and use cases.`,
    category: "investing",
    featured: false,
    readTime: "10 min read",
    date: "2026-01-15",
    author: "Alex Johnson",
    inlineLinks: [
      { id: "l12", text: "reputable exchanges", url: "https://example.com/exchanges", description: "Top crypto exchanges" },
      { id: "l13", text: "hardware wallets", url: "https://example.com/wallets", description: "Best hardware wallets" },
    ],
  },
  {
    id: "9",
    slug: "remote-work-high-paying-jobs",
    title: "High-Paying Remote Jobs You Can Start This Year",
    excerpt: "Explore remote career opportunities that offer competitive salaries and the flexibility to work from anywhere in the world.",
    content: `The remote work revolution has opened doors to high-paying jobs that were previously limited to specific locations. Here are the most lucrative remote opportunities available today.

## Software Development

Remote software development positions consistently rank among the highest-paying remote jobs. Full-stack developers, mobile developers, and cloud engineers are in particularly high demand.

## Data Science and Analytics

Companies across every industry need data professionals who can analyze complex datasets and derive actionable insights. These roles often command six-figure salaries.

## Product Management

Product managers who can lead cross-functional teams remotely are highly valued. This role combines technical understanding, business strategy, and user empathy.

## Digital Marketing Management

Senior digital marketing roles, particularly in SEO, paid advertising, and growth marketing, offer competitive remote salaries with the flexibility to work from anywhere.

## UX/UI Design

User experience and interface designers play a crucial role in creating products people love. Remote design roles offer creative fulfillment and competitive compensation.`,
    category: "freelancing",
    featured: false,
    readTime: "7 min read",
    date: "2026-01-10",
    author: "Sophie Williams",
    inlineLinks: [
      { id: "l14", text: "Remote software development", url: "https://example.com/remote-dev", description: "Remote dev job boards" },
    ],
  },
  {
    id: "10",
    slug: "creating-selling-online-courses",
    title: "How to Create and Sell Online Courses",
    excerpt: "Turn your expertise into a profitable online course business with this comprehensive guide to course creation, marketing, and sales.",
    content: `Creating online courses has become one of the most scalable ways to monetize your expertise. The e-learning market continues to grow, offering tremendous opportunities for course creators.

## Identifying Your Topic

Choose a topic where you have deep expertise and there's clear market demand. Validate your idea by researching existing courses and surveying your potential audience.

## Course Structure and Content

Design your course with clear learning outcomes. Break complex topics into digestible modules and lessons. Include a mix of video, text, quizzes, and practical exercises.

## Production Quality

While you don't need a Hollywood studio, invest in basic equipment: a good microphone, proper lighting, and screen recording software. Quality content with decent production values wins every time.

## Choosing a Platform

Select a platform that fits your needs, whether it's hosting on your own site for maximum control or leveraging established marketplaces for built-in traffic.

## Marketing and Sales

Build anticipation before launch with email marketing, social media content, and webinars. Offer early-bird pricing and gather testimonials to build social proof.`,
    category: "passive-income",
    featured: false,
    readTime: "11 min read",
    date: "2026-01-05",
    author: "Marcus Lee",
    inlineLinks: [
      { id: "l15", text: "e-learning market", url: "https://example.com/elearning", description: "E-learning market trends" },
    ],
  },
  {
    id: "11",
    slug: "starting-saas-business",
    title: "Starting a SaaS Business: The Definitive Guide",
    excerpt: "Learn how to identify a viable SaaS idea, build your product, acquire customers, and scale your software business.",
    content: `Software as a Service (SaaS) businesses offer recurring revenue, scalability, and the potential for significant returns. Here's your roadmap to building a successful SaaS company.

## Finding Your Idea

The best SaaS ideas solve real problems. Talk to potential customers, observe pain points in your industry, and look for processes that could be automated or improved with software.

## Validating Your Concept

Before writing a single line of code, validate your idea. Create a landing page, run ads to gauge interest, and conduct customer interviews to confirm willingness to pay.

## Building Your MVP

Focus on core functionality first. Your minimum viable product should solve the primary problem well, even if it lacks bells and whistles. Ship fast and iterate based on user feedback.

## Pricing Strategy

Research competitor pricing and understand the value your product provides. Consider tiered pricing with free trials to lower the barrier to entry and encourage upgrades.

## Customer Acquisition

Combine inbound marketing (content, SEO) with outbound strategies (cold outreach, partnerships). Track customer acquisition costs and lifetime value to ensure sustainable growth.`,
    category: "online-business",
    featured: false,
    readTime: "14 min read",
    date: "2026-01-02",
    author: "Nina Patel",
    inlineLinks: [
      { id: "l16", text: "minimum viable product", url: "https://example.com/mvp", description: "MVP development guide" },
    ],
  },
  {
    id: "12",
    slug: "rental-property-beginners",
    title: "Your First Rental Property: A Step-by-Step Guide",
    excerpt: "Navigate the process of buying and managing your first rental property, from financing to tenant selection and property management.",
    content: `Owning rental property is a time-tested strategy for building wealth through both monthly cash flow and long-term appreciation.

## Financial Preparation

Before purchasing a rental property, ensure your personal finances are in order. You'll typically need a larger down payment than for a primary residence, usually 20-25%.

## Market Research

Location is everything in real estate. Research neighborhoods with strong rental demand, low vacancy rates, and potential for appreciation. Consider proximity to employers, schools, and amenities.

## Financing Your Purchase

Explore financing options including conventional mortgages, FHA loans, and private lending. Compare interest rates, terms, and down payment requirements to find the best fit.

## Property Management

Decide whether to self-manage or hire a property management company. Self-management saves money but requires time and effort. Professional management typically costs 8-12% of monthly rent.

## Tenant Selection

A thorough tenant screening process is essential. Check credit reports, verify employment and income, contact previous landlords, and conduct background checks to find reliable tenants.`,
    category: "real-estate",
    featured: false,
    readTime: "10 min read",
    date: "2025-12-28",
    author: "Robert Martinez",
    inlineLinks: [
      { id: "l17", text: "FHA loans", url: "https://example.com/fha", description: "FHA loan guide" },
    ],
  },
  {
    id: "13",
    slug: "freelance-web-developer-roadmap",
    title: "Freelance Web Developer: Complete Roadmap",
    excerpt: "A step-by-step roadmap to becoming a successful freelance web developer, from learning to code to landing your first paying client.",
    content: `Freelance web development offers exceptional earning potential and flexibility. Here's your complete roadmap from beginner to thriving freelance developer.

## Learning the Fundamentals

Start with HTML, CSS, and JavaScript. These are the building blocks of the web and essential for any web developer. Focus on understanding core concepts before moving to frameworks.

## Choosing Your Stack

Once you're comfortable with the basics, choose a technology stack to specialize in. React, Next.js, Vue, or WordPress are all strong choices depending on your target market.

## Building Your Portfolio

Create 3-5 impressive projects that demonstrate your skills. Include case studies that explain your thought process, challenges faced, and results achieved.

## Finding Your First Clients

Start with local businesses that need websites. Offer competitive introductory rates to build your portfolio and gather testimonials. Use freelancing platforms as a supplement to direct outreach.

## Growing Your Business

Raise your rates as you gain experience. Specialize in a niche for higher-value clients. Consider productizing your services for more predictable income.`,
    category: "freelancing",
    featured: false,
    readTime: "9 min read",
    date: "2025-12-20",
    author: "Chris Walker",
    inlineLinks: [
      { id: "l18", text: "React, Next.js", url: "https://example.com/react", description: "React developer resources" },
    ],
  },
  {
    id: "14",
    slug: "index-fund-investing-guide",
    title: "Index Fund Investing: The Simple Path to Wealth",
    excerpt: "Discover why index fund investing is the strategy of choice for many financial experts and how to get started today.",
    content: `Index fund investing has been called the greatest financial innovation for individual investors. It offers broad market exposure, low costs, and historically strong returns.

## What Are Index Funds?

Index funds are investment funds that track a specific market index, like the S&P 500. Instead of trying to beat the market, they aim to match its performance.

## Why Index Funds Win

Studies consistently show that most actively managed funds underperform their benchmark indexes over the long term, especially after accounting for fees.

## Getting Started

Open a brokerage account with a low-cost provider. Look for index funds with expense ratios below 0.20%. Start with a broad market fund and gradually diversify as your portfolio grows.

## Asset Allocation

Your allocation between stocks and bonds should reflect your age, risk tolerance, and time horizon. A common starting point is subtracting your age from 110 to determine your stock allocation percentage.

## Staying the Course

The key to index fund investing success is consistency and patience. Invest regularly, avoid panic selling during market downturns, and let compound growth work in your favor over decades.`,
    category: "investing",
    featured: false,
    readTime: "8 min read",
    date: "2025-12-15",
    author: "Amanda Foster",
    inlineLinks: [
      { id: "l19", text: "S&P 500", url: "https://example.com/sp500", description: "S&P 500 index details" },
    ],
  },
  {
    id: "15",
    slug: "gig-economy-maximizing-earnings",
    title: "Maximizing Your Earnings in the Gig Economy",
    excerpt: "Practical strategies for making the most of gig economy platforms, from ride-sharing to delivery services and task-based work.",
    content: `The gig economy provides flexible earning opportunities for millions of people. Learn how to maximize your income across various platforms.

## Choosing the Right Platforms

Not all gig platforms are created equal. Research earning potential, flexibility, and requirements for different platforms. Many successful gig workers use multiple platforms simultaneously.

## Optimizing Your Schedule

Peak hours and high-demand periods can significantly impact your earnings. Track your income by time of day and day of week to identify the most profitable windows.

## Managing Expenses

As a gig worker, you're responsible for your own expenses including fuel, vehicle maintenance, and insurance. Track all expenses meticulously for tax deductions.

## Building a Reputation

High ratings and positive reviews unlock better opportunities on most platforms. Provide excellent service consistently to build a strong profile that attracts more work.

## Transitioning to Independence

Use gig work experience as a stepping stone to building your own independent service business, where you can set higher rates and build direct client relationships.`,
    category: "side-hustles",
    featured: false,
    readTime: "7 min read",
    date: "2025-12-10",
    author: "Jason Taylor",
    inlineLinks: [
      { id: "l20", text: "gig economy platforms", url: "https://example.com/gig", description: "Top gig economy apps" },
    ],
  },
]

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter(a => a.category === categorySlug)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase()
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
  )
}
