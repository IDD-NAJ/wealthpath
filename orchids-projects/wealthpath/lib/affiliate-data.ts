// ─────────────────────────────────────────────
// WealthPath — Affiliate Data Layer
// All data is static/in-memory mock data
// ─────────────────────────────────────────────

export interface AffiliateProgram {
  id: string
  name: string
  slug: string
  logo: string // emoji placeholder — replace with real logo URLs
  tagline: string
  description: string
  category: string
  categorySlug: string
  niche?: string // short niche label, e.g. "Stock Broker"
  rating: number // 1-5 with one decimal
  reviewCount: number
  commission: string // e.g. "Up to 30%" or "$50 per lead"
  commissionValue?: number // numeric value for sorting
  commissionType: 'percentage' | 'flat' | 'hybrid'
  cookieDuration: number // days
  payoutThreshold: string // e.g. "$50"
  payoutFrequency: string // e.g. "Monthly"
  pros: string[]
  cons: string[]
  pricing: PricingTier[]
  features: string[]
  affiliateUrl: string
  affiliateLink?: string // alias — falls back to affiliateUrl
  website: string
  status?: 'active' | 'pending' | 'inactive'
  featured: boolean
  trending: boolean
  editorsPick: boolean
  badge?: 'Best Overall' | 'Best Value' | 'Most Popular' | 'Top Rated' | 'New'
  founded?: string
  hq?: string
  countryAvailability: string[]
  tags: string[]
  faq: FAQ[]
}

export interface PricingTier {
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}

export interface FAQ {
  question: string
  answer: string
}

export interface Category {
  slug: string
  name: string
  icon: string
  description: string
  longDescription: string
  programCount: number
  featured: boolean
  color: string // tailwind bg class
}

export interface Comparison {
  slug: string
  title: string
  description: string
  programSlugs: string[]
  publishedAt: string
  updatedAt: string
}

export interface Review {
  slug: string
  title: string
  excerpt: string
  category: string
  programSlug: string
  rating: number
  author: Author
  publishedAt: string
  readingTime: number
  featured: boolean
  coverImage: string
}

export interface Author {
  name: string
  avatar: string
  title: string
}

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug: 'investing',
    name: 'Investing',
    icon: '📈',
    description: 'Stock brokers, robo-advisors, and investment platforms',
    longDescription:
      'Compare the top investment platforms for beginners and experienced investors. Find the best stock brokers, ETF platforms, and robo-advisors with competitive fees and powerful tools.',
    programCount: 18,
    featured: true,
    color: 'bg-blue-50',
  },
  {
    slug: 'crypto',
    name: 'Crypto',
    icon: '₿',
    description: 'Cryptocurrency exchanges and wallets',
    longDescription:
      'Discover the best cryptocurrency exchanges, wallets, and trading platforms. Compare fees, security features, supported coins, and earning programs.',
    programCount: 14,
    featured: true,
    color: 'bg-orange-50',
  },
  {
    slug: 'ai-tools',
    name: 'AI Tools',
    icon: '🤖',
    description: 'AI productivity tools and software platforms',
    longDescription:
      'Explore the best AI-powered productivity and business tools. From writing assistants to code generators, find the right AI platform with top affiliate commissions.',
    programCount: 22,
    featured: true,
    color: 'bg-purple-50',
  },
  {
    slug: 'web-hosting',
    name: 'Web Hosting',
    icon: '🌐',
    description: 'Website hosting, domains, and cloud services',
    longDescription:
      'Compare web hosting providers, cloud platforms, and domain registrars. Find the best hosting solutions with generous affiliate payouts.',
    programCount: 16,
    featured: true,
    color: 'bg-teal-50',
  },
  {
    slug: 'credit-cards',
    name: 'Credit Cards',
    icon: '💳',
    description: 'Credit cards, cashback, and rewards programs',
    longDescription:
      'Browse the best credit card affiliate programs offering travel rewards, cashback, and business perks. High CPA rates and long cookie windows.',
    programCount: 12,
    featured: true,
    color: 'bg-green-50',
  },
  {
    slug: 'business-software',
    name: 'Business Software',
    icon: '💼',
    description: 'CRM, project management, and SaaS tools',
    longDescription:
      'Discover top-performing SaaS affiliate programs including CRMs, project management tools, and productivity platforms with recurring commissions.',
    programCount: 30,
    featured: true,
    color: 'bg-indigo-50',
  },
  {
    slug: 'forex-trading',
    name: 'Forex & Trading',
    icon: '📊',
    description: 'Forex brokers and CFD trading platforms',
    longDescription:
      'Find the top forex brokers and CFD trading platforms with high affiliate commissions, competitive spreads, and global regulatory compliance.',
    programCount: 10,
    featured: false,
    color: 'bg-yellow-50',
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    description: 'Life, health, auto, and business insurance',
    longDescription:
      'Compare insurance affiliate programs offering life, health, auto, and business coverage with high per-lead payouts.',
    programCount: 8,
    featured: false,
    color: 'bg-red-50',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: '🏠',
    description: 'Property investment and rental platforms',
    longDescription:
      'Explore real estate crowdfunding platforms, REITs, and property investment tools with competitive affiliate programs.',
    programCount: 9,
    featured: false,
    color: 'bg-emerald-50',
  },
  {
    slug: 'education',
    name: 'Education',
    icon: '🎓',
    description: 'Online courses, certifications, and e-learning',
    longDescription:
      'Find the best online education and e-learning affiliate programs. From professional certifications to skill-building courses with recurring revenue.',
    programCount: 20,
    featured: false,
    color: 'bg-sky-50',
  },
  {
    slug: 'banking',
    name: 'Banking',
    icon: '🏦',
    description: 'Online banks, neobanks, and savings accounts',
    longDescription:
      'Review the top online banks and neobanks offering generous sign-up bonuses, high-yield savings, and attractive affiliate programs.',
    programCount: 11,
    featured: false,
    color: 'bg-cyan-50',
  },
  {
    slug: 'tax-accounting',
    name: 'Tax & Accounting',
    icon: '🧾',
    description: 'Tax filing, accounting software, and bookkeeping',
    longDescription:
      'Compare tax filing services and accounting software platforms with high-value affiliate commissions during tax season and year-round.',
    programCount: 7,
    featured: false,
    color: 'bg-lime-50',
  },
]

