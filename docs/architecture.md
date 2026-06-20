# LUXÉ Beauty — Architecture & Shopify Concepts

## How This Maps to a Real Shopify Theme

Every file in this static project has a direct Shopify equivalent. This document explains the mapping so you can migrate to a real Shopify Dawn theme in one step.

---

## File Mapping Table

| This Project | Shopify Equivalent | Purpose |
|---|---|---|
| `index.html` | `templates/index.json` | Homepage template |
| `products.html` | `templates/collection.json` | Collection/shop page |
| `product-detail.html` | `templates/product.json` | Product page |
| `collections.html` | Custom page template | All collections |
| `cart.html` | `templates/cart.json` | Cart page |
| `wishlist.html` | `pages/wishlist.html` | Wishlist page |
| `account.html` | `templates/customers/account.json` | Customer account |
| `faq.html` | `pages/faq` | FAQ page |
| `contact.html` | `pages/contact` | Contact page |
| `assets/js/components.js` → `headerHTML()` | `layout/theme.liquid` | Global layout wrapper |
| `assets/js/components.js` → `footerHTML()` | `sections/custom-footer.liquid` | Global footer |
| `assets/js/data.js` | Shopify product catalog | Product/collection data |
| `assets/js/cart.js` | Shopify AJAX Cart API | `/cart/add.js`, `/cart/change.js` |
| `assets/js/wishlist.js` | App + LocalStorage | Wishlist functionality |
| `productCardHTML()` in utils.js | `snippets/product-card.liquid` | Reusable card component |

---

## Section-by-Section Shopify Mapping

### Homepage Sections → `sections/` folder

| HTML Section | Shopify Section File | Schema Fields |
|---|---|---|
| Hero Banner | `luxury-hero-banner.liquid` | image, heading, overlay, CTA buttons |
| Featured Collections | `featured-collections.liquid` | collection picker, columns, aspect ratio |
| Best Sellers | `best-sellers.liquid` | collection, products_count, quick_add |
| Comparison Table | `product-comparison.liquid` | product rows, highlight flag |
| Why Choose Us | `why-choose-us.liquid` | feature blocks, stat blocks |
| Testimonials | `testimonials-slider.liquid` | testimonial blocks, autoplay |
| Instagram Gallery | `instagram-gallery.liquid` | image blocks, handle |
| Newsletter | `newsletter-section.liquid` | Klaviyo list ID, heading, perks |

### Snippets → `snippets/` folder

```liquid
{%- comment -%}
  Liquid equivalent of productCardHTML() in utils.js
  Usage: {% render 'product-card', product: product, show_quick_add: true %}
{%- endcomment -%}
```

---

## JavaScript → Shopify Liquid Equivalents

### Cart Module (`cart.js`)

```javascript
// This project:
LuxeCart.addItem(id, title, price, img)

// Shopify equivalent:
fetch('/cart/add.js', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: variantId, quantity: 1 })
})
```

```javascript
// This project:
LuxeCart.changeQty(id, delta)

// Shopify equivalent:
fetch('/cart/change.js', {
  method: 'POST',
  body: JSON.stringify({ line: lineIndex, quantity: newQty })
})
```

```javascript
// This project:
LuxeCart.getTotal()  // reads from data.js array

// Shopify equivalent:
fetch('/cart.js').then(r => r.json())  // returns cart object with total_price
```

### Product Data (`data.js`)

```javascript
// This project:
LUXE_DATA.products.find(p => p.handle === 'vitamin-c-serum')

// Shopify equivalent:
// Liquid: {{ product.title }}, {{ product.price | money }}
// AJAX: fetch('/products/vitamin-c-serum.js').then(r => r.json())
```

### Wishlist (`wishlist.js`)

```javascript
// This project: LocalStorage
localStorage.setItem('luxe_wishlist', JSON.stringify(items))

// Real Shopify: Would use a dedicated app (wishlist king, etc.)
// or a custom metafield on the customer object
```

---

## OS 2.0 Section Schema Example

The following is the schema for the Hero Banner section in the real Shopify theme (`luxe-beauty-shopify/sections/luxury-hero-banner.liquid`):

```json
{% schema %}
{
  "name": "Luxury Hero Banner",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Hero image" },
    { "type": "range", "id": "min_height", "min": 400, "max": 1000, "default": 820 },
    { "type": "color", "id": "overlay_color", "default": "#000000" },
    { "type": "range", "id": "overlay_opacity", "min": 0, "max": 80, "default": 45 }
  ],
  "blocks": [
    { "type": "heading", "name": "Heading",
      "settings": [
        { "type": "textarea", "id": "heading", "default": "Elevate Your Skincare Ritual" }
      ]
    },
    { "type": "buttons", "name": "Buttons",
      "settings": [
        { "type": "text", "id": "btn1_label", "default": "Shop Now" },
        { "type": "url", "id": "btn1_link" }
      ]
    }
  ]
}
{% endschema %}
```

This allows the store owner to customize everything from the Shopify Theme Editor without touching code.

---

## Performance Architecture

```
Browser Request
    │
    ▼
Vercel CDN (Edge)
    │
    ▼
Static HTML (0ms TTFB)
    │
    ├── CSS loaded synchronously (render-critical)
    │       tokens.css → base.css → components.css → layout.css
    │
    ├── Hero image: loading="eager" + fetchpriority="high"
    │       → Optimizes LCP
    │
    ├── All other images: loading="lazy"
    │       → Reduces initial payload
    │
    └── JS: defer attribute on all scripts
            → Non-blocking parse
            → DOMContentLoaded fires all inits
```

---

## Data Flow

```
data.js (Product Catalog)
    │
    ├─► utils.js (productCardHTML generator)
    │       │
    │       └─► Rendered into DOM by each page
    │
    ├─► cart.js (Cart State)
    │       │
    │       ├─► localStorage (persistence)
    │       ├─► Cart Drawer (DOM updates)
    │       └─► Cart Page (DOM updates)
    │
    └─► wishlist.js (Wishlist State)
            │
            ├─► localStorage (persistence)
            └─► Wishlist Page (DOM render)
```
