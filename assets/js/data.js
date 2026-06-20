/* ============================================================
   LUXÉ BEAUTY — Product & Site Data
   (Equivalent to Shopify's products.json / collections)
   ============================================================ */
'use strict';

const LUXE_DATA = {
  FREE_SHIPPING_THRESHOLD: 999,

  products: [
    {
      id: 1, handle: 'vitamin-c-brightening-serum',
      title: 'Vitamin C Brightening Serum',
      type: 'Face Serums', collection: 'face-serums',
      price: 799, comparePrice: 999,
      skinType: 'Oily / Combination',
      benefits: ['Brightening', 'Pigmentation', 'Glow Boost'],
      rating: 4.9, reviewCount: 248,
      emoji: '💧', tags: ['bestseller', 'brightening'],
      img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop',
      description: 'A potent Vitamin C serum formulated with 15% L-Ascorbic Acid, Ferulic Acid, and Hyaluronic Acid. Visibly reduces dark spots, evens skin tone, and boosts collagen production for a luminous complexion.',
      ingredients: 'Aqua, Ascorbic Acid (15%), Ferulic Acid, Hyaluronic Acid, Niacinamide, Zinc PCA, Panthenol',
      howToUse: 'Apply 3-4 drops on cleansed face every morning. Follow with moisturiser and SPF.',
      variants: [{ id: 101, name: '30ml', price: 799 }, { id: 102, name: '50ml', price: 1199 }]
    },
    {
      id: 2, handle: 'hydra-boost-moisturizer',
      title: 'Hydra Boost Moisturizer',
      type: 'Moisturizers', collection: 'moisturizers',
      price: 649, comparePrice: null,
      skinType: 'Dry / Normal',
      benefits: ['Deep Hydration', 'Plumping', 'Barrier Repair'],
      rating: 4.7, reviewCount: 184,
      emoji: '🌸', tags: ['hydration'],
      img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop',
      description: 'Rich yet lightweight moisturiser with Ceramides, Peptides, and Centella Asiatica. Restores the skin barrier, locks in moisture for 72 hours, and visibly plumps fine lines.',
      ingredients: 'Aqua, Ceramide NP, Ceramide AP, Hyaluronic Acid, Centella Asiatica, Peptide Complex, Squalane',
      howToUse: 'Apply morning and night after serum. Gently massage into face and neck using upward strokes.',
      variants: [{ id: 201, name: '50ml', price: 649 }, { id: 202, name: '100ml', price: 1099 }]
    },
    {
      id: 3, handle: 'spf-50-sunscreen',
      title: 'SPF 50 PA++++ Sunscreen',
      type: 'Sunscreens', collection: 'sunscreens',
      price: 549, comparePrice: 699,
      skinType: 'All Skin Types',
      benefits: ['UV Protection', 'Non-greasy', 'Lightweight'],
      rating: 4.8, reviewCount: 312,
      emoji: '☀️', tags: ['new', 'spf'],
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop',
      description: 'Broad-spectrum SPF 50 sunscreen with no white cast. Hybrid formula with Zinc Oxide and Tinosorb S protects against UVA/UVB while the Niacinamide brightens and Hyaluronic Acid hydrates.',
      ingredients: 'Zinc Oxide, Tinosorb S, Niacinamide, Hyaluronic Acid, Vitamin E, Aloe Vera Extract',
      howToUse: 'Apply generously as the last step of morning skincare. Reapply every 2 hours when outdoors.',
      variants: [{ id: 301, name: '50g', price: 549 }]
    },
    {
      id: 4, handle: 'retinol-night-cream',
      title: 'Retinol Night Repair Cream',
      type: 'Night Creams', collection: 'night-creams',
      price: 899, comparePrice: null,
      skinType: 'Mature / Dry',
      benefits: ['Anti-aging', 'Wrinkle Reduction', 'Firming'],
      rating: 4.6, reviewCount: 97,
      emoji: '🌙', tags: ['anti-aging'],
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop',
      description: 'Encapsulated Retinol (0.3%) with Bakuchiol for a gentle yet effective anti-aging treatment. Reduces the appearance of fine lines, firms skin, and improves texture overnight.',
      ingredients: 'Retinol (Encapsulated, 0.3%), Bakuchiol, Peptide Complex, Shea Butter, Ceramides, Niacinamide',
      howToUse: 'Apply pea-sized amount on cleansed face at night. Start 2-3 times per week, increase as tolerated.',
      variants: [{ id: 401, name: '50ml', price: 899 }]
    },
    {
      id: 5, handle: 'niacinamide-face-wash',
      title: 'Niacinamide Clarifying Face Wash',
      type: 'Face Wash', collection: 'face-wash',
      price: 349, comparePrice: 449,
      skinType: 'Oily / Acne-prone',
      benefits: ['Pore Minimising', 'Oil Control', 'Gentle Cleanse'],
      rating: 4.7, reviewCount: 156,
      emoji: '🫧', tags: ['new'],
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop',
      description: 'SLS-free gel cleanser with 10% Niacinamide and Salicylic Acid. Deeply cleanses pores, controls sebum, and refines skin texture without stripping.',
      ingredients: 'Aqua, Niacinamide 10%, Salicylic Acid 0.5%, Zinc PCA, Panthenol, Allantoin',
      howToUse: 'Wet face, apply and lather gently for 30 seconds. Rinse thoroughly. Use twice daily.',
      variants: [{ id: 501, name: '100ml', price: 349 }]
    },
    {
      id: 6, handle: 'lip-care-balm',
      title: 'Tinted Lip Care Balm SPF15',
      type: 'Lip Care', collection: 'lip-care',
      price: 299, comparePrice: null,
      skinType: 'All',
      benefits: ['Deep Nourishment', 'SPF Protection', 'Tinted Glow'],
      rating: 4.8, reviewCount: 203,
      emoji: '💋', tags: ['bestseller'],
      img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop',
      description: 'Luxuriously nourishing tinted lip balm with Shea Butter, Vitamin E, and SPF 15. Provides a sheer rosy tint while deeply conditioning dry, chapped lips.',
      ingredients: 'Shea Butter, Vitamin E, Castor Oil, Beeswax, Titanium Dioxide (SPF15), Natural Rose Pigment',
      howToUse: 'Apply liberally throughout the day. Reapply after eating or drinking.',
      variants: [{ id: 601, name: 'Rose', price: 299 }, { id: 602, name: 'Nude', price: 299 }, { id: 603, name: 'Berry', price: 299 }]
    },
    {
      id: 7, handle: 'glow-ritual-kit',
      title: 'Glow Ritual Beauty Kit',
      type: 'Beauty Kits', collection: 'beauty-kits',
      price: 1799, comparePrice: 2247,
      skinType: 'All Skin Types',
      benefits: ['Complete Routine', 'Best Value', 'Gift Ready'],
      rating: 4.9, reviewCount: 89,
      emoji: '✨', tags: ['bestseller', 'bundle'],
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80&auto=format&fit=crop',
      description: 'The ultimate skincare starter kit: Vitamin C Serum + Hydra Boost Moisturizer + SPF 50 Sunscreen. Thoughtfully curated for a complete morning routine. Comes in a luxury gift box.',
      ingredients: 'See individual products',
      howToUse: 'AM Routine: Vitamin C Serum → Moisturizer → Sunscreen.',
      variants: [{ id: 701, name: 'Standard', price: 1799 }]
    },
    {
      id: 8, handle: 'hyaluronic-acid-serum',
      title: 'Multi-Molecular Hyaluronic Serum',
      type: 'Face Serums', collection: 'face-serums',
      price: 699, comparePrice: 899,
      skinType: 'Dry / All',
      benefits: ['Plumping', '72hr Hydration', 'Dewy Glow'],
      rating: 4.8, reviewCount: 178,
      emoji: '💦', tags: ['hydration', 'new'],
      img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80&auto=format&fit=crop',
      img2: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop',
      description: 'Three molecular weights of Hyaluronic Acid hydrate skin at different depths for a visibly plumper, bouncier complexion. With Tremella Mushroom for extra moisture retention.',
      ingredients: 'Aqua, Sodium Hyaluronate (3 molecular weights), Tremella Fuciformis Extract, Panthenol, Beta-Glucan',
      howToUse: 'Apply 3-4 drops on damp skin before moisturiser. Use AM and PM.',
      variants: [{ id: 801, name: '30ml', price: 699 }]
    }
  ],

  collections: [
    { handle: 'face-serums', title: 'Face Serums', emoji: '💧', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop' },
    { handle: 'moisturizers', title: 'Moisturizers', emoji: '🌸', img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80&auto=format&fit=crop' },
    { handle: 'sunscreens', title: 'Sunscreens', emoji: '☀️', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop', badge: 'New' },
    { handle: 'night-creams', title: 'Night Creams', emoji: '🌙', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop' },
    { handle: 'face-wash', title: 'Face Wash', emoji: '🫧', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&auto=format&fit=crop' },
    { handle: 'lip-care', title: 'Lip Care', emoji: '💋', img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80&auto=format&fit=crop' },
    { handle: 'beauty-kits', title: 'Beauty Kits', emoji: '✨', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&auto=format&fit=crop', badge: 'Bestseller' },
    { handle: 'best-sellers', title: 'Best Sellers', emoji: '🏆', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop' }
  ],

  reviews: [
    { productId: 1, author: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'This serum completely transformed my skin in just 2 weeks. My pigmentation is visibly reduced and my skin glows like never before!', product: 'Vitamin C Serum', verified: true, avatar: 'P', color: '#D4AF37' },
    { productId: 2, author: 'Anika Gupta', city: 'Delhi', rating: 5, text: 'The moisturizer is absolutely divine. Lightweight yet deeply nourishing — perfect for my sensitive skin. No breakouts, no irritation.', product: 'Hydra Boost Moisturizer', verified: true, avatar: 'A', color: '#E57373' },
    { productId: 3, author: 'Riya Kapoor', city: 'Bangalore', rating: 5, text: "I've tried countless sunscreens. This one doesn't leave a white cast and protects all day. The finish is matte — game changer!", product: 'SPF 50 Sunscreen', verified: true, avatar: 'R', color: '#42A5F5' },
    { productId: 4, author: 'Shreya Nair', city: 'Chennai', rating: 5, text: 'The retinol cream is gentle enough for beginners but effective enough for results. My fine lines have noticeably softened.', product: 'Retinol Night Cream', verified: true, avatar: 'S', color: '#66BB6A' },
    { productId: 1, author: 'Neha Singhania', city: 'Kolkata', rating: 5, text: 'Worth every rupee! My skin tone is so much more even. I get compliments constantly about my glow now.', product: 'Vitamin C Serum', verified: true, avatar: 'N', color: '#AB47BC' }
  ],

  igPosts: [
    { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80&auto=format&fit=crop', likes: '3.2k', caption: 'Morning glow ✨' },
    { img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80&auto=format&fit=crop', likes: '2.8k', caption: 'Skincare Sunday 🌿' },
    { img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80&auto=format&fit=crop', likes: '4.1k', caption: 'New arrivals 🛍️' },
    { img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80&auto=format&fit=crop', likes: '1.9k', caption: 'Self care ritual ✦' },
    { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80&auto=format&fit=crop', likes: '3.6k', caption: 'Glow from within' },
    { img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80&auto=format&fit=crop', likes: '2.3k', caption: 'LUXÉ favorites' }
  ],

  faqs: [
    { category: 'Products', q: 'Are your products suitable for sensitive skin?', a: 'Yes! All LUXÉ Beauty products are dermatologist tested and formulated to be gentle. We avoid harsh sulfates, synthetic fragrances, and parabens. We recommend a patch test before first use.' },
    { category: 'Products', q: 'Are your products cruelty-free?', a: 'Absolutely. We are 100% cruelty-free and never test on animals. All ingredients are ethically sourced and we are working towards full vegan certification.' },
    { category: 'Products', q: 'How long until I see results?', a: 'Most customers report visible improvements within 2–4 weeks of consistent daily use. For concerns like pigmentation and fine lines, allow 6–8 weeks for optimal results.' },
    { category: 'Shipping', q: 'How long does delivery take?', a: 'Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune): 2–3 business days. All other locations: 4–6 business days. Express delivery available at checkout.' },
    { category: 'Shipping', q: 'Do you offer free shipping?', a: 'Yes! Orders above ₹999 qualify for free standard shipping across India. Express shipping has a flat fee of ₹99.' },
    { category: 'Returns', q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you\'re not completely satisfied with your purchase, contact us for a full refund or exchange. Product must be in original, unused condition.' },
    { category: 'Returns', q: 'How do I initiate a return?', a: 'Email us at returns@luxebeauty.in with your order number and reason. We\'ll arrange a pickup within 48 hours and process your refund within 5–7 business days.' },
    { category: 'Account', q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking link via email and SMS. You can also track from your account dashboard under "My Orders".' },
    { category: 'Account', q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order is processed and cannot be changed. Contact us immediately at support@luxebeauty.in.' }
  ]
};
