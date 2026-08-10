const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const nodemailer = require("nodemailer");

console.log("SERVER BOOTING");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
  SITE_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  FROM_NAME
} = process.env;

// Product catalog — prices live server-side only, never trusted from the client.
// "architecture" is the full bundle; the other three are the same libraries
// sold separately (₹2,797 apart, ₹1,499 together).
const PRODUCTS = {
  architecture: {
    name: "The Architecture Bundle",
    amount: 169900, // ₹1,699 in paise
    downloadUrl: process.env.ARCH_DOWNLOAD_URL || "",
    includes: [
      "The Presentation Library — mood boards, styles, full material system",
      "The Drafting Library — CAD block templates, SketchUp models, textures",
      "Contracts — 11 contract templates, 149 typeset pages",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  presentation: {
    name: "The Presentation Library",
    amount: 99900, // ₹999
    downloadUrl: process.env.PRESENTATION_DOWNLOAD_URL || "",
    includes: [
      "Mood boards & colour palettes — residential, commercial, hotel",
      "Style & material specifications for 10+ space types",
      "Materials: rooms, surfaces & systems, with indicative rates",
      "32 client questionnaires — PDF, Word and Google Form",
      "Editable in Canva",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  drafting: {
    name: "The Drafting Library",
    amount: 119900, // ₹1,199
    downloadUrl: process.env.DRAFTING_DOWNLOAD_URL || "",
    includes: [
      "CAD block templates — furniture, openings, kitchen, bath, entourage",
      "Floor plans, construction details & AutoCAD standards",
      "1,000+ SketchUp models, cleaned and purged",
      "1,400+ seamless material textures",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  contracts: {
    name: "Contracts",
    amount: 59900, // ₹599
    downloadUrl: process.env.CONTRACTS_DOWNLOAD_URL || "",
    includes: [
      "11 contract templates — 149 typeset pages",
      "Client, turnkey, 3D render, CAD drafting, consultancy, vendor, freelancer",
      "Employment, partnership and joint venture agreements",
      "Client confirmation document for sign-off before work starts",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
};

const priceLabel = (p) => `₹${(p.amount / 100).toLocaleString("en-IN")}`;
// Names that shipped on older orders, so a legacy webhook still delivers the
// right library instead of falling through to the bundle.
const LEGACY_NAMES = { "Contracts & Billing": "contracts" };
const productByName = (name) =>
  PRODUCTS[LEGACY_NAMES[name]] ||
  Object.values(PRODUCTS).find((p) => p.name === name) ||
  PRODUCTS.architecture;

// ── launch counter & coupons ──────────────────────────────────────────────
// Razorpay is the only source of truth for how many spots are gone, so there
// is no counter to keep in sync, nothing to reset on redeploy, and nothing a
// buyer can spoof. We only ever need to know how many of the first 100 are
// taken, so a single 100-item page of payments is always enough to answer it.
const LAUNCH_TOTAL = 100;
// 10 Aug 2026, 00:00 IST — payments before this are test runs, not spots sold.
const LAUNCH_START = 1786300200;
const COUPONS = {
  // Only while launch spots remain.
  NEW15: { percent: 15, launchOnly: true },
  // The standing code once the launch window closes.
  NEW10: { percent: 10, launchOnly: false },
};

let soldCache = { at: 0, count: null };

async function launchSold() {
  if (soldCache.count !== null && Date.now() - soldCache.at < 60000) {
    return soldCache.count;
  }
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) return soldCache.count || 0;
  try {
    const auth = Buffer.from(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    ).toString("base64");
    // Scoped to the launch so earlier payments — the pre-launch test one —
    // don't eat a spot. LAUNCH_FROM overrides; 0 counts everything.
    const from = Number(process.env.LAUNCH_FROM || LAUNCH_START);
    const r = await fetch(
      `https://api.razorpay.com/v1/payments?count=${LAUNCH_TOTAL}` + (from ? `&from=${from}` : ""),
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const d = await r.json();
    if (!r.ok || !Array.isArray(d.items)) throw new Error(d.error ? d.error.description : "bad response");
    const count = d.items.filter((p) => p.status === "captured").length;
    soldCache = { at: Date.now(), count };
    return count;
  } catch (error) {
    console.error("Launch count error:", error.message);
    // ponytail: last known count, or 0 on a cold start. Erring low keeps the
    // offer open rather than falsely telling a buyer they missed it.
    return soldCache.count || 0;
  }
}

async function launchStatus() {
  const sold = await launchSold();
  const left = Math.max(0, LAUNCH_TOTAL - sold);
  return { sold, left, total: LAUNCH_TOTAL, open: left > 0, code: left > 0 ? "NEW15" : "NEW10" };
}

// Pure: what a code is worth, given whether launch spots remain.
function couponRule(rawCode, open) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { code: "", valid: false, percent: 0 };
  const c = COUPONS[code];
  if (!c) return { code, valid: false, percent: 0, reason: "unknown" };
  if (c.launchOnly && !open) return { code, valid: false, percent: 0, reason: "expired" };
  return { code, valid: true, percent: c.percent };
}

// Resolves a code against the live launch state. Never trusts a percentage
// sent by the browser — the discount is always recomputed here.
async function resolveCoupon(rawCode) {
  const status = await launchStatus();
  return { ...couponRule(rawCode, status.open), status };
}

// Discounts land on whole rupees so nobody is asked to pay 1,444.15.
const discountFor = (subtotal, percent) =>
  percent ? Math.round((subtotal * percent) / 100 / 100) * 100 : 0;

// Resolve requested product keys (multi-item cart, or legacy single "product")
// to catalog entries. Returns null if any key is unknown.
function resolveProducts(body) {
  let keys = Array.isArray(body && body.products) && body.products.length
    ? body.products.map(String)
    : [String((body && body.product) || "architecture")];
  keys = [...new Set(keys)];
  if (!keys.every((k) => PRODUCTS[k])) return null;
  return { keys, items: keys.map((k) => PRODUCTS[k]) };
}
const totalAmount = (items) => items.reduce((sum, p) => sum + p.amount, 0);
const totalLabel = (items) => `₹${(totalAmount(items) / 100).toLocaleString("en-IN")}`;

// Guards against double-sending when both browser verification and the
// webhook fire for the same payment.
// ponytail: in-memory set; single instance today. Worst case after a restart
// is one duplicate email — harmless. Move to a DB if we ever scale out.
const processedPayments = new Set();

function deliverPurchase(paymentId, customerEmail, customerName, products) {
  if (processedPayments.has(paymentId)) {
    console.log(`Payment ${paymentId} already delivered — skipping`);
    return;
  }
  processedPayments.add(paymentId);
  if (customerEmail) {
    sendDeliveryEmail(customerEmail, customerName, paymentId, products)
      .catch(err => console.error("Delivery email error:", err));
  }
  sendOwnerNotificationEmail(customerEmail, customerName, paymentId, products)
    .catch(err => console.error("Owner notification error:", err));
}

// Create email transporter (only if SMTP credentials are set)
function createTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    secure: SMTP_PORT === "465",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendDeliveryEmail(toEmail, toName, paymentId, products) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("SMTP not configured — skipping delivery email");
    return;
  }

  // One download box per purchased product.
  const downloadBlocks = products.map((product) => `
      <div style="background:#163300;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;border:3px solid #000;">
        <p style="color:#9FE870;font-weight:900;font-size:14px;margin:0 0 8px;letter-spacing:1px;">
          ${product.name.toUpperCase()}
        </p>
        ${product.downloadUrl
          ? `<p style="color:#fff;font-size:14px;margin:0 0 20px;">Click the button below to access your complete bundle</p>
             <a href="${product.downloadUrl}" style="background:#9FE870;color:#163300;font-weight:900;font-size:16px;padding:14px 32px;border-radius:50px;text-decoration:none;display:inline-block;border:2px solid #000;">
               DOWNLOAD YOUR BUNDLE →
             </a>`
          : `<p style="color:#fff;font-size:14px;margin:0;">Your download link will arrive in a separate email within a few hours. Your payment ID below is your proof of purchase.</p>`}
      </div>`).join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;border:3px solid #000;overflow:hidden;">
    <!-- Header -->
    <div style="background:#163300;padding:32px;text-align:center;">
      <h1 style="color:#9FE870;font-size:28px;font-weight:900;margin:0;letter-spacing:-0.5px;">
        DIGITAL ASSET LAB
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:40px 32px;">
      <div style="background:#9FE870;border-radius:50%;width:64px;height:64px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:64px;font-size:32px;border:3px solid #000;">
        ✓
      </div>

      <h2 style="color:#163300;font-size:26px;font-weight:900;text-align:center;margin:0 0 8px;">
        PAYMENT CONFIRMED!
      </h2>
      <p style="color:#4a5565;text-align:center;margin:0 0 32px;font-size:16px;">
        Hi ${toName || "there"}, your purchase is complete.
      </p>

      <!-- Download boxes (one per product) -->
      ${downloadBlocks}

      <!-- What's included -->
      ${products.map(product => `
      <div style="background:#f5f5f5;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#163300;font-weight:900;font-size:13px;letter-spacing:1px;margin:0 0 12px;">
          ${product.name.toUpperCase()} — WHAT'S INCLUDED:
        </p>
        <ul style="margin:0;padding:0;list-style:none;">
          ${product.includes.map(item => `<li style="color:#4a5565;font-size:14px;padding:4px 0;">✓ &nbsp;${item}</li>`).join("")}
        </ul>
      </div>`).join("")}

      <!-- Order details -->
      <div style="border-top:2px solid #f5f5f5;padding-top:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="color:#4a5565;font-size:13px;">Payment ID</span>
          <span style="color:#163300;font-size:13px;font-weight:700;">${paymentId}</span>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:#4a5565;font-size:13px;">Amount Paid</span>
          <span style="color:#163300;font-size:15px;font-weight:900;">${totalLabel(products)}</span>
        </div>
      </div>

      <p style="color:#4a5565;font-size:13px;text-align:center;margin:0;">
        Questions? Email us at
        <a href="mailto:support@digitalassetlab.in" style="color:#163300;font-weight:700;">support@digitalassetlab.in</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f5f5;padding:20px;text-align:center;border-top:2px solid #e0e0e0;">
      <p style="color:#4a5565;font-size:12px;margin:0;">
        © 2025 Digital Asset Lab. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"${FROM_NAME || "Digital Asset Lab"}" <${FROM_EMAIL || SMTP_USER}>`,
    to: toEmail,
    subject: products.length === 1
      ? `✅ Your ${products[0].name} is Ready!`
      : `✅ Your Digital Asset Lab order is ready (${products.length} bundles)`,
    html,
  });

  console.log(`Delivery email sent to ${toEmail}`);
}

async function sendOwnerNotificationEmail(customerEmail, customerName, paymentId, products) {
  const transporter = createTransporter();
  if (!transporter) return;

  const ownerEmail = FROM_EMAIL || SMTP_USER;
  if (!ownerEmail) return;

  const productNames = products.map((p) => p.name).join(", ");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;border:3px solid #000;overflow:hidden;">
    <div style="background:#163300;padding:24px 32px;">
      <h1 style="color:#9FE870;font-size:22px;font-weight:900;margin:0;">
        💰 NEW SALE — Digital Asset Lab
      </h1>
    </div>
    <div style="padding:32px;">
      <p style="color:#163300;font-size:18px;font-weight:900;margin:0 0 24px;">
        You just made a sale!
      </p>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:2px solid #f5f5f5;">
          <td style="padding:12px 0;color:#4a5565;font-size:14px;font-weight:600;">Customer Name</td>
          <td style="padding:12px 0;color:#163300;font-size:14px;font-weight:700;text-align:right;">${customerName || "—"}</td>
        </tr>
        <tr style="border-bottom:2px solid #f5f5f5;">
          <td style="padding:12px 0;color:#4a5565;font-size:14px;font-weight:600;">Customer Email</td>
          <td style="padding:12px 0;color:#163300;font-size:14px;font-weight:700;text-align:right;">${customerEmail}</td>
        </tr>
        <tr style="border-bottom:2px solid #f5f5f5;">
          <td style="padding:12px 0;color:#4a5565;font-size:14px;font-weight:600;">Product${products.length > 1 ? "s" : ""}</td>
          <td style="padding:12px 0;color:#163300;font-size:14px;font-weight:700;text-align:right;">${productNames}</td>
        </tr>
        <tr style="border-bottom:2px solid #f5f5f5;">
          <td style="padding:12px 0;color:#4a5565;font-size:14px;font-weight:600;">Amount</td>
          <td style="padding:12px 0;color:#163300;font-size:18px;font-weight:900;text-align:right;">${totalLabel(products)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#4a5565;font-size:14px;font-weight:600;">Payment ID</td>
          <td style="padding:12px 0;color:#163300;font-size:13px;font-weight:700;text-align:right;">${paymentId}</td>
        </tr>
      </table>
      <div style="margin-top:24px;background:#9FE870;border-radius:12px;padding:16px;text-align:center;border:2px solid #000;">
        <p style="color:#163300;font-weight:900;font-size:14px;margin:0;">
          Delivery email sent automatically to the customer ✓
        </p>
      </div>
    </div>
    <div style="background:#f5f5f5;padding:16px;text-align:center;border-top:2px solid #e0e0e0;">
      <p style="color:#4a5565;font-size:12px;margin:0;">Digital Asset Lab — Order Notification</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"Digital Asset Lab" <${FROM_EMAIL || SMTP_USER}>`,
    to: ownerEmail,
    subject: `💰 New Sale — ${productNames} · ${totalLabel(products)} from ${customerName || customerEmail}`,
    html,
  });

  console.log(`Owner notification sent to ${ownerEmail}`);
}

const distPath = path.join(__dirname, "dist");

app.use(cors({
  origin: SITE_URL ? [SITE_URL] : true,
  credentials: true
}));

// Webhook must use raw body for signature verification
app.post(
  "/api/razorpay-webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];

      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET || "")
        .update(req.body)
        .digest("hex");

      if (signature !== expectedSignature) {
        return res.status(400).send("Invalid webhook signature");
      }

      const event = JSON.parse(req.body.toString("utf8"));
      console.log("Webhook received:", event.event);

      // Server-side delivery backup: if the buyer closed their browser before
      // client-side verification ran, this still gets them their files.
      if (event.event === "payment.captured") {
        const pay = event.payload && event.payload.payment && event.payload.payment.entity;
        if (pay && pay.id) {
          const notes = pay.notes || {};
          // Prefer machine-readable keys set at order creation; fall back to
          // matching the human-readable product name (legacy orders).
          let items = null;
          if (notes.products) {
            const keys = String(notes.products).split(",").filter((k) => PRODUCTS[k]);
            if (keys.length) items = keys.map((k) => PRODUCTS[k]);
          }
          if (!items) items = [productByName(notes.product)];
          deliverPurchase(pay.id, pay.email, "", items);
        }
      }

      return res.json({ ok: true });
    } catch (error) {
      console.error("Webhook error:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }
);

// Normal JSON parsing for the rest
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, port: PORT });
});

