const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

router.get('/hello', (req, res) => {
  res.json({ message: "Hello from VibeSphere API!" });
});

router.use('/auth', authRoutes);

module.exports = router;
