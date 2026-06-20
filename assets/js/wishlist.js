/* ============================================================
   LUXÉ BEAUTY — Wishlist Module (LocalStorage)
   ============================================================ */
'use strict';

const LuxeWishlist = (() => {
  const KEY = 'luxe_wishlist';
  let items = [];

  function load() { try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch { items = []; } }
  function save() { localStorage.setItem(KEY, JSON.stringify(items)); updateButtons(); updateCounters(); }

  function add(id, title, price, img, handle) {
    if (!has(id)) { items.push({ id: parseInt(id), title, price: parseInt(price), img, handle, addedAt: Date.now() }); save(); return true; }
    return false;
  }
  function remove(id) { items = items.filter(i => i.id !== parseInt(id)); save(); return true; }
  function has(id) { return items.some(i => i.id === parseInt(id)); }
  function toggle(id, title, price, img, handle) {
    const added = has(id) ? (remove(id), false) : (add(id, title, price, img, handle), true);
    LuxeToast.show(added ? 'Saved to wishlist ❤️' : 'Removed from wishlist 🤍', added ? 'success' : 'info');
    return added;
  }
  function count() { return items.length; }
  function getAll() { return [...items].sort((a, b) => b.addedAt - a.addedAt); }

  function updateButtons() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const id = parseInt(btn.dataset.wishlistBtn);
      const active = has(id);
      btn.classList.toggle('wishlisted', active);
      btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
      btn.setAttribute('aria-pressed', String(active));
      const icon = btn.querySelector('.wishlist-icon');
      if (icon) { icon.style.fill = active ? '#E57373' : 'none'; icon.style.stroke = active ? '#E57373' : 'currentColor'; }
    });
  }

  function updateCounters() {
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      const c = count();
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  }

  function renderPage() {
    const container = document.getElementById('WishlistGrid');
    const countEl = document.getElementById('WishlistCount');
    if (!container) return;
    const all = getAll();
    if (countEl) countEl.textContent = all.length;
    if (!all.length) {
      container.innerHTML = `<div style="grid-column:1/-1"><div class="wishlist-empty">
        <div style="font-size:3.5rem;opacity:.3">🤍</div>
        <h3 style="font-family:var(--font-heading);font-size:var(--fs-xl)">Your wishlist is empty</h3>
        <p style="color:var(--gray-500);font-size:var(--fs-sm)">Save your favourite products here.</p>
        <a href="products.html" class="btn btn--primary" style="margin-top:1.5rem">Explore Products</a>
      </div></div>`;
      return;
    }
    container.innerHTML = all.map(item => {
      const p = LUXE_DATA.products.find(p => p.id === item.id);
      if (!p) return '';
      return productCardHTML(p);
    }).join('');
    updateButtons();
  }

  function init() {
    load();
    updateButtons();
    updateCounters();
    renderPage();
  }

  return { init, toggle, has, add, remove, count, getAll, updateButtons, updateCounters };
})();

window.LuxeWishlist = LuxeWishlist;
