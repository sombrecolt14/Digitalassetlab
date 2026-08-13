// Render the delivery email to an HTML file without sending anything.
// The mail transport is stubbed, so nothing leaves the machine.
//
//   node preview-delivery-email.cjs [paymentId] [productKey] [outFile]
//
// R2 credentials come from the local rclone config and the signing secret from
// DOWNLOAD_SECRET, so the links in the preview are the real ones a buyer gets.
const fs = require("fs");
const path = require("path");

const CONF = process.env.RCLONE_CONF || "C:/Claude Code/r2/rclone.conf";
if (fs.existsSync(CONF)) {
  const conf = fs.readFileSync(CONF, "utf8");
  const get = (k) => (conf.match(new RegExp(`^\\s*${k}\\s*=\\s*(.+)$`, "m")) || [])[1]?.trim();
  process.env.R2_ACCESS_KEY_ID ||= get("access_key_id");
  process.env.R2_SECRET_ACCESS_KEY ||= get("secret_access_key");
  process.env.R2_ACCOUNT_ID ||= (get("endpoint") || "").match(/https:\/\/([^.]+)\./)?.[1];
  process.env.R2_BUCKET ||= "digitalassetlab";
}
process.env.SITE_URL ||= "https://digitalassetlab.in";
process.env.FROM_NAME ||= "Digital Asset Lab";
process.env.FROM_EMAIL ||= "support@digitalassetlab.in";
// only so createTransporter() returns something; the stub replaces it before
// any connection is opened
process.env.SMTP_HOST ||= "preview.invalid";
process.env.SMTP_USER ||= "preview";
process.env.SMTP_PASS ||= "preview";

let captured = null;
require("nodemailer").createTransport = () => ({
  sendMail: async (msg) => ((captured = msg), { messageId: "preview" }),
});

const [paymentId = "pay_TEST", productKey = "architecture", outFile = "delivery-email-preview.html"] =
  process.argv.slice(2);

const app = require("./server.cjs");
const r2 = require("./r2-delivery.cjs");

(async () => {
  const product = app.PRODUCTS[productKey];
  if (!product) {
    console.error(`unknown product "${productKey}" — try: ${Object.keys(app.PRODUCTS).join(", ")}`);
    process.exit(1);
  }

  await app.sendDeliveryEmail("buyer@example.com", "", paymentId, [product]);
  if (!captured) {
    console.error("no email was produced");
    process.exit(1);
  }

  const out = path.resolve(outFile);
  fs.writeFileSync(out, captured.html, "utf8");

  const links = [...captured.html.matchAll(/href="([^"]*\/api\/download\/[^"]+)"/g)].map((m) => m[1]);
  const expected = r2.FILES[productKey] ? r2.FILES[productKey].length : 0;

  console.log(`subject  : ${captured.subject}`);
  console.log(`product  : ${product.name}`);
  console.log(`links    : ${links.length} (catalog says ${expected})`);
  console.log(`terms    : ${r2.LINK_TTL_DAYS} days, ${r2.MAX_REDEMPTIONS} uses each`);
  console.log(`preview  : ${out}`);
  if (links.length !== expected) console.log("WARNING: link count does not match the catalog");
  console.log("\nfirst link:", links[0] || "(none)");
})();
