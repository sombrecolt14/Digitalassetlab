// Money math, checked. Run with: node test-pricing.cjs
// Covers the two things that would be expensive to get wrong: what a buyer is
// charged after a code, and whether a launch-only code still works once the
// 100 spots are gone.
const assert = require("node:assert/strict");
const { PRODUCTS, totalAmount, couponRule, discountFor, resolveProducts } = require("./server.cjs").__pricing;

const rupees = (paise) => paise / 100;
const priceOf = (...keys) => totalAmount(keys.map((k) => PRODUCTS[k]));
const after = (code, open, ...keys) => {
  const sub = priceOf(...keys);
  const c = couponRule(code, open);
  return rupees(sub - (c.valid ? discountFor(sub, c.percent) : 0));
};

// Catalogue
assert.equal(rupees(priceOf("architecture")), 1899);
assert.equal(rupees(priceOf("presentation", "drafting", "contracts")), 3197);

// The advertised drops
assert.equal(after("NEW15", true, "architecture"), 1614, "NEW15 on the bundle");
assert.equal(after("NEW10", true, "architecture"), 1709, "NEW10 on the bundle");

// Codes are case- and whitespace-insensitive, because buyers paste them
assert.equal(after(" new15 ", true, "architecture"), 1614);

// Discounts land on whole rupees — nobody is billed 1,614.15
assert.equal(discountFor(189900, 15) % 100, 0);
assert.equal(discountFor(199800, 15), 30000);

// Launch-only expiry: NEW15 dies with the last spot, NEW10 carries on
assert.equal(couponRule("NEW15", false).valid, false);
assert.equal(couponRule("NEW15", false).reason, "expired");
assert.equal(after("NEW15", false, "architecture"), 1899, "expired code charges full price");
assert.equal(after("NEW10", false, "architecture"), 1709, "NEW10 outlives the launch");

// Anything else is worth nothing
assert.equal(couponRule("FREE", true).valid, false);
assert.equal(couponRule("", true).valid, false);
assert.equal(after("FREE", true, "architecture"), 1899);

// Codes apply to part-carts too
assert.equal(after("NEW15", true, "presentation", "contracts"), 1698);

// An empty cart resolves to nothing, never to a default product. Billing a
// buyer ₹1,899 for a bundle they never chose is the expensive failure here.
assert.equal(resolveProducts({}), null, "empty body must not resolve");
assert.equal(resolveProducts({ products: [] }), null, "empty cart must not resolve");
assert.equal(resolveProducts({ products: ["nope"] }), null, "unknown key must not resolve");
assert.deepEqual(resolveProducts({ products: ["contracts"] }).keys, ["contracts"]);
assert.deepEqual(resolveProducts({ product: "architecture" }).keys, ["architecture"], "legacy single key still works");

console.log("pricing ok — bundle 1899, NEW15 1614, NEW10 1709, expiry holds, empty cart resolves to nothing");
