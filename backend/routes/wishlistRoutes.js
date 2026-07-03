const express = require('express');
const router = express.Router();
const {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// All wishlist routes require authentication
router.get('/', protect, getWishlist);
router.post('/', protect, toggleWishlist);
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
