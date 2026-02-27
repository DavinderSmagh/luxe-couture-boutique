const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('product', productSchema);