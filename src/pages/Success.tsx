import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// TODO: Replace with your actual download link (Google Drive, Dropbox, etc.)
const DOWNLOAD_URL = "https://YOUR_DOWNLOAD_LINK_HERE";

export default function Success() {
  const [paymentId, setPaymentId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const pId = sessionStorage.getItem("paymentId");
    const checkoutData = sessionStorage.getItem("checkoutData");
    
    if (pId) {
      setPaymentId(pId);
    }
    
    if (checkoutData) {
      const data = JSON.parse(checkoutData);
      setCustomerEmail(data.email);
    }
  }, []);

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

      {/* Success Content */}
      <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#9FE870] rounded-full p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
            <div className="text-7xl">✓</div>
          </div>
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl mb-4">
            PAYMENT SUCCESSFUL!
          </h1>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl">
            Welcome to the DigitalAssetLab family! 🎉
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-6">
            ORDER CONFIRMATION
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b-2 border-[#f5f5f5]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565]">
                Order Status
              </p>
              <div className="bg-[#9FE870] px-4 py-2 rounded-full border-2 border-black">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm">
                  COMPLETED
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b-2 border-[#f5f5f5]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565]">
                Payment ID
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-sm">
                {paymentId || "Processing..."}
              </p>
            </div>

            <div className="flex justify-between items-center pb-4 border-b-2 border-[#f5f5f5]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565]">
                Amount Paid
              </p>
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl">
                ₹497
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565]">
                Email
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] text-sm">
                {customerEmail || "Updating..."}
              </p>
            </div>
          </div>

          <div className="bg-[#9FE870]/10 rounded-2xl p-6 border-3 border-[#9FE870] mb-8">
            <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-3">
              📧 CHECK YOUR EMAIL
            </h3>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-base mb-2">
              We've sent your download link to <strong>{customerEmail}</strong>
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
              If you don't see it, check your spam folder or contact support.
            </p>
          </div>

          {/* Download Button */}
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all mb-4">
              DOWNLOAD YOUR BUNDLE NOW
            </button>
          </a>

          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs text-center">
            You can also access your downloads anytime from the email link
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-6">
            WHAT'S NEXT?
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-[#9FE870] rounded-full h-10 w-10 flex items-center justify-center shrink-0 border-3 border-black">
                <span className="font-['Inter:Black',sans-serif] font-black text-[#163300]">1</span>
              </div>
              <div>
                <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                  Download Your Bundle
                </h4>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                  Click the download link in your email to get all 2500+ templates plus bonuses
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#FFD7EF] rounded-full h-10 w-10 flex items-center justify-center shrink-0 border-3 border-black">
                <span className="font-['Inter:Black',sans-serif] font-black text-[#320707]">2</span>
              </div>
              <div>
                <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                  Install Templates
                </h4>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                  Follow the included setup guide for CapCut, Premiere Pro, or After Effects
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#A0E1F1] rounded-full h-10 w-10 flex items-center justify-center shrink-0 border-3 border-black">
                <span className="font-['Inter:Black',sans-serif] font-black text-[#21231D]">3</span>
              </div>
              <div>
                <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                  Start Creating
                </h4>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                  Pick a template, customize it with your content, and start going viral!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#FFEB69] rounded-full h-10 w-10 flex items-center justify-center shrink-0 border-3 border-black">
                <span className="font-['Inter:Black',sans-serif] font-black text-[#3A341C]">4</span>
              </div>
              <div>
                <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                  Join Our Community
                </h4>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                  Get exclusive tips, updates, and support from our creator community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-base mb-2">
            Need help? We're here for you!
          </p>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
            Email us at <a href="mailto:support@digitalassetlab.com" className="text-[#9FE870] hover:underline">support@digitalassetlab.com</a>
          </p>
        </div>

        {/* Return Home */}
        <div className="text-center mt-8">
          <Link to="/">
            <button className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-base hover:text-[#9FE870] transition-colors">
              ← Return to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
