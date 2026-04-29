import { useState } from 'react';
import { motion } from 'framer-motion';

type InquiryType = 'question' | 'bulk' | 'speaking' | 'author-copies';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('question');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    bookInterest: '',
    quantity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inquiryTypes: { id: InquiryType; label: string; desc: string }[] = [
    { id: 'question', label: 'Reader Question', desc: 'Questions about book content, errata, or technical topics' },
    { id: 'bulk', label: 'Bulk / Institutional Order', desc: 'Purchasing 10+ copies for teams or classrooms' },
    { id: 'speaking', label: 'Speaking / Workshop', desc: 'Event speaking, workshops, or corporate training' },
    { id: 'author-copies', label: 'Author Copies', desc: 'Order author copies via KDP for events or resale' },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-3">Message Sent!</h2>
          <p className="text-slate-400 mb-6">
            Thank you for reaching out. Charles typically responds within 24–48 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', organization: '', message: '', bookInterest: '', quantity: '' }); }}
            className="px-6 py-2.5 bg-navy-800 text-electric font-medium rounded-xl border border-navy-700 hover:border-electric/30 transition-all"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Get in Touch
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Reader questions, bulk orders, speaking inquiries, or author copy requests—we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Inquiry Type Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-slate-200 font-semibold mb-4">What's this about?</h3>
            <div className="space-y-2">
              {inquiryTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setInquiryType(type.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    inquiryType === type.id
                      ? 'border-electric bg-electric/10'
                      : 'border-navy-700 bg-navy-800/30 hover:border-navy-600'
                  }`}
                >
                  <p className={`font-medium text-sm ${inquiryType === type.id ? 'text-electric' : 'text-slate-300'}`}>
                    {type.label}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{type.desc}</p>
                </button>
              ))}
            </div>

            {/* Direct Email */}
            <div className="mt-8 p-4 bg-navy-800/40 border border-navy-700/50 rounded-xl">
              <h4 className="text-slate-200 font-medium text-sm mb-2">Direct Email</h4>
              <p className="text-electric text-sm font-mono">contact@charlessterling.dev</p>
              <p className="text-slate-500 text-xs mt-1">For author copy orders, include your KDP account email.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {(inquiryType === 'bulk' || inquiryType === 'speaking' || inquiryType === 'author-copies') && (
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors"
                    placeholder="Company or institution name"
                  />
                </div>
              )}

              {(inquiryType === 'bulk' || inquiryType === 'author-copies') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Book of Interest</label>
                    <select
                      name="bookInterest"
                      value={formData.bookInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 focus:outline-none focus:border-electric/50 transition-colors"
                    >
                      <option value="">Select a book...</option>
                      <option value="all">All DEEP DIVE titles</option>
                      <option value="llm">LLM - DEEP DIVE</option>
                      <option value="xrp">XRP - DEEP DIVE</option>
                      <option value="solana">SOLANA - DEEP DIVE</option>
                      <option value="tether">TETHER - DEEP DIVE</option>
                      <option value="ccna">CCNA - DEEP DIVE</option>
                      <option value="ai-python">AI with Python - Creator's Edition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors"
                      placeholder="e.g., 25 copies"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric/50 transition-colors resize-none"
                  placeholder={
                    inquiryType === 'question'
                      ? 'Describe your question or the topic you need help with...'
                      : inquiryType === 'bulk'
                      ? 'Tell us about your needs: formats, timeline, shipping location...'
                      : inquiryType === 'speaking'
                      ? 'Event details, date, audience size, topics of interest...'
                      : 'Include your KDP email, book titles, and quantity needed...'
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-electric text-navy-950 font-bold rounded-xl hover:bg-electric/90 transition-all shadow-lg shadow-electric/20"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
