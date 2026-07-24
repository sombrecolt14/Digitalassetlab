// Digital Asset Lab — checkout + email capture
// Buttons: <button data-buy="reels|architecture">, forms: <form data-subscribe>
(function () {
  const PRODUCTS = {
    reels: { label: "Instagram Reels Bundle", price: "₹530" },
    architecture: { label: "The Architecture Bundle", price: "₹1,499" },
  };

  // ── dialog ──
  const style = document.createElement("style");
  style.textContent = `
    .dal-dlg{ border:none; border-radius:16px; padding:0; max-width:26rem; width:calc(100vw - 2.5rem);
      box-shadow:0 30px 80px rgba(0,0,0,.35); }
    .dal-dlg::backdrop{ background:rgba(10,15,10,.55); backdrop-filter:blur(3px); }
    .dal-dlg form{ display:grid; gap:.8rem; padding:1.6rem; font:inherit; }
    .dal-dlg h3{ font-size:1.25rem; font-weight:720; letter-spacing:-.01em; margin:0; }
    .dal-dlg .dal-sum{ display:flex; justify-content:space-between; font-size:.95rem; font-weight:650;
      background:#f4f4f2; border-radius:10px; padding:.75rem 1rem; }
    .dal-dlg label{ font-size:.82rem; font-weight:600; display:grid; gap:.3rem; }
    .dal-dlg input{ font:inherit; font-size:.95rem; padding:.7rem .9rem; border-radius:10px;
      border:1.5px solid #d5d5d0; width:100%; }
    .dal-dlg input:focus{ outline:2px solid #1a1a1a; outline-offset:1px; }
    .dal-dlg .dal-pay{ font:inherit; font-weight:650; font-size:1rem; padding:.85rem 1.2rem; border-radius:999px;
      border:none; background:#1a2b12; color:#fff; cursor:pointer; }
    .dal-dlg .dal-pay:disabled{ opacity:.6; cursor:wait; }
    .dal-dlg .dal-cancel{ font:inherit; font-size:.85rem; background:none; border:none; color:#666; cursor:pointer; }
    .dal-dlg .dal-err{ color:#a4232a; font-size:.85rem; margin:0; display:none; }
    .dal-dlg .dal-fine{ color:#666; font-size:.75rem; margin:0; text-align:center; }
  `;
  document.head.appendChild(style);

  const dlg = document.createElement("dialog");
  dlg.className = "dal-dlg";
  dlg.innerHTML = `
    <form method="dialog" novalidate>
      <h3>Checkout</h3>
      <div class="dal-sum"><span class="dal-product"></span><span class="dal-price"></span></div>
      <label>Name<input name="name" autocomplete="name" required></label>
      <label>Email (your download goes here)<input name="email" type="email" autocomplete="email" required></label>
      <label>Phone<input name="phone" type="tel" autocomplete="tel" inputmode="numeric" required></label>
      <p class="dal-err"></p>
      <button type="submit" class="dal-pay">Pay with Razorpay</button>
      <button type="button" class="dal-cancel">Cancel</button>
      <p class="dal-fine">Secure checkout by Razorpay · UPI, cards, netbanking &amp; wallets</p>
    </form>`;
  document.body.appendChild(dlg);

  const form = dlg.querySelector("form");
  const err = dlg.querySelector(".dal-err");
  const payBtn = dlg.querySelector(".dal-pay");
  let currentProduct = "reels";

  dlg.querySelector(".dal-cancel").addEventListener("click", () => dlg.close());

  function showError(msg) { err.textContent = msg; err.style.display = "block"; payBtn.disabled = false; }

  function loadRazorpay() {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }

  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentProduct = btn.getAttribute("data-buy");
      const p = PRODUCTS[currentProduct];
      if (!p) return;
      dlg.querySelector(".dal-product").textContent = p.label;
      dlg.querySelector(".dal-price").textContent = p.price;
      err.style.display = "none";
      payBtn.disabled = false;
      dlg.showModal();
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 8) {
      return showError("Please fill your name, a valid email, and phone number.");
    }
    payBtn.disabled = true;
    err.style.display = "none";

    try {
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) throw new Error("Could not load Razorpay. Check your connection and try again.");

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: currentProduct }),
      });
      const order = await orderRes.json();
      if (!order.ok) throw new Error(order.message || "Could not start checkout. Please try again in a minute.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        description: order.description,
        order_id: order.orderId,
        prefill: { name, email, contact: phone },
        notes: { product: order.description },
        theme: { color: "#1a2b12" },
        modal: { ondismiss: () => { payBtn.disabled = false; } },
        handler: async (rsp) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: rsp.razorpay_order_id,
                razorpay_payment_id: rsp.razorpay_payment_id,
                razorpay_signature: rsp.razorpay_signature,
                customerEmail: email,
                customerName: name,
                product: currentProduct,
              }),
            });
            const v = await verifyRes.json();
            if (!v.ok) throw new Error("Payment verification failed. Email support@digitalassetlab.in with your payment ID.");
            location.href = "/thank-you.html?pid=" + encodeURIComponent(rsp.razorpay_payment_id);
          } catch (e2) {
            showError(e2.message);
          }
        },
      });
      dlg.close();
      rzp.open();
    } catch (e1) {
      showError(e1.message);
    }
  });

  // ── email capture ──
  document.querySelectorAll("form[data-subscribe]").forEach((f) => {
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = f.querySelector('input[type="email"]');
      const btn = f.querySelector('button[type="submit"]');
      const email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { input.focus(); return; }
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = "Joining…";
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        btn.textContent = data.ok ? "You're on the list ✓" : original;
        if (data.ok) input.value = "";
        else btn.disabled = false;
      } catch {
        btn.textContent = original; btn.disabled = false;
      }
    });
  });
})();
