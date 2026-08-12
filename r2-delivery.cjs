// Download delivery from Cloudflare R2.
//
// Buyers never receive an R2 URL. They get a link to /api/download/<token> on
// our own domain; that route checks the token and a per-link download counter,
// then redirects to a short-lived presigned R2 URL.
//
// ponytail: SigV4 presigning is ~40 lines of crypto, so no AWS SDK. If we ever
// need multipart uploads or bucket admin from the app, pull in @aws-sdk then.
const crypto = require("crypto");

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET,
  DOWNLOAD_SECRET,
  RAZORPAY_KEY_SECRET,
} = process.env;

// How long a delivery link stays valid, how many times it may be redeemed, and
// how long each redemption's R2 URL lives. The last one matters: a 12 GB
// download that stalls and resumes must not burn a second redemption, so one
// click buys a window, not a single byte-stream.
const LINK_TTL_DAYS = 7;
const MAX_REDEMPTIONS = 3;
const PRESIGN_TTL_SECONDS = 6 * 60 * 60;

// Every product opens with its own START HERE guide: what is in the download,
// how to use it, the licence in one line. Small, so it is the one a buyer can
// read before committing to a 12 GB archive.
const START = {
  architecture: { key: "bundle/00-START-HERE.pdf", label: "START HERE — read this first", gb: 0 },
  presentation: { key: "presentation/00-START-HERE.pdf", label: "START HERE — read this first", gb: 0 },
  drafting: { key: "drafting/00-START-HERE.pdf", label: "START HERE — read this first", gb: 0 },
  contracts: { key: "contracts/00-START-HERE.pdf", label: "START HERE — read this first", gb: 0 },
};

// Object keys in the bucket, grouped by product. `gb` is the archive size and
// is shown to the buyer so they can pick what they actually need.
const FILES = {
  drafting: [
    { key: "drafting/01-CAD-Blocks.zip", label: "CAD Blocks", gb: 0.43 },
    { key: "drafting/02-SketchUp-Interior-Scenes.zip", label: "SketchUp — Interior Scenes", gb: 6.52 },
    { key: "drafting/03-SketchUp-Exterior-and-Architecture.zip", label: "SketchUp — Exterior & Architecture", gb: 2.69 },
    { key: "drafting/04-SketchUp-Furniture.zip", label: "SketchUp — Furniture", gb: 3.02 },
    { key: "drafting/05-SketchUp-Joinery-and-Interior-Details.zip", label: "SketchUp — Joinery & Interior Details", gb: 1.38 },
    { key: "drafting/06-SketchUp-Lighting-and-Electrical.zip", label: "SketchUp — Lighting & Electrical", gb: 0.54 },
    { key: "drafting/07-SketchUp-Decor-Props-and-People.zip", label: "SketchUp — Decor, Props & People", gb: 1.56 },
    { key: "drafting/08-SketchUp-Materials-and-Textures.zip", label: "SketchUp — Materials & Textures", gb: 5.18 },
    { key: "drafting/09-Floor-Plans-and-Drawings.zip", label: "Floor Plans, Structural & Construction Details", gb: 1.59 },
  ],
  presentation: [
    { key: "presentation/01-Commercial-Design-Guides.zip", label: "13 Commercial Design Guides", gb: 0.54 },
    { key: "presentation/02-Residential-Design-Guides.zip", label: "3 Residential Design Guides", gb: 0.29 },
    { key: "presentation/03-Mood-Boards-and-Colour-Palettes.zip", label: "Mood Boards & Colour Palettes", gb: 0.16 },
    { key: "presentation/Questionnaires.zip", label: "32 Client Questionnaires", gb: 0.01 },
  ],
  contracts: [
    { key: "contracts/Contracts.zip", label: "11 Contract Templates", gb: 0.0 },
  ],
};
// The bundle gets its own guide rather than the three separate ones, then
// every archive from all three libraries.
FILES.architecture = [START.architecture, ...FILES.presentation, ...FILES.drafting, ...FILES.contracts];
for (const k of ["presentation", "drafting", "contracts"]) FILES[k] = [START[k], ...FILES[k]];

const configured = () =>
  Boolean(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET);

// ── token ────────────────────────────────────────────────────────────────
// Stateless and self-describing: payment id, object key and expiry, signed.
// Nothing to look up to validate one, and a buyer cannot edit the key to
// reach a product they did not pay for.
const secret = () => DOWNLOAD_SECRET || RAZORPAY_KEY_SECRET || "";
const b64url = (buf) => Buffer.from(buf).toString("base64url");
const sign = (payload) =>
  crypto.createHmac("sha256", secret()).update(payload).digest("base64url").slice(0, 32);

function makeToken(paymentId, key, ttlDays = LINK_TTL_DAYS) {
  const exp = Math.floor(Date.now() / 1000) + ttlDays * 86400;
  const payload = b64url(`${paymentId}|${key}|${exp}`);
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  const [payload, sig] = String(token || "").split(".");
  if (!payload || !sig) return { ok: false, reason: "malformed" };
  const expected = sign(payload);
  // timingSafeEqual throws on length mismatch, so check that first
  if (sig.length !== expected.length) return { ok: false, reason: "bad-signature" };
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
    return { ok: false, reason: "bad-signature" };
  const [paymentId, key, exp] = Buffer.from(payload, "base64url").toString("utf8").split("|");
  if (Number(exp) < Math.floor(Date.now() / 1000)) return { ok: false, reason: "expired" };
  return { ok: true, paymentId, key, exp: Number(exp) };
}

