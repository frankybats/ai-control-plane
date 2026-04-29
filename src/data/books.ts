export interface Book {
  id: string;
  title: string;
  topic: string;
  topicTag: string;
  description: string;
  keyTopics: string[];
  targetAudience: string;
  authorNote: string;
  formats: Format[];
  asin: { kindle: string; paperback: string; hardcover: string };
  coverColor: string;
  coverGradient: string;
  featured: boolean;
  creatorEdition: boolean;
  publishDate: string;
  resources: string[];
}

export interface Format {
  type: 'kindle' | 'paperback' | 'hardcover';
  price: number;
  pages: number;
  label: string;
}

export const topics = [
  { id: 'all', label: 'All Topics' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'blockchain', label: 'Blockchain & Crypto' },
  { id: 'networking', label: 'Networking' },
];

export const books: Book[] = [
  {
    id: 'llm-deep-dive',
    title: 'LLM - DEEP DIVE',
    topic: 'ai',
    topicTag: 'AI & Machine Learning',
    description: 'Want a real understanding of the fascinating technology behind ChatGPT, Bard, and other cutting-edge AI? LLM - Deep Dive takes you behind the scenes of Large Language Models (LLMs), providing a practical guide to building and training your own AI. Forget complicated jargon and abstract concepts—this book gives you insights and helps you learn quickly, empowering you to start building your own AI solutions.',
    keyTopics: ['LLM Fundamentals & Architecture', 'Environment Setup (GPUs, TPUs, PyTorch)', 'Data Acquisition & Management', 'Training Techniques & Optimization', 'Project Management Best Practices', 'Performance Optimization Tricks'],
    targetAudience: 'AI enthusiasts who want to build their own LLMs, data scientists looking to expand their skill set, developers interested in integrating LLMs into their applications, and anyone curious about the future of AI and natural language processing.',
    authorNote: 'I wrote this book because the technology behind ChatGPT and similar AI tools is fascinating yet accessible. This guide takes you from understanding what LLMs are to actually building and training your own. Every concept is explained in plain language with practical, hands-on guidance.',
    formats: [
      { type: 'kindle', price: 6.99, pages: 131, label: 'Kindle eBook' },
      { type: 'paperback', price: 12.99, pages: 416, label: 'Paperback' },
      { type: 'hardcover', price: 24.99, pages: 250, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0DYP56YTX', paperback: 'B0DYP7YDKF', hardcover: 'B0F9FSR5WM' },
    coverColor: 'from-blue-600 to-cyan-500',
    coverGradient: 'from-blue-900 via-blue-700 to-cyan-600',
    featured: true,
    creatorEdition: false,
    publishDate: '2025-02-26',
    resources: ['Hands-on project guides', 'Training optimization checklists', 'Environment setup scripts'],
  },
  {
    id: 'xrp-deep-dive',
    title: 'XRP - DEEP DIVE',
    topic: 'blockchain',
    topicTag: 'Blockchain & Crypto',
    description: 'Are you ready to explore the future of finance? XRP, the digital asset powering Ripple\'s innovative technology, is transforming cross-border payments and offering exciting investment opportunities. Master XRP is your definitive guide to understanding, utilizing, and investing in Ripple\'s XRP cryptocurrency. This meticulously researched book demystifies the complexities of XRP and the XRP Ledger.',
    keyTopics: ['XRP, Ripple & XRP Ledger Explained', 'Cross-chain Interoperability', 'Cross-border Payment Revolution', 'Investment Strategies (DCA, Trading)', 'Wallet Security & Risk Mitigation', 'Regulatory Landscape & Compliance'],
    targetAudience: 'Financial professionals, seasoned crypto traders, and anyone curious about the power of blockchain technology and the future of cross-border payments.',
    authorNote: 'XRP is one of the most misunderstood assets in crypto. This book cuts through the Twitter hype and FUD to deliver a clear, comprehensive look at the digital asset that\'s genuinely transforming how money moves globally. Whether you\'re investing or just understanding the tech, this is your essential briefing.',
    formats: [
      { type: 'kindle', price: 6.99, pages: 96, label: 'Kindle eBook' },
      { type: 'paperback', price: 12.99, pages: 96, label: 'Paperback' },
      { type: 'hardcover', price: 24.99, pages: 78, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0DYP2MZ7C', paperback: 'B0DYP2MZ7C', hardcover: 'B0FHQP5WN1' },
    coverColor: 'from-indigo-600 to-blue-500',
    coverGradient: 'from-indigo-900 via-indigo-700 to-blue-600',
    featured: true,
    creatorEdition: false,
    publishDate: '2025-02-21',
    resources: ['Investment strategy templates', 'Security checklist', 'Regulatory reference guide'],
  },
  {
    id: 'solana-deep-dive',
    title: 'SOLANA - DEEP DIVE',
    topic: 'blockchain',
    topicTag: 'Blockchain & Crypto',
    description: 'Ready to dive into the world of blockchain and build your own dApps? This book is your practical, step-by-step guide to mastering the Solana blockchain, even if you\'re completely new to the technology! SOLANA - DEEP DIVE goes beyond theory, walking you through every step from setting up your development environment to deploying real-world applications.',
    keyTopics: ['Solana Architecture & Core Concepts', 'Development Environment Setup', 'Building Solana dApps', 'DeFi Protocol Development', 'Validator Monitoring (Prometheus & Grafana)', 'Real-world DeFi, NFT & Gaming Projects'],
    targetAudience: 'Both novices and experienced developers seeking a rapid, hands-on introduction to Solana blockchain development and dApp deployment.',
    authorNote: 'Solana\'s speed and low costs make it the perfect blockchain for developers who want to build real applications without the overhead. This book is designed to get you from zero to deploying your first Solana dApp as quickly as possible, with real hands-on projects along the way.',
    formats: [
      { type: 'kindle', price: 4.99, pages: 180, label: 'Kindle eBook' },
      { type: 'paperback', price: 17.99, pages: 180, label: 'Paperback' },
      { type: 'hardcover', price: 34.99, pages: 180, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0F7M2KZ9X', paperback: 'B0F7M2KZ9X', hardcover: 'B0F7M2KZ9X' },
    coverColor: 'from-purple-600 to-violet-500',
    coverGradient: 'from-purple-900 via-purple-700 to-violet-600',
    featured: true,
    creatorEdition: false,
    publishDate: '2025-05-06',
    resources: ['Complete glossary', 'Troubleshooting tips', 'Monitoring tool configurations'],
  },
  {
    id: 'tether-deep-dive',
    title: 'TETHER - DEEP DIVE',
    topic: 'blockchain',
    topicTag: 'Blockchain & Crypto',
    description: 'Tether (USDT): Indispensable Crypto Engine or Ticking Time Bomb? It moves more money daily than almost any other crypto. It\'s the backbone of trading and DeFi. It aims for $1.00 stability. But Tether (USDT) is also crypto\'s most controversial asset, haunted by questions about its reserves, regulatory battles, and potential systemic risk. TETHER - DEEP DIVE cuts through the confusion.',
    keyTopics: ['How Tether Actually Works ($1 Peg, Minting/Burning)', 'Why USDT Dominates Trading & DeFi', 'Peg Stability Dangers & Counterparty Risks', 'Secure Wallet Management', 'Global Regulatory Landscape', 'Reserve Controversy Explained'],
    targetAudience: 'Crypto investors, traders, DeFi users, and anyone trying to understand the market\'s most important stablecoin and its systemic implications.',
    authorNote: 'Tether is the backbone of crypto that nobody fully understands. This book delivers a clear, comprehensive look at the stablecoin giant that powers the crypto world—without the hysteria. Whether you\'re trading, using DeFi, or just trying to understand the market\'s linchpin, this gives you the clarity you need.',
    formats: [
      { type: 'kindle', price: 6.99, pages: 150, label: 'Kindle eBook' },
      { type: 'paperback', price: 14.99, pages: 150, label: 'Paperback' },
      { type: 'hardcover', price: 24.99, pages: 150, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0F7LMRKHM', paperback: 'B0F7LMRKHM', hardcover: 'B0F7LMRKHM' },
    coverColor: 'from-emerald-600 to-green-500',
    coverGradient: 'from-emerald-900 via-emerald-700 to-green-600',
    featured: true,
    creatorEdition: false,
    publishDate: '2025-05-05',
    resources: ['Wallet security checklist', 'Transaction hygiene guide', 'Regulatory reference sheet'],
  },
  {
    id: 'ccna-deep-dive',
    title: 'CCNA - DEEP DIVE',
    topic: 'networking',
    topicTag: 'Networking',
    description: 'Master Cisco networking from the ground up. CCNA - DEEP DIVE goes beyond the theory, providing a practical, hands-on approach to understanding Cisco networking fundamentals. Whether you\'re preparing for your CCNA certification or building real-world networking skills, this guide covers everything from basic networking concepts to advanced Cisco configurations.',
    keyTopics: ['Cisco IOS Configuration', 'Network Fundamentals & OSI Model', 'IP Addressing & Subnetting', 'Routing & Switching', 'Network Security Fundamentals', 'Automation & Programmability'],
    targetAudience: 'IT professionals preparing for CCNA certification, network administrators, and anyone building a foundation in Cisco networking technologies.',
    authorNote: 'CCNA certification opens doors, but the real value is in understanding how networks actually work. This book bridges the gap between exam preparation and practical knowledge, giving you the hands-on skills that matter in real networking environments.',
    formats: [
      { type: 'kindle', price: 6.99, pages: 200, label: 'Kindle eBook' },
      { type: 'paperback', price: 17.99, pages: 200, label: 'Paperback' },
      { type: 'hardcover', price: 29.99, pages: 200, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0DYG63JHX', paperback: 'B0DYG63JHX', hardcover: 'B0DYG63JHX' },
    coverColor: 'from-sky-600 to-blue-500',
    coverGradient: 'from-sky-900 via-sky-700 to-blue-600',
    featured: false,
    creatorEdition: false,
    publishDate: '2025-02-20',
    resources: ['Lab exercises', 'Configuration templates', 'Subnetting practice sheets'],
  },
  {
    id: 'ai-python-creators-deep-dive',
    title: 'AI with Python - Creator\'s Edition - DEEP DIVE',
    topic: 'ai',
    topicTag: 'AI & Machine Learning',
    description: 'The Creator\'s Edition of AI with Python takes you deeper into artificial intelligence development with Python. This premium edition includes expanded content, additional projects, and advanced techniques for building intelligent systems. From foundational machine learning to cutting-edge deep learning, this guide provides production-ready code and real-world case studies.',
    keyTopics: ['Advanced Python AI Techniques', 'Neural Network Architecture', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Production ML Deployment'],
    targetAudience: 'Intermediate to advanced Python developers, data scientists, and AI practitioners looking for an expanded, premium guide to artificial intelligence implementation.',
    authorNote: 'The Creator\'s Edition is my expanded, premium take on AI with Python. It includes everything from the standard edition plus additional advanced projects, deeper architectural discussions, and production deployment strategies that I use in my own consulting work. This is the definitive edition for serious AI practitioners.',
    formats: [
      { type: 'kindle', price: 9.99, pages: 350, label: 'Kindle eBook' },
      { type: 'paperback', price: 17.99, pages: 350, label: 'Paperback' },
      { type: 'hardcover', price: 29.99, pages: 350, label: 'Hardcover' },
    ],
    asin: { kindle: 'B0DZD8S4VR', paperback: 'B0DZD8S4VR', hardcover: 'B0DZD8S4VR' },
    coverColor: 'from-teal-600 to-cyan-500',
    coverGradient: 'from-teal-900 via-teal-700 to-cyan-600',
    featured: false,
    creatorEdition: true,
    publishDate: '2025-03-15',
    resources: ['Expanded code repository', 'Jupyter notebook collection', 'Deployment templates'],
  },
];

// Helper to build Amazon purchase URL from ASIN
export function getAmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}`;
}

// Helper to build Amazon search URL for author
export function getAuthorSearchUrl(): string {
  return 'https://www.amazon.com/s?k=Charles+Sterling+DEEP+DIVE&i=stripbooks';
}

export function getBookById(id: string): Book | undefined {
  return books.find(b => b.id === id);
}

export function getFeaturedBooks(): Book[] {
  return books.filter(b => b.featured);
}

export function getBooksByTopic(topic: string): Book[] {
  if (topic === 'all') return books;
  return books.filter(b => b.topic === topic);
}

export function getCreatorEditions(): Book[] {
  return books.filter(b => b.creatorEdition);
}
