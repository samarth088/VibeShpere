const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const post = new Post({
      user: req.user.id,
      content,
      imageUrl
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
