import NavHeader from "../components/NavHeader";
import usePageMeta from "../hooks/usePageMeta";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  usePageMeta(
    "Refund Policy — 30-Day Money-Back Guarantee | Digital Asset Lab",
    "Not satisfied? Digital Asset Lab offers a 30-day money-back guarantee on the Instagram Reels Bundle."
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <NavHeader />

      {/* Content */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-6xl mb-4">
            REFUND POLICY
          </h1>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-12">
            Last Updated: March 17, 2026
          </p>

          <div className="bg-[#163300] rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-2xl mb-4">
              OUR REFUND POSITION
            </h2>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-white text-lg">
              Digital Asset Lab issues refunds where there is a clear service failure, technical error, or genuine inconvenience caused on our end. We do not offer open-ended satisfaction-based refunds. Every product is accurately described, and all sales are considered final once the download has been accessed.
            </p>
          </div>

          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                When We Will Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                A refund will be granted in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">A technical fault on our platform prevented you from accessing or downloading your purchase</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You were charged more than once for the same order due to a payment processing error</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">The product delivered was materially different from what was described on the product page</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">A technical issue with the template files cannot be resolved by our support team within a reasonable timeframe</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">An error on our end resulted in an incorrect or failed order</li>
              </ul>

              <div className="bg-[#FFD7EF]/20 rounded-2xl p-6 border-2 border-[#FFD7EF] mb-4">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#320707] text-sm">
                  ⚠️ All refund requests are reviewed individually. We reserve the right to request supporting information to verify the issue before processing any refund.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                When We Will Not Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Refunds will not be issued in the following cases:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Change of mind after purchase or after download has been initiated</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Inability to use editing software — our templates work with widely available tools clearly stated on the product page</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Partial use of the bundle followed by a claim of dissatisfaction</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Evidence that template files have been redistributed, shared, or resold</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Repeated refund requests that indicate policy abuse</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                How to Request a Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                If you believe you are eligible for a refund, contact us promptly:
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
                      Include your order number, the email used for purchase, and a clear description of the issue you experienced
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#A0E1F1] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Review & Decision
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      We will review your request and respond within 24–48 hours with a decision and next steps
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#FFEB69] rounded-full h-12 w-12 flex items-center justify-center shrink-0 border-3 border-black">
                    <span className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                      Refund Processed
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                      Approved refunds are returned to your original payment method within 5–7 business days
                    </p>
                  </div>
                </div>
              </div>
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
                    24–48 hours for initial response
                  </p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-2">
                    Refund Processing
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    5–7 business days to your account
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                After a Refund is Issued
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Once a refund is confirmed and processed:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Your licence to use the purchased templates is immediately revoked</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">All downloaded template files must be deleted from your devices</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Any commercial use of content created using the templates must cease</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Access to future updates for the refunded product will not be available</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Before You Request a Refund
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Many issues can be resolved quickly without a refund:
              </p>
              <div className="space-y-4">
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                    💬 Technical Support
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    Contact our support team directly — we will do our best to resolve any technical issue with your files or download
                  </p>
                </div>
                <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                  <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-lg mb-2">
                    🔄 Bundle Exchange
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                    If you purchased the wrong product, contact us within 48 hours and we will arrange an exchange where possible
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Contact Us
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                For refund requests or questions about this policy:
              </p>
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base mb-2">Digital Asset Lab Support</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-1">
                  Email: <a href="mailto:support@digitalassetlab.com" className="text-[#9FE870] hover:underline">support@digitalassetlab.com</a>
                </p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Contact Form: <Link to="/contact" className="text-[#9FE870] hover:underline">digitalassetlab.com/contact</Link>
                </p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mt-3">
                  Response Time: 24–48 hours
                </p>
              </div>
            </div>

            <div className="bg-[#163300] rounded-2xl p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-white text-base text-center">
                We take every concern seriously. If something went wrong on our end, we will make it right — promptly and without friction.
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
