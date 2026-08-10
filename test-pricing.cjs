// Money math, checked. Run with: node test-pricing.cjs
// Covers the two things that would be expensive to get wrong: what a buyer is
// charged after a code, and whether a launch-only code still works once the
// 100 spots are gone.
const assert = require("node:assert/strict");
const { PRODUCTS, totalAmount, couponRule, discountFor } = require("./server.cjs").__pricing;

const rupees = (paise) => paise / 100;
const priceOf = (...keys) => totalAmount(keys.map((k) => PRODUCTS[k]));
const after = (code, open, ...keys) => {
  const sub = priceOf(...keys);
  const c = couponRule(code, open);
  return rupees(sub - (c.valid ? discountFor(sub, c.percent) : 0));
};

// Catalogue
assert.equal(rupees(priceOf("architecture")), 1699);
assert.equal(rupees(priceOf("presentation", "drafting", "contracts")), 2797);

// The advertised drops
assert.equal(after("NEW15", true, "architecture"), 1444, "NEW15 on the bundle");
assert.equal(after("NEW10", true, "architecture"), 1529, "NEW10 on the bundle");

// Codes are case- and whitespace-insensitive, because buyers paste them
assert.equal(after(" new15 ", true, "architecture"), 1444);

// Discounts land on whole rupees — nobody is billed 1,444.15
assert.equal(discountFor(169900, 15) % 100, 0);
assert.equal(discountFor(159800, 15), 24000);

// Launch-only expiry: NEW15 dies with the last spot, NEW10 carries on
assert.equal(couponRule("NEW15", false).valid, false);
assert.equal(couponRule("NEW15", false).reason, "expired");
assert.equal(after("NEW15", false, "architecture"), 1699, "expired code charges full price");
assert.equal(after("NEW10", false, "architecture"), 1529, "NEW10 outlives the launch");

// Anything else is worth nothing
assert.equal(couponRule("FREE", true).valid, false);
assert.equal(couponRule("", true).valid, false);
assert.equal(after("FREE", true, "architecture"), 1699);

// Codes apply to part-carts too
assert.equal(after("NEW15", true, "presentation", "contracts"), 1358);

console.log("pricing ok — bundle 1699, NEW15 1444, NEW10 1529, expiry holds");
