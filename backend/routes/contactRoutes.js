const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public
router.post('/', submitContact);

// Admin — view all contact submissions
router.get('/', protect, admin, getAllContacts);

module.exports = router;
