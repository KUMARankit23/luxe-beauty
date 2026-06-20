# LUXÉ Beauty — Deployment Guide

## Deploy to Vercel (Recommended — 5 minutes)

### Step 1: Push to GitHub

```bash
# Navigate to project folder
cd C:\Users\ankit\Downloads\shopify_app\luxe-beauty

# Initialize git
git init
git add .
git commit -m "feat: LUXÉ Beauty — Premium Shopify Portfolio Project"

# Create repo on GitHub (github.com/new), then:
git remote add origin https://github.com/YOUR_USERNAME/luxe-beauty.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"** → Select `luxe-beauty`
4. Framework Preset: **Other** (auto-detected as Static)
5. Leave all settings as default
6. Click **"Deploy"**

✅ Live in ~60 seconds at `https://luxe-beauty-YOUR_USERNAME.vercel.app`

### Custom Domain (Optional)

In Vercel Dashboard → Project → Settings → Domains:
```
luxebeauty.in  →  Add
```
Then update DNS at your registrar:
```
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

---

## Deploy to GitHub Pages (Free Alternative)

```bash
# In your GitHub repo:
# Settings → Pages → Source: Deploy from branch → main → / (root)
# Site will be live at: https://YOUR_USERNAME.github.io/luxe-beauty/
```

> **Note:** GitHub Pages requires relative paths — already handled in this project.

---

## Deploy to Netlify

```bash
# Drag & drop the luxe-beauty folder to:
# app.netlify.com/drop

# Or via CLI:
npm install -g netlify-cli
cd luxe-beauty
netlify deploy --prod --dir .
```

---

## Pre-Deployment Checklist

- [ ] All images load correctly (open each page, check Network tab)
- [ ] Cart drawer opens and items can be added/removed
- [ ] Wishlist persists on page refresh
- [ ] Exit popup fires on mouse-leave (after 4s)
- [ ] Newsletter form shows success state
- [ ] Contact form shows success state
- [ ] Account login works (demo mode)
- [ ] All page links work without 404s
- [ ] Mobile menu opens and closes correctly
- [ ] Product filters work on `/products.html`
- [ ] Free shipping bar updates when cart changes

---

## Environment Differences

| Feature | Local (`file://`) | Local Server | Vercel/Netlify |
|---|---|---|---|
| HTML/CSS/JS | ✅ | ✅ | ✅ |
| LocalStorage (cart/wishlist) | ✅ | ✅ | ✅ |
| SessionStorage (popup) | ✅ | ✅ | ✹ |
| Google Fonts | ✅ (with internet) | ✅ | ✅ |
| Unsplash images | ✅ (with internet) | ✅ | ✅ |
| URL parameters | ❌ (may not work) | ✅ | ✅ |

> **Recommendation:** Always use a local server for development.

---

## Migrating to Real Shopify

Once you have a Shopify store:

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigate to the Shopify theme folder
cd C:\Users\ankit\Downloads\shopify_app\luxe-beauty-shopify

# Authenticate & push
shopify auth login --store=your-store.myshopify.com
shopify theme push --unpublished
```

The `luxe-beauty-shopify/` folder in this repo contains the complete Dawn Theme version with all Liquid files, sections, and snippets ready to upload.
