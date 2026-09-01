(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    initTheme();
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initSeedDraw();
    initBarHills();
    initChat();
    initBackTop();
    initCountdown();
    initSubscribe();
    initCampusMap();
    initGalleryFilter();
    initFooterYear();
    initTestimonialAuto();
    initHeroSlider();
  });

  function initTheme() {
    var saved = localStorage.getItem('sxa-theme');
    if (saved === 'dark') {
      root.setAttribute('data-theme', 'dark');
    }
    var toggles = document.querySelectorAll('.n-theme');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dark = root.getAttribute('data-theme') === 'dark';
        if (dark) {
          root.removeAttribute('data-theme');
          localStorage.setItem('sxa-theme', 'light');
        } else {
          root.setAttribute('data-theme', 'dark');
          localStorage.setItem('sxa-theme', 'dark');
        }
        updateHeroSlideOverlays();
      });
    });
  }

  function updateHeroSlideOverlays() {
    var overlays = document.querySelectorAll('.hero-slider .h-overlay');
    if (!overlays.length) return;
    var overlayLight = 'linear-gradient(180deg, rgba(7,19,14,.55) 0%, rgba(7,19,14,.42) 45%, rgba(7,19,14,.74) 100%)';
    var overlayDark = 'linear-gradient(180deg, rgba(5,13,9,.64) 0%, rgba(5,13,9,.5) 45%, rgba(1,5,3,.78) 100%)';
    var bg = root.getAttribute('data-theme') === 'dark' ? overlayDark : overlayLight;
    overlays.forEach(function (o) { o.style.background = bg; });
  }

  function initNav() {
    var header = document.querySelector('.n-header');
    var burger = document.querySelector('.n-burger');
    var drawer = document.querySelector('.n-drawer');
    var closeBtn = document.querySelector('.n-drawer-close');

    var onScroll = function () {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 24);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      if (burger) burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (burger) burger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeDrawer);
      });
      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) closeDrawer();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.rv');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }

  function initCounters() {
    var metrics = document.querySelectorAll('.metric b[data-count]');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      metrics.forEach(function (el) {
        el.textContent = formatCount(parseFloat(el.getAttribute('data-count')), el.getAttribute('data-decimals'));
      });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        animateCount(entry.target);
      });
    }, { threshold: 0.5 });
    metrics.forEach(function (el) { obs.observe(el); });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1900;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatCount(target * eased, decimals);
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatCount(target, decimals);
      }
    }
    requestAnimationFrame(step);
  }

  function formatCount(value, decimals) {
    var d = decimals || 0;
    var fixed = value.toFixed(d);
    var parts = fixed.split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US');
    return parts.join('.');
  }

  function initParallax() {
    var hills = document.querySelectorAll('[data-speed]');
    if (prefersReduced || !hills.length) return;
    var ticking = false;
    function update() {
      var y = window.scrollY;
      hills.forEach(function (hill) {
        var speed = parseFloat(hill.getAttribute('data-speed')) || 0;
        hill.style.transform = 'translateY(' + y * speed + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  function initSeedDraw() {
    var seeds = document.querySelectorAll('.seed-wrap');
    if (prefersReduced || !seeds.length) return;
    seeds.forEach(function (seed) {
      var paths = seed.querySelectorAll('.seed-path');
      paths.forEach(function (path) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.6,.05,.35,.95)';
      });
      seed.classList.add('seed-waiting');
    });
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var paths = entry.target.querySelectorAll('.seed-path');
        paths.forEach(function (path, i) {
          setTimeout(function () {
            path.style.strokeDashoffset = '0';
          }, i * 350);
        });
      });
    }, { threshold: 0.35 });
    seeds.forEach(function (seed) { obs.observe(seed); });
  }

  function initBarHills() {
    var bars = document.querySelectorAll('.bar-hill');
    if (prefersReduced) {
      bars.forEach(function (b) { b.classList.add('in'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.classList.add('in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { obs.observe(b); });
  }

  function initChat() {
    var fab = document.querySelector('.w-chatfab');
    var panel = document.querySelector('.w-chat-panel');
    if (!fab || !panel) return;
    var closeBtn = panel.querySelector('.w-chat-close');
    var qBox = panel.querySelector('.w-chat-q');
    var input = panel.querySelector('.w-chat-in input');
    var sendBtn = panel.querySelector('.w-chat-in button');
    var body = panel.querySelector('.w-chat-body');

    var qa = [
      { q: 'Admissions open?', a: 'Yes! 2026-27 admissions are open for Nursery to IX and XI. Apply online at the Admissions page.' },
      { q: 'School timings?', a: 'Office hours are Mon-Sat, 8:00 AM to 3:30 PM. Classes run Monday to Friday.' },
      { q: 'How to pay fees?', a: 'Use the Online Fee Payment button in the footer or your parent portal. You can also pay at the office.' },
      { q: 'Tour the campus?', a: 'Visit the Virtual Tour page to explore hotspots, or book a campus visit through Contact Us.' }
    ];

    function toggle(force) {
      var open = typeof force === 'boolean' ? force : !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    fab.addEventListener('click', function () { toggle(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { toggle(false); });

    function botReply(text) {
      if (!body) return;
      var msg = document.createElement('div');
      msg.className = 'w-msg bot';
      msg.innerHTML = '<span class="leaf" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 10 C74 24 82 52 78 78 C54 74 38 58 28 32 Z" fill="#7cb342"/><path d="M32 70 C50 56 64 42 70 24" fill="none" stroke="#f4efe6" stroke-width="6" stroke-linecap="round"/></svg></span> ' + text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }
    function userSay(text) {
      if (!body) return;
      var msg = document.createElement('div');
      msg.className = 'w-msg user';
      msg.textContent = text;
      body.appendChild(msg);
      body.scrollTop = body.scrollHeight;
    }
    function answer(q) {
      if (!q) return;
      userSay(q);
      var hit = qa.find(function (item) {
        return q.toLowerCase().indexOf(item.q.toLowerCase().replace('?', '').trim()) !== -1;
      });
      var text = hit ? hit.a : 'Thanks for your question! Our team will reply within one working day. You can also call 0562-2463335.';
      setTimeout(function () { botReply(text); }, 500);
    }
    if (qBox) {
      qBox.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () { answer(btn.getAttribute('data-q')); });
      });
    }
    function sendFromInput() {
      var val = (input && input.value.trim()) || '';
      if (!val) return;
      answer(val);
      input.value = '';
    }
    if (sendBtn) sendBtn.addEventListener('click', sendFromInput);
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendFromInput();
      });
    }
  }

  function initBackTop() {
    var btn = document.querySelector('.w-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 520);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  function initCountdown() {
    var rings = document.querySelectorAll('.count-ring-circle');
    var daysEls = document.querySelectorAll('.cd-days');
    var hoursEls = document.querySelectorAll('.cd-hours');
    var minsEls = document.querySelectorAll('.cd-mins');
    var secsEls = document.querySelectorAll('.cd-secs');
    if (!rings.length && !daysEls.length) return;

    var target = new Date(2026, 8, 28, 9, 0, 0);
    var windowMs = 90 * 24 * 60 * 60 * 1000;
    var radii = [];
    rings.forEach(function (c) { radii.push(parseFloat(c.getAttribute('r'))); });

    function tick() {
      var now = Date.now();
      var diff = Math.max(0, target.getTime() - now);
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var fill = Math.max(0, Math.min(1, diff / windowMs));
      rings.forEach(function (c, i) {
        var r = radii[i];
        var circ = 2 * Math.PI * r;
        c.style.strokeDasharray = circ;
        c.style.strokeDashoffset = circ * (1 - fill);
      });
      daysEls.forEach(function (el) { el.textContent = d; });
      hoursEls.forEach(function (el) { el.textContent = h; });
      minsEls.forEach(function (el) { el.textContent = m; });
      secsEls.forEach(function (el) { el.textContent = s; });
    }
    tick();
    setInterval(tick, 1000);
  }

  function initSubscribe() {
    var btns = document.querySelectorAll('.js-subscribe');
    var form = document.querySelector('.news-form');
    var toast = document.querySelector('.w-toast');
    var subMsg = document.querySelector('.f-sub-msg');

    function showToast(text) {
      if (!toast) return;
      toast.querySelector('span').textContent = text;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () {
        toast.classList.remove('show');
      }, 2600);
    }
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('Subscribed');
      });
    });
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input');
        if (email && email.value.trim()) {
          if (subMsg) subMsg.textContent = 'Welcome to the grove! You are subscribed.';
          showToast('Subscribed');
          email.value = '';
        }
      });
    }
  }

  function initCampusMap() {
    var hotspots = document.querySelectorAll('.hotspot');
    var pop = document.querySelector('.map-pop');
    if (!hotspots.length || !pop) return;
    var img = pop.querySelector('img');
    var name = pop.querySelector('h3');
    var desc = pop.querySelector('p');

    hotspots.forEach(function (hs) {
      hs.addEventListener('click', function () {
        img.src = hs.getAttribute('data-img');
        img.alt = hs.getAttribute('data-name');
        name.textContent = hs.getAttribute('data-name');
        desc.textContent = hs.getAttribute('data-desc');
        pop.classList.remove('rv-in');
        void pop.offsetWidth;
        pop.style.animation = 'none';
        pop.style.animation = 'msgIn .5s cubic-bezier(.33,1,.68,1)';
        pop.scrollIntoView({ block: 'nearest', behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    });
  }

  function initGalleryFilter() {
    var chips = document.querySelectorAll('.filter-chip');
    var frames = document.querySelectorAll('.g-frame');
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var f = chip.getAttribute('data-filter');
        frames.forEach(function (frame) {
          var cat = frame.getAttribute('data-cat');
          var show = f === 'all' || cat === f;
          frame.classList.toggle('g-hidden', !show);
        });
      });
    });
  }

  function initFooterYear() {
    var els = document.querySelectorAll('.js-year');
    var year = new Date().getFullYear();
    els.forEach(function (el) { el.textContent = year; });
  }

  function initTestimonialAuto() {
    var card = document.querySelector('.quote-card-auto');
    if (!card || prefersReduced) return;
    var slides = card.querySelectorAll('.quote-card');
    if (slides.length < 2) return;
    var index = 0;
    slides.forEach(function (s, i) { s.classList.toggle('g-hidden', i !== 0); });
    setInterval(function () {
      slides[index].classList.add('g-hidden');
      index = (index + 1) % slides.length;
      slides[index].classList.remove('g-hidden');
    }, 6000);
  }

  /* ===== HERO BACKGROUND SLIDER (auto cross-fade).
     Order: 1) building 2) prayer 3) remaining existing hero/campus images.
     Each slide keeps the original dark overlay so text stays readable.
     Old static background is commented out in style.css for rollback. ===== */
  function initHeroSlider() {
    var slider = document.querySelector('.hero-slider');
    if (!slider || slider.getAttribute('data-init') === '1') return;
    slider.setAttribute('data-init', '1');
    if (prefersReduced) return;

    var images = [
      'assets/images/school-campus.jpg',   // 1. building
      'assets/images/prayer.png',          // 2. prayer
      'assets/images/school-vision.jpg',   // 3. heritage building / vision
      'assets/images/gallery-01.jpg',      // 4. celebration
      'assets/images/gallery-02.jpg',      // 5. celebration
      'assets/images/gallery-07.jpg'       // 6. celebration
    ];

    var overlayLight = 'linear-gradient(180deg, rgba(7,19,14,.55) 0%, rgba(7,19,14,.42) 45%, rgba(7,19,14,.74) 100%)';
    var overlayDark = 'linear-gradient(180deg, rgba(5,13,9,.64) 0%, rgba(5,13,9,.5) 45%, rgba(1,5,3,.78) 100%)';

    images.forEach(function (src, i) {
      var slide = document.createElement('div');
      slide.className = 'hslide' + (i === 0 ? ' active' : '');
      slide.style.backgroundImage = 'url("' + src + '")';
      var overlay = document.createElement('div');
      overlay.className = 'h-overlay';
      overlay.style.background = root.getAttribute('data-theme') === 'dark' ? overlayDark : overlayLight;
      slide.appendChild(overlay);
      slider.appendChild(slide);
    });

    var slides = slider.querySelectorAll('.hslide');
    if (slides.length < 2) return;
    var index = 0;
    setInterval(function () {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 4500);
  }
})();
