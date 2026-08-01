const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  defaultNavbarState,
  ensureMediaSchema,
  ensureMediaRecordForUrl,
  listMediaAssets,
  normalizeMediaUrl,
  storeUploadedMedia,
} = require('../mediaStore');

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

const schemaReady = ensureMediaSchema(pool);

const navbarStateDir = path.join(__dirname, '..', 'data');
const navbarStatePath = path.join(navbarStateDir, 'navbar.json');

function ensureNavbarStateDir() {
  if (!fs.existsSync(navbarStateDir)) {
    fs.mkdirSync(navbarStateDir, { recursive: true });
  }
}

function normalizeNavbarState(input = {}) {
  const logo = input.logo || {};
  const items = Array.isArray(input.items) ? input.items : [];

  return {
    logo: {
      imageUrl: typeof logo.imageUrl === 'string' ? logo.imageUrl : '',
      altText: typeof logo.altText === 'string' && logo.altText.trim() ? logo.altText : defaultNavbarState.logo.altText,
      width: Number.isFinite(Number(logo.width)) ? Number(logo.width) : defaultNavbarState.logo.width,
      height: Number.isFinite(Number(logo.height)) ? Number(logo.height) : defaultNavbarState.logo.height,
    },
    items: items
      .map((item, index) => ({
        id: Number.isFinite(Number(item.id)) ? Number(item.id) : index + 1,
        name: typeof item.name === 'string' ? item.name : '',
        link: typeof item.link === 'string' ? item.link : '',
      }))
      .filter(item => item.name.trim() || item.link.trim()),
  };
}

