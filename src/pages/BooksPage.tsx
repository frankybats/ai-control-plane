import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import BookCard from '../components/BookCard';
import { books, topics } from '../data/books';

type SortOption = 'title' | 'price-low' | 'price-high' | 'date';

export default function BooksPage() {
  const [activeTopic, setActiveTopic] = useState('all');
  const [activeFormat, setActiveFormat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Topic filter
    if (activeTopic !== 'all') {
      result = result.filter(b => b.topic === activeTopic);
    }

    // Format filter
    if (activeFormat !== 'all') {
      result = result.filter(b => b.formats.some(f => f.type === activeFormat));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.topicTag.toLowerCase().includes(q) ||
        b.keyTopics.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-low':
        result.sort((a, b) => a.formats[0].price - b.formats[0].price);
        break;
      case 'price-high':
        result.sort((a, b) => b.formats[0].price - a.formats[0].price);
        break;
      case 'date':
        result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
    }

    return result;
  }, [activeTopic, activeFormat, sortBy, searchQuery]);

  const formats = [
    { id: 'all', label: 'All Formats' },
    { id: 'kindle', label: 'Kindle' },
    { id: 'paperback', label: 'Paperback' },
    { id: 'hardcover', label: 'Hardcover' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-200 mb-2">
            Book Catalog
          </h1>
          <p className="text-slate-400">
            Browse all {books.length} titles in the DEEP DIVE series. Filter by topic, format, or search by keyword.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, topic, or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4 mb-10"
        >
          {/* Topics */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 text-sm font-medium mr-2">Topic:</span>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeTopic === topic.id
                    ? 'bg-electric text-navy-950'
                    : 'bg-navy-800 text-slate-400 border border-navy-700 hover:text-electric hover:border-electric/30'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Formats + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 text-sm font-medium mr-2">Format:</span>
              {formats.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFormat(f.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeFormat === f.id
                      ? 'bg-electric text-navy-950'
                    : 'bg-navy-800 text-slate-400 border border-navy-700 hover:text-electric hover:border-electric/30'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-navy-800 border border-navy-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-electric/50"
              >
                <option value="date">Newest First</option>
                <option value="title">Title A–Z</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-slate-500">
          Showing {filteredBooks.length} of {books.length} books
        </div>

        {/* Book Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-slate-400 text-lg font-medium mb-2">No books found</h3>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
