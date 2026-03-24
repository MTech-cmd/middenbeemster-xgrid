const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // nodig voor Vue
app.use(express.json());

const contentRoutes = require('./routes/content');
const authRoutes = require('./routes/auth');

app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('API draait op http://localhost:3000');
});