// Studio tools pages: reveals, the scrolling feature tour, the video cover, and the waitlist form.
(function () {
  document.documentElement.classList.add('js');

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Tour: the step in the middle of the screen picks the screenshot.
  var steps = document.querySelectorAll('.steps li'), shots = document.querySelectorAll('.screen img'), dots = document.querySelectorAll('.dots i');
  if (steps.length) {
    var pick = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = +e.target.dataset.i;
        steps.forEach(function (s, j) { s.classList.toggle('on', j === i); });
        shots.forEach(function (s, j) { s.classList.toggle('on', j === i); });
        dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(function (s) { pick.observe(s); });
  }

  // Video: the poster is a button until pressed, then the real player takes over.
  var film = document.getElementById('film'), cover = document.querySelector('.player .cover');
  if (film && cover) {
    cover.addEventListener('click', function () { cover.remove(); film.play(); });
    var link = document.querySelector('.play-link');
    if (link) link.addEventListener('click', function () { setTimeout(function () { if (document.contains(cover)) cover.click(); }, 600); });
  }

  // Waitlist: the home page's /api/subscribe, tagged so the email says it came from the studio tools pages.
  document.querySelectorAll('form[data-waitlist]').forEach(function (f) {
    var msg = f.nextElementSibling;
    f.addEventListener('submit', async function (e) {
      e.preventDefault();
      var input = f.querySelector('input'), btn = f.querySelector('button');
      var email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Enter a valid email address.'; input.focus(); return; }
      btn.disabled = true; btn.textContent = 'Adding you…';
      try {
        var r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, list: 'studio-tools' }) });
        var d = await r.json();
        if (!d.ok) throw new Error();
        msg.textContent = "You're on the list. We'll email " + email + ' when it opens.';
        btn.textContent = 'On the list'; input.value = '';
      } catch (err) {
        msg.textContent = 'That did not go through. Try again, or write to us from the Contact page.';
        btn.disabled = false; btn.textContent = 'Tell me when it opens';
      }
    });
  });
})();
