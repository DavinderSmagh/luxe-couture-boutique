const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const contact = new Contact({ name, email, subject, message });
    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error in submitContact:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all contact submissions (admin)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
};