// ─────────────────────────────────────────────
// AFFILIATE PROGRAMS
// ─────────────────────────────────────────────

export const affiliatePrograms: AffiliateProgram[] = [
  {
    id: '1',
    name: 'Robinhood',
    slug: 'robinhood',
    logo: '🟢',
    tagline: 'Commission-free stock and crypto trading',
    description:
      'Robinhood is the pioneer of commission-free investing with an intuitive mobile-first platform for stocks, ETFs, options, and cryptocurrency trading. Its Gold membership unlocks professional-grade market data and margin trading.',
    category: 'Investing',
    categorySlug: 'investing',
    rating: 4.2,
    reviewCount: 1847,
    commission: '$20 per funded account',
    commissionType: 'flat',
    cookieDuration: 30,
    payoutThreshold: '$50',
    payoutFrequency: 'Monthly',
    pros: [
      'Zero commission on stock and ETF trades',
      'Simple, beginner-friendly interface',
      'Fractional shares from $1',
      'Crypto trading integrated',
      'High referral acceptance rate',
    ],
    cons: [
      'No mutual funds or bonds',
      'Limited research tools on free tier',
      'Customer support can be slow',
    ],
    pricing: [
      {
        name: 'Standard',
        price: 'Free',
        period: 'forever',
        features: ['Commission-free stocks', 'Crypto trading', 'Basic charts', 'Instant deposits up to $1K'],
      },
      {
        name: 'Gold',
        price: '$5',
        period: 'month',
        features: ['Level II Nasdaq data', 'Margin trading', 'Larger instant deposits', 'Morningstar research'],
        highlight: true,
      },
    ],
    features: ['Commission-free trading', 'Fractional shares', 'Crypto support', 'Options trading', 'IRA accounts'],
    affiliateUrl: 'https://robinhood.com/us/en/about/affiliate/',
    website: 'https://robinhood.com',
    featured: true,
    trending: true,
    editorsPick: true,
    badge: 'Most Popular',
    founded: '2013',
    hq: 'Menlo Park, CA',
    countryAvailability: ['US'],
    tags: ['stocks', 'crypto', 'free trading', 'mobile', 'fractional shares'],
    faq: [
      {
        question: 'How does the Robinhood affiliate program work?',
        answer:
          'You earn $20 for every user who signs up through your link and funds their account. Payouts are made monthly once you reach the $50 threshold.',
      },
      {
        question: 'Is Robinhood safe to use?',
        answer:
          'Yes, Robinhood is regulated by FINRA and the SEC, and accounts are SIPC-insured up to $500,000.',
      },
    ],
  },
  {
    id: '2',
    name: 'eToro',
    slug: 'etoro',
    logo: '🔵',
    tagline: 'Social trading and multi-asset investment platform',
    description:
      'eToro is the world\'s leading social trading platform, allowing users to copy the portfolios of top traders automatically. Trade stocks, crypto, ETFs, and commodities with a built-in social community of 30M+ investors.',
    category: 'Investing',
    categorySlug: 'investing',
    rating: 4.4,
    reviewCount: 2341,
    commission: 'Up to $200 per deposit',
    commissionType: 'flat',
    cookieDuration: 45,
    payoutThreshold: '$100',
    payoutFrequency: 'Monthly',
    pros: [
      'CopyTrader feature for passive investing',
      'Social feed and community',
      '3,000+ tradeable assets',
      'Regulated in multiple jurisdictions',
      'High commission potential',
    ],
    cons: [
      'Withdrawal fee of $5',
      'Spreads can be wide on some assets',
      'US users have limited asset selection',
    ],
    pricing: [
      {
        name: 'Retail',
        price: 'Free',
        period: 'account',
        features: ['CopyTrader', 'Social feed', 'Virtual portfolio', '$200 minimum deposit'],
        highlight: true,
      },
    ],
    features: ['CopyTrader', 'Social trading', 'Multi-asset', 'CFDs', 'Smart portfolios', 'Demo account'],
    affiliateUrl: 'https://www.etoro.com/partners/',
    website: 'https://www.etoro.com',
    featured: true,
    trending: false,
    editorsPick: true,
    badge: 'Best Overall',
    founded: '2007',
    hq: 'Limassol, Cyprus',
    countryAvailability: ['US', 'UK', 'EU', 'AU', 'Global'],
    tags: ['social trading', 'copy trading', 'crypto', 'stocks', 'global'],
    faq: [
      {
        question: 'What is CopyTrader?',
        answer:
          'CopyTrader lets you automatically mirror the trades of successful investors. When they buy or sell, your account does the same proportionally.',
      },
    ],
  },
  {
    id: '3',
    name: 'Coinbase',
    slug: 'coinbase',
    logo: '🔷',
    tagline: 'The most trusted cryptocurrency platform',
    description:
      'Coinbase is the leading US-based cryptocurrency exchange with 240+ supported coins, institutional-grade security, and one of the most recognized brands in crypto. Their affiliate program offers competitive commissions on trading fees.',
    category: 'Crypto',
    categorySlug: 'crypto',
    rating: 4.3,
    reviewCount: 3102,
    commission: '50% of trading fees (3 months)',
    commissionType: 'percentage',
    cookieDuration: 30,
    payoutThreshold: '$50',
    payoutFrequency: 'Monthly',
    pros: [
      'Brand recognition converts visitors easily',
      'FDIC-insured USD wallets',
      '240+ cryptocurrencies',
      'Staking and earn programs',
      'Advanced trading via Coinbase Pro',
    ],
    cons: [
      'High fees vs. competitors',
      'Customer support backlog',
      'Not available in all US states',
    ],
    pricing: [
      {
        name: 'Standard',
        price: 'Free',
        period: 'account',
        features: ['240+ coins', 'Mobile app', 'Coinbase Wallet', 'Staking'],
      },
      {
        name: 'Advanced',
        price: 'Free',
        period: 'account',
        features: ['Lower fees', 'Pro charts', 'Limit orders', 'API access'],
        highlight: true,
      },
    ],
    features: ['Crypto exchange', 'Wallet', 'Staking', 'NFT marketplace', 'Institutional custody', 'Earn rewards'],
    affiliateUrl: 'https://www.coinbase.com/affiliates',
    website: 'https://www.coinbase.com',
    featured: true,
    trending: true,
    editorsPick: false,
    badge: 'Top Rated',
    founded: '2012',
    hq: 'San Francisco, CA',
    countryAvailability: ['US', 'UK', 'EU', 'CA', 'AU', 'Global'],
    tags: ['bitcoin', 'ethereum', 'crypto exchange', 'staking', 'NFT'],
    faq: [
      {
        question: 'How long does the Coinbase affiliate cookie last?',
        answer: 'The referral cookie is valid for 30 days from the first click.',
      },
    ],
  },
  {
    id: '4',
    name: 'ChatGPT / OpenAI',
    slug: 'openai-chatgpt',
    logo: '🧠',
    tagline: 'The world\'s leading AI assistant and API platform',
    description:
      'OpenAI\'s ChatGPT is the most-used AI assistant globally, with a rapidly growing affiliate program for creators and publishers. Promote ChatGPT Plus, Team, and Enterprise plans with attractive commission structures.',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    rating: 4.8,
    reviewCount: 5290,
    commission: 'Up to 30% recurring',
    commissionType: 'percentage',
    cookieDuration: 60,
    payoutThreshold: '$25',
    payoutFrequency: 'Monthly',
    pros: [
      'Brand recognition drives high conversion',
      'Recurring commission on subscriptions',
      'Broad audience appeal',
      'Growing product suite (GPT, DALL·E, Whisper)',
      'Long 60-day cookie window',
    ],
    cons: [
      'Program still maturing',
      'No direct affiliate for API usage',
    ],
    pricing: [
      {
        name: 'Free',
        price: '$0',
        period: 'month',
        features: ['GPT-3.5 access', 'Basic capabilities', 'Web browsing limited'],
      },
      {
        name: 'Plus',
        price: '$20',
        period: 'month',
        features: ['GPT-4o access', 'DALL·E 3', 'Advanced analysis', 'Faster responses'],
        highlight: true,
      },
      {
        name: 'Team',
        price: '$25',
        period: 'user/month',
        features: ['GPT-4o', 'Longer context', 'Admin console', 'Data privacy'],
      },
    ],
    features: ['GPT-4o', 'Image generation', 'Code interpreter', 'Voice mode', 'Custom GPTs', 'API access'],
    affiliateUrl: 'https://openai.com/affiliate-program',
    website: 'https://chat.openai.com',
    featured: true,
    trending: true,
    editorsPick: true,
    badge: 'Best Overall',
    founded: '2015',
    hq: 'San Francisco, CA',
    countryAvailability: ['Global'],
    tags: ['AI', 'chatbot', 'GPT-4', 'writing', 'code generation', 'image generation'],
    faq: [
      {
        question: 'Can I earn recurring commissions?',
        answer: 'Yes, the OpenAI affiliate program offers up to 30% recurring commission on Plus and Team subscriptions for the first 12 months.',
      },
    ],
  },
  {
    id: '5',
    name: 'Jasper AI',
    slug: 'jasper-ai',
    logo: '🟣',
    tagline: 'AI writing assistant for marketing teams',
    description:
      'Jasper is the enterprise-grade AI writing platform trusted by over 100,000 businesses for marketing copy, blogs, and brand content. Its affiliate program offers one of the highest recurring commission rates in the AI tools space.',
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    rating: 4.5,
    reviewCount: 1892,
    commission: '30% recurring for life',
    commissionType: 'percentage',
    cookieDuration: 45,
    payoutThreshold: '$25',
    payoutFrequency: 'Monthly',
    pros: [
      '30% lifetime recurring commissions',
      'High average order value',
      'Rich affiliate resources provided',
      'Dedicated affiliate manager',
      '45-day cookie window',
    ],
    cons: [
      'Higher price point may reduce conversions',
      'Saturated affiliate market',
    ],
    pricing: [
      {
        name: 'Creator',
        price: '$39',
        period: 'month',
        features: ['1 Brand Voice', '50+ templates', 'Browser extension', 'Jasper Chat'],
      },
      {
        name: 'Pro',
        price: '$59',
        period: 'month',
        features: ['3 Brand Voices', 'SEO mode', 'Collaboration', 'AI image generation'],
        highlight: true,
      },
      {
        name: 'Business',
        price: 'Custom',
        period: 'month',
        features: ['Unlimited Brand Voices', 'API access', 'Custom workflows', 'SSO'],
      },
    ],
    features: ['AI copywriting', 'Brand voice', 'SEO integration', '50+ templates', 'Image generation', 'Team collaboration'],
    affiliateUrl: 'https://www.jasper.ai/affiliates',
    website: 'https://www.jasper.ai',
    featured: false,
    trending: true,
    editorsPick: true,
    badge: 'Best Value',
    founded: '2021',
    hq: 'Austin, TX',
    countryAvailability: ['Global'],
    tags: ['AI writing', 'copywriting', 'marketing', 'content creation', 'SEO'],
    faq: [
      {
        question: 'Is the 30% commission really for life?',
        answer: 'Yes, as long as your referred users remain subscribers, you continue earning 30% of their monthly payments.',
      },
    ],
  },
  {
    id: '6',
    name: 'Bluehost',
    slug: 'bluehost',
    logo: '🔵',
    tagline: 'Reliable web hosting recommended by WordPress',
    description:
      'Bluehost is one of the oldest and most trusted web hosting providers, officially recommended by WordPress.org since 2005. Their affiliate program consistently ranks among the highest-paying in the hosting industry.',
    category: 'Web Hosting',
    categorySlug: 'web-hosting',
    rating: 4.1,
    reviewCount: 4521,
    commission: '$65–$130 per sale',
    commissionType: 'flat',
    cookieDuration: 90,
    payoutThreshold: '$100',
    payoutFrequency: 'Monthly',
    pros: [
      '$65+ per sale with performance bonuses',
      '90-day cookie — industry leading',
      'WordPress officially recommended',
      'High brand recognition',
      'Large creative asset library',
    ],
    cons: [
      'Renewal pricing significantly higher',
      'Upsells can frustrate users',
      'Support quality varies',
    ],
    pricing: [
      {
        name: 'Basic',
        price: '$2.95',
        period: 'month',
        features: ['1 website', '10 GB SSD', 'Free domain (year 1)', 'SSL certificate'],
      },
      {
        name: 'Choice Plus',
        price: '$5.45',
        period: 'month',
        features: ['Unlimited websites', 'Unlimited SSD', 'Domain privacy', 'CodeGuard Basic'],
        highlight: true,
      },
    ],
    features: ['WordPress hosting', 'Free domain', 'SSL certificate', 'cPanel', 'Email hosting', '24/7 support'],
    affiliateUrl: 'https://www.bluehost.com/affiliates',
    website: 'https://www.bluehost.com',
    featured: true,
    trending: false,
    editorsPick: false,
    badge: 'Most Popular',
    founded: '2003',
    hq: 'Burlington, MA',
    countryAvailability: ['Global'],
    tags: ['WordPress hosting', 'shared hosting', 'domain', 'web hosting'],
    faq: [
      {
        question: 'When do I get paid?',
        answer: 'Commissions are paid out 45–60 days after the referred sale, once the customer\'s refund window has passed.',
      },
    ],
  },
  {
    id: '7',
    name: 'Binance',
    slug: 'binance',
    logo: '🟡',
    tagline: 'The world\'s largest crypto exchange by volume',
    description:
      'Binance processes over $60B in daily volume and offers one of the most generous affiliate programs in crypto, with up to 50% commission on trading fees. Their referral system supports spot, futures, and margin trading.',
    category: 'Crypto',
    categorySlug: 'crypto',
    rating: 4.5,
    reviewCount: 6140,
    commission: 'Up to 50% of trading fees',
    commissionType: 'percentage',
    cookieDuration: 30,
    payoutThreshold: '$10',
    payoutFrequency: 'Daily',
    pros: [
      'Up to 50% commission on trading fees',
      'Daily payouts — fastest in class',
      '600+ coins available',
      'Futures and margin available',
      'Strong global brand',
    ],
    cons: [
      'Not available in the US',
      'Regulatory challenges in some countries',
      'Complex for beginners',
    ],
    pricing: [
      {
        name: 'Standard',
        price: 'Free',
        period: 'account',
        features: ['Spot trading', 'NFT marketplace', '600+ coins', 'P2P trading'],
        highlight: true,
      },
    ],
    features: ['Spot trading', 'Futures', 'Margin', 'Staking', 'Launchpad', 'NFT marketplace', 'Web3 wallet'],
    affiliateUrl: 'https://www.binance.com/en/activity/affiliate',
    website: 'https://www.binance.com',
    featured: true,
    trending: true,
    editorsPick: false,
    badge: 'Top Rated',
    founded: '2017',
    hq: 'Cayman Islands',
    countryAvailability: ['EU', 'UK', 'AU', 'APAC', 'LATAM'],
    tags: ['bitcoin', 'altcoins', 'futures', 'DeFi', 'largest exchange'],
    faq: [
      {
        question: 'How often are commissions paid on Binance?',
        answer: 'Binance pays commissions daily in the form of BNB or USDT directly to your account.',
      },
    ],
  },
  {
    id: '8',
    name: 'HubSpot',
    slug: 'hubspot',
    logo: '🧡',
    tagline: 'All-in-one CRM and marketing platform',
    description:
      'HubSpot is the world\'s leading inbound marketing and CRM platform, used by 200,000+ businesses. Their affiliate program offers a 30% recurring commission with one of the most trusted brands in B2B software.',
    category: 'Business Software',
    categorySlug: 'business-software',
    rating: 4.6,
    reviewCount: 2890,
    commission: '30% recurring for 1 year',
    commissionType: 'percentage',
    cookieDuration: 90,
    payoutThreshold: '$50',
    payoutFrequency: 'Monthly',
    pros: [
      '30% recurring for full year',
      '90-day cookie window',
      'High AOV ($500–$10K/yr plans)',
      'Trusted enterprise brand',
      'Excellent affiliate resources',
    ],
    cons: [
      'Pricing can be high for SMBs',
      'Long sales cycle for enterprise',
    ],
    pricing: [
      {
        name: 'Starter',
        price: '$18',
        period: 'month',
        features: ['CRM', 'Email marketing', 'Forms', 'Live chat'],
      },
      {
        name: 'Professional',
        price: '$800',
        period: 'month',
        features: ['Marketing automation', 'SEO tools', 'Social media', 'Custom reporting'],
        highlight: true,
      },
    ],
    features: ['CRM', 'Email marketing', 'Marketing automation', 'Sales pipeline', 'Customer service hub', 'Analytics'],
    affiliateUrl: 'https://www.hubspot.com/partners/affiliates',
    website: 'https://www.hubspot.com',
    featured: true,
    trending: false,
    editorsPick: true,
    badge: 'Best Overall',
    founded: '2006',
    hq: 'Cambridge, MA',
    countryAvailability: ['Global'],
    tags: ['CRM', 'marketing automation', 'B2B', 'SaaS', 'sales'],
    faq: [
      {
        question: 'Does HubSpot offer a free CRM?',
        answer: 'Yes, HubSpot\'s core CRM is free forever with no credit card required. Paid plans add advanced automation and reporting.',
      },
    ],
  },
  {
    id: '9',
    name: 'Acorns',
    slug: 'acorns',
    logo: '🌰',
    tagline: 'Micro-investing for everyday investors',
    description:
      'Acorns rounds up your everyday purchases and automatically invests the spare change. With 10M+ users, it\'s the leading micro-investing platform in the US with a compelling affiliate program targeting first-time investors.',
    category: 'Investing',
    categorySlug: 'investing',
    rating: 4.0,
    reviewCount: 1204,
    commission: '$10 per funded account',
    commissionType: 'flat',
    cookieDuration: 30,
    payoutThreshold: '$50',
    payoutFrequency: 'Monthly',
    pros: [
      'High conversion from round-up concept',
      'Popular with millennials and Gen Z',
      'Simple sign-up flow',
      'Banking and investment combined',
    ],
    cons: [
      'Lower $10 flat rate',
      'US-only availability',
      'Monthly fee may deter small investors',
    ],
    pricing: [
      {
        name: 'Personal',
        price: '$3',
        period: 'month',
        features: ['Invest', 'Retire', 'Checking account', 'Round-Ups'],
        highlight: true,
      },
      {
        name: 'Family',
        price: '$5',
        period: 'month',
        features: ['Personal +', 'Early accounts for kids', 'GoHenry integration'],
      },
    ],
    features: ['Round-up investing', 'Automated portfolios', 'IRA accounts', 'Checking account', 'Found money rewards'],
    affiliateUrl: 'https://www.acorns.com/affiliates/',
    website: 'https://www.acorns.com',
    featured: false,
    trending: false,
    editorsPick: false,
    badge: 'New',
    founded: '2012',
    hq: 'Long Beach, CA',
    countryAvailability: ['US'],
    tags: ['micro-investing', 'round-up', 'beginners', 'passive investing'],
    faq: [
      {
        question: 'Who is Acorns best for?',
        answer: 'Acorns is ideal for beginners who want to start investing without thinking about it. The round-up feature makes it completely passive.',
      },
    ],
  },
  {
    id: '10',
    name: 'Shopify',
    slug: 'shopify',
    logo: '🛍️',
    tagline: 'The commerce platform for entrepreneurs',
    description:
      'Shopify powers over 4 million businesses worldwide and offers one of the highest-paying affiliate programs for e-commerce content creators. Earn up to $150 per merchant referral with extensive marketing resources.',
    category: 'Business Software',
    categorySlug: 'business-software',
    rating: 4.7,
    reviewCount: 4102,
    commission: 'Up to $150 per referral',
    commissionType: 'flat',
    cookieDuration: 30,
    payoutThreshold: '$25',
    payoutFrequency: 'Bi-weekly',
    pros: [
      'Up to $150 high flat-rate commission',
      'Industry-leading brand recognition',
      '14-day free trial increases conversions',
      'Bi-weekly payouts',
      'Comprehensive affiliate training',
    ],
    cons: [
      'Competitive affiliate market',
      'Monthly transaction fees add up',
    ],
    pricing: [
      {
        name: 'Basic',
        price: '$29',
        period: 'month',
        features: ['Online store', '2 staff accounts', 'Shipping discounts', 'Sales reports'],
      },
      {
        name: 'Shopify',
        price: '$79',
        period: 'month',
        features: ['5 staff accounts', 'Professional reports', 'Gift cards', 'Lower fees'],
        highlight: true,
      },
    ],
    features: ['Online store builder', 'Payment processing', 'Inventory management', 'Marketing tools', 'App store', 'POS'],
    affiliateUrl: 'https://www.shopify.com/affiliates',
    website: 'https://www.shopify.com',
    featured: true,
    trending: true,
    editorsPick: true,
    badge: 'Best Value',
    founded: '2006',
    hq: 'Ottawa, Canada',
    countryAvailability: ['Global'],
    tags: ['ecommerce', 'dropshipping', 'online store', 'B2B', 'entrepreneurs'],
    faq: [
      {
        question: 'How long does the Shopify affiliate cookie last?',
        answer: 'The cookie lasts 30 days. If a merchant starts a trial within 30 days of clicking your link, you earn the commission.',
      },
    ],
  },
  {
    id: '11',
    name: 'NordVPN',
    slug: 'nordvpn',
    logo: '🔒',
    tagline: 'The world\'s leading VPN service',
    description:
      'NordVPN is the most trusted VPN service globally with 6,000+ servers in 60 countries. Its affiliate program is one of the most lucrative in the cybersecurity space with 40-100% first-purchase commissions.',
    category: 'Business Software',
    categorySlug: 'business-software',
    rating: 4.6,
    reviewCount: 3712,
    commission: '40-100% on first payment',
    commissionType: 'percentage',
    cookieDuration: 30,
    payoutThreshold: '$10',
    payoutFrequency: 'Monthly',
    pros: [
      '40-100% first-payment commission',
      'Strong brand trust and recognition',
      'High conversion rate',
      'Broad audience (privacy-conscious users)',
      '30-day money-back guarantee helps conversions',
    ],
    cons: [
      'Saturated market',
      'Price pressure from competitors',
    ],
    pricing: [
      {
        name: '1-Year',
        price: '$4.99',
        period: 'month',
        features: ['6,000+ servers', '60 countries', '6 devices', 'Kill switch'],
      },
      {
        name: '2-Year',
        price: '$3.39',
        period: 'month',
        features: ['All 1-Year features', 'Best value', 'Threat Protection', 'Meshnet'],
        highlight: true,
      },
    ],
    features: ['6,000+ servers', 'Zero logs', 'Kill switch', 'Split tunneling', 'Threat Protection', 'Meshnet'],
    affiliateUrl: 'https://affiliate.nordvpn.com',
    website: 'https://nordvpn.com',
    featured: false,
    trending: true,
    editorsPick: false,
    badge: 'Top Rated',
    founded: '2012',
    hq: 'Panama City, Panama',
    countryAvailability: ['Global'],
    tags: ['VPN', 'privacy', 'security', 'streaming', 'cybersecurity'],
    faq: [
      {
        question: 'What is the commission structure?',
        answer: '100% commission on the first monthly payment, 40% on annual plans, and 30% on renewals.',
      },
    ],
  },
  {
    id: '12',
    name: 'Wealthfront',
    slug: 'wealthfront',
    logo: '💚',
    tagline: 'Automated investing and high-yield banking',
    description:
      'Wealthfront is the leading robo-advisor with $75B+ in assets under management. Their referral program rewards both the referrer and referee, making conversions easy and natural for personal finance audiences.',
    category: 'Investing',
    categorySlug: 'investing',
    rating: 4.5,
    reviewCount: 978,
    commission: '$50 per funded account',
    commissionType: 'flat',
    cookieDuration: 60,
    payoutThreshold: '$50',
    payoutFrequency: 'Monthly',
    pros: [
      '$50 flat — highest in robo-advisor space',
      '60-day cookie window',
      'High-yield cash account (5%+ APY)',
      'Low 0.25% management fee attracts users',
      'Tax-loss harvesting built in',
    ],
    cons: [
      'US only',
      'No human advisors',
      '$500 minimum to start',
    ],
    pricing: [
      {
        name: 'Automated Investing',
        price: '0.25%',
        period: 'annual AUM',
        features: ['Tax-loss harvesting', 'Auto-rebalancing', 'Direct indexing', 'Risk parity'],
        highlight: true,
      },
    ],
    features: ['Automated investing', 'Tax-loss harvesting', 'Financial planning', 'Cash account', 'Stock-level tax'],
    affiliateUrl: 'https://www.wealthfront.com/affiliate',
    website: 'https://www.wealthfront.com',
    featured: false,
    trending: false,
    editorsPick: true,
    badge: 'Best Value',
    founded: '2008',
    hq: 'Palo Alto, CA',
    countryAvailability: ['US'],
    tags: ['robo-advisor', 'automated investing', 'tax-loss harvesting', 'ETFs'],
    faq: [
      {
        question: 'What is the minimum to open a Wealthfront account?',
        answer: 'The minimum to start investing is $500. Their cash account has no minimum.',
      },
    ],
  },
]

