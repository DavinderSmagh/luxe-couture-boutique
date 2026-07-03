const express = require('express');
const router = express.Router();
const { addSubscriber, getSubscribers } = require('../controllers/subscriberController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to subscribe
router.post('/', addSubscriber);

// Admin route to view all subscribers
router.get('/', protect, admin, getSubscribers);

module.exports = router;
