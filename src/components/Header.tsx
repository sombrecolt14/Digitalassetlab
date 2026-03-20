import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bundles = [
    { name: 'Instagram Reels', href: '#reels', active: true },
    { name: 'Photoshop Bundles', href: '#photoshop' },
    { name: 'Canva Bundles', href: '#canva' },
    { name: 'After Effects', href: '#aftereffects' },
    { name: 'Lightroom Presets', href: '#lightroom' },
    { name: 'Video Templates', href: '#video' },
  ];

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-[#2a2a2a] sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#c10fff] flex items-center justify-center shadow-lg shadow-[#00D9FF]/30 group-hover:shadow-xl group-hover:shadow-[#c10fff]/40 transition-all duration-300">
              <span className="text-2xl">✨</span>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-xl bg-gradient-to-r from-[#00D9FF] to-[#c10fff] bg-clip-text text-transparent"
                style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, lineHeight: 1 }}
              >
                DigitalAssetLab
              </span>
              <span className="text-xs text-[#a0a0a0]" style={{ fontFamily: 'Inter' }}>
                Premium Digital Assets
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {bundles.map((bundle) => (
              <a
                key={bundle.name}
                href={bundle.href}
                className={`
                  hidden
                  px-4 py-2 rounded-xl text-sm transition-all duration-300
                  ${bundle.active 
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#c10fff] text-[#0a0a0a] shadow-lg shadow-[#00D9FF]/30' 
                    : 'text-[#a0a0a0] hover:text-[#e5e5e5] hover:bg-[#1a1a1a]'
                  }
                `}
                style={{ fontFamily: 'Inter', fontWeight: 500 }}
              >
                {bundle.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#e5e5e5] hover:border-[#00D9FF]/50 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#2a2a2a] mt-2 animate-fadeIn">
            <nav className="flex flex-col gap-2">
              {bundles.map((bundle) => (
                <a
                  key={bundle.name}
                  href={bundle.href}
                  className={`
                    px-4 py-3 rounded-xl text-sm transition-all duration-300
                    ${bundle.active 
                      ? 'bg-gradient-to-r from-[#00D9FF] to-[#c10fff] text-[#0a0a0a] shadow-lg' 
                      : 'text-[#a0a0a0] hover:text-[#e5e5e5] hover:bg-[#1a1a1a]'
                    }
                  `}
                  style={{ fontFamily: 'Inter', fontWeight: 500 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {bundle.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}