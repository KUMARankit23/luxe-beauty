# LUXÉ Beauty — Setup Guide

## Prerequisites

- Any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Optional: Node.js 18+ for local dev server
- Optional: Git for version control

---

## Option 1: Open Directly (Fastest)

No installation needed.

```bash
# Windows
start C:\path\to\luxe-beauty\index.html

# Mac
open /path/to/luxe-beauty/index.html
```

> **Note:** Some browsers restrict `fetch()` on `file://` URLs. If the cart/wishlist don't work, use a local server (Option 2).

---

## Option 2: Local Dev Server (Recommended)

### Using Node.js `serve`
```bash
cd luxe-beauty
npx serve .
# Opens at http://localhost:3000
```

### Using Python
```bash
cd luxe-beauty

# Python 3
python -m http.server 8080

# Opens at http://localhost:8080
```

### Using VS Code Live Server
1. Install the **Live Server** extension by Ritwick Dey
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

---

## Option 3: Vercel CLI

```bash
npm install -g vercel
cd luxe-beauty
vercel dev
# Opens at http://localhost:3000
```

---

## Project Structure Overview

```
luxe-beauty/
├── index.html              ← Start here (homepage)
├── products.html           ← Shop/collection page
├── product-detail.html     ← Product page (?handle=product-handle)
├── collections.html        ← All collections
├── cart.html               ← Cart page
├── wishlist.html           ← Saved products
├── account.html            ← Login / account dashboard
├── faq.html                ← Frequently asked questions
├── contact.html            ← Contact form
├── assets/css/             ← All stylesheets
├── assets/js/              ← All JavaScript modules
├── docs/                   ← Documentation
└── vercel.json             ← Deployment config
```

---

## URL Parameters

Some pages use URL query parameters for routing:

| URL | Result |
|---|---|
| `product-detail.html?handle=vitamin-c-brightening-serum` | Loads that specific product |
| `product-detail.html?handle=1` | Loads product by ID |
| `products.html?collection=face-serums` | Filters to that collection |
| `products.html?collection=best-sellers` | Shows bestseller tag products |
| `products.html?collection=new-arrivals` | Shows new tag products |
| `products.html?q=serum` | Searches by keyword |

---

## Adding New Products

Edit `assets/js/data.js` and add to the `products` array:

```javascript
{
  id: 9,
  handle: 'my-new-product',
  title: 'My New Product',
  type: 'Face Serums',
  collection: 'face-serums',
  price: 599,
  comparePrice: 799,        // null if no sale
  skinType: 'All Skin Types',
  benefits: ['Hydration', 'Glow', 'Brightening'],
  rating: 4.7,
  reviewCount: 120,
  emoji: '💧',
  tags: ['new'],            // 'bestseller', 'new', 'bundle', etc.
  img: 'https://your-image-url.jpg',
  img2: 'https://your-image-url-2.jpg',
  description: 'Product description here.',
  ingredients: 'Ingredient list here.',
  howToUse: 'How to use instructions.',
  variants: [
    { id: 901, name: '30ml', price: 599 },
    { id: 902, name: '50ml', price: 899 }
  ]
}
```

---

## Customizing Brand Colors

Edit `assets/css/tokens.css`:

```css
:root {
  --gold:       #D4AF37;    /* Primary brand gold */
  --gold-dark:  #B8960C;    /* Darker gold for hover states */
  --gold-light: #E8CC6B;    /* Lighter gold for gradients */
  --black:      #111111;    /* Primary text & backgrounds */
  --cream:      #F9F5EE;    /* Section backgrounds */
}
```

---

## Customizing Fonts

Edit the Google Fonts import in `assets/css/base.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap');
```

Then update the variables in `tokens.css`:

```css
:root {
  --font-heading: 'Your Heading Font', Georgia, serif;
  --font-body:    'Your Body Font', sans-serif;
}
```

---

## Free Shipping Threshold

Change in `assets/js/data.js`:

```javascript
const LUXE_DATA = {
  FREE_SHIPPING_THRESHOLD: 999,  // ← Change this (in ₹)
  ...
}
```

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Cart/wishlist not persisting | Open from local server, not `file://` |
| Images not loading | Check internet connection (images are from Unsplash CDN) |
| Fonts not loading | Check internet connection (fonts from Google Fonts) |
| Page looks broken | Open browser console, check for 404 errors on CSS/JS files |
| Exit popup not showing | It only shows once per session. Clear sessionStorage in DevTools |
