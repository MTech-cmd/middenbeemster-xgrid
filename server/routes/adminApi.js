const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ── Multer setup ────────────────────────────────────────
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Alleen afbeeldingen toegestaan'));
  },
});

// ── Pages ───────────────────────────────────────────────

// GET /api/admin/pages
router.get('/pages', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const pages = await conn.query(`
      SELECT p.*, u.username AS publishedByName
      FROM Pages p
      LEFT JOIN UserAdmin u ON u.id = p.PublishedBy
    `);
    res.json(pages);
  } catch (err) {
    console.error('Fout bij ophalen pages:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/admin/pages/:id  — inclusief Content rijen
router.get('/pages/:id', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM Pages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Pagina niet gevonden' });

    const page = rows[0];

    // Haal alle Content rijen op voor deze pagina
    const contentRows = await conn.query(
      'SELECT * FROM Content WHERE page_id = ? ORDER BY id',
      [page.id]
    );

    // Zet om naar { ApiName: { value, type, location, id } }
    // ApiName is de sleutel die het Vue-component gebruikt (bijv. 'hero_title', 'hero_image')
    page.content = contentRows.reduce((acc, row) => {
      acc[row.ApiName] = {
        id: row.id,
        value: row.Content,
        type: row.Type,
        location: row.Location,
      };
      return acc;
    }, {});

    res.json(page);
  } catch (err) {
    console.error('Fout bij ophalen page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/admin/pages
router.post('/pages', async (req, res) => {
  const { template, routing } = req.body;
  // PublishedBy komt uit de ingelogde gebruiker (req.user.id via auth middleware)
  const publishedBy = req.user?.id;
  if (!template || !routing) return res.status(400).json({ error: 'template en routing zijn verplicht' });
  if (!publishedBy) return res.status(401).json({ error: 'Niet ingelogd' });

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO Pages (Template, Routing, PublishedBy) VALUES (?, ?, ?)',
      [template, routing, publishedBy]
    );
    res.status(201).json({ id: Number(result.insertId), template, routing });
  } catch (err) {
    console.error('Fout bij aanmaken page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// PUT /api/admin/pages/:id  — metadata
router.put('/pages/:id', async (req, res) => {
  const { template, routing } = req.body;
  const lastEditedBy = req.user?.id;
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      'UPDATE Pages SET Template = ?, Routing = ?, lastEditedBy = ? WHERE id = ?',
      [template, routing, lastEditedBy, req.params.id]
    );
    res.json({ message: 'Pagina bijgewerkt' });
  } catch (err) {
    console.error('Fout bij bijwerken page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// PUT /api/admin/pages/:id/content
// Body: { content: { hero_title: 'Welkom', hero_image: '/uploads/abc.jpg', ... } }
router.put('/pages/:id/content', async (req, res) => {
  const { content } = req.body;
  const lastEditedBy = req.user?.id;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'content object is verplicht' });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const [apiName, value] of Object.entries(content)) {
      if (value === null || value === '') continue;

      // Bepaal type op basis van waarde
      const type = apiName.includes('image') ? 'image'
                 : apiName.includes('video') ? 'video'
                 : 'text';

      // Upsert: als ApiName al bestaat voor deze pagina, update; anders insert
      const existing = await conn.query(
        'SELECT id FROM Content WHERE page_id = ? AND ApiName = ?',
        [req.params.id, apiName]
      );

      if (existing.length > 0) {
        await conn.query(
          'UPDATE Content SET Content = ?, Type = ?, lastEditedBy = ? WHERE id = ?',
          [value, type, lastEditedBy, existing[0].id]
        );
      } else {
        await conn.query(
          'INSERT INTO Content (page_id, Location, ApiName, Content, Type, PublishedBy) VALUES (?, ?, ?, ?, ?, ?)',
          [req.params.id, req.params.id, apiName, value, type, lastEditedBy]
        );
      }
    }

    // Update Pages.UpdatedAt en lastEditedBy
    await conn.query(
      'UPDATE Pages SET lastEditedBy = ? WHERE id = ?',
      [lastEditedBy, req.params.id]
    );

    await conn.commit();
    res.json({ message: 'Content opgeslagen' });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error('Fout bij opslaan content:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// DELETE /api/admin/pages/:id
router.delete('/pages/:id', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // Content wordt automatisch verwijderd via ON DELETE CASCADE
    await conn.query('DELETE FROM Pages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pagina verwijderd' });
  } catch (err) {
    console.error('Fout bij verwijderen page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// ── Image upload ────────────────────────────────────────

// POST /api/admin/upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Geen bestand ontvangen' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Alleen afbeeldingen toegestaan') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;