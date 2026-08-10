// Shared header behaviour: Products dropdown + mobile nav toggle.

// ── Products dropdown — turns the top-nav "Products" link into a hover menu ──
(function () {
  var link = document.querySelector(".nav nav a[href='#shelf'], .nav nav a[href='/#shelf']");
  if (!link) return;

  var style = document.createElement("style");
  style.textContent =
    ".nav-drop{ position:relative; display:inline-block; }" +
    ".nav-drop-menu{ position:absolute; top:calc(100% + .55rem); left:50%; transform:translateX(-50%) translateY(4px); min-width:16rem;" +
    "  background:var(--surface,#fff); border:1px solid var(--line,#ddd); border-radius:14px; padding:.5rem;" +
    "  box-shadow:0 18px 44px rgba(15,20,15,.16); opacity:0; visibility:hidden;" +
    "  transition:opacity .18s, transform .18s, visibility .18s; z-index:70; }" +
    /* invisible bridge so the menu doesn't close crossing the gap */
    ".nav-drop-menu::before{ content:''; position:absolute; top:-.7rem; left:0; right:0; height:.7rem; }" +
    ".nav-drop:hover .nav-drop-menu, .nav-drop:focus-within .nav-drop-menu{ opacity:1; visibility:visible; transform:translateX(-50%) translateY(0); }" +
    ".nav-drop-menu a{ display:flex; justify-content:space-between; align-items:baseline; gap:1rem; padding:.62rem .8rem; border-radius:9px; font-size:.9rem; color:var(--ink,#1a1a1a); }" +
    ".nav-drop-menu a:hover{ background:color-mix(in oklab, var(--line,#ddd) 40%, transparent); }" +
    ".nav-drop-menu a b{ font-weight:650; }" +
    ".nav-drop-menu a .p{ color:var(--ink-soft,#666); font-size:.82rem; font-variant-numeric:tabular-nums; }" +
    ".nav-drop-menu a.all{ border-top:1px solid var(--line,#ddd); margin-top:.3rem; border-radius:0 0 9px 9px; color:var(--ink-soft,#666); font-size:.84rem; }" +
    "@media (max-width:720px){" +
    "  .nav-drop{ display:block; }" +
    "  .nav-drop-menu{ position:static; transform:none; opacity:1; visibility:visible; border:none; box-shadow:none; padding:0 0 0 1.1rem; background:transparent; min-width:0; }" +
    "  .nav-drop-menu::before{ display:none; }" +
    "  .nav-drop-menu a.all{ display:none; }" +
    "}";
  document.head.appendChild(style);

  var wrap = document.createElement("span");
  wrap.className = "nav-drop";
  link.parentNode.insertBefore(wrap, link);
  wrap.appendChild(link);
  link.setAttribute("aria-haspopup", "true");

  var menu = document.createElement("div");
  menu.className = "nav-drop-menu";
  menu.innerHTML =
    '<a href="/architecture-bundle.html"><b>The Architecture Bundle</b><span class="p">₹1,699</span></a>' +
    '<a href="/presentation-library.html"><b>Presentation Library</b><span class="p">₹999</span></a>' +
    '<a href="/drafting-library.html"><b>Drafting Library</b><span class="p">₹1,199</span></a>' +
    '<a href="/contracts-billing.html"><b>Contracts</b><span class="p">₹599</span></a>' +
    '<a class="all" href="' + link.getAttribute("href") + '">All products →</a>';
  wrap.appendChild(menu);
})();

// ── Live launch counter ──────────────────────────────────────────────────
// Every announce bar is filled from one server number, counted off real
// captured payments, so the spots left can't drift between pages or go stale
// the way a pasted figure does. The HTML underneath stays true if this never
// answers: it names the offer without claiming a count.
(function () {
  var bars = document.querySelectorAll("[data-launch]");
  if (!bars.length || !window.fetch) return;

  fetch("/api/launch-status")
    .then(function (r) { return r.json(); })
    .then(function (s) {
      if (!s || !s.ok) return;
      var pct = s.open ? 15 : 10;
      var html = s.open
        ? 'Launch price <b>₹1,699</b> · code <b>' + s.code + '</b> takes <b>' + pct +
          '% off</b> · <b class="live">' + s.left + " of " + s.total + " spots left</b>"
        : "Launch spots are gone · code <b>" + s.code + "</b> still takes <b>" + pct + "% off</b>";
      bars.forEach(function (b) {
        (b.querySelector("[data-launch-text]") || b).innerHTML = html;
        b.setAttribute("data-live", "1");
      });
    })
    .catch(function () {});
})();

// ── Mobile nav toggle — shared across all pages with the sticky .nav header ──
(function () {
  var nav = document.querySelector(".nav");
  var toggle = nav && nav.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.setAttribute("data-open", String(open));
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () {
    setOpen(nav.getAttribute("data-open") !== "true");
  });
  // close after tapping a link, or on Escape
  nav.querySelectorAll("nav a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();
