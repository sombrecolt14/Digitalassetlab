import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get customer data from session storage
    const data = sessionStorage.getItem("checkoutData");
    if (data) {
      setCustomerData(JSON.parse(data));
    } else {
      // Redirect to checkout if no data found
      navigate("/checkout");
    }
  }, [navigate]);

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate Razorpay payment initialization
    // In production, you would call your backend to create a Razorpay order
    setTimeout(() => {
      // Mock Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: 49700, // Amount in paise (₹497 = 49700 paise)
        currency: "INR",
        name: "DigitalAssetLab",
        description: "Instagram Reels Bundle - 2500+ Templates",
        image: "", // Your logo URL
        order_id: "", // Order ID from backend
        handler: function (response: any) {
          // Payment successful
          sessionStorage.setItem("paymentId", response.razorpay_payment_id);
          navigate("/success");
        },
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone,
        },
        notes: {
          address: "DigitalAssetLab Purchase",
        },
        theme: {
          color: "#163300",
        },
      };

      // In production, use: const rzp = new window.Razorpay(options);
      // For demo purposes, we'll simulate success
      console.log("Razorpay Options:", options);
      
      // Simulate payment success after 2 seconds
      setTimeout(() => {
        sessionStorage.setItem("paymentId", "pay_demo_" + Date.now());
        navigate("/success");
      }, 2000);
    }, 1000);
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
        </div>
      </header>

      {/* Payment Content */}
      <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-8">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl mb-4">
            SECURE PAYMENT
          </h1>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-lg">
            Powered by Razorpay - India's most trusted payment gateway
          </p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-6">
          {/* Customer Details */}
          <div className="mb-8 pb-8 border-b-2 border-[#f5f5f5]">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-4">
              BILLING TO:
            </h2>
            <div className="space-y-2">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565]">
                {customerData.name}
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                {customerData.email}
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                {customerData.phone}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-4">
              ORDER DETAILS:
            </h2>
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                    Instagram Reels Bundle
                  </h3>
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    2500+ Templates + All Bonuses
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-white">
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl">
                  Total Amount
                </p>
                <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl">
                  ₹497
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="mb-8">
            <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-base mb-4">
              ACCEPTED PAYMENT METHODS:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#f5f5f5] rounded-xl p-3 text-center border-2 border-[#e0e0e0]">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">💳 Cards</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-3 text-center border-2 border-[#e0e0e0]">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">🏦 UPI</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-3 text-center border-2 border-[#e0e0e0]">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">🏧 Net Banking</p>
              </div>
              <div className="bg-[#f5f5f5] rounded-xl p-3 text-center border-2 border-[#e0e0e0]">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">📱 Wallets</p>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? "PROCESSING..." : "PAY ₹497 WITH RAZORPAY"}
          </button>

          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs text-center mt-4">
            🔒 Your payment is secure and encrypted
          </p>
        </div>

        {/* Trust & Security */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-2">🔐</div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-1">
              256-bit SSL
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs">
              Bank-grade security
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-2">✅</div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-1">
              Trusted by 10K+
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs">
              Happy creators
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-2">⚡</div>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-1">
              Instant Delivery
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs">
              Download in 2 min
            </p>
          </div>
        </div>

        {/* Integration Note */}
        <div className="mt-8 bg-[#FFEB69]/20 rounded-2xl p-6 border-3 border-[#FFEB69]">
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#3A341C] text-sm text-center">
            💡 <strong>Demo Mode:</strong> This is a demonstration. In production, clicking "Pay" will open the Razorpay payment modal with real payment options.
          </p>
        </div>
      </div>
    </div>
  );
}
