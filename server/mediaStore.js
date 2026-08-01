const fs = require('fs');
const path = require('path');

const defaultNavbarState = {
    logo: {
        imageUrl: '',
        altText: 'Middenbeemster Smidse',
        width: 180,
        height: 48,
    },
    items: [
        { id: 1, name: 'Midden-Beemster', link: '/' },
        { id: 2, name: 'Ontdekken', link: '/ontdekken' },
        { id: 3, name: '3D Tour', link: '/3d-tour' },
        { id: 4, name: 'Speel Nu →', link: '/play' },
    ],
};

function normalizeMediaUrl(rawUrl) {
    if (!rawUrl) return '';

    const value = String(rawUrl).trim();
    if (!value) return '';
    if (value.startsWith('/uploads/')) return value;
    if (value.startsWith('uploads/')) return `/${value}`;

    try {
        const parsed = new URL(value);
        if (parsed.pathname.startsWith('/uploads/')) {
            return parsed.pathname;
        }
    } catch {
        // fall through
    }

    return value;
}

function safeInt(value, fallback = null) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

async function ensureMediaSchema(pool) {
    let conn;

    try {
        conn = await pool.getConnection();

        await conn.query(`
      CREATE TABLE IF NOT EXISTS MediaAsset (
        id INT PRIMARY KEY AUTO_INCREMENT,
        Filename VARCHAR(255) NOT NULL,
        OriginalName VARCHAR(255) NOT NULL,
        StoragePath VARCHAR(255) NOT NULL,
        Url VARCHAR(255) NOT NULL UNIQUE,
        MimeType VARCHAR(100),
        FileSize BIGINT,
        CreatedBy INT NULL,
        lastEditedBy INT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

        await conn.query(`
      CREATE TABLE IF NOT EXISTS NavbarSettings (
        id INT PRIMARY KEY,
        LogoMediaId INT NULL,
        LogoAltText VARCHAR(255) NOT NULL DEFAULT 'Middenbeemster Smidse',
        LogoWidth INT NOT NULL DEFAULT 180,
        LogoHeight INT NOT NULL DEFAULT 48,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

        try {
            await conn.query('ALTER TABLE Content ADD COLUMN MediaId INT NULL');
        } catch (error) {
            if (!String(error.message || '').toLowerCase().includes('duplicate column')) {
                throw error;
            }
        }
    } finally {
        if (conn) conn.release();
    }
}

async function ensureMediaRecordForUrl(dbClient, rawUrl, editorId = null, metadata = {}) {
    const url = normalizeMediaUrl(rawUrl);
    if (!url) return null;

    let conn;
    const shouldRelease = typeof dbClient.getConnection === 'function';

    try {
        conn = shouldRelease ? await dbClient.getConnection() : dbClient;
        const rows = await conn.query('SELECT * FROM MediaAsset WHERE Url = ? LIMIT 1', [url]);

        if (rows.length > 0) {
            return rows[0];
        }

        const filename = metadata.filename || path.basename(url);
        const originalName = metadata.originalName || filename;
        const storagePath = metadata.storagePath || path.join('public', 'uploads', filename);
        const fileSize = safeInt(metadata.fileSize, null);
        const mimeType = metadata.mimeType || null;

        const result = await conn.query(
            `INSERT INTO MediaAsset
        (Filename, OriginalName, StoragePath, Url, MimeType, FileSize, CreatedBy, lastEditedBy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [filename, originalName, storagePath, url, mimeType, fileSize, editorId, editorId]
        );

        return {
            id: Number(result.insertId),
            Filename: filename,
            OriginalName: originalName,
            StoragePath: storagePath,
            Url: url,
            MimeType: mimeType,
            FileSize: fileSize,
            CreatedBy: editorId,
            lastEditedBy: editorId,
        };
    } finally {
        if (shouldRelease && conn) conn.release();
    }
}

async function storeUploadedMedia(pool, file, editorId = null, uploadDir = '') {
    const relativeUrl = `/uploads/${file.filename}`;
    const storagePath = path.relative(process.cwd(), file.path);
    let conn;

    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            `INSERT INTO MediaAsset
        (Filename, OriginalName, StoragePath, Url, MimeType, FileSize, CreatedBy, lastEditedBy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                file.filename,
                file.originalname,
                storagePath || path.join('public', 'uploads', file.filename),
                relativeUrl,
                file.mimetype,
                file.size,
                editorId,
                editorId,
            ]
        );

        return {
            id: Number(result.insertId),
            url: relativeUrl,
            filename: file.filename,
            originalName: file.originalname,
            storagePath: storagePath || path.join('public', 'uploads', file.filename),
            mimeType: file.mimetype,
            fileSize: file.size,
        };
    } finally {
        if (conn) conn.release();
    }
}

async function listMediaAssets(pool) {
    let conn;

    try {
        conn = await pool.getConnection();
        return await conn.query(
            'SELECT id, Filename, OriginalName, StoragePath, Url, MimeType, FileSize, CreatedAt FROM MediaAsset ORDER BY CreatedAt DESC, id DESC'
        );
    } finally {
        if (conn) conn.release();
    }
}

async function loadPublicNavbarState(pool) {
    let conn;

    try {
        conn = await pool.getConnection();

        const settingsRows = await conn.query(
            `SELECT ns.id, ns.LogoMediaId, ns.LogoAltText, ns.LogoWidth, ns.LogoHeight, ma.Url AS logoUrl
       FROM NavbarSettings ns
       LEFT JOIN MediaAsset ma ON ma.id = ns.LogoMediaId
       WHERE ns.id = 1
       LIMIT 1`
        );

        const itemRows = await conn.query('SELECT id, Name, Link FROM Navbar ORDER BY id ASC');
        const settings = settingsRows[0] || null;

        if (!settings && itemRows.length === 0) {
            return null;
        }

        return {
            logo: {
                imageUrl: settings?.logoUrl || '',
                altText: settings?.LogoAltText || defaultNavbarState.logo.altText,
                width: settings?.LogoWidth || defaultNavbarState.logo.width,
                height: settings?.LogoHeight || defaultNavbarState.logo.height,
            },
            items: itemRows.map(item => ({
                id: Number(item.id),
                name: item.Name,
                link: item.Link,
            })),
        };
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    defaultNavbarState,
    ensureMediaSchema,
    ensureMediaRecordForUrl,
    loadPublicNavbarState,
    listMediaAssets,
    normalizeMediaUrl,
    storeUploadedMedia,
};