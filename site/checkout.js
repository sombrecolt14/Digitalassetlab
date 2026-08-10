// Digital Asset Lab — cart + checkout page + email capture
// Buy buttons: <button data-buy="architecture"> → add to cart → /checkout.html
// Cart store: localStorage "dal-cart" = JSON array of product keys (digital goods, qty 1)
// Keys not in PRODUCTS are dropped by getCart(), so retired products clear themselves
// out of a returning visitor's saved cart.
(function () {
  // The bundle is every library at once; the three parts are also sold alone.
  // BUNDLE is handled separately from the cross-sell list so a cart can be
  // upgraded to it in one click instead of stacking parts alongside it.
  var BUNDLE = "architecture";
  var PRODUCTS = {
    architecture: {
      label: "The Architecture Bundle",
      price: 1699,
      worth: 2797,
      blurb: "All three libraries: presentation, drafting, contracts",
      href: "/architecture-bundle.html",
      points: [
        "<b>Walk into the first meeting with the brief already written</b> — send a questionnaire, get the answers back in the client's own words.",
        "<b>Present boards a client can approve</b>, each one named, palletted and costed, instead of a mood you have to defend.",
        "<b>Open AutoCAD to a library that's already drawn</b> — one template per category, not a folder of single blocks.",
        "<b>Send a contract that names the fee, the stages and the revision limit</b> before the work starts.",
        "<b>One payment, lifetime updates</b>, full commercial licence on client work.",
      ],
    },
    presentation: {
      label: "The Presentation Library",
      price: 999,
      blurb: "Mood boards, styles, materials and 32 client questionnaires",
      href: "/presentation-library.html",
      points: [
        "<b>\"Show me something else\" stops being a dead end</b> — enough named boards to answer it in the same meeting.",
        "<b>Materials carry indicative rates on the page</b>, so the budget conversation happens once, not three weeks later.",
        "<b>32 client questionnaires</b> in PDF, Word and Google Form — the brief arrives in writing before you draw.",
        "<b>Editable in Canva</b>: swap an image or a swatch and it's your studio's deck.",
      ],
    },
    drafting: {
      label: "The Drafting Library",
      price: 1199,
      blurb: "CAD block templates, SketchUp models, 1,400+ textures",
      href: "/drafting-library.html",
      points: [
        "<b>No more opening one DWG to get one chair</b> — each category is a single template with the whole library on the sheet.",
        "<b>1,000+ SketchUp models, cleaned and purged</b>, so they drop into a scene without dragging junk geometry with them.",
        "<b>1,400+ seamless textures</b>, sorted by material family, for boards and renders alike.",
        "<b>Draw the standard details once</b> and stop redrawing them on every project.",
      ],
    },
    contracts: {
      label: "Contracts",
      price: 599,
      blurb: "11 contract templates, 149 typeset pages",
      href: "/contracts-billing.html",
      points: [
        "<b>Scope, stages and revision limits agreed in writing</b> before work starts, so \"just one more change\" has a price.",
        "<b>Fee tables tied to deliverables, not dates</b> — payments fall due when you hand something over.",
        "<b>11 contracts</b> covering clients, staff, vendors, freelancers, consultants, partners and one-off collaborations.",
        "<b>Written for Indian practice</b>, with jurisdiction and arbitration named. Review once with your advocate, reuse forever.",
      ],
    },
  };
  var PARTS = Object.keys(PRODUCTS).filter(function (k) { return k !== BUNDLE; });
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
    // The bundle already contains every part, so the two never co-exist.
    if (key === BUNDLE) c = [];
    else c = c.filter(function (k) { return k !== BUNDLE; });
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
    var coupon = { code: "", percent: 0 };

    // ── why this is worth it, per thing in the cart ──
    function renderPoints(cart) {
      var el = document.getElementById("rail-points");
      if (!el) return;
      var seen = {};
      var html = "";
      cart.forEach(function (key) {
        (PRODUCTS[key].points || []).forEach(function (p) {
          if (seen[p]) return;
          seen[p] = 1;
          html += "<li>" + p + "</li>";
        });
      });
      el.innerHTML = html;
    }

    // ── discount code ──
    var cForm = document.getElementById("coupon-form");
    var cInput = document.getElementById("coupon-input");
    var cMsg = document.getElementById("coupon-msg");
    var cHint = document.getElementById("coupon-hint");
    var cWin = document.getElementById("coupon-win");

    if (cHint) {
      fetch("/api/launch-status")
        .then(function (r) { return r.json(); })
        .then(function (s) {
          if (!s || !s.ok || !cHint) return;
          cHint.hidden = false;
          cHint.innerHTML = s.open
            ? "First 100 buyers: use <b>" + s.code + "</b> for 15% off · <b>" + s.left + " spots left</b>"
            : "Use <b>" + s.code + "</b> for 10% off.";
        })
        .catch(function () {});
    }

    function couponFail(msg) {
      cWin.innerHTML = "";
      coupon = { code: "", percent: 0 };
      cMsg.hidden = false;
      cMsg.textContent = msg;
      draw();
    }

    // Painted from the live cart on every draw, so adding a library or taking
    // the upgrade can't leave the banner quoting a total that no longer exists.
    function paintWin(subtotal, disc, payable) {
      cWin.innerHTML =
        '<div class="coupon-win"><span class="tick">✓</span>' +
        "<span><b>" + coupon.code + "</b> applied</span>" +
        '<span class="off">−' + coupon.percent + "%</span>" +
        '<span class="drop">' + fmt(subtotal) + " → <b>" + fmt(payable) +
        "</b>, you save " + fmt(disc) + "</span></div>";
    }

    function couponWin(res) {
      cMsg.hidden = true;
      if (cHint) cHint.hidden = true;
      coupon = { code: res.code, percent: res.percent };
      draw();
      totalEl.classList.remove("flash");
      void totalEl.offsetWidth; // restart the animation on a re-apply
      totalEl.classList.add("flash");
      if (window.dalTrack) dalTrack("coupon_applied", { product: res.code });
    }

    if (cForm) {
      cForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        var code = (cInput.value || "").trim();
        if (!code) return;
        var btn = cForm.querySelector(".coupon-btn");
        btn.disabled = true;
        try {
          var r = await fetch("/api/check-coupon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: getCart(), coupon: code }),
          });
          var res = await r.json();
          if (res && res.valid) couponWin(res);
          else if (res && res.reason === "expired") couponFail("The launch code has been used up. Try NEW10 instead.");
          else couponFail("That code isn't valid.");
        } catch (e3) {
          couponFail("Couldn't check that code. Try again in a moment.");
        }
        btn.disabled = false;
      });
    }

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
      // A held code keeps working as the cart changes; the server recomputes
      // the real discount at create-order either way.
      var disc = coupon.percent ? Math.round((total * coupon.percent) / 100) : 0;
      var payable = total - disc;
      var discEl = document.getElementById("cart-disc");
      if (discEl) {
        discEl.hidden = !disc;
        if (disc) {
          document.getElementById("disc-code").textContent = coupon.code;
          document.getElementById("disc-amt").textContent = "− " + fmt(disc);
        }
      }
      if (cWin) { if (disc) paintWin(total, disc, payable); else cWin.innerHTML = ""; }
      totalEl.textContent = fmt(payable);
      payBtn.textContent = "Pay " + fmt(payable) + " with Razorpay";
      renderPoints(cart);

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

      // cross-sell: the parts not in the cart yet (never the bundle — that's
      // the one-click upgrade below, so the two can't stack)
      addEl.innerHTML = "";
      var hasBundle = cart.indexOf(BUNDLE) !== -1;
      if (!hasBundle) {
        PARTS.forEach(function (key) {
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

      // upgrade nudge: swap a part-cart for the whole bundle in one click
      var upEl = document.getElementById("cart-upgrade");
      if (upEl) {
        var missing = PARTS.filter(function (k) { return cart.indexOf(k) === -1; });
        var showUp = !hasBundle && missing.length > 0;
        upEl.hidden = !showUp;
        if (showUp) {
          var bundle = PRODUCTS[BUNDLE];
          var delta = bundle.price - total;
          upEl.innerHTML =
            '<div class="up-info"><b>Or take ' + bundle.label + " · " + fmt(bundle.price) + "</b><span>" +
            (delta > 0
              ? "Add the remaining " + (missing.length === 1 ? "library" : missing.length + " libraries") +
                " for just " + fmt(delta) + " more."
              : "Everything above, and you save " + fmt(-delta) + ".") +
            " Lifetime updates on all of it.</span></div>" +
            '<button type="button" class="up-btn">Upgrade</button>';
          upEl.querySelector(".up-btn").addEventListener("click", function () {
            addToCart(BUNDLE);
            if (window.dalTrack) dalTrack("cart_upgrade", { product: bundle.label });
            draw();
          });
        }
      }
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
          body: JSON.stringify({ products: cart, coupon: coupon.code }),
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
          theme: { color: "#4a2b1f" },
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
