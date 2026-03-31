const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const conn = await pool.getConnection();

    const rows = await conn.query(
      'SELECT * FROM UserAdmin WHERE username = ?',
      [username]
    );

    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User niet gevonden' });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: 'Verkeerd wachtwoord' });
    }

    res.json({
      message: 'Login success',
      user: user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;