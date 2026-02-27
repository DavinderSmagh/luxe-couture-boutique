const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./modules/product');

dotenv.config();

const sampleProducts = [
  {
    name: "Midnight Silk Dress",
    description: "Hand-designed flowing silk with signature drape",
    price: 8999,
    images: ["https://picsum.photos/id/1015/600/800", "https://picsum.photos/id/102/600/800"],
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#8B0000", "#C0C0C0"]
  },
  {
    name: "Ember Oversized Blazer",
    description: "Tailored wool blend with gold button detail",
    price: 6499,
    images: ["https://picsum.photos/id/1060/600/800", "https://picsum.photos/id/1074/600/800"],
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFD700"]
  },
  // Add 4 more of your real designs here...
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('✅ Sample products seeded!');
  process.exit();
};

seedDB();