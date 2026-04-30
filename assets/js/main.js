// Sticky header glassmorphism
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav   = document.getElementById('main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active nav link highlighting
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const clean = href.replace(/^\.\.\//, '').replace('.html', '');
    if (!clean || clean === 'index') {
      if (path === '/' || path.endsWith('/') || path.endsWith('index.html')) {
        link.classList.add('active');
      }
    } else if (path.includes(clean)) {
      link.classList.add('active');
    }
  });
})();

// Footer year
const yrEl = document.getElementById('footer-year');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// Scroll reveal (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ===== Hero Slider =====
(function () {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides    = Array.from(slider.querySelectorAll('.slide'));
  const dots      = Array.from(slider.querySelectorAll('.slider-dot'));
  const progress  = slider.querySelector('.slider-progress');
  const counterEl = slider.querySelector('.slider-counter');
  const DURATION  = 7000;
  const TRANS     = 1300;
  let current = 0;
  let timer   = null;
  let busy    = false;

  function updateCounter() {
    if (counterEl) counterEl.textContent = (current + 1) + ' / ' + slides.length;
  }

  function setProgress() {
    if (!progress) return;
    progress.style.transition = 'none';
    progress.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      progress.style.transition = 'width ' + DURATION + 'ms linear';
      progress.style.width = '100%';
    }));
  }

  function goTo(idx, immediate) {
    if (busy && !immediate) return;
    busy = true;
    const prev = current;
    current = ((idx % slides.length) + slides.length) % slides.length;

    slides[prev].classList.remove('active');
    dots[prev].classList.remove('active');

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    updateCounter();
    setProgress();
    setTimeout(() => { busy = false; }, TRANS);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DURATION);
  }

  slider.querySelector('.slider-arrow.prev').addEventListener('click', () => {
    goTo(current - 1, true); startTimer();
  });
  slider.querySelector('.slider-arrow.next').addEventListener('click', () => {
    goTo(current + 1, true); startTimer();
  });
  dots.forEach((d, i) => d.addEventListener('click', () => {
    goTo(i, true); startTimer();
  }));

  // Keyboard support
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1, true); startTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1, true); startTimer(); }
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => startTimer());

  updateCounter();
  setProgress();
  startTimer();
})();

// ===== Page Loader =====
(function () {
  var loader = document.getElementById('page-loader');
  if (!loader) return;
  var start = Date.now();
  window.addEventListener('load', function () {
    var wait = Math.max(0, 3000 - (Date.now() - start));
    setTimeout(function () {
      loader.classList.add('pl-out');
      setTimeout(function () { loader.remove(); }, 500);
    }, wait);
  });
})();

// ===== Theme Switcher =====
(function () {
  const KEY = 'sintek-theme';
  const root = document.documentElement;

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.t === theme);
    });
  }

  function set(theme) {
    localStorage.setItem(KEY, theme);
    apply(theme);
  }

  const raw = localStorage.getItem(KEY);
  const saved = (!raw || raw === 'system') ? systemTheme() : raw;
  if (raw === 'system') localStorage.setItem(KEY, saved);
  apply(saved);

  document.addEventListener('click', e => {
    const btn = e.target.closest('.theme-btn[data-t]');
    if (btn) set(btn.dataset.t);
  });
})();
