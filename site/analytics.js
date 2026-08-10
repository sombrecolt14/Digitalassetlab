// Digital Asset Lab — analytics loader.
// Paste your IDs below, redeploy, and tracking goes live. Leave empty to disable.
window.DAL_ANALYTICS = {
  ga4: "",        // e.g. "G-XXXXXXXXXX"  (Google Analytics 4 measurement ID)
  metaPixel: "1750369246382750",  // Meta Pixel — dataset "Digital Asset Lab Web"
};

(function () {
  var c = window.DAL_ANALYTICS;

  // ── Google Analytics 4 ──
  if (c.ga4) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + c.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", c.ga4);
  }

  // ── Meta Pixel ──
  if (c.metaPixel) {
    !function(f,b,e,v,n,t,x){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;x=b.getElementsByTagName(e)[0];x.parentNode.insertBefore(t,x)}(window,
    document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", c.metaPixel);
    fbq("track", "PageView");
  }

  // ── unified event API used by checkout.js / thank-you page ──
  // dalTrack("begin_checkout"|"purchase", { value, currency, transaction_id, product })
  window.dalTrack = function (name, data) {
    data = data || {};
    try {
      if (c.ga4 && window.gtag) {
        gtag("event", name, {
          value: data.value,
          currency: data.currency || "INR",
          transaction_id: data.transaction_id,
          items: data.product ? [{ item_name: data.product }] : undefined,
        });
      }
      if (c.metaPixel && window.fbq) {
        // Standard Meta events go via track(); anything else must use trackCustom().
        var std = { add_to_cart: "AddToCart", begin_checkout: "InitiateCheckout", purchase: "Purchase" }[name];
        fbq(std ? "track" : "trackCustom", std || name, { value: data.value, currency: data.currency || "INR" });
      }
    } catch (e) { /* analytics must never break the store */ }
  };
})();
