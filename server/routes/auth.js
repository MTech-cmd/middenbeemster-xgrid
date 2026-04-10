const express = require('express');
const router = express.Router();
const pool = require('../db');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supergeheim'; // later .env

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Geen token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Ongeldig token' });
  }
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🔒 check input
    if (!username || !password) {
      return res.status(400).json({ error: 'Vul alles in' });
    }

    const conn = await pool.getConnection();

    const [rows] = await conn.query(
      'SELECT id, username, passwordHash, role FROM UserAdmin WHERE username = ?',
      [username]
    );

    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User niet gevonden' });
    }

    const user = rows;

    // 🔐 verify password
    const valid = await argon2.verify(user.passwordHash, password);

    if (!valid) {
      return res.status(401).json({ error: 'Verkeerd wachtwoord' });
    }

    // 🎟️ token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/admin', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Geen toegang' });
  }

  res.json({ message: 'Welkom admin!' });
});

module.exports = router;