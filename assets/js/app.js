/* ============================================================
   LUXÉ BEAUTY — Core App (init, UI, interactions)
   ============================================================ */
'use strict';

// ── TOAST ────────────────────────────────────────────────────
const LuxeToast = (() => {
  let container;
  function getContainer() {
    if (!container) { container = document.getElementById('ToastContainer'); }
    if (!container) { container = document.createElement('div'); container.id = 'ToastContainer'; container.className = 'toast-container'; document.body.appendChild(container); }
    return container;
  }
  function show(msg, type = 'success', icon) {
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'alert');
    t.innerHTML = `<span class="toast__icon">${icon || icons[type] || '✓'}</span><span>${msg}</span><button class="toast__close" aria-label="Dismiss">✕</button>`;
    getContainer().appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    const dismiss = () => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); };
    t.querySelector('.toast__close').addEventListener('click', dismiss);
    setTimeout(dismiss, 4000);
    return t;
  }
  return { show };
})();
window.LuxeToast = LuxeToast;

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-aos],[data-stagger]').forEach(el => obs.observe(el));
}

// ── STICKY HEADER ─────────────────────────────────────────────
function initStickyHeader() {
  const h = document.querySelector('.site-header');
  if (!h) return;
  window.addEventListener('scroll', LuxeUtils.throttle(() => h.classList.toggle('scrolled', window.scrollY > 60), 80), { passive: true });
}

// ── MOBILE NAV ────────────────────────────────────────────────
function openMobileNav() {
  document.getElementById('MobileNav')?.classList.add('open');
  document.getElementById('Overlay')?.classList.add('active');
  document.getElementById('HamBtn')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('MobileNav')?.classList.remove('open');
  document.getElementById('Overlay')?.classList.remove('active');
  document.getElementById('HamBtn')?.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeMobileNav = closeMobileNav;

function toggleMobileSub(btn) {
  const sub = btn.nextElementSibling;
  if (!sub) return;
  sub.classList.toggle('open');
  btn.querySelector('span:last-child').textContent = sub.classList.contains('open') ? '▴' : '▾';
}
window.toggleMobileSub = toggleMobileSub;

function initMobileNav() {
  document.getElementById('HamBtn')?.addEventListener('click', openMobileNav);
  document.getElementById('MobileNavClose')?.addEventListener('click', closeMobileNav);
}

// ── SEARCH PANEL ──────────────────────────────────────────────
function initSearch() {
  const trigger = document.getElementById('SearchToggle');
  const panel = document.getElementById('SearchPanel');
  const input = panel?.querySelector('[data-search-input]');
  const closeBtn = panel?.querySelector('[data-search-close]');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) setTimeout(() => input?.focus(), 300);
  });
  closeBtn?.addEventListener('click', () => { panel.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); });

  // Search form
  panel.querySelector('form')?.addEventListener('submit', e => {
    e.preventDefault();
    const q = input?.value.trim();
    if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
  });
}

// ── ACCORDION ────────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('[data-accordion]').forEach(container => {
    container.querySelectorAll('.accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        trigger.nextElementSibling?.classList.toggle('open', !expanded);
      });
    });
  });
}

// ── TABS ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    tabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabs.querySelectorAll('.tab-btn').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });
        tabs.querySelectorAll('.tab-panel').forEach(p => { p.classList.toggle('active', p.dataset.tabPanel === tab); p.hidden = p.dataset.tabPanel !== tab; });
      });
    });
  });
}

// ── TESTIMONIALS SLIDER ───────────────────────────────────────
class TestiSlider {
  constructor(el) {
    this.el = el;
    this.track = el.querySelector('.testi-track');
    this.dots = [...el.querySelectorAll('.testi-dot')];
    this.total = el.querySelectorAll('.testi-slide').length;
    this.current = 0;
    this.timer = null;
    if (!this.track || !this.total) return;
    this.bind();
    this.start();
    this.goto(0);
  }
  goto(i) {
    this.current = (i + this.total) % this.total;
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.dots.forEach((d, j) => { d.classList.toggle('active', j === this.current); d.setAttribute('aria-selected', j === this.current); });
  }
  next() { this.goto(this.current + 1); }
  prev() { this.goto(this.current - 1); }
  start() { this.timer = setInterval(() => this.next(), 5500); }
  stop() { clearInterval(this.timer); }
  bind() {
    this.el.querySelector('[data-testi-next]')?.addEventListener('click', () => { this.stop(); this.next(); this.start(); });
    this.el.querySelector('[data-testi-prev]')?.addEventListener('click', () => { this.stop(); this.prev(); this.start(); });
    this.dots.forEach((d, i) => d.addEventListener('click', () => { this.stop(); this.goto(i); this.start(); }));
    this.el.addEventListener('mouseenter', () => this.stop());
    this.el.addEventListener('mouseleave', () => this.start());
    let tx = 0;
    this.el.addEventListener('touchstart', e => { tx = e.touches[0].clientX; this.stop(); }, { passive: true });
    this.el.addEventListener('touchend', e => { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? this.next() : this.prev(); this.start(); });
  }
}

