/* ============================================================
   LUXÉ BEAUTY — Shared HTML Components
   Equivalent to Shopify's layout/theme.liquid, snippets/header, footer
   ============================================================ */
'use strict';

const LuxeComponents = {

  headerHTML(activePage = '') {
    const navLinks = [
      { label: 'Shop', mega: true, children: [
        { title: 'Skincare', links: [
          ['Face Serums','products.html?collection=face-serums'],
          ['Moisturizers','products.html?collection=moisturizers'],
          ['Sunscreens','products.html?collection=sunscreens'],
          ['Night Creams','products.html?collection=night-creams'],
          ['Face Wash','products.html?collection=face-wash'],
        ]},
        { title: 'Makeup & Care', links: [
          ['Lip Care','products.html?collection=lip-care'],
          ['Beauty Kits','products.html?collection=beauty-kits'],
          ['Gift Sets','products.html?collection=beauty-kits'],
        ]},
        { title: 'Discover', links: [
          ['✨ New Arrivals','products.html?collection=new-arrivals'],
          ['🔥 Best Sellers','products.html?collection=best-sellers'],
          ['🎁 Bundles','products.html?collection=beauty-kits'],
          ['💸 Sale','products.html?collection=sale'],
        ]},
      ]},
      { label: 'Collections', href: 'collections.html' },
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#' },
    ];

    const navHTML = navLinks.map(link => {
      if (link.mega) {
        const megaHTML = link.children.map(col => `
          <div>
            <p class="mega-menu__title">${col.title}</p>
            <div class="mega-menu__links">
              ${col.links.map(([label, href]) => `<a href="${href}" class="mega-menu__link">${label}</a>`).join('')}
            </div>
          </div>`).join('');
        return `<div class="nav__item">
          <button class="nav__link">${link.label} <span class="nav__chevron">▾</span></button>
          <div class="mega-menu"><div class="mega-menu__grid mega-menu__grid--3">${megaHTML}</div></div>
        </div>`;
      }
      return `<div class="nav__item"><a href="${link.href}" class="nav__link">${link.label}</a></div>`;
    }).join('');

    return `
    <a href="#main" class="skip-link">Skip to content</a>

    <!-- Announcement Bar -->
    <div class="ann-bar" role="region" aria-label="Announcements">
      <div class="marquee">
        <div class="marquee__inner" aria-live="polite">
          ${['🚚 Free Shipping Above ₹999','🧪 Dermatologist Tested','🐰 100% Cruelty Free','🌿 Natural Ingredients','🇮🇳 Made in India'].map(msg => `<span class="marquee__item">${msg}</span><span class="marquee__sep">✦</span>`).join('').repeat(2)}
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="site-header" role="banner" id="SiteHeader">
      <div class="container header__inner">
        <a href="index.html" class="logo" aria-label="LUXÉ Beauty Home">
          <span class="logo__text">LUXÉ<span>✦</span></span>
          <span class="logo__tagline">Premium Beauty</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">${navHTML}</nav>
        <div class="header__actions">
          <button class="header__btn" id="SearchToggle" aria-label="Search" aria-expanded="false" aria-controls="SearchPanel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
          </button>
          <a href="wishlist.html" class="header__btn" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="header__badge" data-wishlist-count style="display:none">0</span>
          </a>
          <a href="account.html" class="header__btn header-acc-btn hide-mobile" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <button class="header__btn" data-open-cart aria-label="Open cart" aria-controls="CartDrawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="header__badge" data-cart-count>0</span>
          </button>
          <button class="hamburger" id="HamBtn" aria-label="Open menu" aria-expanded="false" aria-controls="MobileNav">
            <span class="ham-bar"></span><span class="ham-bar"></span><span class="ham-bar"></span>
          </button>
        </div>
      </div>
      <!-- Search Panel -->
      <div class="search-panel" id="SearchPanel" role="dialog" aria-label="Search" aria-hidden="true">
        <form class="search-panel__form" role="search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color:var(--gray-400);flex-shrink:0" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>
          <input type="search" data-search-input class="search-panel__input" placeholder="Search for serums, moisturizers..." aria-label="Search products">
          <button type="submit" class="btn btn--primary btn--sm">Search</button>
          <button type="button" data-search-close class="btn btn--secondary btn--sm">Close</button>
        </form>
      </div>
    </header>

    <!-- Mobile Nav -->
    <nav class="mobile-nav" id="MobileNav" aria-label="Mobile navigation" aria-hidden="true">
      <div class="mobile-nav__header">
        <a href="index.html" class="logo" style="font-size:1.3rem"><span class="logo__text" style="font-size:1.3rem">LUXÉ<span>✦</span></span></a>
        <button id="MobileNavClose" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray-600)" aria-label="Close menu">✕</button>
      </div>
      <div class="mobile-nav__body">
        ${[
          ['Shop', [['Face Serums','products.html?collection=face-serums'],['Moisturizers','products.html?collection=moisturizers'],['Sunscreens','products.html?collection=sunscreens'],['Night Creams','products.html?collection=night-creams'],['Lip Care','products.html?collection=lip-care'],['Beauty Kits','products.html?collection=beauty-kits']]],
          ['Collections', [['All Products','products.html'],['New Arrivals','products.html?collection=new-arrivals'],['Best Sellers','products.html?collection=best-sellers'],['Sale','products.html?collection=sale']]],
        ].map(([label, sub]) => `
          <div class="mobile-nav__item">
            <button class="mobile-nav__btn" onclick="toggleMobileSub(this)">${label} <span>▾</span></button>
            <div class="mobile-nav__sub">
              ${sub.map(([l,h]) => `<a href="${h}" class="mobile-nav__sub-link">${l}</a>`).join('')}
            </div>
          </div>`).join('')}
        <div class="mobile-nav__item"><a href="collections.html" class="mobile-nav__link">Collections</a></div>
        <div class="mobile-nav__item"><a href="faq.html" class="mobile-nav__link">FAQs</a></div>
        <div class="mobile-nav__item"><a href="contact.html" class="mobile-nav__link">Contact</a></div>
      </div>
      <div class="mobile-nav__footer">
        <a href="account.html" class="btn btn--secondary btn--full">My Account</a>
        <a href="wishlist.html" class="btn btn--outline-gold btn--full">Wishlist</a>
      </div>
    </nav>

    <!-- Cart Drawer -->
    <div class="cart-drawer" id="CartDrawer" role="dialog" aria-label="Shopping cart" aria-hidden="true">
      <div class="cart-drawer__header">
        <div class="cart-drawer__title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="stroke-width:1.7" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke-linecap="round"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0" stroke-linecap="round"/></svg>
          Your Bag <span class="cart-drawer__count" data-cart-count>0</span>
        </div>
        <button class="cart-drawer__close" id="CartClose" aria-label="Close cart">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="ship-bar">
        <div class="ship-bar__text" data-ship-text>Add <strong data-ship-amount>₹999</strong> more for <strong>FREE Shipping</strong></div>
        <div class="ship-bar__track"><div class="ship-bar__fill" data-ship-fill style="width:0%"></div></div>
        <div class="ship-bar__complete" data-ship-complete>🎉 Free Shipping Unlocked!</div>
      </div>
      <div class="cart-drawer__body" id="CartDrawerItems"></div>
      <div class="cart-drawer__footer">
        <div class="cart-drawer__subtotal">
          <span class="cart-drawer__subtotal-label">Subtotal</span>
          <span class="cart-drawer__subtotal-value" data-cart-total>₹0</span>
        </div>
        <a href="cart.html" class="btn btn--primary btn--full" style="height:56px;font-size:var(--fs-base);font-weight:700;letter-spacing:.06em">
          Checkout Securely ✦
        </a>
        <button class="cart-drawer__close" id="CartContinue" onclick="LuxeCart.closeDrawer()" style="font-size:var(--fs-sm);color:var(--gray-500);cursor:pointer;text-align:center;width:100%;background:none;border:none;padding:var(--sp-2)">Continue Shopping</button>
        <div class="cart-trust">
          <span class="cart-trust__item"><span style="color:var(--gold)">🔒</span> Secure</span>
          <span class="cart-trust__item"><span style="color:var(--gold)">🚚</span> Fast Delivery</span>
          <span class="cart-trust__item"><span style="color:var(--gold)">↩</span> Easy Returns</span>
        </div>
      </div>
    </div>

    <!-- Global Overlay -->
    <div class="overlay" id="Overlay" onclick="LuxeCart.closeDrawer();closeMobileNav();" aria-hidden="true"></div>

    <!-- Toast Container -->
    <div class="toast-container" id="ToastContainer" aria-live="polite" aria-atomic="true" role="status"></div>`;
  },

  footerHTML() {
    return `
    <footer class="site-footer" role="contentinfo">
      <div class="footer__top">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <a href="index.html" class="logo" aria-label="LUXÉ Beauty Home">
                <span class="logo__text" style="color:var(--white)">LUXÉ<span>✦</span></span>
              </a>
              <p class="footer__tagline">Luxury skincare that celebrates your natural beauty. Made in India with ❤️</p>
              <div class="footer__social">
                <a href="#" class="footer__social-link" aria-label="Instagram">📷</a>
                <a href="#" class="footer__social-link" aria-label="Facebook">📘</a>
                <a href="#" class="footer__social-link" aria-label="YouTube">▶️</a>
                <a href="#" class="footer__social-link" aria-label="Twitter">🐦</a>
              </div>
            </div>
            <div>
              <p class="footer__col-title">Shop</p>
              <div class="footer__links">
                ${[['Face Serums','products.html?collection=face-serums'],['Moisturizers','products.html?collection=moisturizers'],['Sunscreens','products.html?collection=sunscreens'],['Night Creams','products.html?collection=night-creams'],['Beauty Kits','products.html?collection=beauty-kits']].map(([l,h])=>`<a href="${h}" class="footer__link">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <p class="footer__col-title">Company</p>
              <div class="footer__links">
                ${[['About Us','#about'],['Our Story','#'],['Blog','#'],['Press','#'],['Careers','#']].map(([l,h])=>`<a href="${h}" class="footer__link">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <p class="footer__col-title">Support</p>
              <div class="footer__links">
                ${[['Contact Us','contact.html'],['FAQs','faq.html'],['Shipping Policy','#'],['Returns','#'],['Track Order','account.html']].map(([l,h])=>`<a href="${h}" class="footer__link">${l}</a>`).join('')}
              </div>
            </div>
            <div>
              <p class="footer__col-title">Stay Connected</p>
              <p style="font-size:var(--fs-sm);color:rgba(255,255,255,.5);margin-bottom:var(--sp-4);line-height:1.6">Get skincare tips, offers & early launches.</p>
              <form class="footer__subscribe" data-footer-subscribe>
                <input type="email" class="footer__email" placeholder="Your email" aria-label="Newsletter email" required>
                <button type="submit" class="footer__sub-btn" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </form>
              <div class="footer__payment">
                <p class="footer__payment-label">We Accept</p>
                <div class="footer__payment-icons">
                  ${['UPI','Visa','Mastercard','Razorpay','Net Banking','COD'].map(p=>`<span class="payment-chip">${p}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="container">
          <div class="footer__bottom-inner">
            <p class="footer__copy">© ${new Date().getFullYear()} LUXÉ Beauty. All rights reserved. Made with ♥ in India.</p>
            <div class="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Shipping Policy</a>
              <a href="#">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Exit Intent Popup -->
    <div class="exit-popup" id="ExitPopup" role="dialog" aria-label="Special offer" aria-modal="true">
      <div class="exit-popup__card">
        <button class="exit-popup__close" onclick="closeExitPopup()" aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
        </button>
        <div class="exit-popup__layout">
          <div class="exit-popup__visual" aria-hidden="true">🧴✨<br>💆‍♀️<br>🌿🌸</div>
          <div class="exit-popup__content">
            <span class="badge badge--gold exit-popup__badge">🎁 Exclusive Offer</span>
            <h2 class="exit-popup__title">Wait! Don't Leave Yet</h2>
            <p class="exit-popup__offer">Get <strong>10% OFF</strong> your first order</p>
            <p class="exit-popup__desc">Enter your email below and your discount code will be sent instantly.</p>
            <form id="ExitForm" style="display:flex;flex-direction:column;gap:.625rem">
              <input type="email" class="form-input" placeholder="Enter your email address" required aria-label="Email" style="border-radius:var(--r-full)">
              <button type="submit" class="btn btn--primary btn--full">Claim My 10% Off</button>
            </form>
            <p class="exit-popup__privacy">No spam ever. Unsubscribe anytime.</p>
            <button class="exit-popup__skip" onclick="closeExitPopup()">No thanks, I prefer paying full price</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  inject(pageTitle = 'LUXÉ Beauty') {
    const headerEl = document.getElementById('LuxeHeader');
    const footerEl = document.getElementById('LuxeFooter');
    if (headerEl) headerEl.innerHTML = this.headerHTML();
    if (footerEl) footerEl.innerHTML = this.footerHTML();
    document.title = pageTitle;
  }
};

window.LuxeComponents = LuxeComponents;
