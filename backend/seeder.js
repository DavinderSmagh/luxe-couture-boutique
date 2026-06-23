require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const sampleProducts = [
  // ─── CUSTOM SUITS ─────────────────────────────────────
  {
    name: 'Bespoke Tailored Suit',
    description:
      'Custom-fitted suit crafted to your exact measurements. Premium wool blend with hand-finished details and structured silhouette.',
    price: 14999,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ],
    category: 'Custom Suits',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    colors: ['Navy', 'Charcoal', 'Black'],
    isCustom: true,
  },
  {
    name: 'Executive Power Suit',
    description:
      'Sharp, structured silhouette for the modern professional woman. Made-to-order with premium lining and peak lapels.',
    price: 16999,
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
    ],
    category: 'Custom Suits',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    colors: ['Black', 'Navy', 'Burgundy'],
    isCustom: true,
  },
  {
    name: 'Classic Three-Piece Suit',
    description:
      'Timeless three-piece suit with waistcoat. Hand-tailored in premium Italian wool for weddings and formal events.',
    price: 18999,
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
    ],
    category: 'Custom Suits',
    sizes: ['S', 'M', 'L', 'XL', 'Custom'],
    colors: ['Charcoal', 'Navy', 'Midnight Black'],
    isCustom: true,
  },

  // ─── KURTAS & ETHNIC ──────────────────────────────────
  {
    name: 'Embroidered Silk Kurta',
    description:
      'Hand-embroidered silk kurta with intricate zari work. Perfect for festive occasions and celebrations.',
    price: 6499,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    ],
    category: 'Kurtas & Ethnic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Gold', 'Ivory'],
  },
  {
    name: 'Anarkali Kurta Set',
    description:
      'Flowing anarkali kurta with matching dupatta. Lightweight georgette with delicate hand embroidery.',
    price: 8999,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80',
    ],
    category: 'Kurtas & Ethnic',
    sizes: ['S', 'M', 'L'],
    colors: ['Rose Pink', 'Emerald', 'Royal Blue'],
  },
  {
    name: 'Block Print Cotton Kurta',
    description:
      'Artisan block-printed cotton kurta with straight cut. Comfortable everyday ethnic wear with traditional charm.',
    price: 3499,
    images: [
      'https://images.unsplash.com/photo-1583391734529-41e944915591?w=800&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80',
    ],
    category: 'Kurtas & Ethnic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Indigo', 'Rust', 'Cream'],
  },
  {
    name: 'Custom Bridal Lehenga Kurta',
    description:
      'Made-to-order bridal lehenga kurta with heavy embroidery. Consultation included for perfect fit and design.',
    price: 24999,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80',
    ],
    category: 'Kurtas & Ethnic',
    sizes: ['Custom'],
    colors: ['Maroon', 'Gold', 'Rose Pink'],
    isCustom: true,
  },

  // ─── LADIES WEAR ──────────────────────────────────────
  {
    name: 'Designer Co-ord Set',
    description:
      'Contemporary co-ord set with crop top and wide-leg pants. Effortlessly chic for brunches and casual outings.',
    price: 5499,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    ],
    category: 'Ladies Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blush', 'Black', 'Cream'],
  },
  {
    name: 'Silk Palazzo Set',
    description:
      'Elegant silk palazzo set with embroidered kurta. Comfort meets sophistication for everyday elegance.',
    price: 7299,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    category: 'Ladies Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Dusty Mauve', 'Forest Green', 'Burgundy'],
  },
  {
    name: 'Linen Summer Dress',
    description:
      'Breathable linen dress with subtle pleats and side pockets. Perfect for warm days and resort wear.',
    price: 4299,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    category: 'Ladies Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Beige', 'Soft Peach'],
  },

  // ─── HANDMADE DRESSES ────────────────────────────────
  {
    name: 'Midnight Silk Gown',
    description:
      'Hand-stitched flowing silk gown with signature drape and subtle shimmer. Perfect for evening occasions.',
    price: 8999,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    ],
    category: 'Handmade Dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Midnight Blue', 'Emerald'],
  },
  {
    name: 'Rose Embroidered Anarkali',
    description:
      'Delicately hand-embroidered anarkali with floral motifs and flared silhouette. A timeless festive piece.',
    price: 12499,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80',
    ],
    category: 'Handmade Dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Rose Pink', 'Ivory', 'Dusty Mauve'],
  },
  {
    name: 'Ivory Lace Midi Dress',
    description:
      'Handcrafted lace midi dress with scalloped edges and a fitted bodice. Elegance redefined.',
    price: 7499,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    category: 'Handmade Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Champagne', 'Soft Peach'],
  },
  {
    name: 'Velvet Emerald Maxi',
    description:
      'Luxurious hand-draped velvet maxi dress with deep neckline. A statement piece for special nights.',
    price: 10999,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ],
    category: 'Handmade Dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Emerald', 'Burgundy', 'Midnight Black'],
  },

  // ─── WOMEN'S ESSENTIALS ──────────────────────────────
  {
    name: 'Handwoven Silk Scarf',
    description:
      'Premium handwoven silk scarf with artisan-dyed patterns. A versatile accessory for any outfit.',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    category: "Women's Essentials",
    sizes: ['One Size'],
    colors: ['Blush', 'Ocean Blue', 'Burnt Sienna'],
  },
  {
    name: 'Leather Tote Bag',
    description:
      'Hand-stitched full-grain leather tote with gold-tone hardware. Spacious, elegant, and durable.',
    price: 4999,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    category: "Women's Essentials",
    sizes: ['One Size'],
    colors: ['Tan', 'Black', 'Burgundy'],
  },
  {
    name: 'Pearl Drop Earrings',
    description:
      'Handcrafted freshwater pearl earrings with 18k gold-plated settings. Subtle luxury for everyday wear.',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    ],
    category: "Women's Essentials",
    sizes: ['One Size'],
    colors: ['Gold & Pearl', 'Silver & Pearl'],
  },
  {
    name: 'Cashmere Wrap Shawl',
    description:
      'Ultra-soft pure cashmere wrap shawl, hand-finished with fringed edges. Warmth meets sophistication.',
    price: 5999,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    category: "Women's Essentials",
    sizes: ['One Size'],
    colors: ['Camel', 'Charcoal', 'Cream'],
  },
  {
    name: 'Premium Cotton Saree Blouse',
    description:
      'Hand-stitched cotton blouse with adjustable fit. Essential pairing for your saree collection.',
    price: 1999,
    images: [
      'https://images.unsplash.com/photo-1583391734529-41e944915591?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    ],
    category: "Women's Essentials",
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Maroon'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${inserted.length} products successfully!`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