// ─────────────────────────────────────────────
// COMPARISONS
// ─────────────────────────────────────────────

export const comparisons: Comparison[] = [
  {
    slug: 'best-ai-writing-tools',
    title: 'Best AI Writing Tools 2025',
    description: 'Compare ChatGPT, Jasper, and the top AI writing assistants side by side.',
    programSlugs: ['openai-chatgpt', 'jasper-ai'],
    publishedAt: '2025-01-10',
    updatedAt: '2025-06-15',
  },
  {
    slug: 'best-crypto-exchanges',
    title: 'Best Crypto Exchanges 2025',
    description: 'Coinbase vs Binance — which crypto exchange offers better fees and features?',
    programSlugs: ['coinbase', 'binance'],
    publishedAt: '2025-02-01',
    updatedAt: '2025-06-10',
  },
  {
    slug: 'best-robo-advisors',
    title: 'Best Robo-Advisors for 2025',
    description: 'Wealthfront vs Robinhood vs eToro — automated investing compared.',
    programSlugs: ['wealthfront', 'robinhood', 'etoro'],
    publishedAt: '2025-03-05',
    updatedAt: '2025-06-20',
  },
  {
    slug: 'best-ecommerce-platforms',
    title: 'Best E-commerce Platforms 2025',
    description: 'Shopify vs HubSpot and the top platforms for building your online store.',
    programSlugs: ['shopify', 'hubspot'],
    publishedAt: '2025-01-20',
    updatedAt: '2025-06-01',
  },
  {
    slug: 'best-web-hosting',
    title: 'Best Web Hosting Providers 2025',
    description: 'Bluehost vs NordVPN and the top hosting affiliate programs reviewed.',
    programSlugs: ['bluehost', 'nordvpn'],
    publishedAt: '2025-04-01',
    updatedAt: '2025-06-25',
  },
]

