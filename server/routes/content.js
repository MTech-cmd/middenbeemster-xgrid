const express = require('express');
const router = express.Router();
const pool = require('../db');
const {
  defaultNavbarState,
  ensureMediaSchema,
  loadPublicNavbarState,
} = require('../mediaStore');

const schemaReady = ensureMediaSchema(pool);

router.get('/navbar', async (req, res) => {
  try {
    await schemaReady;
    const navbar = await loadPublicNavbarState(pool);
    res.json(navbar || defaultNavbarState);
  } catch (error) {
    console.error('Fout bij ophalen publieke navbar:', error);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

router.get('/', async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const data = await conn.query('SELECT * FROM Content');
    res.json(data);
  } finally {
    if (conn) conn.release();
  }
});

router.get('/:location', async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const data = await conn.query(
      'SELECT * FROM Content WHERE Location = ? ORDER BY ApiName ASC',
      [req.params.location]
    );
    res.json(data);
  } finally {
    if (conn) conn.release();
  }
});

router.post('/', async (req, res) => {
  const { Location, ApiName, Content, Type, PublishedBy, MediaId } = req.body;

  let conn;

  try {
    await schemaReady;
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO Content (Location, ApiName, Content, Type, MediaId, PublishedBy)
       VALUES (?, ?, ?, ?, ?, ?)` ,
      [Location, ApiName, Content, Type, MediaId || null, PublishedBy]
    );
    res.json(result);
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;