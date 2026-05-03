// ===== Scroll-to-top / progress ring =====
(function () {
  const CIRC = 2 * Math.PI * 19; // r=19 → ~119.4

  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Sayfanın başına git');
  btn.innerHTML = `
    <svg class="scroll-top__ring" viewBox="0 0 46 46" aria-hidden="true">
      <circle class="scroll-top__track" cx="23" cy="23" r="19"/>
      <circle class="scroll-top__fill"  cx="23" cy="23" r="19"/>
    </svg>
    <svg class="scroll-top__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 15l7-7 7 7"/>
    </svg>
  `;
  document.body.appendChild(btn);

  const fill = btn.querySelector('.scroll-top__fill');

  function update() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? scrolled / total : 0;
    fill.style.strokeDashoffset = CIRC * (1 - pct);
    btn.classList.toggle('visible', scrolled > 200);
  }

  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
})();

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

// ===== Floating WhatsApp tab (sağ orta) =====
(function () {
  const wa = document.createElement('div');
  wa.className = 'float-wa';
  wa.innerHTML = `
    <a class="float-wa__item"
       href="https://wa.me/905352248232"
       target="_blank" rel="noopener"
       aria-label="WhatsApp ile ulaşın">
      <span class="float-wa__icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.855L.054 23.447a.5.5 0 0 0 .499.553l5.758-1.51A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.374l-.36-.214-3.733.979.997-3.638-.234-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z"/>
        </svg>
      </span>
      <span class="float-wa__label">WhatsApp</span>
    </a>
  `;
  document.body.appendChild(wa);
})();

// ===== Floating İletişime Geç pill (sağ alt) =====
(function () {
  const inSubdir = /\/blog\//.test(window.location.pathname);
  const contactHref = (inSubdir ? '../' : '') + 'iletisim.html';

  const fc = document.createElement('div');
  fc.className = 'float-contact';
  fc.innerHTML = `
    <a class="float-contact__item"
       href="${contactHref}"
       aria-label="İletişime geçin">
      <span class="float-contact__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </span>
      İletişime Geç
    </a>
  `;
  document.body.appendChild(fc);
})();
