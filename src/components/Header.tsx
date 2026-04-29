import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books } from '../data/books';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof books>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.topicTag.toLowerCase().includes(q) ||
        b.keyTopics.some(t => t.toLowerCase().includes(q))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Books' },
    { to: '/bundle', label: 'Build a Bundle' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-navy-700/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-electric/20 to-electric-blue/20 border border-electric/30 flex items-center justify-center group-hover:border-electric/60 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-200 font-semibold text-sm md:text-base tracking-tight">DEEP DIVE</span>
              <span className="text-slate-400 text-xs block -mt-0.5">by Charles Sterling</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-electric bg-electric/10'
                    : 'text-slate-300 hover:text-electric hover:bg-navy-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Search + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-electric hover:bg-navy-800/50 transition-colors"
                aria-label="Search books"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 sm:w-96 bg-navy-800 border border-navy-700 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="p-3">
                      <input
                        type="text"
                        placeholder="Search by title, topic, or keyword..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 bg-navy-900 border border-navy-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 text-sm"
                        autoFocus
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="border-t border-navy-700 max-h-64 overflow-y-auto">
                        {searchResults.map(book => (
                          <button
                            key={book.id}
                            onClick={() => { navigate(`/books/${book.id}`); setSearchOpen(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-navy-700/50 flex items-center gap-3 transition-colors"
                          >
                            <div className={`w-8 h-10 rounded bg-gradient-to-br ${book.coverColor} flex-shrink-0`} />
                            <div>
                              <p className="text-slate-200 text-sm font-medium truncate max-w-[250px]">{book.title}</p>
                              <p className="text-slate-500 text-xs">{book.topicTag}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery.trim().length > 1 && searchResults.length === 0 && (
                      <div className="border-t border-navy-700 px-4 py-6 text-center text-slate-500 text-sm">
                        No books found for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-electric hover:bg-navy-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900/98 backdrop-blur-lg border-t border-navy-700/50"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-electric bg-electric/10'
                      : 'text-slate-300 hover:text-electric hover:bg-navy-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
