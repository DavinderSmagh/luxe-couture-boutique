const Cart = require('../models/Cart');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price images inStock'
    );

    if (!cart) {
      // Return empty cart if none exists yet
      return res.json({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add item to cart (upserts qty if same product+size+color exists)
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { product, name, image, price, qty = 1, size = 'One Size', color = 'Default' } = req.body;

    if (!product || !name || !image || !price) {
      return res.status(400).json({ message: 'Please provide product, name, image, and price' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        user: req.user._id,
        items: [{ product, name, image, price, qty, size, color }],
      });
    } else {
      // Check if same product+size+color already in cart
      const existingIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === product &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        // Update quantity
        cart.items[existingIndex].qty += qty;
      } else {
        // Add new item
        cart.items.push({ product, name, image, price, qty, size, color });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error in addToCart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.qty = qty;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.deleteOne();
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error in removeCartItem:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.json({ message: 'Cart is already empty' });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error in clearCart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
