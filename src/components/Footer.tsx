import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-700/30">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric/20 to-electric-blue/20 border border-electric/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <span className="text-slate-200 font-semibold tracking-tight">DEEP DIVE Series</span>
                <span className="text-slate-400 text-xs block">by Charles Sterling</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Practical, no-fluff technical guides for developers, engineers, and technology professionals. 
              Each DEEP DIVE book is built around hands-on projects and real-world scenarios.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-200 font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/books', label: 'All Books' },
                { to: '/bundle', label: 'Build a Bundle' },
                { to: '/about', label: 'About the Author' },
                { to: '/contact', label: 'Contact & Bulk Orders' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 text-sm hover:text-electric transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-slate-200 font-semibold text-sm mb-4">Connect</h3>
            <div className="space-y-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 text-sm hover:text-electric transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 text-sm hover:text-electric transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://amazon.com/author/charlessterling" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 text-sm hover:text-electric transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.045 18.02c.07-.116.12-.232.21-.318.027-.027.068-.041.122-.041.068 0 .149.014.23.041a10.2 10.2 0 003.248.948c.447.054.908.081 1.37.081 1.863 0 3.702-.489 5.345-1.426.109-.068.217-.095.312-.095a.52.52 0 01.258.068c.176.108.298.23.298.434 0 .149-.054.284-.149.393-.109.122-.23.19-.366.258a12.1 12.1 0 01-5.902 1.552c-.515 0-1.016-.027-1.518-.095A15.9 15.9 0 01.331 18.56a.608.608 0 01-.286-.54zM9.89 15.12c.258-.258.529-.515.8-.773.136-.122.271-.163.42-.163.136 0 .271.041.407.136.393.285.813.556 1.246.773.122.054.177.136.177.258a.35.35 0 01-.122.271c-.393.393-.813.773-1.246 1.125a.54.54 0 01-.312.095c-.122 0-.258-.054-.366-.149-.298-.258-.596-.515-.881-.773-.136-.136-.19-.285-.19-.42a.5.5 0 01.068-.18.36.36 0 01-.001-.1zm3.207-2.952c.705-.556 1.56-.989 2.514-1.287a.564.564 0 01.177-.027c.109 0 .217.027.312.095.149.109.23.271.23.447 0 .19-.082.353-.218.475-.895.515-1.654 1.084-2.265 1.708-.136.136-.271.19-.407.19a.534.534 0 01-.325-.109c-.393-.312-.773-.637-1.139-.976a.374.374 0 01-.136-.298c0-.122.054-.23.163-.325.366-.271.732-.556 1.094-.693z"/></svg>
                Amazon Author Central
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Charles Sterling. All rights reserved. All books available on Amazon.
            </p>
            <p className="text-slate-600 text-xs text-center md:text-right max-w-lg">
              Disclosure: As an Amazon Associate, the author earns from qualifying purchases. 
              Links on this site may be affiliate links.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
