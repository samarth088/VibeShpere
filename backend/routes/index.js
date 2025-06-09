const express = require('express');
const router = express.Router();

// Sample API route
router.get('/hello', (req, res) => {
  res.json({ message: "Hello from VibeSphere API!" });
});

module.exports = router;
