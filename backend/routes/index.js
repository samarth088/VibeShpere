const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const postRoutes = require('./post'); // NEW

router.get('/hello', (req, res) => {
  res.json({ message: "Hello from VibeSphere API!" });
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/posts', postRoutes); // NEW

module.exports = router;
