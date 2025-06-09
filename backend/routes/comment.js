const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a comment
router.post('/:postId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user.id,
      content
    });
    res.status(201).json(await comment.populate('user', 'username'));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment (only the user who made it)
router.delete('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (String(comment.user) !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
