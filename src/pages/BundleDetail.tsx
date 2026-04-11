import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";

const bundle = {
  name: "Complete Creator Bundle",
  price: 497,
  originalPrice: 1650,
  description: "Everything you need to dominate Instagram Reels",
  image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwYnVuZGxlfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  includes: [
    "6200+ Instagram Reel Templates",
    "15+ Content Categories",
    "500+ Hook Templates (Bonus)",
    "300+ Transition Pack (Bonus)",
    "Viral Strategy Guide (Bonus)",
    "Commercial License Included",
    "Lifetime Updates Forever",
    "Priority Email Support",
  ],
  categories: [
    { name: "Fashion & Beauty", count: "250+", emoji: "👗" },
    { name: "Food & Recipe", count: "200+", emoji: "🍕" },
    { name: "Travel & Adventure", count: "300+", emoji: "✈️" },
    { name: "Business & Finance", count: "220+", emoji: "💼" },
    { name: "Lifestyle & Vlog", count: "280+", emoji: "🌿" },
    { name: "Fitness & Health", count: "180+", emoji: "💪" },
    { name: "Education & Tips", count: "200+", emoji: "📚" },
    { name: "Motivation & Quotes", count: "150+", emoji: "⚡" },
    { name: "Tech & Gaming", count: "160+", emoji: "🎮" },
    { name: "Pets & Animals", count: "120+", emoji: "🐾" },
    { name: "Music & Entertainment", count: "180+", emoji: "🎵" },
    { name: "DIY & Crafts", count: "160+", emoji: "🎨" },
    { name: "Real Estate", count: "100+", emoji: "🏠" },
    { name: "Beauty & Skincare", count: "200+", emoji: "✨" },
    { name: "Comedy & Trending", count: "200+", emoji: "😂" },
  ],
  softwareSupport: ["CapCut", "Adobe Premiere Pro", "After Effects", "Final Cut Pro"],
  faqs: [
    {
      q: "What software do I need?",
      a: "The templates work with CapCut (free), Adobe Premiere Pro, After Effects, and Final Cut Pro. CapCut is recommended for beginners.",
    },
    {
      q: "Can I use these for client work?",
      a: "Yes. The commercial license allows you to use all templates in paid client projects, sell your final videos, and monetize your content without restrictions.",
    },
    {
      q: "How do I receive my files?",
      a: "Immediately after payment is confirmed, a download link is sent to your email. You can download everything in one go.",
    },
    {
      q: "Do I get future templates too?",
      a: "Yes. Lifetime updates means every new template we add to any category in this bundle is yours automatically — no additional payment.",
    },
  ],
};

export default function BundleDetail() {
  const savePercent = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavHeader />

      {/* Hero */}
      <section className="bg-white px-6 py-12 md:py-20 border-b-4 border-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <div className="inline-block bg-[#9FE870] px-4 py-2 rounded-full border-2 border-black mb-4">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">⭐ MOST POPULAR</p>
            </div>

            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-4xl md:text-5xl leading-[1.1] mb-4">
              {bundle.name.toUpperCase()}
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-lg mb-6">
              {bundle.description}
            </p>

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-2xl line-through">
                ₹{bundle.originalPrice}
              </span>
              <span className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl">
                ₹{bundle.price}
              </span>
              <div className="bg-[#9FE870] px-3 py-1 rounded-full border-2 border-black">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">
                  SAVE {savePercent}%
                </p>
              </div>
            </div>

            {/* Includes summary */}
            <ul className="space-y-2 mb-8">
              {bundle.includes.map((item, idx) => (
                <li key={idx} className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                  <span className="text-[#9FE870] text-lg leading-none mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/checkout">
              <button className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all mb-3">
                GET THIS BUNDLE — ₹497
              </button>
            </Link>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs text-center">
              🔒 Secure payment · Instant download · One-time payment
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl mb-4">
              15+ CONTENT CATEGORIES
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg">
              Templates for every niche, all in one bundle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bundle.categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-2xl p-4 text-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs mb-1">
                  {cat.name}
                </p>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-sm">
                  {cat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software compatibility */}
      <section className="bg-white px-6 py-16 border-y-4 border-black">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl md:text-4xl mb-8">
            WORKS WITH YOUR FAVOURITE SOFTWARE
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {bundle.softwareSupport.map((sw) => (
              <div key={sw} className="bg-[#9FE870] px-6 py-3 rounded-full border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base">{sw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this bundle */}
      <section className="bg-[#163300] px-6 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-4xl md:text-5xl text-center mb-12">
            WHAT MAKES THIS BUNDLE DIFFERENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#9FE870] rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-3">
                EVERYTHING INCLUDED
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-base">
                6200+ templates, hooks, transitions, and a viral strategy guide — all in one download.
              </p>
            </div>
            <div className="bg-[#FFD7EF] rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-2xl mb-3">
                LIFETIME UPDATES
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-base">
                We keep adding new templates every month. Pay once, get everything we ever release.
              </p>
            </div>
            <div className="bg-[#FFEB69] rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-2xl mb-3">
                COMMERCIAL RIGHTS
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#3A341C] text-base">
                Use every template in client projects, monetized content, and paid campaigns — no limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl text-center mb-12">
            QUESTIONS
          </h2>
          <div className="space-y-4">
            {bundle.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                  {faq.q}
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#9FE870] px-6 py-16 border-t-4 border-black">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl mb-4">
            READY TO GET STARTED?
          </h2>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-8">
            One payment. 6200+ templates. Lifetime access.
          </p>
          <Link to="/checkout">
            <button className="bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl px-16 py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all mb-4">
              GET THE BUNDLE — ₹497
            </button>
          </Link>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-sm">
            🔒 Secure payment via Razorpay · Instant download
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#163300] px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">PRODUCTS</h4>
              <ul className="space-y-2">
                <li><Link to="/templates" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram Reels</Link></li>
                <li><Link to="/bundles" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Template Bundles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">SUPPORT</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">LEGAL</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">CONNECT</h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram</a></li>
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
