import NavHeader from "../components/NavHeader";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const categories = [
  {
    name: "Fashion & Beauty",
    slug: "fashion",
    count: 250,
    color: "#FFD7EF",
    textColor: "#320707",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Trendy outfit transitions, OOTD reveals, makeup tutorials, beauty product reviews",
    tags: ["OOTD", "Makeup", "Styling", "Hauls", "Get Ready"]
  },
  {
    name: "Travel & Adventure",
    slug: "travel",
    count: 300,
    color: "#A0E1F1",
    textColor: "#21231D",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Destination reveals, travel vlogs, scenic transitions, adventure montages",
    tags: ["Destinations", "Vlogs", "Beaches", "Mountains", "City Tours"]
  },
  {
    name: "Food & Recipe",
    slug: "food",
    count: 200,
    color: "#FFC091",
    textColor: "#163300",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Quick recipe reels, cooking process, food reveals, restaurant reviews",
    tags: ["Recipes", "Cooking", "Street Food", "Restaurant", "Desserts"]
  },
  {
    name: "Fitness & Wellness",
    slug: "fitness",
    count: 180,
    color: "#9FE870",
    textColor: "#163300",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Workout routines, transformation stories, yoga flows, wellness tips",
    tags: ["Workouts", "Yoga", "Motivation", "Transformation", "Tips"]
  },
  {
    name: "Business & Money",
    slug: "business",
    count: 220,
    color: "#260A2F",
    textColor: "#9FE870",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGluc3RhZ3JhbXxlbnwxfHx8fDE3NjQ4NDc2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Entrepreneur tips, money advice, success stories, business strategies",
    tags: ["Entrepreneurship", "Investing", "Side Hustle", "Mindset", "Success"]
  },
  {
    name: "Tech & Gadgets",
    slug: "tech",
    count: 150,
    color: "#21231D",
    textColor: "#9FE870",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Gadget unboxing, tech reviews, app tutorials, productivity hacks",
    tags: ["Unboxing", "Reviews", "Apps", "Productivity", "AI Tools"]
  },
  {
    name: "Lifestyle & Daily",
    slug: "lifestyle",
    count: 280,
    color: "#FFEB69",
    textColor: "#3A341C",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Daily vlogs, morning routines, productivity, life hacks, relatable content",
    tags: ["Routines", "Vlogs", "Life Hacks", "Productivity", "Relatable"]
  },
  {
    name: "Education & Knowledge",
    slug: "education",
    count: 190,
    color: "#A0E1F1",
    textColor: "#21231D",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Educational content, quick facts, study tips, skill tutorials",
    tags: ["Study Tips", "Facts", "Tutorials", "Skills", "Learning"]
  },
  {
    name: "Entertainment & Fun",
    slug: "entertainment",
    count: 240,
    color: "#FFD7EF",
    textColor: "#320707",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Comedy skits, memes, challenges, trending audio, viral moments",
    tags: ["Comedy", "Memes", "Challenges", "Trends", "Viral"]
  },
  {
    name: "Home & Interior",
    slug: "home",
    count: 140,
    color: "#FFC091",
    textColor: "#163300",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3IlMjBpbnN0YWdyYW18ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Room makeovers, decor ideas, organization hacks, before & after",
    tags: ["Decor", "Organization", "DIY", "Makeover", "Aesthetic"]
  },
  {
    name: "Motivation & Quotes",
    slug: "motivation",
    count: 160,
    color: "#9FE870",
    textColor: "#163300",
    image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RpdmF0aW9uJTIwaW5zdGFncmFtfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Motivational quotes, success mindset, personal growth, daily affirmations",
    tags: ["Quotes", "Success", "Mindset", "Growth", "Inspiration"]
  },
  {
    name: "Photography & Art",
    slug: "photography",
    count: 130,
    color: "#260A2F",
    textColor: "#FFD7EF",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGluc3RhZ3JhbXxlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Photo editing process, camera tips, art reveals, creative process",
    tags: ["Editing", "Camera Tips", "Art", "Process", "Behind Scenes"]
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const handleBuy = () => { addToCart(); navigate("/checkout"); };
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCategories = selectedCategory === "all" 
    ? categories 
    : categories.filter(cat => cat.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <NavHeader />

      {/* Hero Section */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl leading-[1.1] mb-6">
              BROWSE <span className="text-[#9FE870]">2500+</span><br />
              DIGITAL ASSETS
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Video templates, graphics, and creative assets for every content creator.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full border-3 border-black font-['Inter:Bold',sans-serif] font-bold text-sm transition-all ${
                selectedCategory === "all"
                  ? "bg-[#163300] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-[#163300] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              ALL CATEGORIES
            </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-6 py-3 rounded-full border-3 border-black font-['Inter:Bold',sans-serif] font-bold text-sm transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-[#163300] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-[#163300] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#9FE870] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl mb-1">
                2500+
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                Total Templates
              </p>
            </div>
            <div className="bg-[#FFD7EF] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-4xl mb-1">
                12+
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#320707] text-sm">
                Categories
              </p>
            </div>
            <div className="bg-[#A0E1F1] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-4xl mb-1">
                100%
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#21231D] text-sm">
                Customizable
              </p>
            </div>
            <div className="bg-[#FFEB69] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-4xl mb-1">
                NEW
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#3A341C] text-sm">
                Weekly Updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.slug}
                className="bg-white rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="font-['Inter:Black',sans-serif] font-black text-3xl"
                      style={{ color: category.color }}
                    >
                      {category.name.toUpperCase()}
                    </h3>
                    <div className="bg-[#163300] px-4 py-2 rounded-full border-3 border-black">
                      <p className="font-['Inter:Black',sans-serif] font-black text-white text-sm">
                        {category.count}+
                      </p>
                    </div>
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border-2 border-black font-['Inter:Bold',sans-serif] font-bold text-xs"
                        style={{ backgroundColor: category.color, color: category.textColor }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl mb-4">
              EVERY TEMPLATE INCLUDES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                FULLY EDITABLE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Change colors, text, images, timing - everything is customizable to match your brand.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                OPTIMIZED FOR REELS
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Perfect 9:16 aspect ratio, 15-60 second duration, designed for maximum engagement.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                TRENDING AUDIO
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Includes viral audio IDs and sound suggestions updated weekly for maximum reach.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                MULTI-SOFTWARE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Works with CapCut, Premiere Pro, After Effects, and Final Cut Pro.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                QUICK RENDER
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Optimized for fast export - no heavy files or slow rendering times.
              </p>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-3">
                COMMERCIAL LICENSE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                Use in client work, brand content, and paid projects. Full commercial rights included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#163300] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-4xl md:text-6xl mb-6">
            GET ALL 2500+ TEMPLATES
          </h2>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-xl md:text-2xl mb-8">
            One-time payment. Lifetime access. All updates included.
          </p>
          <button onClick={handleBuy} className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-xl px-12 py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            GET INSTANT ACCESS - ₹497
          </button>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm mt-4">
            ✓ Instant Download  ✓ Lifetime Access  ✓ Commercial License
          </p>
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
