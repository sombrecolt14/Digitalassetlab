// Render the owner "new sale" notification without sending it.
//   node preview-owner-email.cjs [outFile]
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
process.env.FROM_EMAIL ||= "support@digitalassetlab.in";
process.env.SMTP_HOST ||= "preview.invalid";
process.env.SMTP_USER ||= "preview";
process.env.SMTP_PASS ||= "preview";

let captured = null;
require("nodemailer").createTransport = () => ({
  sendMail: async (msg) => ((captured = msg), { messageId: "preview" }),
});

const outFile = process.argv[2] || "owner-email-preview.html";
const app = require("./server.cjs");

(async () => {
  await app.sendOwnerNotificationEmail(
    "nishi.lal47@gmail.com",
    "",
    "pay_TNyEsRs7wqXhca",
    [app.PRODUCTS.architecture],
    149900
  );
  if (!captured) {
    console.error("no email produced");
    process.exit(1);
  }
  const out = path.resolve(outFile);
  fs.writeFileSync(out, captured.html, "utf8");
  console.log(`subject : ${captured.subject}`);
  console.log(`to      : ${captured.to}`);
  console.log(`preview : ${out}`);
})();
