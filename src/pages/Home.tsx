import { Link } from "react-router-dom";
import svgPaths from "../imports/svg-9i708zpxdq";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Home() {
  const [zoomStage, setZoomStage] = useState(0);

  useEffect(() => {
    // Stage 0: Digital nomad working (0-3s)
    const timer1 = setTimeout(() => setZoomStage(1), 3000);
    // Stage 1: Zoom to cruise (3-6s)
    const timer2 = setTimeout(() => setZoomStage(2), 6000);
    // Stage 2: Zoom to vast ocean (6-9s)
    const timer3 = setTimeout(() => setZoomStage(3), 9000);
    // Loop back (9-12s)
    const timer4 = setTimeout(() => setZoomStage(0), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [zoomStage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-[#9FE870] to-[#A0E1F1] px-6 py-3 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-center text-sm md:text-base">
            🎉 LAUNCH OFFER: Complete Digital Asset Bundle • 6200+ Premium Templates • Only ₹497
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#163300] px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl">
              DIGITAL ASSET LAB
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/templates" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Templates
            </Link>
            <Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Shop
            </Link>
            <Link to="/checkout" className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm bg-[#9FE870] px-4 py-2 rounded-full border-2 border-[#9FE870] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
              Checkout
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white px-6 py-16 md:py-24 relative overflow-hidden min-h-[600px]">
        {/* Animated Zoom Out Background */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              scale: zoomStage === 0 ? 3 : zoomStage === 1 ? 1.5 : zoomStage === 2 ? 1 : 0.3,
              opacity: zoomStage === 3 ? 0 : 1
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut"
            }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1650371471800-aa496564acba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbm9tYWQlMjB3b3JraW5nJTIwbGFwdG9wJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzM3NzE3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />
          
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              scale: zoomStage === 1 ? 2 : zoomStage === 2 ? 1 : zoomStage === 3 ? 0.5 : 5,
              opacity: zoomStage === 1 || zoomStage === 2 ? 1 : 0
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut"
            }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1607144415124-701c6f774006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwYWVyaWFsJTIwYmlyZHMlMjBleWUlMjB2aWV3fGVufDF8fHx8MTc3Mzc3MTc1MXww&ixlib=rb-4.1.0&q=80&w=1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />

          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              scale: zoomStage === 2 ? 1.2 : zoomStage === 3 ? 1 : 3,
              opacity: zoomStage === 2 || zoomStage === 3 ? 1 : 0
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut"
            }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1570422342126-e591607ef2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHNlYSUyMGFlcmlhbCUyMHZhc3QlMjB3YXRlciUyMGJpcmRzJTIwZXllfGVufDF8fHx8MTc3Mzc3MTc1M3ww&ixlib=rb-4.1.0&q=80&w=1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#9FE870] px-6 py-2 rounded-full border-3 border-black mb-6">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm tracking-wider">
                PREMIUM DIGITAL PRODUCTS
              </p>
            </div>
            <h1 className="font-['Inter:Black',sans-serif] font-black text-white text-5xl md:text-7xl leading-[1.1] mb-6 drop-shadow-lg">
              YOUR TRUSTED SOURCE FOR<br />
              <span className="text-[#9FE870]">DIGITAL ASSETS</span>
            </h1>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-xl md:text-2xl max-w-[900px] mx-auto drop-shadow-md mb-8">
              High-quality templates, graphics, and digital resources designed for content creators, marketers, and businesses.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="bg-[#9FE870] rounded-3xl p-6 md:p-8 relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl mb-2">
                6200+
              </p>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs md:text-sm tracking-wider">
                TEMPLATES IN ONE BUNDLE
              </p>
            </div>
            <div className="bg-[#FFD7EF] rounded-3xl p-6 md:p-8 relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-4xl md:text-5xl mb-2">
                5+
              </p>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-xs md:text-sm tracking-wider">
                PRODUCT LINES
              </p>
            </div>
            <div className="bg-[#A0E1F1] rounded-3xl p-6 md:p-8 relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-4xl md:text-5xl mb-2">
                100%
              </p>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-xs md:text-sm tracking-wider">
                COMMERCIAL LICENSE
              </p>
            </div>
            <div className="bg-[#FFEB69] rounded-3xl p-6 md:p-8 relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-4xl md:text-5xl mb-2">
                30
              </p>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-xs md:text-sm tracking-wider">
                DAY MONEY-BACK GUARANTEE
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link to="/checkout">
              <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                GET INSTANT ACCESS - ₹497
              </button>
            </Link>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm mt-4 drop-shadow">
              ✓ Instant Download  ✓ Lifetime Access  ✓ Full Commercial License
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white px-6 py-16 md:py-24 border-t-4 border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-5xl leading-[1.2] mb-6">
              What We Offer
            </h2>
            <p className="font-['Inter:Regular',sans-serif] text-[#4a5565] text-base md:text-lg max-w-[900px] border-b-2 border-black pb-6">
              Digital Asset Lab specialises in high-quality digital products designed for content creators, marketers, and businesses. From social media templates to professional planners, our products help you work smarter and achieve your goals faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value Prop 1 */}
            <div className="text-center p-8 bg-[#9FE870] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6 flex justify-center">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="#163300" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-3">
                PREMIUM DIGITAL PRODUCTS
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-sm">
                High-quality templates, graphics, and digital resources designed for social media, marketing, and business applications.
              </p>
            </div>

            {/* Value Prop 2 */}
            <div className="text-center p-8 bg-[#A0E1F1] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6 flex justify-center">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="#21231D" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-lg mb-3">
                INSTANT DOWNLOAD
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#21231D] text-sm">
                Get immediate access to your purchases. All digital products are delivered instantly after checkout with no waiting time.
              </p>
            </div>

            {/* Value Prop 3 */}
            <div className="text-center p-8 bg-[#FFD7EF] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6 flex justify-center">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="#320707" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-lg mb-3">
                COMMERCIAL LICENSE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-sm">
                Use our products in client projects and commercial work. All digital assets include full commercial rights for business applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl leading-[1.2] mb-4">
              THE CATEGORIES
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg md:text-xl mb-6 max-w-[900px]">
              Ready to elevate your digital projects? Visit our shop to explore all available products designed for creators like you.
            </p>
            <Link to="/templates">
              <button className="bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-sm px-8 py-3 border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                READ MORE...
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Media Templates */}
            <div className="bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHRlbXBsYXRlc3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Social Media Templates"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border-t-4 border-black">
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-2">
                  SOCIAL MEDIA TEMPLATES
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  6200+ Instagram Reels, Stories 2500+ Instagram Reels, Stories & Post templates. Ready to edit and post. Post templates across 15+ categories. Ready to edit and post.
                </p>
              </div>
            </div>

            {/* Business Templates - Coming Soon */}
            <div className="bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-4 right-4 z-10 bg-[#FFEB69] px-4 py-2 rounded-full border-3 border-black">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">
                  COMING SOON
                </p>
              </div>
              <div className="h-64 overflow-hidden opacity-60">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlbXBsYXRlc3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Business Templates"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border-t-4 border-black">
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-2xl mb-2">
                  BUSINESS TEMPLATES
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Invoices, presentations, proposals & more. Professional docs in minutes.
                </p>
              </div>
            </div>

            {/* Graphic Design Assets - Coming Soon */}
            <div className="bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-4 right-4 z-10 bg-[#FFEB69] px-4 py-2 rounded-full border-3 border-black">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">
                  COMING SOON
                </p>
              </div>
              <div className="h-64 overflow-hidden opacity-60">
                <img 
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYXNzZXRzfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Graphic Design Assets"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border-t-4 border-black">
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-2xl mb-2">
                  GRAPHIC DESIGN ASSETS
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Icons, illustrations, backgrounds & more. Unlimited creative possibilities.
                </p>
              </div>
            </div>

            {/* Marketing Resources - Coming Soon */}
            <div className="bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-4 right-4 z-10 bg-[#FFEB69] px-4 py-2 rounded-full border-3 border-black">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xs">
                  COMING SOON
                </p>
              </div>
              <div className="h-64 overflow-hidden opacity-60">
                <img 
                  src="https://images.unsplash.com/photo-1432888622747-4eb9a8f2c5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjByZXNvdXJjZXN8ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Marketing Resources"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border-t-4 border-black">
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-2xl mb-2">
                  MARKETING RESOURCES
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Ad creatives, email templates, landing pages. Complete marketing toolkit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Digital Asset Lab */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl leading-[1.2] mb-4">
              WHY DIGITAL ASSET LAB
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg md:text-xl max-w-[700px] mx-auto">
              Everything we make is built to help you create faster, look more professional, and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#163300] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl leading-[1.25] mb-4">
                PROFESSIONAL QUALITY
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-lg opacity-90">
                Every product is designed to a professional standard — ready to use straight out of the box.
              </p>
            </div>

            <div className="bg-[#FFD7EF] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-2xl leading-[1.25] mb-4">
                INSTANT DOWNLOAD
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-lg opacity-90">
                Access your purchase immediately after checkout. No waiting, no delays.
              </p>
            </div>

            <div className="bg-[#A0E1F1] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-2xl leading-[1.25] mb-4">
                COMMERCIAL LICENSE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#21231D] text-lg opacity-90">
                Use our products in client work, sell the results, and monetize freely. No restrictions.
              </p>
            </div>

            <div className="bg-[#260A2F] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl leading-[1.25] mb-4">
                LIFETIME UPDATES
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-lg opacity-90">
                Buy once and get every future update for free. We keep adding new content regularly.
              </p>
            </div>

            <div className="bg-[#FFC091] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-2xl leading-[1.25] mb-4">
                EASY TO CUSTOMISE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-lg opacity-90">
                Built for non-designers. Change colours, text, and images in minutes with popular editing tools.
              </p>
            </div>

            <div className="bg-[#9FE870] rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl leading-[1.25] mb-4">
                30-DAY GUARANTEE
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-lg opacity-90">
                Not happy? Get a full refund within 30 days. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl leading-[1.2] mb-4">
              WHAT CREATORS SAY
            </h2>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg md:text-xl">
              Real people. Real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1611574557783-9a50bb34e9f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcmVhdG9yJTIwd29tYW58ZW58MXx8fHwxNzY0ODQ3Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Priya Sharma"
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#FFD7EF]"
                />
                <div>
                  <h4 className="font-['Inter:Black',sans-serif] font-black text-[#FFD7EF] text-lg">
                    Priya Sharma
                  </h4>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    Fashion Blogger
                  </p>
                </div>
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                "These digital assets have completely transformed how I create content. I used to spend days on designs — now it takes minutes. Absolutely worth every rupee!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1524538198441-241ff79d153b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG1hbnxlbnwxfHx8fDE3NjQ3NDgxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Rahul Verma"
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#FFC091]"
                />
                <div>
                  <h4 className="font-['Inter:Black',sans-serif] font-black text-[#FFC091] text-lg">
                    Rahul Verma
                  </h4>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    Tech Reviewer
                  </p>
                </div>
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                "I use these for client projects and the quality always impresses. Everything is easy to customise and looks premium right out of the box."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2NDg0NzY4NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sneha Patel"
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#9FE870]"
                />
                <div>
                  <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-lg">
                    Sneha Patel
                  </h4>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    Business Coach
                  </p>
                </div>
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                "The range of products covers everything I need. My content looks consistent, professional, and on-brand every single time. Total game changer!"
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ4NDc2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Arjun Malhotra"
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#FFEB69]"
                />
                <div>
                  <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg">
                    Arjun Malhotra
                  </h4>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    Travel Vlogger
                  </p>
                </div>
              </div>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                "Best investment I have made for my content. The quality is outstanding and the instant download made it so easy to get started right away."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#9FE870] px-6 py-2 rounded-full border-3 border-black mb-4"><p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm tracking-wider">🚀 LAUNCH PRODUCT</p></div>
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl leading-[1.2] mb-4">
              INSTAGRAM REELS BUNDLE
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#163300] to-[#260A2F] rounded-3xl p-1 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-white rounded-[20px] p-8 md:p-12">
              <div className="text-center mb-8">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm mb-4 uppercase tracking-wider">
                  Limited Time Offer
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="font-['Inter:Black',sans-serif] font-black text-[#4a5565] text-3xl line-through">
                    ₹1,650
                  </span>
                  <span className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-6xl md:text-7xl">
                    ₹497
                  </span>
                </div>
                <div className="inline-block bg-[#9FE870] px-6 py-3 rounded-full border-3 border-black">
                  <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base">
                    SAVE 70% • ONE-TIME PAYMENT
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8 max-w-[600px] mx-auto">
                <div className="flex items-start gap-3">
                  <div className="bg-[#260A2F] rounded-full h-8 w-8 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-white text-base">✓</span>
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg pt-1">
                    6200+ Instagram Reel Templates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#260A2F] rounded-full h-8 w-8 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-white text-base">✓</span>
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg pt-1">
                    15+ Content Categories (Fashion, Travel, Food & More)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#260A2F] rounded-full h-8 w-8 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-white text-base">✓</span>
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg pt-1">
                    Commercial License & Lifetime Updates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#260A2F] rounded-full h-8 w-8 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-white text-base">✓</span>
                  </div>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg pt-1">
                    Bonus: Hooks + Transitions + Strategy Guide (Worth ₹2,999)
                  </p>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  GET INSTANT ACCESS - ₹497
                </button>
              </Link>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm text-center mt-4">
                ✓ Instant Download  ✓ 30-Day Money-Back Guarantee  ✓ Secure Payment
              </p>
            </div>
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
                <li><Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">Bundles</Link>
            <Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">Shop</Link>
            <Link to="/checkout" className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-sm border-2 border-[#9FE870] px-4 py-1 rounded-full hover:bg-[#9FE870] hover:text-[#163300] transition-all">Checkout</Link></li>
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