async function readNavbarStateFromDisk() {
  try {
    const raw = fs.readFileSync(navbarStatePath, 'utf8');
    return normalizeNavbarState(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function readNavbarStateFromDb() {
  let conn;

  try {
    await schemaReady;
    conn = await pool.getConnection();
    const settingsRows = await conn.query(
      `SELECT ns.id, ns.LogoMediaId, ns.LogoAltText, ns.LogoWidth, ns.LogoHeight, ma.Url AS logoUrl
       FROM NavbarSettings ns
       LEFT JOIN MediaAsset ma ON ma.id = ns.LogoMediaId
       WHERE ns.id = 1
       LIMIT 1`
    );
    const rows = await conn.query('SELECT id, Name, Link FROM Navbar ORDER BY id ASC');

    if (!settingsRows[0] && rows.length === 0) {
      return null;
    }

    return {
      ...defaultNavbarState,
      logo: {
        imageUrl: settingsRows[0]?.logoUrl || defaultNavbarState.logo.imageUrl,
        altText: settingsRows[0]?.LogoAltText || defaultNavbarState.logo.altText,
        width: settingsRows[0]?.LogoWidth || defaultNavbarState.logo.width,
        height: settingsRows[0]?.LogoHeight || defaultNavbarState.logo.height,
      },
      items: rows.map(row => ({
        id: Number(row.id),
        name: row.Name,
        link: row.Link,
      })),
    };
  } catch (error) {
    console.error('Fout bij lezen navbar uit database:', error);
    return null;
  } finally {
    if (conn) conn.release();
  }
}

async function loadNavbarState() {
  const fromDb = await readNavbarStateFromDb();

  if (fromDb) {
    return fromDb;
  }

  const fromDisk = await readNavbarStateFromDisk();

  if (fromDisk) {
    return fromDisk;
  }

  ensureNavbarStateDir();
  fs.writeFileSync(navbarStatePath, JSON.stringify(defaultNavbarState, null, 2), 'utf8');
  return defaultNavbarState;
}

async function persistNavbarState(state, editorId, writeDisk = true) {
  const normalized = normalizeNavbarState(state);

  let conn;

  try {
    await schemaReady;
    conn = await pool.getConnection();
    await conn.beginTransaction();
    await conn.query('DELETE FROM Navbar');

    const logoMedia = await ensureMediaRecordForUrl(conn, normalized.logo.imageUrl, editorId);

    await conn.query(
      `INSERT INTO NavbarSettings
        (id, LogoMediaId, LogoAltText, LogoWidth, LogoHeight)
       VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         LogoMediaId = VALUES(LogoMediaId),
         LogoAltText = VALUES(LogoAltText),
         LogoWidth = VALUES(LogoWidth),
         LogoHeight = VALUES(LogoHeight)`,
      [
        logoMedia?.id || null,
        normalized.logo.altText,
        normalized.logo.width,
        normalized.logo.height,
      ]
    );

    for (const item of normalized.items) {
      await conn.query(
        'INSERT INTO Navbar (Name, Link, PublishedBy, lastEditedBy) VALUES (?, ?, ?, ?)',
        [item.name, item.link, editorId, editorId]
      );
    }

    await conn.commit();
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }

    throw error;
  } finally {
    if (conn) conn.release();
  }

  if (writeDisk) {
    ensureNavbarStateDir();
    fs.writeFileSync(navbarStatePath, JSON.stringify(normalized, null, 2), 'utf8');
  }

  return normalized;
}

// ── Pages ───────────────────────────────────────────────

// GET /api/admin/navbar
router.get('/navbar', async (req, res) => {
  try {
    const navbar = await loadNavbarState();
    res.json(navbar);
  } catch (err) {
    console.error('Fout bij ophalen navbar:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// PUT /api/admin/navbar
router.put('/navbar', async (req, res) => {
  const editorId = req.user?.id;

  if (!editorId) {
    return res.status(401).json({ error: 'Niet ingelogd' });
  }

  try {
    const navbar = await persistNavbarState(req.body, editorId);
    res.json(navbar);
  } catch (err) {
    console.error('Fout bij opslaan navbar:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// GET /api/admin/pages
router.get('/pages', async (req, res) => {
  const { website } = req.query;
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT id, Template, Routing, PublishedBy, lastEditedBy, CreatedAt, UpdatedAt FROM Pages ORDER BY UpdatedAt DESC, id DESC'
    );

    res.json(rows);
  } catch (err) {
    console.error('Fout bij ophalen pages:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/admin/pages
router.post('/pages', async (req, res) => {
  const { template, routing, website } = req.body;
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

// GET /api/admin/pages/:id  — inclusief Content rijen
router.get('/pages/:id', async (req, res) => {
  let conn;
  try {
    await schemaReady;
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
        mediaId: row.MediaId || null,
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
  const { template, routing, website } = req.body;
  // PublishedBy komt uit de ingelogde gebruiker (req.user.id via auth middleware)
  const publishedBy = req.user?.id;
  if (!template || !routing) return res.status(400).json({ error: 'template en routing zijn verplicht' });
  if (!publishedBy) return res.status(401).json({ error: 'Niet ingelogd' });

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO Pages (Website, Template, Routing, PublishedBy) VALUES (?, ?, ?, ?)',
      [website || 'middenbeemster-smidse', template, routing, publishedBy]
    );
    res.status(201).json({ id: Number(result.insertId), website: website || 'middenbeemster-smidse', template, routing });
  } catch (err) {
    console.error('Fout bij aanmaken page:', err);
    res.status(500).json({ error: 'Interne serverfout' });
  } finally {
    if (conn) conn.release();
  }
});

// PUT /api/admin/pages/:id  — metadata
router.put('/pages/:id', async (req, res) => {
  const { template, routing, website } = req.body;
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
    await schemaReady;
    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const [apiName, value] of Object.entries(content)) {
      if (value === null || value === '') continue;

      // Bepaal type op basis van waarde
      const type = apiName.includes('image') ? 'image'
                 : apiName.includes('video') ? 'video'
                 : 'text';

      const media = type === 'image'
        ? await ensureMediaRecordForUrl(conn, value, lastEditedBy)
        : null;

      // Upsert: als ApiName al bestaat voor deze pagina, update; anders insert
      const existing = await conn.query(
        'SELECT id FROM Content WHERE page_id = ? AND ApiName = ?',
        [req.params.id, apiName]
      );

      if (existing.length > 0) {
        await conn.query(
          'UPDATE Content SET Content = ?, Type = ?, MediaId = ?, lastEditedBy = ? WHERE id = ?',
          [value, type, media?.id || null, lastEditedBy, existing[0].id]
        );
      } else {
        await conn.query(
          'INSERT INTO Content (page_id, Location, ApiName, Content, Type, MediaId, PublishedBy) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [req.params.id, req.params.id, apiName, value, type, media?.id || null, lastEditedBy]
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
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Geen bestand ontvangen' });

  try {
    await schemaReady;
    const media = await storeUploadedMedia(pool, req.file, req.user?.id);
    res.json({ url: media.url, mediaId: media.id });
  } catch (error) {
    console.error('Fout bij opslaan upload metadata:', error);
    res.status(500).json({ error: 'Kon upload metadata niet opslaan' });
  }
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Alleen afbeeldingen toegestaan') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// GET /api/admin/uploads
router.get('/uploads', async (req, res) => {
  try {
    await schemaReady;
    const rows = await listMediaAssets(pool);

    const images = rows.map(row => ({
      filename: row.Filename,
      originalName: row.OriginalName,
      url: normalizeMediaUrl(row.Url),
      size: row.FileSize,
      createdAt: row.CreatedAt,
      mediaId: row.id,
    }));

    // Nieuwste eerst
    images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(images);

  } catch (err) {
    console.error('Fout bij ophalen uploads:', err);

    res.status(500).json({
      error: 'Kon uploads niet ophalen'
    });
  }
});

module.exports = router;