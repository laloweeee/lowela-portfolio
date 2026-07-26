/* ============================================================
   FILE: js/main.js — Lowela O. Villadolid Portfolio
   Scroll Reveal, Typed Text, Mobile Nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── Active Nav Link ─── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ─── Navbar Scroll Effect ─── */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Mobile Menu ─── */
  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobileMenu');
  var mobileClose = document.getElementById('navMobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () { mobileMenu.classList.add('open'); });
    if (mobileClose) mobileClose.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    });
  }

  /* ─── Custom Cursor ─── */
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.style.transform = 'translate(-50%,-50%) scale(2.8)';
        dot.style.opacity = '0.55';
        ring.style.width = '52px'; ring.style.height = '52px';
      });
      el.addEventListener('mouseleave', function () {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        dot.style.opacity = '1';
        ring.style.width = '34px'; ring.style.height = '34px';
      });
    });
  }

  /* ─── Scroll Reveal ─── */
  var revEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revEls.length && window.IntersectionObserver) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revEls.forEach(function (el) { obs.observe(el); });
  }

  /* ─── Skill Bar Animation ─── */
  var bars = document.querySelectorAll('.skill-bar-fill');
  if (bars.length && window.IntersectionObserver) {
    var barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var t = e.target, pct = t.getAttribute('data-pct');
          setTimeout(function () { t.style.width = pct + '%'; }, 200);
          barObs.unobserve(t);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { barObs.observe(b); });
  }

  /* ─── Typed Text ─── */
  var typedEl = document.getElementById('typedRole');
  if (typedEl) {
    var roles = ['Full-Stack Developer', 'AI/ML Engineer', 'Problem Solver', 'Tech Explorer'];
    var ri = 0, ci = 0, deleting = false;
    function typeStep() {
      var cur = roles[ri];
      if (deleting) { typedEl.textContent = cur.substring(0, --ci); }
      else          { typedEl.textContent = cur.substring(0, ++ci); }
      var delay = deleting ? 55 : 95;
      if (!deleting && ci === cur.length) { delay = 2100; deleting = true; }
      else if (deleting && ci === 0)      { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
      setTimeout(typeStep, delay);
    }
    typeStep();
  }

  /* ─── Contact Form ─── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var formFields = form.querySelector('.form-fields');
      var success = form.querySelector('.form-success');
      btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(function () {
        if (formFields) formFields.style.display = 'none';
        if (success) success.style.display = 'block';
        form.reset();
      }, 1600);
    });
  }

});