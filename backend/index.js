const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // ✅ Route file

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Home route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

// ✅ All user routes: /api/register, /api/login etc.
app.use('/api', userRoutes);

// ✅ Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