// ─────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────

export const reviews: Review[] = [
  {
    slug: 'robinhood-review-2025',
    title: 'Robinhood Review 2025: Is Commission-Free Trading Worth It?',
    excerpt: 'We tested Robinhood for 6 months. Here\'s our complete verdict on fees, features, and who should use it.',
    category: 'Investing',
    programSlug: 'robinhood',
    rating: 4.2,
    author: { name: 'Marcus Chen', avatar: 'MC', title: 'Investment Analyst' },
    publishedAt: '2025-06-01',
    readingTime: 12,
    featured: true,
    coverImage: '/images/reviews/robinhood.jpg',
  },
  {
    slug: 'coinbase-review-2025',
    title: 'Coinbase Review 2025: Best Crypto Exchange for Beginners?',
    excerpt: 'Coinbase remains the easiest on-ramp to crypto, but are the fees still too high? We dig into every detail.',
    category: 'Crypto',
    programSlug: 'coinbase',
    rating: 4.3,
    author: { name: 'Sofia Park', avatar: 'SP', title: 'Crypto Analyst' },
    publishedAt: '2025-05-28',
    readingTime: 10,
    featured: true,
    coverImage: '/images/reviews/coinbase.jpg',
  },
  {
    slug: 'jasper-ai-review-2025',
    title: 'Jasper AI Review 2025: Best AI Writer for Marketers?',
    excerpt: 'After writing 50+ articles with Jasper, we share exactly what it\'s good for, what it misses, and if it\'s worth $39/month.',
    category: 'AI Tools',
    programSlug: 'jasper-ai',
    rating: 4.5,
    author: { name: 'Aiden Walsh', avatar: 'AW', title: 'Content Strategist' },
    publishedAt: '2025-06-10',
    readingTime: 14,
    featured: true,
    coverImage: '/images/reviews/jasper.jpg',
  },
  {
    slug: 'shopify-review-2025',
    title: 'Shopify Review 2025: Is It Still the Best E-commerce Platform?',
    excerpt: 'With Shopify raising prices, we evaluate if it\'s still the best choice for online merchants in 2025.',
    category: 'Business Software',
    programSlug: 'shopify',
    rating: 4.7,
    author: { name: 'Priya Nair', avatar: 'PN', title: 'E-commerce Expert' },
    publishedAt: '2025-06-15',
    readingTime: 11,
    featured: false,
    coverImage: '/images/reviews/shopify.jpg',
  },
  {
    slug: 'hubspot-review-2025',
    title: 'HubSpot CRM Review 2025: Is the Free Plan Still Good?',
    excerpt: 'HubSpot\'s free CRM is legendary, but the paid plans can get expensive fast. Here\'s exactly when to upgrade.',
    category: 'Business Software',
    programSlug: 'hubspot',
    rating: 4.6,
    author: { name: 'Marcus Chen', avatar: 'MC', title: 'Investment Analyst' },
    publishedAt: '2025-06-05',
    readingTime: 13,
    featured: false,
    coverImage: '/images/reviews/hubspot.jpg',
  },
  {
    slug: 'bluehost-review-2025',
    title: 'Bluehost Review 2025: Still the Best Budget WordPress Host?',
    excerpt: 'Bluehost has been a go-to for bloggers for 20 years. But is the experience still up to modern standards?',
    category: 'Web Hosting',
    programSlug: 'bluehost',
    rating: 4.1,
    author: { name: 'Aiden Walsh', avatar: 'AW', title: 'Content Strategist' },
    publishedAt: '2025-05-20',
    readingTime: 9,
    featured: false,
    coverImage: '/images/reviews/bluehost.jpg',
  },
]

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

