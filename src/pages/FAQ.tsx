import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What exactly is the Complete Creator Bundle?",
        a: "The Complete Creator Bundle is our flagship product — a single download containing 6200+ Instagram Reel templates across 15+ content categories, plus bonuses including 500+ Hook Templates, 300+ Transition Pack, and a Viral Strategy Guide. Everything is included in one purchase."
      },
      {
        q: "How do I get the bundle after purchase?",
        a: "Immediately after payment is confirmed, a download link is sent to your email. Click it to access the complete bundle on Google Drive. The link is also shown on your confirmation page."
      },
      {
        q: "What software do I need?",
        a: "The templates work with CapCut (free), Adobe Premiere Pro, After Effects, and Final Cut Pro. CapCut is recommended for beginners — it's free and handles all the templates perfectly."
      },
      {
        q: "Are the templates easy to edit?",
        a: "Yes! Simply open a template in your editing app, swap in your own text, images, or video clips, and export. Most customizations take under 10 minutes."
      },
    ]
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "How much does the bundle cost?",
        a: "The Complete Creator Bundle is ₹530 — a one-time payment. No subscriptions, no hidden fees. You get lifetime access to everything included, plus all future updates for free."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay payment gateway."
      },
      {
        q: "Is there a money-back guarantee?",
        a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us within 30 days at support@digitalassetlab.com for a full refund."
      },
    ]
  },
  {
    category: "Usage & Licensing",
    questions: [
      {
        q: "Can I use these templates for client work?",
        a: "Yes! The bundle includes a full commercial license. Use the templates for client projects, monetized content, paid campaigns — no restrictions."
      },
      {
        q: "Can I customize the templates?",
        a: "Absolutely. Change colors, fonts, text, images, video clips, timing, and effects freely. The templates are designed to be fully customizable to match any brand."
      },
      {
        q: "Can I resell or redistribute the templates?",
        a: "No. You can sell final videos or content created with the templates, but you cannot resell, redistribute, or share the original template files themselves."
      },
      {
        q: "Do I get future templates too?",
        a: "Yes — lifetime updates means every new template added to the bundle is yours automatically, at no extra charge."
      },
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "I didn't receive my download email. What do I do?",
        a: "First, check your spam or promotions folder. If it's not there, email us at support@digitalassetlab.com with your payment details and we'll resend the link right away."
      },
      {
        q: "A template isn't opening correctly. Help!",
        a: "Make sure you're using a supported app (CapCut, Premiere Pro, After Effects, or Final Cut Pro) and that it's up to date. If the issue persists, contact support and we'll sort it out."
      },
      {
        q: "Can I re-download if I lose the files?",
        a: "Yes. Your Google Drive link stays active. Just use the original email link or contact us to get it resent."
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
      <NavHeader />

      {/* Hero */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl mb-6">
              FREQUENTLY ASKED <span className="text-[#9FE870]">QUESTIONS</span>
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Everything you need to know about Digital Asset Lab products
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
                BROWSE OUR <Link to="/bundles" className="text-[#9FE870] hover:underline">SHOP</Link>
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
                <Link to="/bundles">
                  <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    BROWSE SHOP
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
