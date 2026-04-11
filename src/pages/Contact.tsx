import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend/email service
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
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
              GET IN <span className="text-[#9FE870]">TOUCH</span>
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Have questions? Need support? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#9FE870] rounded-2xl p-8 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-2">
                EMAIL US
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-base">
                support@digitalassetlab.com
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-sm mt-2">
                Response in 24 hours
              </p>
            </div>

            <div className="bg-[#FFD7EF] rounded-2xl p-8 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-xl mb-2">
                LIVE CHAT
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-base">
                Available Mon-Fri
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#320707] text-sm mt-2">
                9 AM - 6 PM IST
              </p>
            </div>

            <div className="bg-[#A0E1F1] rounded-2xl p-8 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-xl mb-2">
                SOCIAL MEDIA
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#21231D] text-base">
                @digitalassetlab
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#21231D] text-sm mt-2">
                DM us anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#f5f5f5] px-6 py-16 md:py-24">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl md:text-4xl mb-8 text-center">
              SEND US A MESSAGE
            </h2>

            {submitted ? (
              <div className="bg-[#9FE870] rounded-2xl p-8 text-center border-3 border-black">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-2">
                  MESSAGE SENT!
                </h3>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-base">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    SUBJECT *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="purchase">Purchase Question</option>
                    <option value="refund">Refund Request</option>
                    <option value="templates">Template Help</option>
                    <option value="licensing">Licensing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-[900px] mx-auto text-center">
          <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
            NEED QUICK ANSWERS?
          </h3>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-lg mb-6">
            Check out our FAQ page for instant answers to common questions
          </p>
          <Link to="/faq">
            <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-lg px-12 py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              VIEW FAQ
            </button>
          </Link>
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
