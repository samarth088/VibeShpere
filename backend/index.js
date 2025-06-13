const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ Middleware: Allow frontend requests from Vercel
app.use(cors({
  origin: "https://vibe-shpere.vercel.app", // ✅ your frontend domain
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Middleware: JSON body parser
app.use(express.json());

// ✅ Root route (health check)
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API routes (auth)
app.use('/api', userRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
