// Mobile nav toggle — shared across all pages with the sticky .nav header.
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
