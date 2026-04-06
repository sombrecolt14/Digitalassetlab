import express from "express";
import cors from "cors";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

console.log("SERVER BOOTING");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
  SITE_URL
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.post("/api/create-order", async (req, res) => {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        ok: false,
        message: "Missing Razorpay credentials"
      });
    }

    const amount = 49700; // ₹497 in paise
    const currency = "INR";

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
          product: "Instagram Reels Bundle"
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
      currency,
      name: "DigitalAssetLab",
      description: "Instagram Reels Bundle"
    });
  } catch (error) {
    console.error("Create order error:", error);
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

console.log("ABOUT TO LISTEN", { HOST, PORT });

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