// Live launch state for the announce bars and the checkout.
app.get("/api/launch-status", async (req, res) => {
  const status = await launchStatus();
  res.set("Cache-Control", "public, max-age=30");
  res.json({ ok: true, ...status });
});

// Checks a code before payment so the buyer sees the new total immediately.
// Advisory only: create-order recomputes the discount from scratch.
app.post("/api/check-coupon", async (req, res) => {
  const sel = resolveProducts(req.body);
  const subtotal = sel ? totalAmount(sel.items) : 0;
  const c = await resolveCoupon(req.body && req.body.coupon);
  const discount = c.valid ? discountFor(subtotal, c.percent) : 0;
  res.json({
    ok: true,
    valid: c.valid,
    code: c.code,
    percent: c.percent,
    reason: c.reason || null,
    subtotal,
    discount,
    total: subtotal - discount,
    left: c.status.left,
    open: c.status.open,
  });
});

app.post("/api/create-order", async (req, res) => {
  try {
    const sel = resolveProducts(req.body);
    if (!sel) {
      return res.status(400).json({ ok: false, message: "Unknown product" });
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        ok: false,
        message: "Missing Razorpay credentials"
      });
    }

    // Amount is always computed server-side from the catalog, and the coupon
    // is re-validated here — whatever discount the browser showed is ignored.
    const subtotal = totalAmount(sel.items);
    const coupon = await resolveCoupon(req.body && req.body.coupon);
    const discount = coupon.valid ? discountFor(subtotal, coupon.percent) : 0;
    const amount = subtotal - discount;
    const currency = "INR";
    const description = sel.items.map((p) => p.name).join(" + ");

    const auth = Buffer.from(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    ).toString("base64");

    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          product: description,         // human-readable in the Razorpay dashboard
          products: sel.keys.join(","), // machine-readable keys for the webhook
          coupon: coupon.valid ? coupon.code : ""
        }
      })
    });

    const data = await razorpayRes.json();

    if (!razorpayRes.ok) {
      console.error("Create order failed:", data);
      return res.status(400).json({ ok: false, error: data });
    }

    return res.json({
      ok: true,
      keyId: RAZORPAY_KEY_ID,
      orderId: data.id,
      amount,
      subtotal,
      discount,
      coupon: coupon.valid ? coupon.code : "",
      currency,
      name: "Digital Asset Lab",
      description
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, message: "Invalid email" });
    }

    const transporter = createTransporter();
    const ownerEmail = FROM_EMAIL || SMTP_USER;
    if (transporter && ownerEmail) {
      transporter.sendMail({
        from: `"Digital Asset Lab" <${FROM_EMAIL || SMTP_USER}>`,
        to: ownerEmail,
        subject: `📬 New subscriber — ${email}`,
        html: `<p><strong>${email}</strong> just joined the email list from digitalassetlab.in.</p>`,
      }).catch(err => console.error("Subscribe notification error:", err));
    } else {
      console.log(`New subscriber (SMTP not configured): ${email}`);
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!orderId || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        ok: false,
        message: "Missing payment verification fields"
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET || "")
      .update(`${orderId}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        ok: false,
        message: "Signature mismatch"
      });
    }

    // Send download links to buyer + notify owner (idempotent vs the webhook)
    const { customerEmail, customerName } = req.body;
    const sel = resolveProducts(req.body) || { keys: ["architecture"], items: [PRODUCTS.architecture] };
    deliverPurchase(razorpay_payment_id, customerEmail, customerName, sel.items);

    return res.json({ ok: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Serve Vite build
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Only listen when run directly (Hostinger/local). On Netlify the app is
// imported and wrapped by netlify/functions/api.cjs instead.
if (require.main === module) {
  console.log("ABOUT TO LISTEN", { HOST, PORT });
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

module.exports = app;
// Money rules, exposed for test-pricing.cjs.
module.exports.__pricing = { PRODUCTS, totalAmount, couponRule, discountFor, LAUNCH_TOTAL };
