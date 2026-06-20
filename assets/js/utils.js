/* ============================================================
   LUXÉ BEAUTY — Utility Functions & Shared Helpers
   ============================================================ */
'use strict';

const LuxeUtils = {
  /** Format INR price */
  formatPrice(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  },

  /** Discount percent */
  discountPct(price, comparePrice) {
    if (!comparePrice || comparePrice <= price) return 0;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  },

  /** Generate star HTML */
  starsHTML(rating, showCount = 0) {
    const full = Math.floor(rating), empty = 5 - full;
    const stars = '★'.repeat(full) + (empty > 0 ? '<span class="star--empty">' + '★'.repeat(empty) + '</span>' : '');
    const count = showCount ? ` <span style="font-size:var(--fs-xs);color:var(--gray-500);margin-left:4px">(${showCount})</span>` : '';
    return `<span class="stars" aria-label="${rating} out of 5 stars">${stars}</span>${count}`;
  },

  /** Get param from URL */
  getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  },

  /** Debounce */
  debounce(fn, wait = 200) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
  },

  /** Throttle */
  throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }
    };
  },

  /** Get product by handle */
  getProduct(handle) {
    return LUXE_DATA.products.find(p => p.handle === handle) || null;
  },

  /** Get products by collection */
  getCollection(handle) {
    if (handle === 'best-sellers') return LUXE_DATA.products.filter(p => p.tags.includes('bestseller'));
    if (handle === 'new-arrivals') return LUXE_DATA.products.filter(p => p.tags.includes('new'));
    return LUXE_DATA.products.filter(p => p.collection === handle);
  },

  /** Truncate text */
  truncate(str, len = 80) {
    return str.length > len ? str.slice(0, len) + '…' : str;
  },

  /** Trap focus in element */
  trapFocus(el) {
    const foc = el.querySelectorAll('a,button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
    const first = foc[0], last = foc[foc.length - 1];
    el.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    });
  },
};

/* ── PRODUCT CARD HTML GENERATOR ── */
function productCardHTML(product, opts = {}) {
  const { showQuickAdd = true, linkPrefix = '' } = opts;
  const pct = LuxeUtils.discountPct(product.price, product.comparePrice);
  const compareHTML = product.comparePrice ? `<span class="card__compare">${LuxeUtils.formatPrice(product.comparePrice)}</span>` : '';
  const discHTML = pct ? `<span class="card__discount">-${pct}%</span>` : '';
  const hasBest = product.tags.includes('bestseller');
  const hasNew = product.tags.includes('new');

  return `
    <article class="product-card" data-aos="fade-up">
      <div class="card__image-wrap">
        <div class="card__badges">
          ${hasBest ? '<span class="badge badge--best">Best Seller</span>' : ''}
          ${hasNew ? '<span class="badge badge--new">New</span>' : ''}
          ${pct ? `<span class="badge badge--sale">-${pct}%</span>` : ''}
        </div>
        <a href="${linkPrefix}product-detail.html?handle=${product.handle}" aria-tabindex="-1" aria-hidden="true">
          <img class="card__image" src="${product.img}" alt="${product.title}" loading="lazy" width="400" height="533">
        </a>
        <div class="card__overlay" aria-hidden="true"></div>
        <div class="card__actions" aria-hidden="true">
          ${showQuickAdd ? `<button class="btn btn--white btn--sm" style="flex:1" onclick="LuxeCart.addItem(${product.id},'${product.title}',${product.price},'${product.img}','${product.type}')" aria-label="Quick add ${product.title}">Quick Add</button>` : ''}
          <button class="btn btn--ghost btn--sm btn--icon" onclick="LuxeWishlist.toggle(${product.id},'${product.title}',${product.price},'${product.img}','${product.handle}')" aria-label="Wishlist ${product.title}" data-wishlist-btn="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="stroke-width:1.7" class="wishlist-icon" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div class="card__body">
        <p class="card__category">${product.type}</p>
        <h3 class="card__title"><a href="${linkPrefix}product-detail.html?handle=${product.handle}">${product.title}</a></h3>
        <div style="margin-bottom:var(--sp-3)">${LuxeUtils.starsHTML(product.rating, product.reviewCount)}</div>
        <div class="card__price-row">
          <span class="card__price">${LuxeUtils.formatPrice(product.price)}</span>
          ${compareHTML}${discHTML}
        </div>
      </div>
    </article>`;
}

window.LuxeUtils = LuxeUtils;
window.productCardHTML = productCardHTML;
