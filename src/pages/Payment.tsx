import NavHeader from "../components/NavHeader";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  notes: { product: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");
    if (data) {
      setCustomerData(JSON.parse(data));
    } else {
      navigate("/checkout");
    }
    // Pre-load the Razorpay script in the background
    loadRazorpayScript();
  }, [navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay. Check your internet connection.");
      }

      // 2. Create order on the backend
      const orderRes = await fetch("/api/create-order", { method: "POST" });
      const orderData = await orderRes.json();

      if (!orderData.ok) {
        throw new Error(orderData.message || "Could not create payment order. Try again.");
      }

      // 3. Open Razorpay checkout modal
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        order_id: orderData.orderId,
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone,
        },
        notes: { product: "Instagram Reels Bundle" },
        theme: { color: "#163300" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async (response: RazorpayResponse) => {
          try {
            // 4. Verify payment signature on the backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.ok) {
              throw new Error("Payment verification failed. Contact support.");
            }

            // 5. Payment verified — go to success page
            sessionStorage.setItem("paymentId", response.razorpay_payment_id);
            navigate("/success");
          } catch (err: any) {
            setError(err.message || "Payment verification failed.");
            setIsProcessing(false);
          }
        },
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <NavHeader />

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

          {/* Error message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-400 rounded-2xl p-4">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-red-700 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? "OPENING PAYMENT..." : "PAY ₹497 WITH RAZORPAY"}
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
      </div>
    </div>
  );
}
