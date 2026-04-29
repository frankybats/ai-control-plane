import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="relative py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-electric/5 via-electric-blue/5 to-teal-400/5" />
      <div className="absolute inset-0 circuit-lines opacity-20" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3">
            Stay in the Loop
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Get notified about new releases, free chapters, and exclusive discounts. No spam—just deep dives.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric/10 border border-electric/30 rounded-xl text-electric"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">You're subscribed! Check your inbox.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-navy-800 border border-navy-600 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-electric text-navy-950 font-semibold rounded-xl hover:bg-electric/90 transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-slate-600 text-xs mt-4">
            Join 2,000+ developers. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
