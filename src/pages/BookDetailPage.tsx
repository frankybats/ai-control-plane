import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getBookById, getAmazonUrl } from '../data/books';

type Tab = 'overview' | 'formats' | 'author' | 'resources';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(id || '');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [hoveredFormat, setHoveredFormat] = useState<string | null>(null);

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-slate-300 mb-4">Book not found</h2>
          <Link to="/books" className="text-electric hover:underline">← Back to catalog</Link>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'formats', label: 'Formats & Pricing' },
    { id: 'author', label: 'Author Note' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-slate-500 hover:text-electric transition-colors">Home</Link></li>
            <li className="text-slate-600">/</li>
            <li><Link to="/books" className="text-slate-500 hover:text-electric transition-colors">Books</Link></li>
            <li className="text-slate-600">/</li>
            <li className="text-slate-300 truncate max-w-xs">{book.title}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-12">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28">
              <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 glow-border`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${book.coverGradient}`} />
                <div className="absolute inset-0 circuit-lines opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-white/20">
                    DEEP DIVE Series
                  </div>
                  <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {book.title.replace(' - DEEP DIVE', '').replace(' DEEP DIVE', '')}
                  </h1>
                  <div className="w-16 h-0.5 bg-white/30 mb-4" />
                  <p className="text-white/80 text-sm font-medium">by Charles Sterling</p>
                  {book.creatorEdition && (
                    <div className="mt-4 px-3 py-1 rounded-lg bg-amber-500/90 text-navy-950 text-xs font-bold tracking-wide">
                      CREATOR'S EDITION
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Buy */}
              <div className="mt-4 p-4 bg-navy-800/60 border border-navy-700/50 rounded-xl">
                <p className="text-slate-400 text-xs mb-3 font-medium">QUICK PURCHASE</p>
                <div className="flex gap-2">
                  {book.formats.map(f => (
                    <a
                      key={f.type}
                      href={getAmazonUrl(f.type === 'kindle' ? book.asin.kindle : f.type === 'paperback' ? book.asin.paperback : book.asin.hardcover)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-2.5 bg-electric text-navy-950 font-semibold rounded-lg hover:bg-electric/90 transition-colors text-sm"
                    >
                      ${f.price}
                    </a>
                  ))}
                </div>
                <p className="text-slate-600 text-[10px] mt-2 text-center">Opens on Amazon</p>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-electric/10 text-electric text-xs font-semibold tracking-wide uppercase mb-4">
              {book.topicTag}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {book.title}
            </h1>

            <p className="text-slate-400 text-lg mb-2">by Charles Sterling</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
              <span>{book.formats[1].pages} pages</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full" />
              <span>Published {new Date(book.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Tabs */}
            <div className="border-b border-navy-700 mb-6">
              <div className="flex overflow-x-auto -mb-px">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'text-electric border-electric'
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg mb-3">Description</h3>
                    <p className="text-slate-400 leading-relaxed mb-8">{book.description}</p>

                    <h3 className="text-slate-200 font-semibold text-lg mb-3">Key Topics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {book.keyTopics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-electric rounded-full flex-shrink-0" />
                          <span className="text-slate-300">{topic}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-slate-200 font-semibold text-lg mb-3">Target Audience</h3>
                    <p className="text-slate-400 leading-relaxed">{book.targetAudience}</p>
                  </div>
                )}

                {activeTab === 'formats' && (
                  <div>
                    <div className="space-y-4">
                      {book.formats.map(f => {
                        const asin = f.type === 'kindle' ? book.asin.kindle : f.type === 'paperback' ? book.asin.paperback : book.asin.hardcover;
                        return (
                          <div
                            key={f.type}
                            className="p-5 bg-navy-800/60 border border-navy-700/50 rounded-xl hover:border-electric/20 transition-all"
                            onMouseEnter={() => setHoveredFormat(f.type)}
                            onMouseLeave={() => setHoveredFormat(null)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center">
                                  {f.type === 'kindle' && (
                                    <svg className="w-6 h-6 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                  )}
                                  {f.type === 'paperback' && (
                                    <svg className="w-6 h-6 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                  )}
                                  {f.type === 'hardcover' && (
                                    <svg className="w-6 h-6 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-slate-200 font-semibold">{f.label}</h4>
                                  <p className="text-slate-400 text-sm">{f.pages} pages</p>
                                  {hoveredFormat === f.type && (
                                    <motion.p
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="text-slate-500 text-xs mt-1 font-mono"
                                    >
                                      ASIN: {asin}
                                    </motion.p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-electric">${f.price}</p>
                                <a
                                  href={getAmazonUrl(asin)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 mt-2 px-4 py-2 bg-electric text-navy-950 font-semibold rounded-lg hover:bg-electric/90 transition-colors text-sm"
                                >
                                  Buy on Amazon
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-8 p-5 bg-navy-800/40 border border-navy-700/50 rounded-xl">
                      <h4 className="text-slate-200 font-semibold mb-2">Order Author Copies</h4>
                      <p className="text-slate-400 text-sm mb-3">
                        Need bulk copies for your team, classroom, or event? Contact us for institutional pricing.
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-electric text-sm font-medium hover:underline"
                      >
                        Request Bulk Order
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'author' && (
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric/20 to-electric-blue/20 border border-electric/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-electric">CS</span>
                      </div>
                      <div>
                        <h3 className="text-slate-200 font-semibold text-lg">Charles Sterling</h3>
                        <p className="text-slate-400 text-sm">Author, DEEP DIVE Series</p>
                      </div>
                    </div>
                    <div className="p-6 bg-navy-800/40 border border-navy-700/50 rounded-xl border-l-4 border-l-electric">
                      <p className="text-slate-300 leading-relaxed italic" style={{ fontFamily: 'Merriweather, serif' }}>
                        "{book.authorNote}"
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-1 text-electric text-sm font-medium hover:underline"
                      >
                        Learn more about Charles Sterling
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-slate-200 font-semibold text-lg mb-4">Companion Resources</h3>
                    <div className="space-y-3">
                      {book.resources.map((res, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-4 bg-navy-800/40 border border-navy-700/50 rounded-xl hover:border-electric/20 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-slate-200 text-sm font-medium">{res}</p>
                            <p className="text-slate-500 text-xs">Available with purchase</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <p className="text-amber-300 text-sm font-medium mb-1">📖 Errata & Updates</p>
                      <p className="text-slate-400 text-sm">
                        Found an error or have a question about the book content? 
                        <Link to="/contact" className="text-electric hover:underline ml-1">Get in touch</Link> and I'll address it promptly.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
