// Digital Asset Lab — shared page behaviour: scroll reveals, CAD draw-in,
// deck stack, page viewers, and the isometric SketchUp component generator.
(function () {

  document.documentElement.classList.add('js');



  // reveals + stagger + CAD draw-in
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal, [data-stagger]').forEach(function (el) { io.observe(el); });
  document.querySelectorAll('.draw-zone').forEach(function (z) {
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) { z.classList.add('draw'); obs.disconnect(); }
    }, { threshold: 0.15 }).observe(z);
  });
  function forceIn() {
    document.querySelectorAll('.reveal:not(.in), [data-stagger]:not(.in)').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('.draw-zone').forEach(function (z) { z.classList.add('draw'); });
  }
  setTimeout(forceIn, 1800);

  // delegated clicks: book filmstrip, deck viewer, deck stack.
  // (delegation + reading the thumb's own img src: survives the artifact's
  // asset inlining, where only src attributes become data URIs)
  document.addEventListener('click', function (e) {
    var bt = e.target.closest('.bthumb');
    if (bt) {
      var L = document.getElementById('spreadL'), R = document.getElementById('spreadR');
      if (!L || !R) return;
      document.querySelectorAll('.bthumb').forEach(function (x) { x.classList.remove('on'); });
      bt.classList.add('on');
      var srcB = bt.querySelector('img').getAttribute('src');
      L.style.opacity = 0; R.style.opacity = 0;
      setTimeout(function () {
        L.setAttribute('src', R.getAttribute('src'));   // page turns: old right becomes left
        R.setAttribute('src', srcB);
        L.style.opacity = 1; R.style.opacity = 1;
      }, 140);
      return;
    }
    var vt = e.target.closest('.vthumb');
    if (vt) {
      var v = vt.closest('.viewer');
      var main = v.querySelector('.viewer-main img');
      v.querySelectorAll('.vthumb').forEach(function (x) { x.classList.remove('on'); });
      vt.classList.add('on');
      var tEl = document.getElementById('viewerT'), xEl = document.getElementById('viewerX');
      main.style.opacity = 0;
      var srcV = vt.querySelector('img').getAttribute('src');
      setTimeout(function () {
        main.setAttribute('src', srcV); main.style.opacity = 1;
        if (tEl) tEl.textContent = vt.getAttribute('data-t') || '';
        if (xEl) xEl.textContent = vt.getAttribute('data-x') || '';
      }, 120);
      return;
    }
    if (e.target.closest('#deckStack') || e.target.closest('#deckNext')) deckAdvance();
  });

  // deck stack: card-deck shuffle
  var deckOrder = [], deckTimer = null, deckShown = 1;
  (function () {
    var stack = document.getElementById('deckStack');
    if (!stack) return;
    deckOrder = Array.prototype.slice.call(stack.querySelectorAll('.scard'));
    deckLayout();
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) deckTimer = setInterval(deckAdvance, 4500);
  })();
  function deckLayout() {
    deckOrder.forEach(function (c, i) {
      c.classList.remove('gone');
      c.style.zIndex = 40 - i;
      c.style.opacity = i > 3 ? 0 : (i === 3 ? 0.35 : 1);
      c.style.transform = i === 0 ? 'none'
        : 'translate(' + (i * 13) + 'px,' + (i * 9) + 'px) rotate(' + (i * 2.2) + 'deg)';
    });
    var top = deckOrder[0];
    var t = document.getElementById('deckT'), x = document.getElementById('deckX'), n = document.getElementById('deckIdx');
    if (t) t.textContent = top.getAttribute('data-t');
    if (x) x.textContent = top.getAttribute('data-x');
    if (n) n.textContent = deckShown;
  }
  function deckAdvance() {
    if (!deckOrder.length) return;
    var top = deckOrder.shift();
    deckOrder.push(top);
    deckShown = (deckShown % deckOrder.length) + 1;
    top.classList.add('gone');
    setTimeout(deckLayout, 380);
  }

  // isometric SketchUp component generator, with materials
  (function () {
    var NS = 'http://www.w3.org/2000/svg';
    var M = { // material palettes: top, right, left faces + stroke
      white:  { t:'#fafaf7', r:'#ecece7', l:'#dddcd4', s:'#5a5a56' },
      cream:  { t:'#f1ead9', r:'#e2d8c2', l:'#d2c6ab', s:'#6b6053' },
      wood:   { t:'#ecd9b4', r:'#dcc294', l:'#c9ac7c', s:'#6e5b3f' },
      oak:    { t:'#e3cfa6', r:'#d2bb8c', l:'#bfa674', s:'#6a583c' },
      walnut: { t:'#b98c60', r:'#a3743e', l:'#8a5f31', s:'#4f3a20' },
      terra:  { t:'#d29477', r:'#c07f60', l:'#a96b4e', s:'#5f3c2b' },
      black:  { t:'#46464c', r:'#38383e', l:'#2c2c31', s:'#1b1b1f' },
      rattan: { t:'#dcc9a0', r:'#ccb488', l:'#b89e70', s:'#63553a' },
      rug:    { t:'#e9e1ce', r:'#dcd2bb', l:'#cfc4aa', s:'#8a8272' }
    };
    function pt(x, y, z, s, cx, cy) { return [cx + (x - y) * 2 * s, cy + (x + y) * s - z * 2.3 * s]; }
    function poly(svg, pts, fill, stroke) {
      var p = document.createElementNS(NS, 'polygon');
      p.setAttribute('points', pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '));
      p.setAttribute('fill', fill);
      p.setAttribute('stroke', stroke);
      p.setAttribute('stroke-width', '1.2');
      p.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(p);
    }
    function line(svg, a, b, color) {
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
      l.setAttribute('stroke', color || '#4f3a20'); l.setAttribute('stroke-width', '1.4');
      l.setAttribute('stroke-linecap', 'round');
      svg.appendChild(l);
    }
    function box(svg, x0, x1, y0, y1, z0, z1, s, cx, cy, mat) {
      mat = mat || M.white;
      var P = function (x, y, z) { return pt(x, y, z, s, cx, cy); };
      poly(svg, [P(x0,y0,z1), P(x1,y0,z1), P(x1,y1,z1), P(x0,y1,z1)], mat.t, mat.s);
      poly(svg, [P(x1,y0,z1), P(x1,y1,z1), P(x1,y1,z0), P(x1,y0,z0)], mat.r, mat.s);
      poly(svg, [P(x0,y1,z1), P(x1,y1,z1), P(x1,y1,z0), P(x0,y1,z0)], mat.l, mat.s);
    }
    var MODELS = {
      sofa: function (svg, s, cx, cy) {
        box(svg, 0,6, 0,3, 0,1.4, s,cx,cy, M.terra);
        box(svg, 0,6, 0,0.7, 1.4,3.2, s,cx,cy, M.terra);
        box(svg, 0,0.7, 0,3, 1.4,2.3, s,cx,cy, M.terra);
        box(svg, 5.3,6, 0,3, 1.4,2.3, s,cx,cy, M.terra);
      },
      armchair: function (svg, s, cx, cy) {
        box(svg, 0,3.4, 0,3, 0,1.4, s,cx,cy, M.cream);
        box(svg, 0,3.4, 0,0.7, 1.4,3.2, s,cx,cy, M.cream);
        box(svg, 0,0.7, 0,3, 1.4,2.3, s,cx,cy, M.cream);
        box(svg, 2.7,3.4, 0,3, 1.4,2.3, s,cx,cy, M.cream);
      },
      bed: function (svg, s, cx, cy) {
        box(svg, 0,5, 0,0.4, 0,2.8, s,cx,cy, M.walnut);
        box(svg, 0,5, 0,6.4, 0,1.3, s,cx,cy, M.cream);
        box(svg, 0.5,2.2, 0.7,1.8, 1.3,1.7, s,cx,cy, M.white);
        box(svg, 2.8,4.5, 0.7,1.8, 1.3,1.7, s,cx,cy, M.white);
      },
      wardrobe: function (svg, s, cx, cy) {
        box(svg, 0,4.4, 0,1.6, 0,7, s,cx,cy, M.walnut);
        var P = function (x,y,z){ return pt(x,y,z,s,cx,cy); };
        line(svg, P(2.2,1.6,0), P(2.2,1.6,7), M.walnut.s);
        line(svg, P(1.9,1.6,3.2), P(1.9,1.6,3.9), M.walnut.s);
        line(svg, P(2.5,1.6,3.2), P(2.5,1.6,3.9), M.walnut.s);
      },
      dining: function (svg, s, cx, cy) {
        box(svg, 0.2,0.7, 0.2,0.7, 0,2.7, s,cx,cy, M.wood);
        box(svg, 4.3,4.8, 0.2,0.7, 0,2.7, s,cx,cy, M.wood);
        box(svg, 0.2,0.7, 4.3,4.8, 0,2.7, s,cx,cy, M.wood);
        box(svg, 4.3,4.8, 4.3,4.8, 0,2.7, s,cx,cy, M.wood);
        box(svg, 0,5, 0,5, 2.7,3.1, s,cx,cy, M.wood);
      },
      bookshelf: function (svg, s, cx, cy) {
        box(svg, 0,4.4, 0,1.3, 0,6.6, s,cx,cy, M.oak);
        var P = function (x,y,z){ return pt(x,y,z,s,cx,cy); };
        [1.65, 3.3, 4.95].forEach(function (z) { line(svg, P(0,1.3,z), P(4.4,1.3,z), M.oak.s); });
      },
      coffee: function (svg, s, cx, cy) {
        box(svg, 0.2,0.6, 0.2,0.6, 0,1.3, s,cx,cy, M.walnut);
        box(svg, 4,4.4, 0.2,0.6, 0,1.3, s,cx,cy, M.walnut);
        box(svg, 0.2,0.6, 2,2.4, 0,1.3, s,cx,cy, M.walnut);
        box(svg, 4,4.4, 2,2.4, 0,1.3, s,cx,cy, M.walnut);
        box(svg, 0,4.6, 0,2.6, 1.3,1.7, s,cx,cy, M.walnut);
      },
      console: function (svg, s, cx, cy) {
        box(svg, 0,6.4, 0,1.6, 0.3,1.9, s,cx,cy, M.walnut);
        box(svg, 0,6.4, 0,1.6, 1.9,2.1, s,cx,cy, M.oak);
        var P = function (x,y,z){ return pt(x,y,z,s,cx,cy); };
        line(svg, P(2.1,1.6,0.3), P(2.1,1.6,1.9), M.walnut.s);
        line(svg, P(4.2,1.6,0.3), P(4.2,1.6,1.9), M.walnut.s);
      },
      bathtub: function (svg, s, cx, cy) {
        box(svg, 0,5.6, 0,2.8, 0,1.7, s,cx,cy, M.white);
        var P = function (x,y,z){ return pt(x,y,z,s,cx,cy); };
        poly(svg, [P(0.45,0.45,1.7), P(5.15,0.45,1.7), P(5.15,2.35,1.7), P(0.45,2.35,1.7)], '#e3e3df', '#5a5a56');
      },
      lamp: function (svg, s, cx, cy) {
        box(svg, 1.5,3.1, 1.5,3.1, 0,0.35, s,cx,cy, M.black);
        box(svg, 2.2,2.5, 2.2,2.5, 0.35,5, s,cx,cy, M.black);
        box(svg, 1.3,3.4, 1.3,3.4, 5,6.6, s,cx,cy, M.rattan);
      },
      plant: function (svg, s, cx, cy) {
        var P = function (x,y,z){ return pt(x,y,z,s,cx,cy); };
        var G = '#4a7c4a';
        line(svg, P(2.2,2.2,1.5), P(2.2,2.2,4.6), G);
        line(svg, P(2.2,2.2,2.6), P(0.9,1.2,4.4), G);
        line(svg, P(2.2,2.2,2.6), P(3.6,3.2,4.2), G);
        line(svg, P(2.2,2.2,3.4), P(1.1,3.1,5), G);
        line(svg, P(2.2,2.2,3.4), P(3.4,1.3,5.2), G);
        box(svg, 1.4,3, 1.4,3, 0,1.5, s,cx,cy, M.terra);
      },
      scene: function (svg, s, cx, cy) {
        function at(fn, wx, wy) {
          fn(svg, s, cx + (wx - wy) * 2 * s, cy + (wx + wy) * s);
        }
        box(svg, -1,7.6, 3.2,7.8, 0,0.07, s,cx,cy, M.rug);   // rug
        at(MODELS.lamp, -2.5, 0.7);
        at(MODELS.sofa, 0, 0);
        at(MODELS.plant, 6.4, 0.1);
        at(MODELS.coffee, 0.9, 4.1);
      }
    };
    function fitComp(card) {
      var svg = card.querySelector('svg'), g = svg && svg.querySelector('g');
      if (!g) return;
      var b = g.getBBox();
      if (!b.width) { card.setAttribute('data-unfit', '1'); return; }   // hidden page: retry on show
      card.removeAttribute('data-unfit');
      var side = Math.max(b.width, b.height) * 1.26;
      var vx = b.x + b.width / 2 - side / 2;
      var vy = b.y + b.height / 2 - side / 2;
      svg.setAttribute('viewBox', vx.toFixed(1) + ' ' + vy.toFixed(1) + ' ' + side.toFixed(1) + ' ' + side.toFixed(1));
      var old = g.querySelector('ellipse.gshadow');
      if (old) old.remove();
      var sh = document.createElementNS(NS, 'ellipse');
      sh.setAttribute('class', 'gshadow');
      sh.setAttribute('cx', (b.x + b.width / 2).toFixed(1));
      sh.setAttribute('cy', (b.y + b.height + 4).toFixed(1));
      sh.setAttribute('rx', (b.width * 0.44).toFixed(1));
      sh.setAttribute('ry', (side * 0.045).toFixed(1));
      sh.setAttribute('fill', 'oklch(88% 0.01 100 / .6)');
      g.insertBefore(sh, g.firstChild);
    }
    window.__refitComps = function () {
      document.querySelectorAll('.comp[data-unfit]').forEach(fitComp);
    };
    document.querySelectorAll('.comp[data-model]').forEach(function (card) {
      var svg = document.createElementNS(NS, 'svg');
      var name = card.getAttribute('data-model');
      var g = document.createElementNS(NS, 'g');
      svg.appendChild(g);
      card.insertBefore(svg, card.firstChild);
      MODELS[name](g, name === 'scene' ? 11 : 14, 100, 100);
      fitComp(card);
    });
    window.__refitComps();
  })();
})();