// ── COUNTER ANIMATION ─────────────────────────────────────────
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      const target = parseInt(e.target.dataset.count || '0', 10);
      const suffix = e.target.dataset.suffix || '';
      const dur = 2000, s = performance.now();
      const tick = now => {
        const p = Math.min((now - s) / dur, 1);
        e.target.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

// ── EXIT INTENT POPUP ─────────────────────────────────────────
function initExitPopup() {
  const popup = document.getElementById('ExitPopup');
  if (!popup || sessionStorage.getItem('luxe_popup')) return;

  function showPopup() {
    if (sessionStorage.getItem('luxe_popup')) return;
    popup.classList.add('show');
    document.getElementById('Overlay')?.classList.add('active');
    sessionStorage.setItem('luxe_popup', '1');
  }

  // Desktop exit intent
  setTimeout(() => {
    document.addEventListener('mouseleave', e => { if (e.clientY <= 0) showPopup(); }, { once: true });
  }, 4000);

  // Mobile: after 40s
  if ('ontouchstart' in window) setTimeout(showPopup, 40000);

  // Form submit
  document.getElementById('ExitForm')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('ExitForm').innerHTML = `
      <div style="text-align:center;padding:1rem 0">
        <div style="font-size:2.5rem;margin-bottom:.75rem">🎉</div>
        <h4 style="font-family:var(--font-heading);font-size:1.1rem;margin-bottom:.4rem">Welcome to LUXÉ!</h4>
        <p style="font-size:.875rem;color:var(--gray-600)">Your 10% code: <strong style="color:var(--gold-dark)">LUXE10</strong></p>
      </div>`;
    setTimeout(closeExitPopup, 4000);
  });
}

function closeExitPopup() {
  document.getElementById('ExitPopup')?.classList.remove('show');
  if (!document.getElementById('CartDrawer')?.classList.contains('open') && !document.getElementById('MobileNav')?.classList.contains('open')) {
    document.getElementById('Overlay')?.classList.remove('active');
  }
}
window.closeExitPopup = closeExitPopup;

// ── SMOOTH SCROLL ─────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ── FOOTER SUBSCRIBE ──────────────────────────────────────────
function initFooterSubscribe() {
  document.querySelectorAll('[data-footer-subscribe]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input?.value) { LuxeToast.show('Subscribed! Check your inbox 🎉', 'success'); input.value = ''; }
    });
  });
}

// ── PAGE LOAD ANIMATION ───────────────────────────────────────
function initPageLoad() {
  document.body.classList.add('page-load');
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  initStickyHeader();
  initMobileNav();
  initSearch();
  initAccordions();
  initTabs();
  initCounters();
  initScrollReveal();
  initSmoothScroll();
  initFooterSubscribe();
  LuxeCart.init();
  LuxeWishlist.init();
  initExitPopup();

  // Testimonial sliders
  document.querySelectorAll('[data-testi-slider]').forEach(el => new TestiSlider(el));

  // Newsletter form
  document.getElementById('NLForm')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('NLForm').style.display = 'none';
    document.getElementById('NLSuccess')?.classList.add('show');
  });

  // Delivery estimator (shared)
  initDeliveryEstimator();
});

// ── DELIVERY ESTIMATOR ────────────────────────────────────────
function initDeliveryEstimator() {
  const METRO = ['110','111','400','401','500','501','560','600','601','700','380','411'];
  document.querySelectorAll('[data-delivery-form]').forEach(form => {
    const input = form.querySelector('[data-pincode]');
    const btn = form.querySelector('[data-check-btn]');
    const result = form.querySelector('[data-delivery-result]');
    if (!input || !btn || !result) return;

    const check = () => {
      const pin = input.value.trim();
      result.className = 'delivery-box__result';
      if (!/^\d{6}$/.test(pin)) { result.classList.add('error'); result.innerHTML = '<span>⚠</span> Enter a valid 6-digit pincode.'; return; }
      const isMetro = METRO.includes(pin.slice(0, 3));
      const days = isMetro ? '2–3' : '4–6';
      const courier = isMetro ? 'Delhivery / BlueDart' : 'DTDC / Ekart';
      const now = new Date(), opts = { weekday: 'short', month: 'short', day: 'numeric' };
      const [min, max] = days.split('–').map(Number);
      const d1 = new Date(now); d1.setDate(now.getDate() + min);
      const d2 = new Date(now); d2.setDate(now.getDate() + max);
      result.classList.add('success');
      result.innerHTML = `<span>✓</span><div><strong>Delivery by ${d1.toLocaleDateString('en-IN', opts)} – ${d2.toLocaleDateString('en-IN', opts)}</strong><div style="font-size:var(--fs-xs);color:#1B7A3A;margin-top:3px">via ${courier} · ${isMetro ? 'Express' : 'Standard'}</div></div>`;
    };
    btn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
    input.addEventListener('input', () => { if (input.value.length === 6) check(); });
  });
}
