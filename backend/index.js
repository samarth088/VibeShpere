const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ CORS: Allow only your frontend
app.use(cors({
  origin: "https://vibeshpere.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Root route (test)
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api', userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
