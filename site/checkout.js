// Digital Asset Lab — cart + checkout page + email capture
// Buy buttons: <button data-buy="reels|architecture"> → add to cart → /checkout.html
// Cart store: localStorage "dal-cart" = JSON array of product keys (digital goods, qty 1)
(function () {
  var PRODUCTS = {
    reels: {
      label: "Instagram Reels Bundle",
      price: 530,
      blurb: "6,100+ templates & clips · 10 categories · commercial licence",
      href: "/reels-bundle.html",
    },
    architecture: {
      label: "The Architecture Bundle",
      price: 1499,
      worth: 8195,
      blurb: "CAD blocks, SketchUp models, moodboards, client documents",
      href: "/architecture-bundle.html",
    },
  };
  var fmt = function (n) { return "₹" + n.toLocaleString("en-IN"); };

  // ── cart store ──
  function getCart() {
    try {
      var raw = JSON.parse(localStorage.getItem("dal-cart") || "[]");
      return raw.filter(function (k) { return PRODUCTS[k]; });
    } catch (e) { return []; }
  }
  function setCart(keys) {
    localStorage.setItem("dal-cart", JSON.stringify(keys));
    renderBadge();
  }
  function addToCart(key) {
    var c = getCart();
    if (c.indexOf(key) === -1) c.push(key);
    setCart(c);
  }

  // ── header cart icon: point at checkout, show count badge ──
  function renderBadge() {
    var el = document.querySelector(".cart");
    if (!el) return;
    el.setAttribute("href", "/checkout.html");
    el.setAttribute("aria-label", "View cart");
    var n = getCart().length;
    var badge = el.querySelector(".cart-count");
    if (!n) { if (badge) badge.remove(); return; }
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-count";
      el.appendChild(badge);
    }
    badge.textContent = n;
  }
  renderBadge();

  // ── buy buttons → add to cart → checkout page ──
  document.querySelectorAll("[data-buy]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var key = btn.getAttribute("data-buy");
      if (!PRODUCTS[key]) return;
      addToCart(key);
      if (window.dalTrack) dalTrack("add_to_cart", { product: PRODUCTS[key].label });
      location.href = "/checkout.html";
    });
  });

  // ── Razorpay loader ──
  function loadRazorpay() {
    return new Promise(function (resolve) {
      if (window.Razorpay) return resolve(true);
      var s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = function () { resolve(true); };
      s.onerror = function () { resolve(false); };
      document.body.appendChild(s);
    });
  }

  // ── checkout page ──
  var root = document.getElementById("dal-checkout");
  if (root) initCheckout();

  function initCheckout() {
    var emptyEl = document.getElementById("cart-empty");
    var panelEl = document.getElementById("cart-panel");
    var itemsEl = document.getElementById("cart-items");
    var addEl = document.getElementById("cart-add");
    var totalEl = document.getElementById("cart-total");
    var form = document.getElementById("contact-form");
    var err = form.querySelector(".pay-err");
    var payBtn = form.querySelector(".pay-btn");

    function draw() {
      var cart = getCart();
      renderBadge();
      emptyEl.hidden = cart.length > 0;
      panelEl.hidden = cart.length === 0;
      if (!cart.length) return;

      var total = 0, worth = 0, allHaveWorth = true;
      itemsEl.innerHTML = "";
      cart.forEach(function (key) {
        var p = PRODUCTS[key];
        total += p.price;
        if (p.worth) worth += p.worth; else allHaveWorth = false;
        var row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML =
          '<div class="cart-row-info"><b>' + p.label + "</b><span>" + p.blurb + '</span><br><span class="dl-chip">⚡ Instant download</span></div>' +
          '<div class="cart-row-side"><b>' + fmt(p.price) + '</b><button type="button" class="row-remove">Remove</button></div>';
        row.querySelector(".row-remove").addEventListener("click", function () {
          setCart(getCart().filter(function (k) { return k !== key; }));
          draw();
        });
        itemsEl.appendChild(row);
      });
      totalEl.textContent = fmt(total);
      payBtn.textContent = "Pay " + fmt(total) + " with Razorpay";

      // value anchor — only shown when every item has an honest worth figure
      var saveEl = document.getElementById("cart-save");
      if (saveEl) {
        var show = allHaveWorth && worth > total;
        saveEl.hidden = !show;
        if (show) {
          document.getElementById("cart-worth").textContent = fmt(worth);
          document.getElementById("cart-pct").textContent = "You save " + Math.round(((worth - total) / worth) * 100) + "%";
        }
      }

      // cross-sell: whatever isn't in the cart yet
      addEl.innerHTML = "";
      Object.keys(PRODUCTS).forEach(function (key) {
        if (cart.indexOf(key) !== -1) return;
        var p = PRODUCTS[key];
        var row = document.createElement("div");
        row.className = "cart-row add";
        row.innerHTML =
          '<div class="cart-row-info"><b>Add ' + p.label + "</b><span>" + p.blurb + "</span></div>" +
          '<div class="cart-row-side"><b>' + fmt(p.price) + '</b><button type="button" class="row-add">Add</button></div>';
        row.querySelector(".row-add").addEventListener("click", function () {
          addToCart(key);
          draw();
        });
        addEl.appendChild(row);
      });
    }
    draw();

    if (window.dalTrack && getCart().length) {
      dalTrack("begin_checkout", {
        product: getCart().map(function (k) { return PRODUCTS[k].label; }).join(", "),
      });
    }

    function showError(msg) { err.textContent = msg; err.style.display = "block"; payBtn.disabled = false; }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var cart = getCart();
      if (!cart.length) return;
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 8) {
        return showError("Please fill your name, a valid email, and phone number.");
      }
      payBtn.disabled = true;
      err.style.display = "none";

      try {
        var loaded = await loadRazorpay();
        if (!loaded || !window.Razorpay) throw new Error("Could not load Razorpay. Check your connection and try again.");

        var orderRes = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: cart }),
        });
        var order = await orderRes.json();
        if (!order.ok) throw new Error(order.message || "Could not start checkout. Please try again in a minute.");

        var rzp = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: order.name,
          description: order.description,
          order_id: order.orderId,
          prefill: { name: name, email: email, contact: phone },
          notes: { product: order.description },
          theme: { color: "#1a2b12" },
          modal: { ondismiss: function () { payBtn.disabled = false; } },
          handler: async function (rsp) {
            try {
              var verifyRes = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: rsp.razorpay_order_id,
                  razorpay_payment_id: rsp.razorpay_payment_id,
                  razorpay_signature: rsp.razorpay_signature,
                  customerEmail: email,
                  customerName: name,
                  products: cart,
                }),
              });
              var v = await verifyRes.json();
              if (!v.ok) throw new Error("Payment verification failed. Email support@digitalassetlab.in with your payment ID.");
              setCart([]);
              location.href = "/thank-you.html?pid=" + encodeURIComponent(rsp.razorpay_payment_id) +
                "&products=" + encodeURIComponent(cart.join(","));
            } catch (e2) {
              showError(e2.message);
            }
          },
        });
        rzp.open();
      } catch (e1) {
        showError(e1.message);
      }
    });
  }

  // ── email capture ──
  document.querySelectorAll("form[data-subscribe]").forEach(function (f) {
    f.addEventListener("submit", async function (e) {
      e.preventDefault();
      var input = f.querySelector('input[type="email"]');
      var btn = f.querySelector('button[type="submit"]');
      var email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { input.focus(); return; }
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = "Joining…";
      try {
        var res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        var data = await res.json();
        btn.textContent = data.ok ? "You're on the list ✓" : original;
        if (data.ok) input.value = "";
        else btn.disabled = false;
      } catch (e3) {
        btn.textContent = original; btn.disabled = false;
      }
    });
  });
})();
