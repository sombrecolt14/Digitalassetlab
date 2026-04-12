import NavHeader from "../components/NavHeader";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <NavHeader />

      {/* Content */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-6xl mb-4">
            PRIVACY POLICY
          </h1>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-12">
            Last Updated: March 17, 2026
          </p>

          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Introduction
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Digital Asset Lab ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Information We Collect
              </h2>
              
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-xl mb-3">
                Personal Information
              </h3>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                When you purchase our templates or contact us, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Name and contact information (email address, phone number)</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Billing information and payment details (processed securely through Razorpay)</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Order history and download records</li>
              </ul>

              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-xl mb-3">
                Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">IP address and browser type</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Device information and operating system</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Pages visited and time spent on our site</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Referring website addresses</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                How We Use Your Information
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Processing and fulfilling your orders</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Sending download links and purchase confirmations</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Providing customer support and responding to inquiries</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Sending updates about new templates and features (you can opt-out anytime)</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Improving our website and services</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Preventing fraud and ensuring security</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Data Sharing and Disclosure
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base"><strong>Payment Processors:</strong> Razorpay for secure payment processing</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base"><strong>Email Service Providers:</strong> For sending order confirmations and updates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base"><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Data Security
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">SSL encryption for data transmission</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Secure payment processing through PCI-compliant Razorpay</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Regular security audits and updates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Restricted access to personal data</li>
              </ul>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Your Rights
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Access your personal data we hold</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Request correction of inaccurate data</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Request deletion of your personal data</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Opt-out of marketing communications</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Withdraw consent at any time</li>
              </ul>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                To exercise these rights, contact us at support@digitalassetlab.com
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Cookies
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience. You can control cookies through your browser settings.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Changes to This Policy
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Contact Us
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base mb-2">Digital Asset Lab</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Email: support@digitalassetlab.com</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">
                  Contact Form: <Link to="/contact" className="text-[#9FE870] hover:underline">digitalassetlab.com/contact</Link>
                </p>
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
