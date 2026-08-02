# digitalassetlab.in

Static pages in `site/`, one Express API in `server.cjs` that runs as a single
Netlify Function (`netlify/functions/api.cjs`). `npm run build` copies
`site/` → `dist/`; nothing is compiled.

## Running locally

```
npm i
npm run dev        # build + serve on http://localhost:3000
```

## Products

`architecture` is the whole bundle; the other three are the same libraries sold
separately. Prices live in **two** places and must agree:

| Key            | Page                        | Price  |
| -------------- | --------------------------- | ------ |
| `architecture` | `architecture-bundle.html`  | ₹1,499 |
| `presentation` | `presentation-library.html` | ₹999   |
| `drafting`     | `drafting-library.html`     | ₹1,199 |
| `contracts`    | `contracts-billing.html`    | ₹599   |

- `server.cjs` → `PRODUCTS` — the amounts actually charged, in paise. The
  client never sends a price; the order total is computed here.
- `site/checkout.js` → `PRODUCTS` — display only (cart labels and totals).

A cart holds either the bundle or any mix of the three parts, never both.

## Payments

Set the environment variables listed in `.env.example` (Netlify: Site
configuration → Environment variables), then redeploy — Netlify only picks up
new variables on a fresh build.

Two independent delivery paths, so a closed browser never costs a customer
their files:

1. `POST /api/verify-payment` — signature check in the buyer's browser.
2. `POST /api/razorpay-webhook` — `payment.captured` from Razorpay.

Both funnel into `deliverPurchase()`, which de-duplicates on payment ID.

### Checking it is live

```
curl -s https://digitalassetlab.in/api/create-order \
  -H 'Content-Type: application/json' \
  -d '{"products":["contracts"]}'
```

`{"ok":true,...,"amount":59900}` means the keys are working. `"Missing
Razorpay credentials"` means the variables did not reach the function
(usually: set but not redeployed).
