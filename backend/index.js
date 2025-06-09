require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', routes); // All routes prefixed with /api

app.get('/', (req, res) => {
  res.send('VibeSphere Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
