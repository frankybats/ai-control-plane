import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';
import { books, getAuthorSearchUrl, type Book } from '../data/books';

function getDiscount(count: number): { percent: number; label: string } {
  if (count >= 5) return { percent: 25, label: '25% Mega Bundle' };
  if (count >= 4) return { percent: 20, label: '20% Power Bundle' };
  if (count >= 3) return { percent: 15, label: '15% Bundle Discount' };
  return { percent: 0, label: 'Add 3+ books for discount' };
}

export default function BundlePage() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<'kindle' | 'paperback' | 'hardcover'>('paperback');

  const toggleBook = (book: Book) => {
    setSelectedBooks(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) return prev.filter(b => b.id !== book.id);
      return [...prev, book];
    });
  };

  const pricing = useMemo(() => {
    const discount = getDiscount(selectedBooks.length);
    const subtotal = selectedBooks.reduce((sum, book) => {
      const format = book.formats.find(f => f.type === selectedFormat);
      return sum + (format?.price || 0);
    }, 0);
    const savings = subtotal * (discount.percent / 100);
    const total = subtotal - savings;

    return { subtotal, savings, total, discount };
  }, [selectedBooks, selectedFormat]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-4">
            <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <span className="text-electric text-sm font-medium">Save up to 25%</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Build Your Bundle
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Select 3 or more books and unlock exclusive bundle pricing. The more you add, the more you save.
          </p>
        </motion.div>

        {/* Discount Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { count: 3, percent: 15, color: 'text-teal-400 bg-teal-400/10 border-teal-400/30' },
            { count: 4, percent: 20, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
            { count: 5, percent: 25, color: 'text-electric bg-electric/10 border-electric/30' },
          ].map(tier => (
            <div
              key={tier.count}
              className={`px-5 py-3 rounded-xl border ${tier.color} text-center transition-all ${
                selectedBooks.length >= tier.count ? 'ring-2 ring-offset-2 ring-offset-navy-950 ring-electric/50' : 'opacity-60'
              }`}
            >
              <p className="font-bold text-lg">{tier.percent}% OFF</p>
              <p className="text-xs opacity-80">{tier.count}+ books</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Selection */}
          <div className="lg:col-span-2">
            {/* Format Selector */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-slate-400 text-sm font-medium mr-2">Format:</span>
              {(['kindle', 'paperback', 'hardcover'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFormat === f
                      ? 'bg-electric text-navy-950'
                      : 'bg-navy-800 text-slate-400 border border-navy-700 hover:border-electric/30'
                  }`}
                >
                  {f === 'kindle' ? 'Kindle' : f === 'paperback' ? 'Paperback' : 'Hardcover'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {books.map((book, i) => (
                <BookCard
                  key={book.id}
                  book={book}
                  index={i}
                  compact
                  onSelect={toggleBook}
                  selected={selectedBooks.some(b => b.id === book.id)}
                />
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-navy-800/60 border border-navy-700/50 rounded-2xl p-6">
                <h3 className="text-slate-200 font-semibold text-lg mb-4">Bundle Summary</h3>

                {selectedBooks.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">
                    Select books from the list to build your bundle.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {selectedBooks.map(book => {
                        const format = book.formats.find(f => f.type === selectedFormat);
                        return (
                          <div key={book.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-10 rounded bg-gradient-to-br ${book.coverColor} flex-shrink-0`} />
                              <p className="text-slate-300 text-sm truncate">
                                {book.title.replace(' - DEEP DIVE', '').replace(' DEEP DIVE', '')}
                              </p>
                            </div>
                            <span className="text-slate-400 text-sm flex-shrink-0">${format?.price}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-navy-700 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Subtotal ({selectedBooks.length} books)</span>
                        <span className="text-slate-300">${pricing.subtotal.toFixed(2)}</span>
                      </div>

                      <AnimatePresence>
                        {pricing.discount.percent > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-electric font-medium">{pricing.discount.label}</span>
                            <span className="text-electric font-medium">-${pricing.savings.toFixed(2)}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-navy-700">
                        <span className="text-slate-200">Total</span>
                        <span className="text-electric">${pricing.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-electric/10 border border-electric/20 rounded-xl text-center">
                      <p className="text-electric text-sm font-semibold">{pricing.discount.label}</p>
                      <p className="text-slate-400 text-xs mt-1">
                        {selectedBooks.length < 3
                          ? `Add ${3 - selectedBooks.length} more book${3 - selectedBooks.length === 1 ? '' : 's'} for 15% off`
                          : pricing.discount.percent < 25
                          ? `Add ${selectedBooks.length < 4 ? 1 : selectedBooks.length < 5 ? 1 : 0} more for a bigger discount`
                          : 'Maximum discount applied!'
                        }
                      </p>
                    </div>

                    <a
                      href={getAuthorSearchUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-navy-950 font-bold rounded-xl hover:bg-electric/90 transition-all shadow-lg shadow-electric/20"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      Find on Amazon
                    </a>

                    <p className="text-slate-600 text-[10px] text-center mt-2">
                      Bundle pricing is hypothetical. Individual purchases on Amazon.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
