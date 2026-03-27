const express = require('express');
const router = express.Router();
const pool = require('../db');

// alles ophalen
router.get('/', async (req, res) => {
  const conn = await pool.getConnection();
  const data = await conn.query('SELECT * FROM Content');
  conn.release();
  res.json(data);
});

// ophalen op ApiName (handig!)
router.get('/:apiName', async (req, res) => {
  const conn = await pool.getConnection();
  const data = await conn.query(
    'SELECT * FROM Content WHERE ApiName = ?',
    [req.params.apiName]
  );
  conn.release();
  res.json(data);
});

// toevoegen
router.post('/', async (req, res) => {
  const { Location, ApiName, Content, Type, PublishedBy } = req.body;

  const conn = await pool.getConnection();
  const result = await conn.query(
    `INSERT INTO Content (Location, ApiName, Content, Type, PublishedBy)
     VALUES (?, ?, ?, ?, ?)`,
    [Location, ApiName, Content, Type, PublishedBy]
  );
  conn.release();

  res.json(result);
});

module.exports = router;