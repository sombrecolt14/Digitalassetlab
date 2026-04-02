import { Link } from "react-router-dom";

export default function TermsOfService() {
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
            TERMS OF SERVICE
          </h1>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-12">
            Last Updated: March 17, 2026
          </p>

          <div className="prose max-w-none">
            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Agreement to Terms
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                By accessing or using DigitalAssetLab's website and purchasing our digital products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Products and Services
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                DigitalAssetLab provides digital Instagram Reel templates and related assets for purchase and download. All products are delivered digitally.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Products are available for immediate download after purchase</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Access to purchased templates is lifetime and includes future updates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">We reserve the right to modify, update, or discontinue products at any time</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Licensing and Usage Rights
              </h2>
              
              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-xl mb-3">
                What You CAN Do:
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Use templates for personal or commercial projects</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Customize and modify templates to suit your needs</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Create content for clients using our templates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Sell final videos created using our templates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Use templates across multiple social media platforms</li>
              </ul>

              <h3 className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-xl mb-3">
                What You CANNOT Do:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Resell, redistribute, or share template files</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Claim templates as your own original work</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Include templates in competing template marketplaces</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Share your account access with others</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Use templates for illegal or harmful purposes</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Payment and Pricing
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">All prices are in Indian Rupees (INR) unless otherwise stated</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Payment is processed securely through Razorpay</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Prices are subject to change without notice</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">All sales are final unless covered by our refund policy</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Failed payments may result in order cancellation</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Refund Policy
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We offer a 30-day money-back guarantee. For detailed information about refunds, please review our <Link to="/refund-policy" className="text-[#9FE870] hover:underline">Refund Policy</Link>.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Intellectual Property
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                All content on DigitalAssetLab, including templates, graphics, logos, and text, is the property of DigitalAssetLab and protected by copyright laws.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Templates remain our intellectual property; you receive a license to use them</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Final videos created with templates are yours to own and distribute</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You may not reverse-engineer or extract components from templates</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                User Responsibilities
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Provide accurate and complete information during purchase</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Maintain the confidentiality of your account</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Use products in compliance with applicable laws</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Not engage in fraudulent or harmful activities</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Warranties and Disclaimers
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                Our templates are provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Specific results or outcomes from using our templates</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Compatibility with all software versions or devices</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Uninterrupted or error-free access to downloads</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">That templates will meet your specific requirements</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Limitation of Liability
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                DigitalAssetLab shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or services. Our total liability is limited to the amount you paid for the product.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Termination
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                We reserve the right to suspend or terminate your access to our services if you violate these terms. Upon termination:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">Your license to use templates may be revoked</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">You must cease using all downloaded materials</li>
                <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base">No refunds will be provided for terminated accounts</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Changes to Terms
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                We may update these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Governing Law
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl mb-4">
                Contact Information
              </h2>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border-3 border-black">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base mb-2">DigitalAssetLab</p>
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
