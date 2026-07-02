import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

export default function About() {
  usePageMeta(
    "About — Digital Asset Lab",
    "Digital Asset Lab makes studio-grade digital templates for creators and independent professionals. Learn about our quality bar and what we're building."
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavHeader />

      {/* Hero */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="inline-block bg-[#9FE870] px-6 py-2 rounded-full border-3 border-black mb-6">
            <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm tracking-wider">
              OUR STORY
            </p>
          </div>
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl mb-6">
            ABOUT <span className="text-[#9FE870]">DIGITAL ASSET LAB</span>
          </h1>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl">
            Studio-grade templates and digital resources for creators and independent professionals
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-8">

          <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-6">
              WHAT WE MAKE
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg leading-relaxed mb-4">
              Digital Asset Lab builds ready-to-use digital products that save creators and
              professionals hundreds of hours. Our flagship product is the Instagram Reels Bundle —
              6200+ editable templates across 15+ content categories, built for people who want to
              post consistently without starting from a blank canvas every time.
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg leading-relaxed">
              Every product ships complete: full commercial license, instant delivery, and lifetime
              updates. One payment, no subscriptions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-6">
              OUR QUALITY BAR
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#9FE870] rounded-full w-10 h-10 flex items-center justify-center border-2 border-black shrink-0 font-black text-[#163300]">1</div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed pt-2">
                  <strong className="text-[#163300]">Ready to use, not almost ready.</strong> Every template works out of the box in free tools like CapCut — swap your content in and post.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#FFD7EF] rounded-full w-10 h-10 flex items-center justify-center border-2 border-black shrink-0 font-black text-[#320707]">2</div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed pt-2">
                  <strong className="text-[#163300]">Honest file manifests.</strong> Exact counts, formats, and software requirements listed before you buy. No surprises after checkout.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#A0E1F1] rounded-full w-10 h-10 flex items-center justify-center border-2 border-black shrink-0 font-black text-[#21231D]">3</div>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed pt-2">
                  <strong className="text-[#163300]">Buyer-first policies.</strong> Prompt refunds when something goes wrong on our end, 24-hour support replies, and lifetime access with free updates.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-6">
              WHERE WE'RE HEADED
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg leading-relaxed">
              The Reels Bundle is just the start. We're expanding into business templates, graphic
              design assets, and marketing resources — each built to the same standard. Follow us on{" "}
              <a
                href="https://www.instagram.com/digitalasset.lab/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#163300] font-bold hover:underline"
              >
                Instagram
              </a>{" "}
              to see new products as they drop.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#163300] to-[#260A2F] rounded-3xl p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-3xl md:text-4xl mb-4">
              SEE WHAT'S IN THE LAB
            </h2>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-white/80 text-lg mb-8">
              6200+ templates. One bundle. Instant delivery.
            </p>
            <Link to="/bundles">
              <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                BROWSE THE SHOP →
              </button>
            </Link>
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
