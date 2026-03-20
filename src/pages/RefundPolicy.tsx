import { Link } from "react-router";

export default function RefundPolicy() {
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
        </div>
      </header>

      {/* Content */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-6xl mb-4">
            REFUND POLICY
          </h1>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-12">
            Last Updated: March 17, 2026
          </p>

          <div className="bg-[#9FE870]/10 rounded-2xl p-8 border-3 border-[#9FE870] mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-4">
              30-DAY MONEY-BACK GUARANTEE
            </h2>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg">
              We stand behind the quality of our templates. If you're not satisfied, we'll refund your purchase within 30 days.
            </p>
          </div>

          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Our Commitment
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                At DigitalAssetLab, we want you to be completely satisfied with your purchase. We offer a hassle-free 30-day money-back guarantee on all template bundles.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Eligibility for Refunds
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                You are eligible for a full refund if:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You request a refund within 30 days of purchase</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">The templates have a technical issue we cannot resolve</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">The product was significantly misrepresented</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You experienced payment errors resulting in duplicate charges</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You're not satisfied with the quality (no questions asked)</li>
              </ul>

              <div className="bg-[#FFD7EF]/10 rounded-2xl p-6 border-2 border-[#FFD7EF] mb-4">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#320707] text-sm">
                  ⚠️ Note: While we don't require a detailed explanation, we appreciate feedback to help us improve our products.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                How to Request a Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                To request a refund, follow these simple steps:
              </p>
              
              <div className="space-y-6 mb-6">
                <div className="flex gap-4">
                  <div className="bg-[#9FE870] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Contact Support
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      Email us at <a href="mailto:support@digitalassetlab.com" className="text-[#9FE870] hover:underline">support@digitalassetlab.com</a> or use our <Link to="/contact" className="text-[#9FE870] hover:underline">contact form</Link>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFD7EF] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Provide Order Details
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      Include your order number, email address used for purchase, and reason for refund request
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#A0E1F1] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Receive Confirmation
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      We'll process your request within 24-48 hours and send you a confirmation email
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFEB69] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Get Your Refund
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      Refunds are processed to your original payment method within 5-7 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Refund Exceptions
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Refunds may not be granted in the following cases:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Requests made after the 30-day guarantee period</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Evidence of template file redistribution or resale</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Abuse of refund policy (multiple refund requests)</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Lack of technical knowledge to use editing software (we offer free tutorials)</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Changed mind after extensively using templates (beyond testing)</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Processing Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                    Request Review
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    24-48 hours for initial response
                  </p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                    Refund Processing
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    5-7 business days to your account
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Partial Refunds
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We do not offer partial refunds. Our products are sold as complete bundles. However:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">If you purchased the wrong bundle, contact us within 48 hours for an exchange</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Duplicate purchases can be refunded within 7 days</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Technical errors resulting in overcharges will be fully refunded</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                After Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Once a refund is processed:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Your license to use the templates is revoked</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You must delete all downloaded template files</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Access to tutorials and updates will be removed</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You may not use any content created with the templates commercially</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Alternative Solutions
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Before requesting a refund, consider these options:
              </p>
              <div className="space-y-4">
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                    📚 Free Tutorials
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    Access our comprehensive video tutorials to learn how to use templates effectively
                  </p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                    💬 Technical Support
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    Our support team can help resolve technical issues or answer questions
                  </p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                    🔄 Bundle Exchange
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    If you purchased the wrong bundle, we can help you exchange it for the right one
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Contact Us
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                For refund requests or questions about our refund policy:
              </p>
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base mb-2">DigitalAssetLab Support</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-1">
                  Email: <a href="mailto:support@digitalassetlab.com" className="text-[#9FE870] hover:underline">support@digitalassetlab.com</a>
                </p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Contact Form: <Link to="/contact" className="text-[#9FE870] hover:underline">digitalassetlab.com/contact</Link>
                </p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mt-3">
                  Response Time: 24-48 hours
                </p>
              </div>
            </div>

            <div className="bg-[#9FE870]/10 rounded-2xl p-8 border-3 border-[#9FE870]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base text-center">
                💚 Our goal is your success! If you're unhappy for any reason, we'll make it right.
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
