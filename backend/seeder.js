require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const sampleProducts = [
  {
    name: "Midnight Silk Dress",
    description: "Hand-designed flowing silk with signature drape and subtle shimmer",
    price: 8999,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800"
    ],
    category: "Dresses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Midnight Blue", "Emerald"]
  },
  {
    name: "Ember Oversized Blazer",
    description: "Tailored wool blend with gold button accents and structured shoulders",
    price: 6499,
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800"
    ],
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Black", "Charcoal"]
  },
  // Add 4–6 more of your real designs here...
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding');

    // Optional: clear existing data (uncomment if you want fresh start)
    // await Product.deleteMany({});

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${inserted.length} products successfully!`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();