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