/* ── Dense CAD sheets ──────────────────────────────────────────────────────
   Each .cells[data-cat] is filled at runtime with a grid of plan-view block
   symbols, the way a template sheet looks when you actually open it: dozens
   of variants per category rather than a handful of icons. These are drawn,
   not photographed — nothing here poses as a screenshot of the file. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function n(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }

  function pen(g) {
    return {
      r: function (x, y, w, h, rx) { g.appendChild(n('rect', { x: x, y: y, width: w, height: h, rx: rx || 0 })); return this; },
      c: function (x, y, r) { g.appendChild(n('circle', { cx: x, cy: y, r: r })); return this; },
      e: function (x, y, rx, ry) { g.appendChild(n('ellipse', { cx: x, cy: y, rx: rx, ry: ry })); return this; },
      l: function (a, b, c2, d) { g.appendChild(n('line', { x1: a, y1: b, x2: c2, y2: d })); return this; },
      p: function (d) { g.appendChild(n('path', { d: d })); return this; }
    };
  }

  var TAU = Math.PI * 2;

  /* block vocabulary — every function draws inside a 0 0 100 100 box */
  var B = {
    sofa: function (p, v) {
      var w = v ? 84 : 70, x = 50 - w / 2;
      p.r(x, 34, w, 40, 4).r(x, 26, w, 10, 4).r(x, 34, 8, 40, 2).r(x + w - 8, 34, 8, 40, 2);
      var seats = v ? 3 : 2, iw = (w - 16) / seats;
      for (var i = 1; i < seats; i++) p.l(x + 8 + iw * i, 36, x + 8 + iw * i, 72);
      return p;
    },
    lsofa: function (p) {
      p.p('M16 26 H84 V74 H50 V50 H16 Z').r(16, 26, 8, 24, 2).r(76, 26, 8, 48, 2).l(50, 50, 50, 74).l(16, 50, 50, 50);
      return p;
    },
    armchair: function (p) { p.r(28, 32, 44, 40, 4).r(28, 24, 44, 9, 4).r(28, 32, 8, 40, 2).r(64, 32, 8, 40, 2); return p; },
    stool: function (p, v) { if (v) { p.c(50, 50, 20).c(50, 50, 13); } else { p.r(32, 32, 36, 36, 5).r(38, 38, 24, 24, 3); } return p; },
    tableR: function (p, v) { p.r(22, 34, 56, 32, v ? 14 : 3).l(30, 34, 30, 66).l(70, 34, 70, 66); return p; },
    tableC: function (p) { p.c(50, 50, 24).c(50, 50, 16); return p; },
    dineR: function (p) {
      p.r(28, 30, 44, 40, 2);
      for (var i = 0; i < 2; i++) { p.r(30 + i * 22, 18, 16, 10, 2).r(30 + i * 22, 72, 16, 10, 2); }
      p.r(14, 40, 10, 20, 2).r(76, 40, 10, 20, 2);
      return p;
    },
    dineC: function (p) {
      p.c(50, 50, 22);
      for (var a = 0; a < 6; a++) { var t = a * TAU / 6; p.r(50 + Math.cos(t) * 32 - 6, 50 + Math.sin(t) * 32 - 6, 12, 12, 2); }
      return p;
    },
    chair: function (p, v) { p.r(34, 38, 32, 30, v ? 8 : 2).l(34, 36, 66, 36).r(34, 30, 32, 7, 2); return p; },
    bed: function (p, v) {
      var w = v ? 62 : 42, x = 50 - w / 2;
      p.r(x, 20, w, 62, 2).r(x, 20, w, 8, 1).l(x, 44, x + w, 44);
      if (v) { p.r(x + 3, 22, 26, 12, 2).r(x + w - 29, 22, 26, 12, 2); } else { p.r(x + 4, 22, w - 8, 12, 2); }
      return p;
    },
    wardrobe: function (p, v) {
      p.r(20, 34, 60, 22, 1).l(50, 34, 50, 56);
      if (v) { p.p('M20 56 A 30 30 0 0 0 50 26').p('M80 56 A 30 30 0 0 1 50 26'); }
      return p;
    },
    shelf: function (p) { p.r(24, 22, 52, 56, 1); for (var i = 1; i < 4; i++) p.l(24, 22 + i * 14, 76, 22 + i * 14); return p; },
    desk: function (p) { p.r(18, 34, 64, 24, 1).r(60, 34, 22, 24, 1).r(40, 62, 20, 16, 3).l(40, 60, 60, 60); return p; },
    tv: function (p) { p.r(16, 44, 68, 16, 1).l(16, 52, 84, 52).r(38, 30, 24, 3, 1); return p; },
    rug: function (p) { p.r(18, 30, 64, 40, 2).r(24, 36, 52, 28, 1); return p; },
    lamp: function (p) {
      p.c(50, 50, 14).c(50, 50, 5);
      for (var a = 0; a < 8; a++) { var t = a * TAU / 8; p.l(50 + Math.cos(t) * 14, 50 + Math.sin(t) * 14, 50 + Math.cos(t) * 20, 50 + Math.sin(t) * 20); }
      return p;
    },
    sink: function (p, v) {
      p.r(18, 30, 64, 40, 2);
      if (v) { p.r(24, 36, 24, 28, 3).r(52, 36, 24, 28, 3); } else { p.r(28, 36, 44, 28, 3); }
      p.c(50, 26, 3);
      return p;
    },
    hob: function (p, v) {
      p.r(20, 28, 60, 44, 2);
      var k = v ? 2 : 4;
      for (var i = 0; i < k; i++) {
        var cx = k === 4 ? (i % 2 ? 64 : 36) : 50;
        var cy = k === 4 ? (i < 2 ? 42 : 58) : (i ? 60 : 40);
        p.c(cx, cy, 9).c(cx, cy, 3);
      }
      return p;
    },
    fridge: function (p) { p.r(28, 20, 44, 60, 2).l(28, 44, 72, 44).l(66, 30, 66, 38).l(66, 50, 66, 58); return p; },
    oven: function (p) { p.r(24, 28, 52, 44, 2).r(30, 40, 40, 26, 2).c(34, 34, 3).c(44, 34, 3); return p; },
    counter: function (p) { p.r(14, 36, 72, 28, 1).l(14, 44, 86, 44); for (var i = 1; i < 4; i++) p.l(14 + i * 18, 44, 14 + i * 18, 64); return p; },
    wc: function (p) { p.r(36, 18, 28, 14, 2).e(50, 52, 15, 20).e(50, 52, 10, 14).l(36, 32, 64, 32); return p; },
    bidet: function (p) { p.e(50, 50, 14, 20).e(50, 52, 9, 14).c(50, 32, 3); return p; },
    basin: function (p, v) {
      if (v) { p.r(24, 32, 52, 36, 3).e(50, 50, 18, 12).c(50, 36, 2); }
      else { p.e(50, 50, 20, 16).e(50, 50, 13, 10).c(50, 34, 2); }
      return p;
    },
    bath: function (p, v) {
      if (v) { p.p('M20 80 A 60 60 0 0 1 80 20 L80 80 Z').p('M28 74 A 46 46 0 0 1 74 28').c(70, 70, 3); }
      else { p.r(16, 34, 68, 34, 5).r(22, 39, 56, 24, 4).c(74, 51, 3); }
      return p;
    },
    shower: function (p, v) {
      if (v) { p.p('M22 78 A 56 56 0 0 0 78 22 L78 78 Z').c(50, 50, 4).l(22, 78, 78, 78); }
      else { p.r(24, 24, 52, 52, 1).l(24, 24, 76, 76).l(76, 24, 24, 76).c(50, 50, 4); }
      return p;
    },
    towel: function (p) { p.r(26, 44, 48, 5, 2).l(30, 44, 30, 34).l(70, 44, 70, 34); return p; },
    washer: function (p) { p.r(28, 24, 44, 52, 2).c(50, 54, 14).c(50, 54, 9).l(28, 38, 72, 38); return p; },
    door: function (p, v) {
      if (v === 2) {
        p.l(10, 70, 30, 70).l(70, 70, 90, 70)
         .p('M30 70 A 20 20 0 0 1 50 50').l(30, 70, 30, 50)
         .p('M70 70 A 20 20 0 0 0 50 50').l(70, 70, 70, 50);
      } else if (v === 1) {
        p.l(14, 70, 34, 70).l(66, 70, 86, 70).l(34, 66, 62, 66).l(38, 74, 66, 74);
      } else {
        p.l(12, 74, 32, 74).l(72, 74, 88, 74).p('M32 74 A 40 40 0 0 1 72 34').l(32, 74, 32, 34);
      }
      return p;
    },
    window: function (p, v) {
      p.l(10, 40, 90, 40).l(10, 60, 90, 60);
      if (v === 1) { p.l(10, 50, 90, 50).l(50, 40, 50, 60); }
      else if (v === 2) { p.l(10, 50, 54, 50).l(46, 50, 90, 50).l(50, 36, 50, 64); }
      else { p.l(10, 50, 90, 50); }
      p.l(10, 36, 10, 64).l(90, 36, 90, 64);
      return p;
    },
    tree: function (p, v) {
      var r = 26, a, t;
      if (v === 0) {
        p.c(50, 50, r);
        for (a = 0; a < 12; a++) { t = a * TAU / 12; p.l(50, 50, 50 + Math.cos(t) * r, 50 + Math.sin(t) * r); }
      } else if (v === 1) {
        var d = '';
        for (var i = 0; i <= 24; i++) {
          t = i * TAU / 24;
          var rr = r * (i % 2 ? 0.76 : 1);
          d += (i ? 'L' : 'M') + (50 + Math.cos(t) * rr).toFixed(1) + ' ' + (50 + Math.sin(t) * rr).toFixed(1) + ' ';
        }
        p.p(d + 'Z').c(50, 50, 4);
      } else if (v === 2) {
        p.c(50, 50, r).c(50, 50, r * 0.62).c(50, 50, 4);
      } else {
        for (var b = 0; b < 7; b++) { t = b * TAU / 7; p.c(50 + Math.cos(t) * 13, 50 + Math.sin(t) * 13, 11); }
        p.c(50, 50, 4);
      }
      return p;
    },
    shrub: function (p) { for (var i = 0; i < 5; i++) { var t = i * TAU / 5; p.c(50 + Math.cos(t) * 10, 50 + Math.sin(t) * 10, 9); } return p; },
    hedge: function (p) { p.r(14, 40, 72, 20, 3); for (var i = 0; i < 6; i++) p.c(20 + i * 12, 50, 7); return p; },
    palm: function (p) {
      p.c(50, 50, 3);
      for (var a = 0; a < 8; a++) {
        var t = a * TAU / 8;
        p.p('M50 50 Q' + (50 + Math.cos(t) * 16).toFixed(1) + ' ' + (50 + Math.sin(t) * 16).toFixed(1) + ' ' +
            (50 + Math.cos(t + 0.25) * 28).toFixed(1) + ' ' + (50 + Math.sin(t + 0.25) * 28).toFixed(1));
      }
      return p;
    },
    person: function (p, v) { p.c(50, 42, 9); if (v) { p.p('M32 74 A 22 22 0 0 1 68 74'); } else { p.p('M34 76 A 20 18 0 0 1 66 76'); } return p; },
    car: function (p) { p.r(22, 26, 56, 48, 10).r(30, 36, 40, 18, 3).l(22, 62, 78, 62).r(18, 34, 5, 10, 2).r(77, 34, 5, 10, 2).r(18, 56, 5, 10, 2).r(77, 56, 5, 10, 2); return p; },
    bike: function (p) { p.c(30, 60, 13).c(70, 60, 13).p('M30 60 L46 40 L70 60').l(46, 40, 60, 40).l(38, 44, 52, 44); return p; },
    bench: function (p) { p.r(20, 42, 60, 16, 2).l(20, 50, 80, 50).r(20, 36, 60, 5, 2); return p; },
    planter: function (p) {
      p.r(30, 30, 40, 40, 3).c(50, 50, 13);
      for (var a = 0; a < 6; a++) { var t = a * TAU / 6; p.l(50, 50, 50 + Math.cos(t) * 13, 50 + Math.sin(t) * 13); }
      return p;
    },
    paving: function (p) { for (var y = 0; y < 3; y++) for (var x = 0; x < 3; x++) p.r(20 + x * 20 + (y % 2 ? 6 : 0), 26 + y * 16, 17, 13, 1); return p; },
    stair: function (p) { p.r(30, 18, 40, 64, 1); for (var i = 1; i < 8; i++) p.l(30, 18 + i * 8, 70, 18 + i * 8); p.l(50, 18, 50, 82); return p; }
  };

  /* layer colours: g = planting, c = glazing. everything else takes the
     default line colour, the same way a real drawing keeps most of its
     geometry on one layer. */
  var CATS = {
    mixed: [['sofa', 1], ['dineC', 0], ['bed', 1], ['wc', 0], ['tree', 1, 'g'], ['door', 0],
            ['tableC', 0], ['basin', 0], ['chair', 0], ['window', 1, 'c'], ['stair', 0], ['car', 0],
            ['shelf', 0], ['hob', 0], ['person', 0], ['bath', 0], ['lsofa', 0], ['shower', 1],
            ['tree', 3, 'g'], ['fridge', 0], ['armchair', 0], ['tableR', 1], ['bike', 0], ['towel', 0],
            ['dineR', 0], ['wardrobe', 1], ['sink', 1], ['paving', 0], ['bench', 0], ['lamp', 0]],
    furniture: [['sofa', 1], ['sofa', 0], ['lsofa', 0], ['armchair', 0], ['chair', 0], ['chair', 1],
                ['stool', 1], ['stool', 0], ['tableR', 0], ['tableR', 1], ['tableC', 0], ['dineR', 0],
                ['dineC', 0], ['desk', 0], ['bed', 1], ['bed', 0], ['wardrobe', 1], ['wardrobe', 0],
                ['shelf', 0], ['tv', 0], ['rug', 0], ['bench', 0], ['lamp', 0], ['sofa', 1],
                ['armchair', 0], ['tableC', 0], ['chair', 0], ['stool', 1], ['dineR', 0], ['shelf', 0]],
    bedroom: [['bed', 1], ['bed', 0], ['bed', 1], ['bed', 0], ['wardrobe', 1], ['wardrobe', 0],
              ['tableR', 0], ['tableC', 0], ['stool', 1], ['desk', 0], ['chair', 0], ['rug', 0],
              ['lamp', 0], ['shelf', 0], ['bench', 0], ['tv', 0], ['bed', 1], ['tableC', 0],
              ['wardrobe', 1], ['stool', 0], ['armchair', 0], ['rug', 0], ['lamp', 0], ['bed', 0],
              ['tableR', 0], ['wardrobe', 0], ['shelf', 0], ['chair', 1], ['bench', 0], ['tableC', 0]],
    kitchen: [['sink', 1], ['sink', 0], ['hob', 0], ['hob', 1], ['fridge', 0], ['oven', 0],
              ['washer', 0], ['counter', 0], ['counter', 0], ['tableR', 0], ['chair', 0], ['stool', 1],
              ['dineR', 0], ['shelf', 0], ['sink', 1], ['hob', 0], ['fridge', 0], ['oven', 0],
              ['counter', 0], ['dineC', 0], ['chair', 1], ['stool', 0], ['tableC', 0], ['sink', 0],
              ['hob', 1], ['counter', 0], ['shelf', 0], ['washer', 0], ['chair', 0], ['tableR', 1]],
    bathroom: [['wc', 0], ['wc', 0], ['bidet', 0], ['basin', 0], ['basin', 1], ['bath', 0],
               ['bath', 1], ['shower', 0], ['shower', 1], ['towel', 0], ['washer', 0], ['wc', 0],
               ['basin', 0], ['bath', 0], ['shower', 0], ['bidet', 0], ['towel', 0], ['basin', 1],
               ['shower', 1], ['wc', 0], ['bath', 1], ['washer', 0], ['basin', 0], ['towel', 0],
               ['shower', 0], ['wc', 0], ['bidet', 0], ['bath', 0], ['basin', 1], ['shower', 1]],
    doors: [['door', 0], ['door', 0], ['door', 2], ['door', 1], ['door', 0], ['door', 2],
            ['window', 0, 'c'], ['window', 1, 'c'], ['window', 2, 'c'], ['window', 0, 'c'],
            ['window', 1, 'c'], ['window', 2, 'c'], ['door', 0], ['door', 2], ['window', 1, 'c'],
            ['door', 1], ['window', 0, 'c'], ['door', 0], ['window', 2, 'c'], ['door', 2],
            ['window', 1, 'c'], ['door', 0], ['window', 0, 'c'], ['door', 1], ['window', 2, 'c'],
            ['door', 2], ['window', 1, 'c'], ['door', 0], ['window', 0, 'c'], ['door', 0]],
    landscape: [['tree', 0, 'g'], ['tree', 1, 'g'], ['tree', 2, 'g'], ['tree', 3, 'g'],
                ['tree', 0, 'g'], ['tree', 1, 'g'], ['shrub', 0, 'g'], ['shrub', 0, 'g'],
                ['hedge', 0, 'g'], ['palm', 0, 'g'], ['palm', 0, 'g'], ['planter', 0, 'g'],
                ['person', 0], ['person', 1], ['person', 0], ['person', 1], ['car', 0], ['car', 0],
                ['bike', 0], ['bench', 0], ['paving', 0], ['tree', 2, 'g'], ['tree', 3, 'g'],
                ['shrub', 0, 'g'], ['hedge', 0, 'g'], ['person', 0], ['car', 0], ['paving', 0],
                ['tree', 1, 'g'], ['planter', 0, 'g']]
  };

  document.querySelectorAll('.cells[data-cat]').forEach(function (host) {
    var list = CATS[host.getAttribute('data-cat')];
    if (!list) return;
    host.innerHTML = '';
    list.forEach(function (spec) {
      var fn = B[spec[0]];
      if (!fn) return;
      var cell = document.createElement('div');
      cell.className = 'cc' + (spec[2] ? ' l-' + spec[2] : '');
      var svg = n('svg', { viewBox: '0 0 100 100' });
      var g = n('g', {});
      svg.appendChild(g);
      fn(pen(g), spec[1]);
      cell.appendChild(svg);
      host.appendChild(cell);
    });
  });
})();
