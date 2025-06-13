const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

// ✅ CORS: Allow your frontend domain
app.use(cors({
  origin: "https://vibeshpere.vercel.app",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);      // 🔑 Register & Login
app.use('/api/users', userRoutes);     // 👤 Profile, Update, Password
app.use('/api/posts', postRoutes);     // 📝 Post Routes
app.use('/api/comments', commentRoutes); // 💬 Comments

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
