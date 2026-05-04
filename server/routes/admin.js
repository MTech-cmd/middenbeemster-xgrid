const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/admin/pages — alle pagina's ophalen
router.get('/pages', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const data = await conn.query('SELECT * FROM Pages');
    res.json(data);
  } catch (err) {
    console.error('Fout bij ophalen pages:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/admin/pages/:id — één pagina ophalen
router.get('/pages/:id', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const data = await conn.query('SELECT * FROM Pages WHERE id = ?', [req.params.id]);
    if (data.length === 0) {
      return res.status(404).json({ error: 'Pagina niet gevonden' });
    }
    res.json(data[0]);
  } catch (err) {
    console.error('Fout bij ophalen page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/admin/pages — nieuwe pagina aanmaken
router.post('/pages', async (req, res) => {
  const { title, route, active } = req.body;
  if (!title || !route) {
    return res.status(400).json({ error: 'title en route zijn verplicht' });
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO Pages (title, route, active) VALUES (?, ?, ?)',
      [title, route, active ?? true]
    );
    res.status(201).json({ id: Number(result.insertId), title, route, active: active ?? true });
  } catch (err) {
    console.error('Fout bij aanmaken page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// PUT /api/admin/pages/:id — pagina bijwerken
router.put('/pages/:id', async (req, res) => {
  const { title, route, active } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      'UPDATE Pages SET title = ?, route = ?, active = ? WHERE id = ?',
      [title, route, active, req.params.id]
    );
    res.json({ message: 'Pagina bijgewerkt' });
  } catch (err) {
    console.error('Fout bij bijwerken page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// DELETE /api/admin/pages/:id — pagina verwijderen
router.delete('/pages/:id', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM Pages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pagina verwijderd' });
  } catch (err) {
    console.error('Fout bij verwijderen page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;