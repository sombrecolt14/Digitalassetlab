import NavHeader from "../components/NavHeader";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { removeFromCart } = useCart();
  const handleRemove = () => { removeFromCart(); navigate("/bundles"); };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in session storage for payment page
    sessionStorage.setItem("checkoutData", JSON.stringify(formData));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <NavHeader />

      {/* Checkout Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-8">
          <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl md:text-6xl mb-4">
            CHECKOUT
          </h1>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-lg">
            You're one step away from viral content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start pb-4 border-b-2 border-[#f5f5f5]">
                  <div>
                    <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg mb-1">
                      Instagram Reels Bundle
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm mb-3">
                      6200+ Templates + Bonuses
                    </p>
                    <button
                      onClick={handleRemove}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 border-2 border-red-400 text-red-500 font-['Inter:Bold',sans-serif] font-bold text-xs hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      REMOVE FROM CART
                    </button>
                  </div>
                  <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl">
                    ₹530
                  </p>
                </div>

                <div className="bg-[#9FE870]/10 rounded-2xl p-4 border-2 border-[#9FE870]">
                  <h4 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-sm mb-2">
                    WHAT'S INCLUDED:
                  </h4>
                  <ul className="space-y-2">
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      6200+ Instagram Reel Templates
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      15+ Content Categories
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      500+ Hook Templates (Bonus)
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      300+ Transition Pack (Bonus)
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      Viral Strategy Guide (Bonus)
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      Commercial License
                    </li>
                    <li className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm flex items-start gap-2">
                      <span className="text-[#9FE870]">✓</span>
                      Lifetime Updates
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t-2 border-[#f5f5f5] pt-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-base">
                    Subtotal
                  </p>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-base">
                    ₹1,650
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-base">
                    Discount (68% OFF)
                  </p>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-base">
                    -₹1,120
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-black">
                  <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl">
                    Total
                  </p>
                  <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-3xl">
                    ₹530
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">
                    Instant Access
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xs">
                    Lifetime License
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Details Form */}
          <div>
            <div className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-2xl mb-6">
                BILLING DETAILS
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
                    placeholder="Enter your full name"
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
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs mt-2">
                    Download link will be sent to this email
                  </p>
                </div>

                <div>
                  <label className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm mb-2 block">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-3 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
                    placeholder="+91 "
                  />
                </div>

                <div className="bg-[#FFD7EF]/10 rounded-2xl p-4 border-2 border-[#FFD7EF]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                    💡 <strong>Tip:</strong> Make sure your email is correct! All templates and bonuses will be delivered instantly to your inbox.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#163300] text-white font-['Inter:Black',sans-serif] font-black text-xl py-5 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  PROCEED TO PAYMENT →
                </button>

                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-xs text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
