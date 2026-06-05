/* ============================================================
   FILE: js/main.js — Lowela O. Villadolid Portfolio
   Tour, Scroll Reveal, Typed Text, Mobile Nav
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

  /* ─── Onboarding Tour (index.html only) ─── */
  var tourOverlay = document.getElementById('tour-overlay');
  if (tourOverlay) {
    if (localStorage.getItem('portfolio_tour_done') === 'true') {
      tourOverlay.remove();
    } else {
      initTour();
    }
  }

  function initTour() {
    var overlay  = document.getElementById('tour-overlay');
    var hl       = document.getElementById('tour-highlight');
    var tt       = document.getElementById('tour-tooltip');
    var stepNum  = document.getElementById('tour-step-num');
    var tourTitle = document.getElementById('tour-title');
    var tourDesc  = document.getElementById('tour-desc');
    var nextBtn  = document.getElementById('tour-next');
    var prevBtn  = document.getElementById('tour-prev');
    var skipBtn  = document.getElementById('tour-skip');
    var dots     = document.querySelectorAll('.tour-dot');

    var steps = [
      { sel: '#navbar',            title: 'Navigate Between Sections',        desc: 'Use the floating pill nav bar to jump to any section — About, Skills, Projects, and more.' },
      { sel: '.hero-btns',         title: 'Explore My Work or Grab My Resume', desc: 'Check out my featured projects or download my résumé from right here on the hero.' },
      { sel: '#skills-snap',       title: 'See What I Bring to the Table',     desc: 'A quick snapshot of my core technical skills. Click "See All Skills" for the full picture.' },
      { sel: '#featured-projects', title: "Check Out What I've Built",          desc: 'Featured projects with real-world tech stacks. Each card links to full details.' },
      { sel: '.nav-hamburger',     title: 'Mobile Menu',                        desc: 'On smaller screens, tap the hamburger icon to open the full navigation menu.' },
    ];

    var cur = 0;

    function place(targetEl) {
      var r = targetEl.getBoundingClientRect();
      var pad = 10, vpW = window.innerWidth, vpH = window.innerHeight;
      hl.style.left   = (r.left - pad) + 'px';
      hl.style.top    = (r.top  - pad) + 'px';
      hl.style.width  = (r.width  + pad * 2) + 'px';
      hl.style.height = (r.height + pad * 2) + 'px';
      var ttW = 292, ttL = r.left, ttT = r.bottom + 18;
      if (ttT + 240 > vpH) ttT = r.top - 250;
      if (ttL + ttW > vpW - 16) ttL = vpW - ttW - 16;
      if (ttL < 16) ttL = 16;
      if (ttT < 80) ttT = 80;
      tt.style.left = ttL + 'px';
      tt.style.top  = ttT + 'px';
    }

    function showStep(idx) {
      var step = steps[idx];
      var el = document.querySelector(step.sel);
      if (!el) { endTour(); return; }
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () {
        place(el);
        stepNum.textContent   = 'Step ' + (idx + 1) + ' of ' + steps.length;
        tourTitle.textContent = step.title;
        tourDesc.textContent  = step.desc;
        prevBtn.style.display = idx === 0 ? 'none' : '';
        nextBtn.textContent   = idx === steps.length - 1 ? 'Finish ✓' : 'Next →';
        dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      }, 380);
    }

    function endTour() {
      localStorage.setItem('portfolio_tour_done', 'true');
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.style.display = 'none'; }, 420);
    }

    nextBtn.addEventListener('click', function () {
      if (cur < steps.length - 1) { cur++; showStep(cur); } else { endTour(); }
    });
    prevBtn.addEventListener('click', function () {
      if (cur > 0) { cur--; showStep(cur); }
    });
    skipBtn.addEventListener('click', endTour);

    overlay.style.display = 'block';
    setTimeout(function () { showStep(0); }, 700);
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