// ── presigned R2 URL (AWS SigV4) ─────────────────────────────────────────
const rfc3986 = (s) =>
  encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
const encodePath = (p) => p.split("/").map(rfc3986).join("/");
const hmac = (key, data) => crypto.createHmac("sha256", key).update(data).digest();
const sha256hex = (data) => crypto.createHash("sha256").update(data).digest("hex");

function presign(key, expiresSeconds = PRESIGN_TTL_SECONDS) {
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const scope = `${dateStamp}/auto/s3/aws4_request`;
  const canonicalUri = `/${encodePath(R2_BUCKET)}/${encodePath(key)}`;

  const query = [
    ["X-Amz-Algorithm", "AWS4-HMAC-SHA256"],
    ["X-Amz-Credential", `${R2_ACCESS_KEY_ID}/${scope}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(expiresSeconds)],
    ["X-Amz-SignedHeaders", "host"],
  ]
    .map(([k, v]) => [rfc3986(k), rfc3986(v)])
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const canonicalRequest = [
    "GET",
    canonicalUri,
    query,
    `host:${host}\n`,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256hex(canonicalRequest),
  ].join("\n");

  const signingKey = ["auto", "s3", "aws4_request"].reduce(
    (k, part) => hmac(k, part),
    hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp)
  );
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  return `https://${host}${canonicalUri}?${query}&X-Amz-Signature=${signature}`;
}

// ── redemption counter ───────────────────────────────────────────────────
// Netlify Blobs is only present when running as a Netlify Function. Anywhere
// else (local, Hostinger) counting is skipped rather than failing the
// download — a buyer never gets blocked because storage is unavailable.
//
// peek() and spend() are separate on purpose. Mail scanners (Outlook Safe
// Links and friends) fetch every URL in an email to check it is safe; if a GET
// spent a redemption, a scanner could burn a buyer's entire allowance before
// they clicked anything. So GET only ever peeks, and spending needs a POST.
// Never swallow this quietly. A silent null here means the cap stops being
// enforced while every download still succeeds, which looks fine from outside
// and is only visible in the logs — so say so, once per cold start.
let blobWarned = false;
function blobStore() {
  try {
    const { getStore } = require("@netlify/blobs");
    return getStore("downloads");
  } catch (err) {
    if (!blobWarned) {
      blobWarned = true;
      console.error(
        "Netlify Blobs unavailable, download cap NOT enforced:",
        err.message
      );
    }
    return null;
  }
}

const counterId = (token) =>
  crypto.createHash("sha256").update(token).digest("hex").slice(0, 32);

// Reads here are eventually consistent, and cannot be otherwise: asking for
// strong consistency on this runtime fails with "the environment has not been
// configured with a 'uncachedEdgeURL' property", because Express runs through
// serverless-http in Lambda-compat mode rather than as a native Netlify
// function.
//
// That is acceptable for what this counts. Redemptions are minutes or hours
// apart in real use, which is far longer than propagation takes; back-to-back
// clicks within a second or two may read a stale value and cost the buyer
// nothing. The failure mode is a buyer getting an extra download, never being
// wrongly refused one.
//
// ponytail: if this ever needs to be exact, the counter belongs in a
// Cloudflare Durable Object next to the bucket, not here.

async function peekRedemption(token) {
  const store = blobStore();
  if (!store) return { used: 0, left: MAX_REDEMPTIONS, counted: false };
  try {
    const used = Number((await store.get(counterId(token))) || 0);
    return { used, left: Math.max(0, MAX_REDEMPTIONS - used), counted: true };
  } catch (err) {
    console.error("Redemption peek error:", err.message);
    return { used: 0, left: MAX_REDEMPTIONS, counted: false };
  }
}

async function spendRedemption(token) {
  const store = blobStore();
  if (!store) return { used: 0, allowed: true, counted: false };
  const id = counterId(token);
  try {
    const used = Number((await store.get(id)) || 0);
    if (used >= MAX_REDEMPTIONS) return { used, allowed: false, counted: true };
    await store.set(id, String(used + 1));
    return { used: used + 1, allowed: true, counted: true };
  } catch (err) {
    console.error("Redemption counter error:", err.message);
    return { used: 0, allowed: true, counted: false };
  }
}

// Label and size for a key, so the confirm page can name what it is about to
// hand over instead of showing a bare object path.
const ALL_FILES = [START.architecture, ...FILES.drafting, ...FILES.presentation, ...FILES.contracts];
const fileByKey = (key) =>
  ALL_FILES.find((f) => f.key === key) || { key, label: key.split("/").pop(), gb: 0 };

module.exports = {
  FILES,
  configured,
  makeToken,
  readToken,
  presign,
  peekRedemption,
  spendRedemption,
  fileByKey,
  LINK_TTL_DAYS,
  MAX_REDEMPTIONS,
  PRESIGN_TTL_SECONDS,
};
