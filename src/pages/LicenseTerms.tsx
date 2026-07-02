import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

export default function LicenseTerms() {
  usePageMeta(
    "License Terms — Digital Asset Lab",
    "What you can and can't do with Digital Asset Lab templates. Full commercial license for client work and monetized content; no resale or redistribution of files."
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavHeader />

      {/* Hero */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl mb-6">
            LICENSE <span className="text-[#9FE870]">TERMS</span>
          </h1>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl">
            Exactly what your purchase lets you do — in plain language
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-8">

          <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-4">
              THE LICENSE IN ONE LINE
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
              Every purchase includes a full commercial license. You can use the templates to create
              content for yourself, your brand, or your clients — including monetized and paid work —
              but you cannot resell or redistribute the template files themselves.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-4">
              ✅ WHAT YOU CAN DO
            </h2>
            <ul className="space-y-3">
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-[#9FE870] shrink-0">✓</span>
                Use the templates for your personal or business Instagram, or any other social platform
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-[#9FE870] shrink-0">✓</span>
                Use them in client projects and charge for that work — no extra license needed
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-[#9FE870] shrink-0">✓</span>
                Use them in monetized content, sponsored posts, and paid ad campaigns
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-[#9FE870] shrink-0">✓</span>
                Modify anything — colors, fonts, text, images, clips, timing, effects
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-[#9FE870] shrink-0">✓</span>
                Use them across unlimited projects and unlimited accounts you manage
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-4">
              ❌ WHAT YOU CAN'T DO
            </h2>
            <ul className="space-y-3">
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-red-400 shrink-0">✗</span>
                Resell, license, or redistribute the template files themselves — modified or not
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-red-400 shrink-0">✗</span>
                Share your download link or the files with people who haven't purchased
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-red-400 shrink-0">✗</span>
                Include the templates in another product, bundle, or marketplace listing
              </li>
              <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base flex items-start gap-2">
                <span className="text-red-400 shrink-0">✗</span>
                Claim the original template designs as your own work
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-4">
              THE DETAILS
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base mb-1">
                  License holder
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  The license belongs to the person or business that made the purchase. Teams and
                  agencies: one purchase covers the individual buyer's work, including work delivered
                  to clients.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base mb-1">
                  Duration
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Lifetime. One-time payment, no renewals. Future updates to the bundle are included
                  at no extra cost.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base mb-1">
                  Ownership
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  You own the content you create with the templates. Digital Asset Lab retains
                  ownership of the original template files and designs.
                </p>
              </div>
              <div>
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base mb-1">
                  Violations
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Redistribution or resale of the files terminates the license without refund. We'd
                  much rather you just enjoy the templates — if you're unsure whether a use is
                  allowed, email us and we'll tell you straight.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#9FE870]/10 rounded-3xl p-8 border-4 border-[#9FE870]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-2">
              QUESTIONS ABOUT LICENSING?
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
              Email us at{" "}
              <a href="mailto:support@digitalassetlab.in" className="text-[#163300] font-bold hover:underline">
                support@digitalassetlab.in
              </a>{" "}
              or use our <Link to="/contact" className="text-[#163300] font-bold hover:underline">contact form</Link>.
              We reply within 24 hours.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#163300] px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                PRODUCTS
              </h4>
              <ul className="space-y-2">
                <li><Link to="/templates" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram Reels</Link></li>
                <li><Link to="/bundles" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Template Bundles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                SUPPORT
              </h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                LEGAL
              </h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Refund Policy</Link></li>
                <li><Link to="/license-terms" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">License Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                CONNECT
              </h4>
              <ul className="space-y-2">
                <li><a href="https://www.instagram.com/digitalasset.lab/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm">
              © 2025 Digital Asset Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
