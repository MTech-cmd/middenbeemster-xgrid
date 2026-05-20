const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Security headers (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'http://localhost:3000'],
      connectSrc: ["'self'", 'http://localhost:3000'],
    },
  })
);

// Static files voor uploads
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'public', 'uploads'))
);

// ── Routes importeren ───────────────────────────────────
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/adminApi');
const {
  router: authRoutes,
  authMiddleware,
} = require('./routes/auth');

// ── Routes registreren ──────────────────────────────────
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);

// Beveilig alle admin routes met JWT auth
app.use('/api/admin', authMiddleware, adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API werkt 🚀');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: `Route niet gevonden: ${req.method} ${req.originalUrl}`,
  });
});

// Algemene error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || 'Interne serverfout',
  });
});

// ── Server starten ──────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API draait op http://localhost:${PORT}`);
});