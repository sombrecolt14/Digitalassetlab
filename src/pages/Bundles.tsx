import { Link } from "react-router-dom";

const bundles = [
  {
    name: "Complete Creator Bundle",
    price: 497,
    originalPrice: 1650,
    isPopular: true,
    comingSoon: false,
    color: "#9FE870",
    textColor: "#163300",
    description: "Everything you need to dominate Instagram Reels",
    includes: [
      "2500+ Instagram Reel Templates",
      "15+ Content Categories",
      "500+ Hook Templates (Bonus)",
      "300+ Transition Pack (Bonus)",
      "Viral Strategy Guide (Bonus)",
      "Commercial License Included",
      "Lifetime Updates Forever",
      "Priority Email Support",
    ],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwYnVuZGxlfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Fashion & Beauty Bundle",
    price: 197,
    originalPrice: 597,
    isPopular: false,
    comingSoon: true,
    color: "#FFD7EF",
    textColor: "#320707",
    description: "Perfect for fashion bloggers & beauty influencers",
    includes: [
      "250+ Fashion & Beauty Templates",
      "OOTD, Makeup & Styling Reels",
      "Product Review Templates",
      "Get Ready With Me Templates",
      "Fashion Haul Templates",
      "Commercial License Included",
      "Lifetime Updates",
    ],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Business Growth Bundle",
    price: 297,
    originalPrice: 897,
    isPopular: false,
    comingSoon: true,
    color: "#260A2F",
    textColor: "#9FE870",
    description: "For entrepreneurs & business coaches",
    includes: [
      "220+ Business Templates",
      "Money & Finance Reels",
      "Entrepreneurship Tips",
      "Success Stories Templates",
      "Motivational Quote Templates",
      "Commercial License Included",
      "Lifetime Updates",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGluc3RhZ3JhbXxlbnwxfHx8fDE3NjQ4NDc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Lifestyle Creator Bundle",
    price: 247,
    originalPrice: 747,
    isPopular: false,
    comingSoon: true,
    color: "#FFEB69",
    textColor: "#3A341C",
    description: "For daily vloggers & lifestyle content",
    includes: [
      "280+ Lifestyle Templates",
      "Daily Vlog Templates",
      "Morning Routine Reels",
      "Life Hacks & Tips",
      "Productivity Templates",
      "Commercial License Included",
      "Lifetime Updates",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Travel & Adventure Bundle",
    price: 247,
    originalPrice: 747,
    isPopular: false,
    comingSoon: true,
    color: "#A0E1F1",
    textColor: "#21231D",
    description: "For travel vloggers & adventure seekers",
    includes: [
      "300+ Travel Templates",
      "Destination Reveals",
      "Travel Vlog Templates",
      "Beach & Mountain Reels",
      "City Tour Templates",
      "Commercial License Included",
      "Lifetime Updates",
    ],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Food & Recipe Bundle",
    price: 197,
    originalPrice: 597,
    isPopular: false,
    comingSoon: true,
    color: "#FFC091",
    textColor: "#163300",
    description: "For food bloggers & recipe creators",
    includes: [
      "200+ Food Templates",
      "Quick Recipe Reels",
      "Cooking Process Templates",
      "Food Reveal Templates",
      "Restaurant Review Reels",
      "Commercial License Included",
      "Lifetime Updates",
    ],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
];

export default function Bundles() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#163300] px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl">
              DIGITALASSETLAB
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/templates" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Templates
            </Link>
            <Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-sm transition-colors">
              Bundles
            </Link>
            
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl leading-[1.1] mb-6">
              DIGITAL ASSET <span className="text-[#9FE870]">BUNDLES</span>
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Curated collections of templates and creative assets for your niche.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-[#9FE870]/10 rounded-2xl p-6 text-center border-3 border-[#9FE870]">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                SAVE UP TO 70%
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                Bundles offer massive savings
              </p>
            </div>
            <div className="bg-[#FFD7EF]/10 rounded-2xl p-6 text-center border-3 border-[#FFD7EF]">
              <div className="text-3xl mb-2">🔄</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                LIFETIME UPDATES
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                New templates added monthly
              </p>
            </div>
            <div className="bg-[#A0E1F1]/10 rounded-2xl p-6 text-center border-3 border-[#A0E1F1]">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                INSTANT ACCESS
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                Download immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundles Grid */}
      <section className="bg-[#f5f5f5] px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Popular Bundle - Featured */}
          <div className="mb-12">
            {bundles.filter(b => b.isPopular).map((bundle) => (
              <div
                key={bundle.name}
                className="bg-white rounded-3xl overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
              >
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-[#9FE870] px-6 py-3 rounded-full border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm">
                      ⭐ MOST POPULAR
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-[400px] overflow-hidden">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2
                      className="font-['Inter:Black',sans-serif] font-black text-4xl md:text-5xl mb-4"
                      style={{ color: bundle.color }}
                    >
                      {bundle.name.toUpperCase()}
                    </h2>
                    <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl mb-6">
                      {bundle.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-3xl line-through">
                        ₹{bundle.originalPrice}
                      </span>
                      <span className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl">
                        ₹{bundle.price}
                      </span>
                      <div className="bg-[#9FE870] px-3 py-1 rounded-full border-2 border-black">
                        <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">
                          SAVE {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm mb-4">
                        WHAT'S INCLUDED:
                      </p>
                      <ul className="space-y-2">
                        {bundle.includes.map((item, idx) => (
                          <li
                            key={idx}
                            className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2"
                          >
                            <span className="text-[#9FE870] text-lg">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to="/checkout">
                      <button className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                        GET THIS BUNDLE NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Bundles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bundles.filter(b => !b.isPopular).map((bundle) => (
              <div
                key={bundle.name}
                className="bg-white rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="font-['Inter:Black',sans-serif] font-black text-3xl"
                      style={{ color: bundle.color }}
                    >
                      {bundle.name.toUpperCase()}
                    </h3>
                    {bundle.comingSoon && (
                      <div className="bg-[#FFEB69] px-3 py-1 rounded-full border-2 border-black shrink-0 ml-3 mt-1">
                        <p className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-xs">
                          COMING SOON
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-6">
                    {bundle.description}
                  </p>

                  <div className="mb-6">
                    <ul className="space-y-2">
                      {bundle.includes.slice(0, 5).map((item, idx) => (
                        <li
                          key={idx}
                          className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2"
                        >
                          <span className="text-[#9FE870]">✓</span>
                          {item}
                        </li>
                      ))}
                      {bundle.includes.length > 5 && (
                        <li className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                          + {bundle.includes.length - 5} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="w-full bg-[#f5f5f5] text-[#4a5565] font-['Inter:Black',sans-serif] font-black text-lg py-4 rounded-full border-4 border-[#e0e0e0] text-center">
                    COMING SOON
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl mb-4">
              WHY CHOOSE BUNDLES?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-3">
                BETTER VALUE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Save up to 70% compared to buying templates individually. Get more for less.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-3">
                NICHE FOCUSED
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Each bundle is curated for specific niches to match your content perfectly.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-3">
                COMPLETE SOLUTION
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Everything you need for your content type in one package. No searching required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl mb-4">
              COMMON QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                Can I buy multiple bundles?
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Yes! Each bundle can be purchased separately. Or save more by getting the Complete Creator Bundle which includes everything.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                Do bundles get new templates?
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Absolutely! All bundles include lifetime updates. When we add new templates to your category, you get them free.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                What's the difference between bundles and individual templates?
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Bundles give you curated collections for specific niches at huge discounts. The Complete Bundle is our best value with everything included.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                Can I use these for client work?
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Yes! All bundles include commercial license. Use them for clients, sell final videos, monetize your content - no restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#163300] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-4xl md:text-6xl mb-6">
            READY TO START CREATING?
          </h2>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-xl md:text-2xl mb-8">
            Choose your bundle and get instant access to professional templates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/checkout">
              <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-xl px-12 py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                GET COMPLETE BUNDLE - ₹497
              </button>
            </Link>
            <Link to="/templates">
              <button className="bg-white text-[#163300] font-['Inter:Black',sans-serif] font-black text-xl px-12 py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                BROWSE ALL TEMPLATES
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#21231D] px-6 py-12">
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
                <li><Link to="/contact" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">FAQ</Link></li>
                <li><Link to="/tutorials" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Tutorials</Link></li>
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
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                CONNECT
              </h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">YouTube</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm">
              © 2025 DigitalAssetLab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
