require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('VibeSphere Backend is running!');
});

const commentRoutes = require('./routes/comment');
app.use('/api/comments', commentRoutes);

const likeRoutes = require('./routes/like');
app.use('/api/likes', likeRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
