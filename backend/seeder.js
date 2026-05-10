require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const sampleProducts = [
  // ─── HANDMADE DRESSES ────────────────────────────────
  {
    name: "Midnight Silk Gown",
    description: "Hand-stitched flowing silk gown with signature drape and subtle shimmer. Perfect for evening occasions.",
    price: 8999,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
    ],
    category: "Handmade Dresses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Midnight Blue", "Emerald"]
  },
  {
    name: "Rose Embroidered Anarkali",
    description: "Delicately hand-embroidered anarkali with floral motifs and flared silhouette. A timeless festive piece.",
    price: 12499,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=800&q=80"
    ],
    category: "Handmade Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Rose Pink", "Ivory", "Dusty Mauve"]
  },
  {
    name: "Ivory Lace Midi Dress",
    description: "Handcrafted lace midi dress with scalloped edges and a fitted bodice. Elegance redefined.",
    price: 7499,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
    ],
    category: "Handmade Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne", "Soft Peach"]
  },
  {
    name: "Velvet Emerald Maxi",
    description: "Luxurious hand-draped velvet maxi dress with deep neckline. A statement piece for special nights.",
    price: 10999,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
    ],
    category: "Handmade Dresses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Emerald", "Burgundy", "Midnight Black"]
  },

  // ─── WOMEN'S ESSENTIALS ──────────────────────────────
  {
    name: "Handwoven Silk Scarf",
    description: "Premium handwoven silk scarf with artisan-dyed patterns. A versatile accessory for any outfit.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    category: "Women's Essentials",
    sizes: ["One Size"],
    colors: ["Blush", "Ocean Blue", "Burnt Sienna"]
  },
  {
    name: "Leather Tote Bag",
    description: "Hand-stitched full-grain leather tote with gold-tone hardware. Spacious, elegant, and durable.",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    ],
    category: "Women's Essentials",
    sizes: ["One Size"],
    colors: ["Tan", "Black", "Burgundy"]
  },
  {
    name: "Pearl Drop Earrings",
    description: "Handcrafted freshwater pearl earrings with 18k gold-plated settings. Subtle luxury for everyday wear.",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80"
    ],
    category: "Women's Essentials",
    sizes: ["One Size"],
    colors: ["Gold & Pearl", "Silver & Pearl"]
  },
  {
    name: "Cashmere Wrap Shawl",
    description: "Ultra-soft pure cashmere wrap shawl, hand-finished with fringed edges. Warmth meets sophistication.",
    price: 5999,
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ],
    category: "Women's Essentials",
    sizes: ["One Size"],
    colors: ["Camel", "Charcoal", "Cream"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding');

    // Clear existing products and insert fresh data
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${inserted.length} products successfully!`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();