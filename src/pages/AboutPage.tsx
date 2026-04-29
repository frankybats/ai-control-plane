import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-slate-200 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            About the Author
          </h1>
          <div className="w-16 h-0.5 bg-electric mx-auto" />
        </motion.div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-800 border border-navy-600/50 glow-border">
                <div className="absolute inset-0 circuit-lines opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electric/20 to-electric-blue/20 border-2 border-electric/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-5xl font-bold text-electric">CS</span>
                    </div>
                    <h2 className="text-slate-200 font-bold text-xl">Charles Sterling</h2>
                    <p className="text-slate-400 text-sm">Technical Author & Engineer</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )},
                  { label: 'GitHub', href: 'https://github.com', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  )},
                  { label: 'Amazon', href: 'https://amazon.com/author/charlessterling', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.045 18.02c.07-.116.12-.232.21-.318.027-.027.068-.041.122-.041.068 0 .149.014.23.041a10.2 10.2 0 003.248.948c.447.054.908.081 1.37.081 1.863 0 3.702-.489 5.345-1.426.109-.068.217-.095.312-.095a.52.52 0 01.258.068c.176.108.298.23.298.434 0 .149-.054.284-.149.393-.109.122-.23.19-.366.258a12.1 12.1 0 01-5.902 1.552c-.515 0-1.016-.027-1.518-.095A15.9 15.9 0 01.331 18.56a.608.608 0 01-.286-.54z"/></svg>
                  )},
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-400 hover:text-electric hover:border-electric/30 transition-all"
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                <span className="text-electric font-semibold">Charles Sterling</span> is a technologist and 
                best-selling author dedicated to demystifying complex, cutting-edge technologies. Through his popular 
                "DEEP DIVE" series, he has empowered thousands of readers—from curious beginners to seasoned 
                professionals—to master intricate subjects like Artificial Intelligence, blockchain, and networking.
              </p>

              <p>
                With a passion for clear, practical instruction, Charles's books are known for their hands-on 
                projects and real-world examples. He excels at bridging the gap between powerful technology 
                and creative application, helping his readers not only to understand a topic but to build with it.
              </p>

              <p>
                His DEEP DIVE series covers critical technology domains including Large Language Models (LLMs), 
                blockchain platforms like Solana, cryptocurrencies like XRP and Tether, networking certifications 
                like CCNA, and AI development with Python. Each book is designed to take readers from foundational 
                understanding to practical mastery.
              </p>

              <div className="my-8 p-6 bg-navy-800/40 border border-navy-700/50 rounded-xl border-l-4 border-l-electric">
                <p className="italic text-slate-300" style={{ fontFamily: 'Merriweather, serif' }}>
                  "I'm focused on creating resources that make high-level technical skills accessible to everyone. 
                  My books are known for their hands-on projects and real-world examples—I excel at bridging 
                  the gap between powerful technology and creative application, helping readers not only to 
                  understand a topic but to build with it."
                </p>
                <p className="text-electric text-sm mt-3 font-medium">— Charles Sterling</p>
              </div>

              <h3 className="text-slate-200 font-semibold text-xl mt-10 mb-4">Expertise & Focus Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Large Language Models (LLMs)',
                  'AI & Python Development',
                  'Solana Blockchain & dApps',
                  'XRP & Ripple Technology',
                  'Tether & Stablecoin Markets',
                  'Cisco Networking & CCNA',
                  'Cryptocurrency & DeFi',
                  'Technical Writing & Education',
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 bg-electric rounded-full flex-shrink-0" />
                    {skill}
                  </div>
                ))}
              </div>

              <h3 className="text-slate-200 font-semibold text-xl mt-10 mb-4">Writing Philosophy</h3>
              <p>
                Every DEEP DIVE book follows three principles:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-400 ml-4">
                <li>
                  <span className="text-slate-200 font-medium">Code-first, always.</span> Every concept is demonstrated 
                  with runnable, production-quality code.
                </li>
                <li>
                  <span className="text-slate-200 font-medium">Real-world context.</span> Examples come from actual 
                  projects, not invented scenarios.
                </li>
                <li>
                  <span className="text-slate-200 font-medium">Zero filler.</span> Every page earns its place. If it 
                  doesn't help you build something, it's not in the book.
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
