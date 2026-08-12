// Self-check for r2-delivery.cjs. Reads credentials from the local rclone
// config so nothing secret has to live in the repo, presigns a real object and
// fetches it. Run: node test-r2-delivery.cjs
const assert = require("assert");
const fs = require("fs");

const CONF = process.env.RCLONE_CONF || "C:/Claude Code/r2/rclone.conf";
if (fs.existsSync(CONF)) {
  const conf = fs.readFileSync(CONF, "utf8");
  const get = (k) => (conf.match(new RegExp(`^\\s*${k}\\s*=\\s*(.+)$`, "m")) || [])[1]?.trim();
  process.env.R2_ACCESS_KEY_ID ||= get("access_key_id");
  process.env.R2_SECRET_ACCESS_KEY ||= get("secret_access_key");
  process.env.R2_ACCOUNT_ID ||= (get("endpoint") || "").match(/https:\/\/([^.]+)\./)?.[1];
  process.env.R2_BUCKET ||= "digitalassetlab";
}
process.env.DOWNLOAD_SECRET ||= "test-secret-not-the-real-one";

const r2 = require("./r2-delivery.cjs");

(async () => {
  // ── tokens ──────────────────────────────────────────────────────────────
  const t = r2.makeToken("pay_TEST123", "drafting/01-CAD-Blocks.zip");
  const ok = r2.readToken(t);
  assert.equal(ok.ok, true, "valid token should verify");
  assert.equal(ok.paymentId, "pay_TEST123");
  assert.equal(ok.key, "drafting/01-CAD-Blocks.zip");

  // a buyer must not be able to swap the key for a product they did not buy
  const [payload] = t.split(".");
  const forgedPayload = Buffer.from("pay_TEST123|drafting/02-SketchUp-Interior-Scenes.zip|9999999999").toString("base64url");
  assert.equal(r2.readToken(`${forgedPayload}.${t.split(".")[1]}`).ok, false, "forged key must be rejected");
  assert.equal(r2.readToken(`${payload}.badsignature`).ok, false, "bad signature must be rejected");
  assert.equal(r2.readToken("garbage").ok, false, "malformed must be rejected");

  const expired = r2.makeToken("pay_X", "contracts/Contracts.zip", -1);
  assert.equal(r2.readToken(expired).reason, "expired", "expired token must be rejected");
  console.log("ok  token: sign, verify, tamper, expiry");

  // ── catalog ─────────────────────────────────────────────────────────────
  // Every product opens with exactly one START HERE, and the bundle carries
  // its own rather than the three separate ones.
  const isStart = (f) => f.key.endsWith("00-START-HERE.pdf");
  for (const k of ["architecture", "presentation", "drafting", "contracts"]) {
    const list = r2.FILES[k];
    assert.equal(list.filter(isStart).length, 1, `${k} should have exactly one START HERE`);
    assert.ok(isStart(list[0]), `${k} should open with its START HERE`);
  }

  // nothing a buyer paid for may be missing from the bundle
  const parts = ["presentation", "drafting", "contracts"]
    .flatMap((k) => r2.FILES[k].filter((f) => !isStart(f)).map((f) => f.key));
  const bundle = new Set(r2.FILES.architecture.map((f) => f.key));
  for (const key of parts) assert.ok(bundle.has(key), `bundle is missing ${key}`);
  assert.equal(r2.FILES.architecture.length, parts.length + 1, "bundle should be every archive plus one guide");

  // every catalogued key must resolve to a real label, including the bundle guide
  for (const key of [...bundle]) {
    assert.ok(r2.fileByKey(key).label, `no label for ${key}`);
    assert.notEqual(r2.fileByKey(key).label, key.split("/").pop(), `fileByKey fell through for ${key}`);
  }
  console.log(`ok  catalog: ${r2.FILES.architecture.length} files in the bundle, all labelled`);

  // ── presign against the real bucket ─────────────────────────────────────
  if (!r2.configured()) {
    console.log("SKIP presign: R2 credentials not available");
    return;
  }
  const url = r2.presign("drafting/01-CAD-Blocks.zip", 300);
  assert.ok(url.startsWith("https://"), "presigned url should be https");
  assert.ok(url.includes("X-Amz-Signature="), "presigned url should carry a signature");

  // range-request one byte: proves auth without pulling 400 MB
  const res = await fetch(url, { headers: { Range: "bytes=0-0" } });
  assert.ok(res.status === 206 || res.status === 200, `expected 200/206, got ${res.status}`);
  console.log(`ok  presign: HTTP ${res.status} from R2`);

  // a tampered signature must be refused by R2, not just by us
  const bad = url.replace(/X-Amz-Signature=.{8}/, "X-Amz-Signature=00000000");
  const badRes = await fetch(bad, { headers: { Range: "bytes=0-0" } });
  assert.ok(badRes.status === 403, `tampered signature should 403, got ${badRes.status}`);
  console.log("ok  presign: tampered signature rejected by R2");

  // ── routes ──────────────────────────────────────────────────────────────
  // The scanner-safety property is the point of the two verbs, so exercise
  // both against the real app rather than trusting the code reads right.
  const app = require("./server.cjs");
  const server = await new Promise((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  const port = server.address().port;
  const at = (p, opts) => fetch(`http://127.0.0.1:${port}${p}`, { redirect: "manual", ...opts });

  const good = r2.makeToken("pay_TEST123", "drafting/01-CAD-Blocks.zip");

  const page = await at(`/api/download/${good}`);
  const body = await page.text();
  assert.equal(page.status, 200, "GET should render the confirm page");
  assert.ok(body.includes("Start download"), "confirm page should offer a button");
  assert.ok(body.includes("CAD Blocks"), "confirm page should name the file");
  assert.ok(!body.includes("r2.cloudflarestorage.com"), "confirm page must not leak the R2 url");
  console.log("ok  route: GET renders confirm page, no R2 url exposed");

  const go = await at(`/api/download/${good}`, { method: "POST" });
  assert.equal(go.status, 303, `POST should 303, got ${go.status}`);
  const loc = go.headers.get("location") || "";
  assert.ok(loc.includes("r2.cloudflarestorage.com") && loc.includes("X-Amz-Signature="),
    "POST should redirect to a presigned R2 url");
  console.log("ok  route: POST grants and redirects to R2");

  const dead = await at(`/api/download/${r2.makeToken("pay_X", "contracts/Contracts.zip", -1)}`);
  assert.equal(dead.status, 410, "expired token should 410");
  const forged = await at(`/api/download/abc.def`);
  assert.equal(forged.status, 410, "garbage token should 410");
  console.log("ok  route: expired and forged tokens refused");

  server.close();
  console.log("\nall checks passed");
})().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
