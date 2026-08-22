const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const nodemailer = require("nodemailer");
const r2 = require("./r2-delivery.cjs");

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
// sold separately (₹3,197 apart, ₹1,899 together).
const PRODUCTS = {
  architecture: {
    name: "The Architecture Bundle",
    amount: 189900, // ₹1,899 in paise
    downloadUrl: process.env.ARCH_DOWNLOAD_URL || "",
    includes: [
      "The Presentation Library: mood boards, styles, full material system",
      "The Drafting Library: CAD block templates, SketchUp models, textures",
      "Contracts: 11 contract templates, 155 typeset pages",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  presentation: {
    name: "The Presentation Library",
    amount: 119900, // ₹1,199
    downloadUrl: process.env.PRESENTATION_DOWNLOAD_URL || "",
    includes: [
      "Mood boards & colour palettes: residential, commercial, hotel",
      "Style & material specifications for 10+ space types",
      "Materials: rooms, surfaces & systems, with indicative rates",
      "32 client questionnaires in PDF, Word and Google Form",
      "Print-ready PDFs, ready to send to a client",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  drafting: {
    name: "The Drafting Library",
    amount: 119900, // ₹1,199
    downloadUrl: process.env.DRAFTING_DOWNLOAD_URL || "",
    includes: [
      "CAD block templates: furniture, openings, kitchen, bath, entourage",
      "Floor plans, construction details & AutoCAD standards",
      "1,000+ SketchUp models, cleaned and purged",
      "1,400+ seamless material textures",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
  contracts: {
    name: "Contracts",
    amount: 79900, // ₹799
    downloadUrl: process.env.CONTRACTS_DOWNLOAD_URL || "",
    includes: [
      "11 contract templates, 155 typeset pages",
      "Editable in Canva",
      "Client, turnkey, 3D render, CAD drafting, consultancy, vendor, freelancer",
      "Employment, partnership and joint venture agreements",
      "Client confirmation document for sign-off before work starts",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
};

// The site's palette, resolved from the oklch tokens in dal.css to hex —
// no mail client understands oklch, and none of them support CSS variables,
// so these have to be literals inlined on every element.
const C = {
  paper: "#f6f4f0",     // --paper
  surface: "#fdfcf9",   // --surface
  ink: "#13161a",       // --ink
  inkSoft: "#55585c",   // --ink-soft
  line: "#d1d5d8",      // --line
  clay: "#ad4f26",      // --clay
};
// Bricolage Grotesque is the site face; almost no mail client will have it, so
// this falls through to the same system stack the site itself falls back to.
const FONT = "'Bricolage Grotesque',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

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
// 10 Aug 2026, 15:40 IST — the moment pricing went live. The one captured
// payment before it was a test run, not a spot sold.
const LAUNCH_START = 1786356657;
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
// to catalog entries. Returns null if any key is unknown, or if nothing was
// asked for — an empty cart must never resolve to a default product, or a
// buyer whose cart failed to deserialize gets billed for the bundle.
function resolveProducts(body) {
  const single = body && body.product;
  let keys = Array.isArray(body && body.products) && body.products.length
    ? body.products.map(String)
    : single
      ? [String(single)]
      : [];
  keys = [...new Set(keys)];
  if (!keys.length || !keys.every((k) => PRODUCTS[k])) return null;
  return { keys, items: keys.map((k) => PRODUCTS[k]) };
}
const totalAmount = (items) => items.reduce((sum, p) => sum + p.amount, 0);
const totalLabel = (items) => `₹${(totalAmount(items) / 100).toLocaleString("en-IN")}`;

// Guards against double-sending when both browser verification and the
// webhook fire for the same payment.
// ponytail: in-memory set; single instance today. Worst case after a restart
// is one duplicate email — harmless. Move to a DB if we ever scale out.
const processedPayments = new Set();

// Must be awaited by every caller. On Netlify this runs in a Lambda, and the
// container is frozen the moment the route sends its response — a floating
// promise here is killed mid-SMTP-handshake and the buyer silently gets
// nothing, while Razorpay still sees HTTP 200 and never retries.
// What Razorpay actually captured, in paise. The catalog total is the list
// price and is wrong for anyone who used a coupon, so a receipt must never be
// built from it. Returns null if the lookup fails; callers fall back.
async function capturedAmount(paymentId) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET || !paymentId) return null;
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
    const r = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    const d = await r.json();
    return typeof d.amount === "number" ? d.amount : null;
  } catch (error) {
    console.error("Amount lookup error:", error.message);
    return null;
  }
}

async function deliverPurchase(paymentId, customerEmail, customerName, products) {
  if (processedPayments.has(paymentId)) {
    console.log(`Payment ${paymentId} already delivered — skipping`);
    return;
  }
  processedPayments.add(paymentId);
  const amountPaid = await capturedAmount(paymentId);
  const jobs = [];
  if (customerEmail) {
    jobs.push(
      sendDeliveryEmail(customerEmail, customerName, paymentId, products, amountPaid)
        .catch(err => console.error("Delivery email error:", err))
    );
  }
  jobs.push(
    sendOwnerNotificationEmail(customerEmail, customerName, paymentId, products, amountPaid)
      .catch(err => console.error("Owner notification error:", err))
  );
  await Promise.all(jobs);
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

async function sendDeliveryEmail(toEmail, toName, paymentId, products, amountPaid) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("SMTP not configured — skipping delivery email");
    return;
  }

  // One download box per purchased product. Each library is split into
  // per-category archives so nobody has to pull 36 GB to get one of them.
  const base = (SITE_URL || "https://digitalassetlab.in").replace(/\/$/, "");
  const downloadBlocks = products.map((product) => {
    const productKey = Object.keys(PRODUCTS).find((k) => PRODUCTS[k] === product);
    const files = (r2.configured() && r2.FILES[productKey]) || [];

    const body = files.length
      // Sub-headings only when a purchase spans more than one library, i.e. the
      // bundle. On a single-product email the product name is already the
      // heading, so repeating it would be noise.
      ? (() => {
        const groups = [...new Set(files.map((f) => f.group).filter(Boolean))];
        const showGroups = groups.length > 1;
        let current = null;
        return files.map((f) => {
          let heading = "";
          if (showGroups && f.group && f.group !== current) {
            current = f.group;
            heading = `
          <p style="font-family:${FONT};color:${C.ink};font-weight:500;font-size:15px;margin:22px 0 9px;letter-spacing:-0.01em;">${f.group}</p>`;
          }
          // A two-cell table, not float:right: on a phone the label wraps to
          // two lines and a floated size lands on top of it.
          return `${heading}
          <a href="${base}/api/download/${r2.makeToken(paymentId, f.key)}"
             style="display:block;background:${C.surface};border:1px solid ${C.line};border-radius:10px;padding:13px 16px;margin-bottom:7px;text-decoration:none;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${FONT};color:${C.ink};font-weight:500;font-size:14px;line-height:1.35;">${f.label}</td>
                <td align="right" valign="top" style="font-family:${FONT};color:${C.inkSoft};font-size:13px;white-space:nowrap;padding-left:14px;">${f.gb < 0.1 ? "" : f.gb + " GB"}</td>
              </tr>
            </table>
          </a>`;
        }).join("");
      })()
      : (product.downloadUrl
        ? `<a href="${product.downloadUrl}" style="display:inline-block;background:${C.clay};color:#ffffff;font-family:${FONT};font-weight:500;font-size:15px;padding:13px 28px;border-radius:10px;text-decoration:none;">
             Download your bundle
           </a>`
        : `<p style="font-family:${FONT};color:${C.inkSoft};font-size:14px;margin:0;line-height:1.6;">Your download link will arrive in a separate email within a few hours. The payment ID below is your proof of purchase.</p>`);

    // Only name the product when the order spans more than one. On a single
    // purchase the headline already says what arrived, and a label above every
    // block is the templated-email tic.
    const heading = products.length > 1
      ? `<p style="font-family:${FONT};color:${C.ink};font-weight:500;font-size:17px;margin:0 0 12px;letter-spacing:-0.01em;">${product.name}</p>`
      : "";

    return `
      <div style="margin:0 0 26px;">
        ${heading}
        ${body}
      </div>`;
  }).join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:${C.paper};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
    <tr><td align="center" style="padding:36px 14px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.surface};border:1px solid ${C.line};border-radius:14px;">

        <!-- Header -->
        <tr><td style="padding:22px 32px;border-bottom:1px solid ${C.line};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="30" style="padding-right:11px;">
              <img src="${base}/assets/mark.png" width="30" height="30" alt="Digital Asset Lab"
                   style="display:block;width:30px;height:30px;border:0;">
            </td>
            <td style="font-family:${FONT};font-size:16px;font-weight:500;color:${C.ink};letter-spacing:-0.01em;">Digital Asset Lab</td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:38px 32px 0;">
          <h1 style="font-family:${FONT};font-size:27px;font-weight:500;color:${C.ink};margin:0 0 10px;letter-spacing:-0.02em;line-height:1.2;">Your files are ready</h1>
          <p style="font-family:${FONT};font-size:15px;color:${C.inkSoft};margin:0;line-height:1.65;">
            Hi ${toName || "there"}, thanks for your purchase. Everything is below, split by part so you only pull what you need.
          </p>
        </td></tr>

        <tr><td style="padding:30px 32px 0;">
          ${downloadBlocks}
        </td></tr>

        ${r2.configured() ? `
        <tr><td style="padding:2px 32px 30px;">
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:13px;line-height:1.7;margin:0;">
            These links work for ${r2.LINK_TTL_DAYS} days and can be used ${r2.MAX_REDEMPTIONS} times each. A download that stops
            partway can be resumed for six hours without using another.
            <a href="${base}/contact.html#resend-form" style="color:${C.clay};text-decoration:none;border-bottom:1px solid ${C.line};">Request a fresh set</a>
            any time. Your purchase never expires.
          </p>
        </td></tr>` : ""}

        ${products.map(product => `
        <tr><td style="padding:0 32px 26px;">
          <div style="background:${C.paper};border-radius:12px;padding:20px 22px;">
            <p style="font-family:${FONT};color:${C.ink};font-weight:500;font-size:15px;letter-spacing:-0.01em;margin:0 0 12px;">
              What's included
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${product.includes.map(item => `
              <tr>
                <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;line-height:1.75;padding-bottom:3px;">${item}</td>
              </tr>`).join("")}
            </table>
          </div>
        </td></tr>`).join("")}

        <tr><td style="padding:0 32px 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
            <tr>
              <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;padding:16px 0 4px;">Payment ID</td>
              <td align="right" style="font-family:ui-monospace,Consolas,monospace;color:${C.ink};font-size:12px;padding:16px 0 4px;">${paymentId}</td>
            </tr>
            <tr>
              <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;padding:0 0 4px;">Amount paid</td>
              <td align="right" style="font-family:${FONT};color:${C.ink};font-size:15px;font-weight:500;padding:0 0 4px;">${typeof amountPaid === "number" ? `₹${(amountPaid / 100).toLocaleString("en-IN")}` : totalLabel(products)}</td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 32px 34px;">
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:13px;line-height:1.7;margin:0;">
            Any trouble at all, reply to this email or write to
            <a href="mailto:support@digitalassetlab.in" style="color:${C.clay};text-decoration:none;border-bottom:1px solid ${C.line};">support@digitalassetlab.in</a>.
            We reply within 24 hours.
          </p>
        </td></tr>

        <tr><td style="padding:18px 32px;border-top:1px solid ${C.line};">
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:11px;margin:0;">
            &copy; ${new Date().getFullYear()} Digital Asset Lab &middot; digitalassetlab.in
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  // Copy every delivery to ourselves. It is the only way to see what a buyer
  // actually received, and it doubles as proof the message left the server.
  const ownerCopy = FROM_EMAIL || SMTP_USER;
  await transporter.sendMail({
    from: `"${FROM_NAME || "Digital Asset Lab"}" <${FROM_EMAIL || SMTP_USER}>`,
    to: toEmail,
    ...(ownerCopy && ownerCopy.toLowerCase() !== String(toEmail).toLowerCase()
      ? { bcc: ownerCopy }
      : {}),
    subject: products.length === 1
      ? `✅ Your ${products[0].name} is Ready!`
      : `✅ Your Digital Asset Lab order is ready (${products.length} bundles)`,
    html,
  });

  console.log(`Delivery email sent to ${toEmail}`);
}

async function sendOwnerNotificationEmail(customerEmail, customerName, paymentId, products, amountPaid) {
  const transporter = createTransporter();
  if (!transporter) return;

  const ownerEmail = FROM_EMAIL || SMTP_USER;
  if (!ownerEmail) return;

  const productNames = products.map((p) => p.name).join(", ");
  const base = (SITE_URL || "https://digitalassetlab.in").replace(/\/$/, "");
  // Same rule as the buyer receipt: show what was captured, not the list price.
  const amountLabel = typeof amountPaid === "number"
    ? `₹${(amountPaid / 100).toLocaleString("en-IN")}`
    : totalLabel(products);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:${C.paper};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
    <tr><td align="center" style="padding:36px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:${C.surface};border:1px solid ${C.line};border-radius:14px;">

        <tr><td style="padding:22px 30px;border-bottom:1px solid ${C.line};">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="26" style="padding-right:10px;">
              <img src="${base}/assets/mark.png" width="26" height="26" alt="Digital Asset Lab"
                   style="display:block;width:26px;height:26px;border:0;">
            </td>
            <td style="font-family:${FONT};font-size:15px;font-weight:500;color:${C.ink};letter-spacing:-0.01em;">Digital Asset Lab</td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:32px 30px 0;">
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:14px;margin:0 0 4px;">New sale</p>
          <p style="font-family:${FONT};color:${C.ink};font-size:34px;font-weight:500;margin:0;letter-spacing:-0.02em;line-height:1.1;">${amountLabel}</p>
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:15px;margin:8px 0 0;line-height:1.6;">${productNames}</p>
        </td></tr>

        <tr><td style="padding:26px 30px 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
            <tr>
              <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;padding:14px 0 4px;">Customer</td>
              <td align="right" style="font-family:${FONT};color:${C.ink};font-size:13px;padding:14px 0 4px;">${customerName || customerEmail || "not recorded"}</td>
            </tr>
            ${customerName && customerEmail ? `
            <tr>
              <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;padding:0 0 4px;">Email</td>
              <td align="right" style="font-family:${FONT};color:${C.ink};font-size:13px;padding:0 0 4px;">${customerEmail}</td>
            </tr>` : ""}
            <tr>
              <td style="font-family:${FONT};color:${C.inkSoft};font-size:13px;padding:0 0 4px;">Payment ID</td>
              <td align="right" style="font-family:ui-monospace,Consolas,monospace;color:${C.ink};font-size:12px;padding:0 0 4px;">${paymentId}</td>
            </tr>
          </table>
          <p style="font-family:${FONT};color:${C.inkSoft};font-size:13px;line-height:1.7;margin:18px 0 0;">
            ${customerEmail ? "Download links have gone out to the customer." : "No email address on the payment, so nothing could be sent. Reach out through Razorpay."}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"Digital Asset Lab" <${FROM_EMAIL || SMTP_USER}>`,
    to: ownerEmail,
    subject: `New sale: ${productNames}, ${amountLabel}`,
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
  async (req, res) => {
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
          await deliverPurchase(pay.id, pay.email, "", items);
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

// ── redeem a download link ────────────────────────────────────────────────
// Buyers only ever see this URL, never an R2 one. The token carries the
// payment id, the object key and an expiry, all signed, so there is nothing to
// look up and no way to edit it into a product they did not buy.
//
// A redemption buys a six-hour window at R2, not a single byte-stream, so a
// stalled 12 GB download can resume without spending another of the three.
const linkPage = (title, message, tone) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Digital Asset Lab</title></head>
<body style="margin:0;font-family:Inter,Arial,sans-serif;background:#f5f5f5;">
  <div style="max-width:520px;margin:12vh auto;background:#fff;border:3px solid #000;border-radius:16px;padding:40px 32px;text-align:center;">
    <div style="font-size:40px;margin-bottom:12px;">${tone}</div>
    <h1 style="font-size:22px;margin:0 0 12px;color:#163300;">${title}</h1>
    <p style="color:#4a5565;line-height:1.6;margin:0 0 24px;">${message}</p>
    <a href="/contact.html#resend-form" style="background:#9FE870;color:#163300;font-weight:800;padding:12px 24px;border-radius:50px;text-decoration:none;border:2px solid #000;display:inline-block;">
      Send me fresh links
    </a>
    <p style="color:#8a8a8a;font-size:13px;margin:20px 0 0;">Enter the email you paid with and we will send a new set.</p>
  </div>
</body></html>`;

// Shared by both verbs: reject a bad token the same way whichever arrives.
function rejectClaim(res, claim) {
  const expired = claim.reason === "expired";
  return res.status(410).type("html").send(linkPage(
    expired ? "This link has expired" : "This link is not valid",
    expired
      ? `Download links last ${r2.LINK_TTL_DAYS} days. Yours has run out, but your purchase has not — request a fresh set below.`
      : "That link could not be verified. It may have been copied incompletely from the email.",
    expired ? "⏳" : "🔒"
  ));
}

const limitPage = () => linkPage(
  "Download limit reached",
  `Each link can be used ${r2.MAX_REDEMPTIONS} times. You still own this product — request a fresh set of links below and the count starts again.`,
  "🔁"
);

const confirmPage = (token, file, left) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Download ${file.label} — Digital Asset Lab</title></head>
<body style="margin:0;font-family:Inter,Arial,sans-serif;background:#f5f5f5;">
  <div style="max-width:520px;margin:10vh auto;background:#fff;border:3px solid #000;border-radius:16px;padding:40px 32px;text-align:center;">
    <p style="color:#8a8a8a;font-size:12px;letter-spacing:1px;font-weight:800;margin:0 0 8px;">DIGITAL ASSET LAB</p>
    <h1 style="font-size:24px;margin:0 0 6px;color:#163300;">${file.label}</h1>
    <p style="color:#4a5565;margin:0 0 28px;">${file.gb >= 0.1 ? file.gb + " GB &middot; " : ""}ZIP archive</p>
    <form method="POST" action="/api/download/${token}">
      <button type="submit" style="background:#9FE870;color:#163300;font-weight:900;font-size:17px;padding:15px 40px;border-radius:50px;border:3px solid #000;cursor:pointer;">
        Start download
      </button>
    </form>
    <p style="color:#4a5565;font-size:13px;line-height:1.6;margin:24px 0 0;">
      <b>${left} of ${r2.MAX_REDEMPTIONS}</b> downloads remaining on this link.<br>
      Once started you have six hours to finish it — a download that stops
      partway can be resumed without using another.
    </p>
    <p style="color:#8a8a8a;font-size:12px;margin:16px 0 0;">
      Out of downloads? <a href="/contact.html#resend-form" style="color:#163300;">Request a fresh set</a> &mdash; your purchase never expires.
    </p>
  </div>
</body></html>`;

// GET only ever looks. Mail scanners fetch every link in an email to check it
// is safe, and if that spent a redemption a buyer could arrive to find their
// allowance already gone. Spending requires the POST below, which no scanner
// issues.
app.get("/api/download/:token", async (req, res) => {
  const token = req.params.token;
  const claim = r2.readToken(token);
  if (!claim.ok) return rejectClaim(res, claim);

  const { left } = await r2.peekRedemption(token);
  if (left <= 0) return res.status(429).type("html").send(limitPage());

  res.set("Cache-Control", "no-store");
  return res.type("html").send(confirmPage(token, r2.fileByKey(claim.key), left));
});

app.post("/api/download/:token", async (req, res) => {
  const token = req.params.token;
  const claim = r2.readToken(token);
  if (!claim.ok) return rejectClaim(res, claim);

  if (!r2.configured()) return res.status(503).type("html").send(linkPage(
    "Downloads are being set up",
    "Your purchase is safe. Email support@digitalassetlab.in and we will send your files directly.",
    "🛠"
  ));

  const gate = await r2.spendRedemption(token);
  if (!gate.allowed) return res.status(429).type("html").send(limitPage());

  console.log(`Download ${claim.key} for ${claim.paymentId} (use ${gate.used}/${r2.MAX_REDEMPTIONS})`);
  res.set("Cache-Control", "no-store");
  // 303 so the browser turns the POST into a GET for the R2 URL.
  return res.redirect(303, r2.presign(claim.key));
});

// ── resend a lost download link ───────────────────────────────────────────
// The most common support request for a digital product. Razorpay already
// knows who paid and for what, so there is no order table to keep: we look
// the payment up and re-send the same delivery email.
//
// Safe by construction — the mail only ever goes to the address on the
// payment record, so asking about someone else's email tells you nothing and
// sends them nothing. The reply is deliberately identical either way, so this
// can't be used to discover who bought.
const resendLog = new Map();

// ponytail: in-memory, per-instance. Enough to stop a bored person hammering
// it; move to a shared store only if that ever actually happens.
function resendAllowed(email) {
  const now = Date.now();
  const hits = (resendLog.get(email) || []).filter((t) => now - t < 3600000);
  if (hits.length >= 3) return false;
  hits.push(now);
  resendLog.set(email, hits);
  return true;
}

app.post("/api/resend", async (req, res) => {
  const email = String((req.body && req.body.email) || "").trim().toLowerCase();
  const generic = { ok: true, message: "If that email has an order, the download links are on their way." };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }
  if (!resendAllowed(email)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Try again in an hour, or email support." });
  }
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) return res.json(generic);

  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
    const r = await fetch("https://api.razorpay.com/v1/payments?count=100", {
      headers: { Authorization: `Basic ${auth}` },
    });
    const d = await r.json();
    const paid = (d.items || []).filter(
      (p) => p.status === "captured" && String(p.email || "").toLowerCase() === email
    );
    if (!paid.length) {
      console.log(`Resend: no captured payment for ${email}`);
      return res.json(generic);
    }

    // Everything they have ever bought, de-duplicated, newest payment id first.
    const keys = new Set();
    for (const pay of paid) {
      const notes = pay.notes || {};
      if (notes.products) {
        String(notes.products).split(",").filter((k) => PRODUCTS[k]).forEach((k) => keys.add(k));
      } else if (notes.product) {
        const match = Object.entries(PRODUCTS).find(([, v]) => v === productByName(notes.product));
        if (match) keys.add(match[0]);
      }
    }
    const items = [...keys].map((k) => PRODUCTS[k]);
    if (!items.length) return res.json(generic);

    await sendDeliveryEmail(email, "", paid[0].id, items, paid[0].amount);
    console.log(`Resend: re-sent ${items.length} download link(s) to ${email}`);
    return res.json(generic);
  } catch (error) {
    console.error("Resend error:", error.message);
    return res.json(generic);
  }
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
      // Awaited, like every other send here. A floating promise gets killed
      // when the Lambda freezes on response and the mail never leaves.
      await transporter.sendMail({
        from: `"Digital Asset Lab" <${FROM_EMAIL || SMTP_USER}>`,
        to: ownerEmail,
        subject: `New subscriber: ${email}`,
        html: `<p><strong>${email}</strong> just joined the email list from digitalassetlab.in.</p>`,
      }).catch(err => console.error("Subscribe notification error:", err));
      console.log(`Subscribe notification sent to ${ownerEmail}`);
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
    await deliverPurchase(razorpay_payment_id, customerEmail, customerName, sel.items);

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

// Exposed for tests and for previewing the delivery mail without sending it.
app.sendDeliveryEmail = sendDeliveryEmail;
app.sendOwnerNotificationEmail = sendOwnerNotificationEmail;
app.PRODUCTS = PRODUCTS;

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
module.exports.__pricing = { PRODUCTS, totalAmount, couponRule, discountFor, LAUNCH_TOTAL, resolveProducts };
