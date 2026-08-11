// Guards site/analytics.js: pixel is configured, and dalTrack maps event names
// to the right Meta call. Standard events must use track(); custom names must
// use trackCustom(), or Meta silently drops them.
//   node test-analytics.cjs
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const calls = [];
const rec = (...a) => calls.push(a);

// Browser globals live on window, and the loader's snippet assigns fbq onto it.
// Mirror onto both so the `f.fbq` guard short-circuits and bare fbq(...) resolves.
global.window = {};
global.document = {
  createElement: () => ({}),
  getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
  head: { appendChild: () => {} },
};
global.window.fbq = rec;
global.fbq = rec;

eval(fs.readFileSync(path.join(__dirname, "site/analytics.js"), "utf8"));

const pixel = window.DAL_ANALYTICS.metaPixel;
assert.ok(pixel, "metaPixel is empty — no tracking will fire");
assert.deepStrictEqual(calls[0], ["init", pixel], "fbq init did not fire");
assert.deepStrictEqual(calls[1], ["track", "PageView"], "PageView did not fire");

calls.length = 0;
window.dalTrack("purchase", { value: 1899, transaction_id: "pay_1" });
window.dalTrack("begin_checkout", { value: 1899 });
window.dalTrack("add_to_cart", { product: "Architecture Bundle" });
window.dalTrack("coupon_applied", { product: "NEW15" });

assert.deepStrictEqual(calls[0].slice(0, 2), ["track", "Purchase"]);
assert.strictEqual(calls[0][2].value, 1899);
assert.strictEqual(calls[0][2].currency, "INR");
assert.deepStrictEqual(calls[1].slice(0, 2), ["track", "InitiateCheckout"]);
assert.deepStrictEqual(calls[2].slice(0, 2), ["track", "AddToCart"]);
assert.deepStrictEqual(calls[3].slice(0, 2), ["trackCustom", "coupon_applied"]);

// A broken pixel must never take the store down with it.
window.fbq = () => { throw new Error("pixel exploded"); };
window.dalTrack("purchase", { value: 1899 });

console.log(`analytics ok — pixel ${pixel}, standard events mapped, custom events use trackCustom, errors swallowed`);