export function getProgramBySlug(slug: string): AffiliateProgram | undefined {
  return affiliatePrograms.find((p) => p.slug === slug)
}

export function getProgramsByCategory(categorySlug: string): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.categorySlug === categorySlug)
}

export function getFeaturedPrograms(): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.featured)
}

export function getTrendingPrograms(): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.trending)
}

export function getEditorsPickPrograms(): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.editorsPick)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getFeaturedCategories(): Category[] {
  return categories.filter((c) => c.featured)
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}

export function getComparisonPrograms(comparison: Comparison): AffiliateProgram[] {
  return comparison.programSlugs.map((s) => getProgramBySlug(s)).filter(Boolean) as AffiliateProgram[]
}

export function getFeaturedReviews(): Review[] {
  return reviews.filter((r) => r.featured)
}

export function searchPrograms(query: string): AffiliateProgram[] {
  const q = query.toLowerCase()
  return affiliatePrograms.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}

// ─────────────────────────────────────────────
// ALIASES & DERIVED HELPERS
// ─────────────────────────────────────────────

/** Alias so both `categories` and `affiliateCategories` work. */
export const affiliateCategories = categories

/** Get the numeric commission value for a program (for sort). */
export function getProgramCommissionValue(p: AffiliateProgram): number {
  if (p.commissionValue !== undefined) return p.commissionValue
  const match = p.commission.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/** Get the program's affiliate link (prefer affiliateLink, fall back to affiliateUrl). */
export function getProgramLink(p: AffiliateProgram): string {
  return p.affiliateLink ?? p.affiliateUrl
}

/** Get the program's status (default to 'active' if not set). */
export function getProgramStatus(p: AffiliateProgram): 'active' | 'pending' | 'inactive' {
  return p.status ?? 'active'
}

/** Get the program's niche label (fall back to category). */
export function getProgramNiche(p: AffiliateProgram): string {
  return p.niche ?? p.category
}
