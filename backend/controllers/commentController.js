const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    const comment = new Comment({ post: postId, user: userId, content });
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
