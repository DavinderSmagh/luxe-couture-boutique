const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createOrder);

// User routes (authenticated)
router.get('/my/orders', protect, getMyOrders);

// Admin routes
router.get('/', protect, admin, getAllOrders);

// Must be after /my/orders to avoid route conflict
router.get('/:id', getOrderById);

// Admin status update routes
router.put('/:id/pay', protect, admin, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
