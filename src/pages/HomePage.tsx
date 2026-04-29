import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookCard from '../components/BookCard';
import Newsletter from '../components/Newsletter';
import { getFeaturedBooks, books, topics } from '../data/books';

const topicIcons: Record<string, string> = {
  ai: '🤖',
  blockchain: '⛓️',
  networking: '🌐',
};

export default function HomePage() {
  const featured = getFeaturedBooks();
  const [activeTopic, setActiveTopic] = useState('all');

  const filteredBooks = activeTopic === 'all' ? books : books.filter(b => b.topic === activeTopic);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 circuit-bg" />
        <div className="absolute inset-0 circuit-lines opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-[15%] w-2 h-2 bg-electric/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 left-[70%] w-1.5 h-1.5 bg-electric-blue/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 left-[40%] w-1 h-1 bg-teal-400/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-6">
                <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
                <span className="text-electric text-sm font-medium tracking-wide">6 Titles Available Now</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight mb-6"
            >
              Technical{' '}
              <span className="glow-text text-electric">Deep Dives</span>
              <br />
              <span className="text-slate-400" style={{ fontFamily: 'Playfair Display, serif' }}>
                for Builders
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed"
            >
              Master AI, blockchain, crypto, and networking with hands-on guides 
              that skip the fluff and deliver production-ready expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/books"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-electric text-navy-950 font-bold rounded-xl hover:bg-electric/90 transition-all shadow-lg shadow-electric/20 text-sm md:text-base"
              >
                Browse All Books
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/bundle"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-800 text-slate-200 font-semibold rounded-xl border border-navy-600 hover:border-electric/30 hover:bg-navy-700 transition-all text-sm md:text-base"
              >
                Build a Bundle & Save
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-navy-700/50"
            >
              {[
                { value: '6', label: 'Deep Dive Titles' },
                { value: '3', label: 'Formats Each' },
                { value: '1,800+', label: 'Total Pages' },
                { value: '100%', label: 'Practical Content' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-electric">{stat.value}</div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-3">
              Featured Titles
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Start your deep dive with our most popular guides across key technology domains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Filter Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3">
              Explore by Topic
            </h2>
          </motion.div>

          {/* Topic Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTopic === topic.id
                    ? 'bg-electric text-navy-950 shadow-lg shadow-electric/20'
                    : 'bg-navy-800 text-slate-300 border border-navy-700 hover:border-electric/30 hover:text-electric'
                }`}
              >
                {topicIcons[topic.id] && <span className="mr-1.5">{topicIcons[topic.id]}</span>}
                {topic.label}
              </button>
            ))}
          </div>

          {/* Filtered Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.slice(0, 8).map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>

          {filteredBooks.length > 8 && (
            <div className="text-center mt-10">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-electric font-semibold rounded-xl border border-navy-700 hover:border-electric/30 transition-all"
              >
                View All Books
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why DEEP DIVE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-3">
              Why <span className="text-electric">DEEP DIVE</span>?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Not another surface-level tutorial series. DEEP DIVE books are built for practitioners who need 
              production-ready skills, not just theory.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                ),
                title: 'Production-Ready Code',
                desc: 'Every example is battle-tested. No pseudocode, no toy problems—real code you can deploy today.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'Zero Fluff',
                desc: 'We skip the 50-page introductions. You get dense, actionable content from chapter one.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                ),
                title: 'Expert Authorship',
                desc: 'Written by practitioners with years of enterprise experience. Learn from real failures and successes.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                ),
                title: 'Complete Coverage',
                desc: 'Each book covers the full lifecycle: fundamentals, implementation, testing, deployment, and monitoring.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Resources Included',
                desc: 'Code repositories, lab environments, cheat sheets, and templates come with every book.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                title: 'Always Current',
                desc: 'Regular updates and errata ensure you\'re always working with the latest best practices and tool versions.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-navy-800/40 border border-navy-700/50 hover:border-electric/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric mb-4 group-hover:bg-electric/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-slate-200 font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 border border-navy-700/50 glow-border"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
              Ready to go deeper?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Build your own bundle and save. Select 3 or more books and get an exclusive discount on your collection.
            </p>
            <Link
              to="/bundle"
              className="inline-flex items-center gap-2 px-8 py-4 bg-electric text-navy-950 font-bold rounded-xl hover:bg-electric/90 transition-all shadow-lg shadow-electric/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              Build Your Bundle
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
