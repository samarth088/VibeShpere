const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    const post = new Post({ content, user: userId });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error("Create Post Error:", err.message);
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to unlike post" });
  }
};
