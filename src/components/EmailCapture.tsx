import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-[#163300] rounded-3xl p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="text-4xl mb-4">🎁</div>
          <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-3xl md:text-4xl mb-3">
            GET FREE SAMPLE TEMPLATES
          </h2>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-white/80 text-lg mb-8">
            Join the list for free samples, new product drops, and subscriber-only discounts
          </p>

          {status === "done" ? (
            <div className="bg-[#9FE870] rounded-2xl px-8 py-5 border-4 border-black inline-block">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-lg">
                ✓ YOU'RE IN! CHECK YOUR INBOX SOON
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-[560px] mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-full border-4 border-black font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#163300] focus:outline-none focus:border-[#9FE870] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-base px-10 py-4 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "sending" ? "JOINING..." : "JOIN FREE →"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="font-['Inter:Bold',sans-serif] font-bold text-red-300 text-sm mt-4">
              Something went wrong — please try again or email support@digitalassetlab.com
            </p>
          )}

          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white/50 text-xs mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
