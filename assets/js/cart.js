/* ============================================================
   LUXÉ BEAUTY — Cart Module
   Equivalent to Shopify's AJAX Cart API
   ============================================================ */
'use strict';

const LuxeCart = (() => {
  const STORAGE_KEY = 'luxe_cart';
  let items = [];

  // ── Storage ──────────────────────────────────────────────
  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { items = []; }
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateUI();
    dispatchEvent('luxe:cart:updated', { items, total: getTotal(), count: getCount() });
  }

  // ── Core ──────────────────────────────────────────────────
  function addItem(id, title, price, img = '', type = '') {
    id = parseInt(id);
    const existing = items.find(i => i.id === id);
    if (existing) { existing.qty++; }
    else { items.push({ id, title, price: parseInt(price), img, type, qty: 1, variant: 'Standard' }); }
    save();
    openDrawer();
    LuxeToast.show(`Added to bag! 🛍️`, 'success');
    dispatchEvent('luxe:cart:item-added', { id, title, price });
  }

  function removeItem(id) {
    id = parseInt(id);
    items = items.filter(i => i.id !== id);
    save();
    LuxeToast.show('Item removed', 'info', '🗑️');
  }

  function changeQty(id, delta) {
    id = parseInt(id);
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) items = items.filter(i => i.id !== id);
    save();
  }

  function setQty(id, qty) {
    id = parseInt(id);
    qty = parseInt(qty);
    if (qty < 1) { removeItem(id); return; }
    const item = items.find(i => i.id === id);
    if (item) { item.qty = qty; save(); }
  }

  function clear() { items = []; save(); }

  // ── Getters ───────────────────────────────────────────────
  function getTotal() { return items.reduce((s, i) => s + i.price * i.qty, 0); }
  function getCount() { return items.reduce((s, i) => s + i.qty, 0); }
  function getItems() { return [...items]; }

  // ── UI ───────────────────────────────────────────────────
  function updateUI() {
    const count = getCount();
    const total = getTotal();

    // Cart count badges
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      el.classList.add('bump'); setTimeout(() => el.classList.remove('bump'), 400);
    });

    // Subtotals
    document.querySelectorAll('[data-cart-total]').forEach(el => {
      el.textContent = LuxeUtils.formatPrice(total);
    });

    // Shipping bar
    updateShipBar(total);

    // Render drawer items if open
    renderDrawer();

    // Render cart page if present
    if (document.getElementById('CartPageItems')) renderCartPage();
  }

  function updateShipBar(total) {
    const threshold = LUXE_DATA.FREE_SHIPPING_THRESHOLD;
    const pct = Math.min((total / threshold) * 100, 100);
    document.querySelectorAll('[data-ship-fill]').forEach(el => { el.style.width = pct + '%'; });
    document.querySelectorAll('[data-ship-text]').forEach(el => {
      if (total >= threshold) {
        el.closest('.ship-bar').querySelector('[data-ship-complete]')?.classList.add('show');
        el.style.display = 'none';
      } else {
        el.closest('.ship-bar')?.querySelector('[data-ship-complete]')?.classList.remove('show');
        el.style.display = '';
        const amtEl = el.querySelector('[data-ship-amount]');
        if (amtEl) amtEl.textContent = LuxeUtils.formatPrice(threshold - total);
      }
    });
  }

  function renderDrawer() {
    const container = document.getElementById('CartDrawerItems');
    if (!container) return;
    if (!items.length) {
      container.innerHTML = `<div class="empty-state" style="padding:4rem 1rem">
        <div class="empty-state__icon">🛍️</div>
        <p class="empty-state__title">Your bag is empty</p>
        <p class="empty-state__text">Add some luxurious products to get started</p>
        <button class="btn btn--primary btn--sm" style="margin-top:1.5rem" onclick="LuxeCart.closeDrawer()">Start Shopping</button>
      </div>`;
      return;
    }
    container.innerHTML = items.map(item => `
      <div class="cart-item" id="ci-${item.id}">
        <div class="cart-item__img">${item.img ? `<img src="${item.img}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r-sm)" loading="lazy">` : item.title[0]}</div>
        <div class="cart-item__info">
          <div class="cart-item__name"><a href="product-detail.html?handle=${item.id}">${item.title}</a></div>
          <div class="cart-item__variant">${item.variant}</div>
          <div class="cart-item__bottom">
            <span class="cart-item__price">${LuxeUtils.formatPrice(item.price * item.qty)}</span>
            <div class="cart-item__controls">
              <div class="cart-item__qty">
                <button class="cart-item__qty-btn" onclick="LuxeCart.changeQty(${item.id},-1)" aria-label="Decrease">−</button>
                <span class="cart-item__qty-num">${item.qty}</span>
                <button class="cart-item__qty-btn" onclick="LuxeCart.changeQty(${item.id},1)" aria-label="Increase">+</button>
              </div>
              <button class="cart-item__remove" onclick="LuxeCart.removeItem(${item.id})" aria-label="Remove">✕</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  function renderCartPage() {
    const container = document.getElementById('CartPageItems');
    if (!container) return;
    const subtotalEl = document.getElementById('CartPageSubtotal');
    const totalEl = document.getElementById('CartPageTotal');

    if (!items.length) {
      container.innerHTML = `<div class="empty-state" style="padding:5rem 2rem">
        <div class="empty-state__icon">🛍️</div>
        <h2 class="empty-state__title">Your bag is empty</h2>
        <p class="empty-state__text">Discover our luxury skincare collection</p>
        <a href="products.html" class="btn btn--primary" style="margin-top:1.5rem">Shop Now</a>
      </div>`;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="cart-page-item">
        <div class="cart-page-item__img">${item.img ? `<img src="${item.img}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r-md)" loading="lazy">` : item.title[0]}</div>
        <div class="cart-page-item__details">
          <div class="cart-page-item__name">${item.title}</div>
          <div class="cart-page-item__variant">${item.variant}</div>
          <div class="cart-page-item__price">${LuxeUtils.formatPrice(item.price)} each</div>
          <div class="cart-item__qty" style="margin-top:var(--sp-3)">
            <button class="cart-item__qty-btn" onclick="LuxeCart.changeQty(${item.id},-1)" aria-label="Decrease">−</button>
            <span class="cart-item__qty-num">${item.qty}</span>
            <button class="cart-item__qty-btn" onclick="LuxeCart.changeQty(${item.id},1)" aria-label="Increase">+</button>
          </div>
          <button class="cart-page-item__remove" onclick="LuxeCart.removeItem(${item.id})">Remove</button>
        </div>
        <div class="cart-page-item__subtotal">${LuxeUtils.formatPrice(item.price * item.qty)}</div>
      </div>`).join('');

    const total = getTotal();
    const shipping = total >= LUXE_DATA.FREE_SHIPPING_THRESHOLD ? 0 : 99;
    if (subtotalEl) subtotalEl.textContent = LuxeUtils.formatPrice(total);
    if (totalEl) totalEl.textContent = LuxeUtils.formatPrice(total + shipping);
    const shipEl = document.getElementById('CartPageShipping');
    if (shipEl) shipEl.textContent = shipping === 0 ? 'FREE 🎉' : LuxeUtils.formatPrice(shipping);
  }

  // ── Drawer ────────────────────────────────────────────────
  function openDrawer() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('Overlay');
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderDrawer();
  }

  function closeDrawer() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('Overlay');
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden', 'true');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── Event helper ──────────────────────────────────────────
  function dispatchEvent(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    load();
    updateUI();
    // Close drawer btn
    document.getElementById('CartClose')?.addEventListener('click', closeDrawer);
    // Open drawer btn
    document.querySelectorAll('[data-open-cart]').forEach(btn => btn.addEventListener('click', openDrawer));
    // Overlay close
    document.getElementById('Overlay')?.addEventListener('click', () => { closeDrawer(); closeMobileNav(); });
    // Escape key
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeMobileNav(); closeExitPopup(); } });
  }

  return { init, addItem, removeItem, changeQty, setQty, clear, getTotal, getCount, getItems, openDrawer, closeDrawer, renderDrawer, updateUI };
})();

window.LuxeCart = LuxeCart;
