const Subscriber = require('../models/Subscriber');

// @desc    Add a new subscriber
// @route   POST /api/subscribe
// @access  Public
const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Already subscribed!' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Successfully subscribed!', subscriber });
  } catch (error) {
    console.error('Error in addSubscriber:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all subscribers (Admin only)
// @route   GET /api/subscribe
// @access  Private/Admin
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Error in getSubscribers:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { addSubscriber, getSubscribers };
