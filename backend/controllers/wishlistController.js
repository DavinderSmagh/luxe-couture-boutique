const Wishlist = require('../models/Wishlist');

// @desc    Get user's wishlist (populated with product details)
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      'products',
      'name price images category inStock'
    );

    if (!wishlist) {
      return res.json({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    console.error('Error in getWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle product in wishlist (add if not present, remove if present)
// @route   POST /api/wishlist
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Please provide productId' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [productId],
      });
      await wishlist.save();
      return res.status(201).json({ message: 'Added to wishlist', wishlist, added: true });
    }

    const index = wishlist.products.findIndex(
      (id) => id.toString() === productId
    );

    if (index > -1) {
      // Remove from wishlist
      wishlist.products.splice(index, 1);
      await wishlist.save();
      return res.json({ message: 'Removed from wishlist', wishlist, added: false });
    } else {
      // Add to wishlist
      wishlist.products.push(productId);
      await wishlist.save();
      return res.status(201).json({ message: 'Added to wishlist', wishlist, added: true });
    }
  } catch (error) {
    console.error('Error in toggleWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove a specific product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== req.params.productId
    );

    await wishlist.save();
    res.json({ message: 'Removed from wishlist', wishlist });
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
};
