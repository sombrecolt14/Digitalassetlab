import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Instagram Reels Templates",
    description: "6200+ ready-to-edit reel templates across 15+ niches",
    href: "/templates",
    color: "#9FE870",
    textColor: "#163300",
    available: true,
    emoji: "🎬",
  },
  {
    name: "Business Templates",
    description: "Invoices, presentations, proposals & more",
    href: "#",
    color: "#f5f5f5",
    textColor: "#4a5565",
    available: false,
    emoji: "💼",
  },
  {
    name: "Graphic Design Assets",
    description: "Icons, illustrations, backgrounds & more",
    href: "#",
    color: "#f5f5f5",
    textColor: "#4a5565",
    available: false,
    emoji: "🎨",
  },
  {
    name: "Marketing Resources",
    description: "Ad creatives, email templates & landing pages",
    href: "#",
    color: "#f5f5f5",
    textColor: "#4a5565",
    available: false,
    emoji: "📣",
  },
];

export default function NavHeader() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#163300] px-6 py-4 relative z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => { setProductsOpen(false); setMobileOpen(false); }}>
          <h1 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl tracking-tight">
            DIGITAL ASSET LAB
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {/* Products dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1 font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors px-3 py-2"
            >
              Products
              <svg
                className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {productsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-4 grid grid-cols-2 gap-3">
                {/* Arrow pointer */}
                <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-4 border-t-4 border-black rotate-45" />

                {products.map((product) => (
                  product.available ? (
                    <Link
                      key={product.name}
                      to={product.href}
                      onClick={() => setProductsOpen(false)}
                      className="flex items-start gap-3 p-4 rounded-xl border-3 border-black bg-[#9FE870] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all col-span-2"
                    >
                      <span className="text-2xl">{product.emoji}</span>
                      <div>
                        <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm mb-1">
                          {product.name}
                        </p>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-xs opacity-80">
                          {product.description}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 bg-[#163300] text-[#9FE870] text-xs font-black px-2 py-1 rounded-full border-2 border-black">
                        AVAILABLE
                      </span>
                    </Link>
                  ) : (
                    <div
                      key={product.name}
                      className="flex items-start gap-3 p-4 rounded-xl border-3 border-[#e0e0e0] bg-[#f5f5f5] opacity-70"
                    >
                      <span className="text-2xl">{product.emoji}</span>
                      <div>
                        <p className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-sm mb-1">
                          {product.name}
                        </p>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs">
                          {product.description}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 bg-[#FFEB69] text-[#3A341C] text-xs font-black px-2 py-1 rounded-full border-2 border-black whitespace-nowrap">
                        SOON
                      </span>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          <Link
            to="/bundles"
            className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors px-3 py-2"
          >
            Bundles
          </Link>

          {/* Basket icon → checkout */}
          <Link
            to="/checkout"
            className="relative flex items-center justify-center w-9 h-9 rounded-full border-2 border-white/40 hover:border-[#9FE870] hover:text-[#9FE870] text-white transition-all"
            aria-label="Checkout"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>

        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#163300] border-t-2 border-white/20 px-6 py-4 space-y-1">
          <p className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-xs tracking-wider mb-2">
            PRODUCTS
          </p>
          {products.map((product) => (
            product.available ? (
              <Link
                key={product.name}
                to={product.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#9FE870] border-2 border-black mb-2"
              >
                <span>{product.emoji}</span>
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">{product.name}</span>
              </Link>
            ) : (
              <div key={product.name} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 opacity-60 mb-2">
                <span>{product.emoji}</span>
                <span className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm">{product.name}</span>
                <span className="ml-auto text-xs bg-[#FFEB69] text-[#3A341C] px-2 py-0.5 rounded-full font-black">SOON</span>
              </div>
            )
          ))}
          <div className="pt-2 space-y-1">
            <Link to="/bundles" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870]">
              Bundles
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
