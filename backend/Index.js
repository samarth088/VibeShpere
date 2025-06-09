require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('VibeSphere Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
