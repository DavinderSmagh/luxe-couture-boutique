const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  isCustom: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
