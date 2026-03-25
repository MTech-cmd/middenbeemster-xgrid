const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // toevoegen

const app = express();

// Security headers (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "http://localhost:3000"],
      connectSrc: ["'self'", "http://localhost:3000"],
    },
  })
);

app.use(cors()); // voor vue
app.use(express.json());

// Routes
const contentRoutes = require('./routes/content');
const authRoutes = require('./routes/auth');

app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('API werkt 🚀');
});

// Server starten
app.listen(3000, () => {
  console.log('API draait op http://localhost:3000');
});