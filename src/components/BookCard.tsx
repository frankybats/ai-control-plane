import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Book } from '../data/books';

interface BookCardProps {
  book: Book;
  index?: number;
  compact?: boolean;
  onSelect?: (book: Book) => void;
  selected?: boolean;
}

export default function BookCard({ book, index = 0, compact = false, onSelect, selected }: BookCardProps) {
  if (compact) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => onSelect?.(book)}
        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
          selected
            ? 'border-electric bg-electric/10 glow-border'
            : 'border-navy-700 bg-navy-800/50 hover:border-navy-600'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${book.coverColor} flex-shrink-0 shadow-lg`} />
          <div className="flex-1 min-w-0">
            <h3 className="text-slate-200 text-sm font-medium truncate">{book.title}</h3>
            <p className="text-slate-500 text-xs">{book.topicTag}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-electric text-xs font-semibold">from ${book.formats[0].price}</span>
              {book.creatorEdition && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Creator's Ed.
                </span>
              )}
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            selected ? 'border-electric bg-electric' : 'border-navy-600'
          }`}>
            {selected && (
              <svg className="w-3 h-3 text-navy-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="card-hover group"
    >
      <Link to={`/books/${book.id}`} className="block">
        <div className="bg-navy-800/60 border border-navy-700/50 rounded-2xl overflow-hidden hover:border-electric/20 transition-all duration-300">
          {/* Cover */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${book.coverGradient} opacity-90`} />
            <div className="absolute inset-0 circuit-lines opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-semibold tracking-widest uppercase mb-2">
                  DEEP DIVE
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {book.title.replace(' - DEEP DIVE', '').replace(' DEEP DIVE', '')}
                </h3>
              </div>
            </div>
            {book.creatorEdition && (
              <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-amber-500/90 text-navy-950 text-[10px] font-bold tracking-wide">
                CREATOR'S ED.
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-800/80 to-transparent" />
          </div>

          {/* Info */}
          <div className="p-4 sm:p-5">
            {/* Topic Tag */}
            <span className="inline-block px-2.5 py-1 rounded-full bg-electric/10 text-electric text-[11px] font-semibold tracking-wide uppercase">
              {book.topicTag}
            </span>

            {/* Title */}
            <h3 className="text-slate-200 font-semibold text-sm mt-3 line-clamp-2 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
              {book.title}
            </h3>

            {/* Format Icons */}
            <div className="flex items-center gap-3 mt-3">
              {book.formats.map(f => (
                <div key={f.type} className="flex items-center gap-1 text-slate-400" title={`${f.label}: $${f.price}`}>
                  {f.type === 'kindle' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  )}
                  {f.type === 'paperback' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )}
                  {f.type === 'hardcover' && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy-700/50">
              <span className="text-electric font-bold text-sm">
                ${book.formats[0].price} – ${book.formats[book.formats.length - 1].price}
              </span>
              <span className="text-slate-400 text-xs group-hover:text-electric transition-colors flex items-center gap-1">
                Details
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function BookCardSkeleton() {
  return (
    <div className="bg-navy-800/60 border border-navy-700/50 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 sm:h-56 bg-navy-700/50" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-5 w-20 bg-navy-700/50 rounded-full" />
        <div className="h-4 w-3/4 bg-navy-700/50 rounded" />
        <div className="h-4 w-1/2 bg-navy-700/50 rounded" />
        <div className="h-4 w-1/3 bg-navy-700/50 rounded mt-4" />
      </div>
    </div>
  );
}
