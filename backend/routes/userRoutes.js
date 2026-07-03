const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authenticated user
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin
router.get('/', protect, admin, getAllUsers);

module.exports = router;
