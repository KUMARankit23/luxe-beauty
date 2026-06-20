# LUXÉ Beauty — Customization Guide

## Design Tokens (Fast Customization)

All brand colors, fonts, spacing, and shadows are defined as CSS Custom Properties in `assets/css/tokens.css`. Change them once — everything updates.

```css
:root {
  /* ── Brand Colors ── */
  --gold:        #D4AF37;   /* Primary gold */
  --gold-dark:   #B8960C;   /* Hover states, gradients */
  --gold-light:  #E8CC6B;   /* Shimmer, gradients */
  --gold-muted:  rgba(212,175,55,.12);  /* Backgrounds */
  --black:       #111111;
  --cream:       #F9F5EE;   /* Section backgrounds */

  /* ── Fonts ── */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Poppins', sans-serif;
}
```

---

## Changing Fonts

**Step 1** — Update the Google Fonts import in `assets/css/base.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
```

**Step 2** — Update variables in `assets/css/tokens.css`:
```css
--font-heading: 'Cormorant Garamond', Georgia, serif;
--font-body:    'Inter', sans-serif;
```

---

## Changing Brand Colors

To change the gold accent to rose gold:
```css
:root {
  --gold:       #B76E79;
  --gold-dark:  #8B4F58;
  --gold-light: #D4A0A8;
  --gold-muted: rgba(183,110,121,.12);
}
```

---

## Adding / Editing Products

All product data lives in `assets/js/data.js` in the `LUXE_DATA.products` array.

### Product Object Structure
```javascript
{
  id: 9,                              // Unique number
  handle: 'my-new-serum',             // URL slug (no spaces)
  title: 'My New Serum',
  type: 'Face Serums',               // Shown as card category
  collection: 'face-serums',         // Used for filtering
  price: 699,                        // In ₹ (whole number)
  comparePrice: 999,                 // null = no sale badge
  skinType: 'Oily / Combination',
  benefits: ['Brightening', 'Hydration', 'Glow'],
  rating: 4.8,
  reviewCount: 156,
  emoji: '✨',                       // Shown as cart thumbnail fallback
  tags: ['new'],                     // 'bestseller', 'new', 'bundle'
  img: 'https://your-image.jpg',
  img2: 'https://your-image-2.jpg',  // Gallery secondary image
  description: 'Full product description.',
  ingredients: 'Ingredient list.',
  howToUse: 'Application instructions.',
  variants: [
    { id: 901, name: '30ml', price: 699 },
    { id: 902, name: '50ml', price: 999 }
  ]
}
```

### Available Collection Handles
| Handle | Page Filter |
|---|---|
| `face-serums` | products.html?collection=face-serums |
| `moisturizers` | products.html?collection=moisturizers |
| `sunscreens` | products.html?collection=sunscreens |
| `night-creams` | products.html?collection=night-creams |
| `face-wash` | products.html?collection=face-wash |
| `lip-care` | products.html?collection=lip-care |
| `beauty-kits` | products.html?collection=beauty-kits |
| `best-sellers` | products.html?collection=best-sellers (tag filter) |
| `new-arrivals` | products.html?collection=new-arrivals (tag filter) |

---

## Adding / Editing Collections

Edit the `LUXE_DATA.collections` array in `data.js`:

```javascript
{
  handle: 'eye-care',
  title: 'Eye Care',
  emoji: '👁️',
  img: 'https://your-collection-image.jpg',
  badge: 'New'   // optional — shows badge on card
}
```

---

## Editing Reviews / Testimonials

Edit `LUXE_DATA.reviews` in `data.js`:

```javascript
{
  productId: 1,
  author: 'Sneha Mehta',
  city: 'Pune',
  rating: 5,
  text: 'The serum is incredible! My skin has never looked better.',
  product: 'Vitamin C Serum',
  verified: true,
  avatar: 'S',            // Single letter shown in avatar circle
  color: '#AB47BC'        // Avatar background color (any CSS color)
}
```

---

## Editing FAQs

Edit `LUXE_DATA.faqs` in `data.js`:

```javascript
{
  category: 'Products',   // 'Products', 'Shipping', 'Returns', 'Account'
  q: 'Your question here?',
  a: 'Your answer here.'
}
```

---

## Editing the Announcement Bar

In `assets/js/components.js`, find the `headerHTML()` method and edit the marquee items array:

```javascript
['🚚 Free Shipping Above ₹999',
 '🧪 Dermatologist Tested',
 '🐰 100% Cruelty Free',
 '🌿 Natural Ingredients',
 '🇮🇳 Made in India']
 // ↑ Add/remove/edit items here
```

---

## Changing Free Shipping Threshold

In `assets/js/data.js`:
```javascript
const LUXE_DATA = {
  FREE_SHIPPING_THRESHOLD: 999,  // ← Change to any amount (in ₹)
```

This automatically updates the cart drawer bar, the cart page bar, and the announcement bar message.

---

## Editing the Exit Intent Popup

In `assets/js/components.js`, find `footerHTML()` and edit the popup content:

```html
<h2 class="exit-popup__title">Your Custom Headline</h2>
<p class="exit-popup__offer">Get <strong>15% OFF</strong> your first order</p>
```

Change the popup trigger timing in `assets/js/app.js`:
```javascript
// Desktop: fires when mouse leaves viewport, after X ms
setTimeout(() => {
  document.addEventListener('mouseleave', ...);
}, 4000);   // ← Change delay in ms

// Mobile: fires after X ms
setTimeout(showPopup, 40000);  // ← Change delay in ms
```

Disable it entirely:
```javascript
function initExitPopup() {
  return;  // ← Add this line to disable
}
```

---

## Adding a New Page

**Step 1** — Copy `faq.html` as a template:
```bash
copy faq.html my-new-page.html
```

**Step 2** — Update the title and content. The header/footer inject automatically via:
```javascript
LuxeComponents.inject('My Page Title — LUXÉ Beauty');
```

**Step 3** — Add a link in `assets/js/components.js` in the footer links array.

---

## CSS Architecture

The CSS is split into focused files loaded in order:

| File | Purpose | Edit when… |
|---|---|---|
| `tokens.css` | Design system variables | Changing colors, fonts, spacing |
| `base.css` | Reset, typography, layout helpers | Changing base typography or global resets |
| `components.css` | Buttons, cards, forms, accordion | Changing reusable UI elements |
| `layout.css` | Header, footer, cart drawer, mega menu | Changing navigation or cart styles |
| `animations.css` | All animations and transitions | Changing motion/animation behavior |
| `pages.css` | Page-specific layouts | Changing specific page layouts |
| `responsive.css` | Breakpoint overrides | Changing mobile behavior |

---

## Performance Tips

1. **Replace Unsplash images** with your own WebP images at `400w`, `800w`, `1200w` sizes
2. **Preload hero image** — already done: `fetchpriority="high"` on hero `<img>`
3. **Inline critical CSS** — paste `tokens.css` + key variables into a `<style>` tag in `<head>` for zero render-blocking
4. **Cache headers** — already configured in `vercel.json` for 1-year asset caching
