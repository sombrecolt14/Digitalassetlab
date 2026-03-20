import { Link } from "react-router";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I download my templates after purchase?",
        a: "After completing your purchase, you'll receive an instant download link via email. Click the link to download your complete template bundle. You can also access downloads from your purchase confirmation page."
      },
      {
        q: "What software do I need to use these templates?",
        a: "Our templates work with CapCut (mobile & desktop), Adobe Premiere Pro, Adobe After Effects, and Final Cut Pro. Most templates are optimized for CapCut for easiest editing."
      },
      {
        q: "Are the templates really easy to edit?",
        a: "Absolutely! Each template includes a step-by-step tutorial video showing exactly how to customize it. Most edits take just 5-10 minutes - simply replace text, images, and videos with your own content."
      },
    ]
  },
  {
    category: "Templates & Usage",
    questions: [
      {
        q: "Can I use these templates for client work?",
        a: "Yes! All bundles include a full commercial license. You can use templates for client projects, sell the final videos, and monetize your content on any platform without restrictions."
      },
      {
        q: "How often are new templates added?",
        a: "We add new templates monthly to keep up with trending styles and viral formats. All updates are included free with your purchase - you'll receive email notifications when new templates are released."
      },
      {
        q: "Can I customize the colors and fonts?",
        a: "Yes, everything is fully customizable! Change colors, fonts, text, images, videos, timing, and effects. Our templates are designed to match your unique brand aesthetic."
      },
      {
        q: "Do templates come with music/audio?",
        a: "Templates include viral audio IDs and trending sound suggestions updated weekly. You'll need to add the actual audio from Instagram/TikTok using the provided IDs for copyright-free usage."
      },
    ]
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "Is this a one-time payment or subscription?",
        a: "It's a one-time payment! Pay ₹497 once and get lifetime access to all 2500+ templates plus all future updates. No monthly fees, no hidden costs."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay payment gateway."
      },
      {
        q: "Is there a money-back guarantee?",
        a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the templates for any reason, contact us within 30 days for a full refund."
      },
      {
        q: "Are there any discounts available?",
        a: "The current price of ₹497 (70% off) is our best offer. This limited-time discount saves you ₹1,153 from the regular price of ₹1,650."
      },
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "I'm having trouble downloading. What should I do?",
        a: "First, check your spam folder for the download email. If you still can't find it, contact us at support@digitalassetlab.com with your order details, and we'll resend the link immediately."
      },
      {
        q: "The template won't open in my software. Help!",
        a: "Make sure you're using a compatible version of your editing software. Each template folder includes a README file with system requirements. Contact support if issues persist - we're here to help!"
      },
      {
        q: "How do I install the templates?",
        a: "Each template bundle includes detailed installation instructions for your specific software. Generally, you'll unzip the downloaded folder and import the project files into your editor."
      },
      {
        q: "Can I re-download my templates if I lose them?",
        a: "Yes! Your download link remains active. Simply use the original email link or contact support to get a fresh download link sent to you."
      },
    ]
  },
  {
    category: "Licensing & Usage Rights",
    questions: [
      {
        q: "Can I share templates with my team?",
        a: "The license covers one individual or business entity. If multiple team members need access, each person requires their own license. Contact us for team/agency pricing."
      },
      {
        q: "Can I resell or redistribute the templates?",
        a: "No. You can sell final videos created with the templates, but you cannot resell, redistribute, or share the original template files themselves."
      },
      {
        q: "Am I allowed to modify the templates?",
        a: "Yes! You're encouraged to customize templates to match your brand. Change anything you want - colors, text, layout, timing, effects, etc."
      },
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

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
            <Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Bundles
            </Link>
            <Link to="/faq" className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-sm transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl mb-6">
              FREQUENTLY ASKED <span className="text-[#9FE870]">QUESTIONS</span>
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Everything you need to know about our Instagram Reel templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#9FE870]/10 rounded-2xl p-6 text-center border-3 border-[#9FE870]">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm">
                INSTANT ANSWERS
              </p>
            </div>
            <div className="bg-[#FFD7EF]/10 rounded-2xl p-6 text-center border-3 border-[#FFD7EF]">
              <div className="text-3xl mb-2">💬</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm">
                STILL HAVE QUESTIONS? <Link to="/contact" className="text-[#9FE870] hover:underline">CONTACT US</Link>
              </p>
            </div>
            <div className="bg-[#A0E1F1]/10 rounded-2xl p-6 text-center border-3 border-[#A0E1F1]">
              <div className="text-3xl mb-2">📚</div>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm">
                CHECK <Link to="/tutorials" className="text-[#9FE870] hover:underline">TUTORIALS</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-6">
                {category.category.toUpperCase()}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#f5f5f5] transition-colors"
                      >
                        <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg text-left">
                          {faq.q}
                        </h3>
                        <span className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-2xl ml-4 shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-8 pb-6 border-t-2 border-[#f5f5f5] pt-6">
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-gradient-to-br from-[#163300] to-[#260A2F] rounded-3xl p-1 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-white rounded-[20px] p-8 md:p-12 text-center">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl md:text-4xl mb-4">
                STILL HAVE QUESTIONS?
              </h2>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-lg mb-8">
                Our support team is here to help you succeed
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    CONTACT SUPPORT
                  </button>
                </Link>
                <Link to="/tutorials">
                  <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    VIEW TUTORIALS
                  </button>
                </Link>
              </div>
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
