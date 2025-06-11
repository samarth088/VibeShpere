const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Signup Route (MongoDB)
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
  }
});

// Login Route (MongoDB)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
