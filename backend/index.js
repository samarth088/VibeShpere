const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this route for homepage
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api', userRoutes); // All user routes now at /api/signup, /api/login

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
