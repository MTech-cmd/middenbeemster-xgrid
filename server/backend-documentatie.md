# Backend Documentatie

> Project: "Smidse" (Middenbeemster) Content/Admin API
> Stack: Node.js, Express, MariaDB
> Laatst bijgewerkt: 30 juli 2026

---

## 1. Overzicht

Deze backend is een REST API gebouwd met **Express** en **MariaDB**, die als CMS-achtig systeem werkt voor een website. Er zijn drie hoofdonderdelen:

- **Authenticatie** (`/api/auth`) — login en JWT-token uitgifte voor admins.
- **Content** (`/api/content`) — publiek ophalen en aanmaken van losse content-items.
- **Admin API** (`/api/admin`) — beheer van pagina's, pagina-content en afbeeldingen, alleen toegankelijk voor ingelogde gebruikers.

De server gebruikt **JWT** voor authenticatie, **argon2** voor wachtwoord-hashing, **multer** voor file-uploads, en **helmet** + **cors** voor security headers en cross-origin requests.

---

## 2. Mappenstructuur

```
server/
├── server.js             # Volledige Express-app met alle routes/middleware (zie §3)
├── index.js              # Minimale placeholder server
├── db.js                 # MariaDB connection pool
├── adminsecurity.js       # Losse/oude auth-middleware (ongebruikt, zie §7)
├── test.js                # Scratch-bestand om argon2-hash te genereren (geen onderdeel van de API)
├── package.json
├── package-lock.json
├── public/
│   └── uploads/           # Opslaglocatie voor geüploade afbeeldingen (aangemaakt door adminApi.js)
└── routes/
   ├── admin.js           # Frontend API-client (fetch wrappers), zie §7
   ├── adminApi.js         # Express-router: admin endpoints (navbar, pages, content, upload)
    ├── auth.js             # Express-router: login + authMiddleware
    ├── content.js          # Express-router: publieke content endpoints
    └── test.js             # Scratch/losse Express-app met fake-database (geen onderdeel van de API)
```

---

## 3. Server-opzet (`server.js`)

`server.js` bevat de daadwerkelijke, werkende configuratie van de API. Dit bestand zet de middleware en routes als volgt op:

1. **CORS** ingeschakeld voor alle origins.
2. **JSON body-parsing** via `express.json()`.
3. **Helmet CSP** (Content-Security-Policy) met de volgende richtlijnen:
   - `default-src 'self'`
   - `script-src` en `style-src`: `'self'` + `'unsafe-inline'`
   - `img-src`: `'self'`, `data:`, `http://localhost:3000`
   - `connect-src`: `'self'`, `http://localhost:3000`
4. **Statische bestanden**: de map `public/uploads` wordt publiek beschikbaar gemaakt onder `/uploads`.
5. **Routes**:
   - `/api/content` → `routes/content.js` (publiek, geen auth)
   - `/api/auth` → `routes/auth.js` (publiek, login endpoint)
   - `/api/admin` → `routes/adminApi.js`, **beveiligd met `authMiddleware`** uit `routes/auth.js`
6. **404-handler** voor onbekende routes.
7. **Algemene error handler** die fouten als JSON teruggeeft.

Server start op `process.env.PORT`, met fallback naar **3000**.

> ⚠️ **Let op:** `package.json` heeft nog `"main": "index.js"`, maar `index.js` is een minimale placeholder-server zonder routes. De volledige, werkende API zit in `server.js`. Om de API daadwerkelijk te draaien, moet je `server.js` starten (bijv. `node server.js` of het `main`/`start`-script aanpassen).

---

## 4. Database (`db.js`)

Database-verbinding via een **MariaDB connection pool**:

| Instelling | Waarde |
|---|---|
| Host | `127.0.0.1` |
| User | `bit_academy` |
| Database | `middenbeemster_Smidse` |
| Connection limit | 10 |

```js
const pool = mariadb.createPool({ ... });
module.exports = pool;
```

Elke route haalt een connectie op via `pool.getConnection()` en geeft deze na gebruik vrij met `conn.release()`.

> ⚠️ **Beveiligingsrisico:** database-credentials staan hardcoded in `db.js`. Dit hoort in een `.env`-bestand (het pakket `dotenv` is al geïnstalleerd, maar wordt hier niet gebruikt).

### Databasetabellen (afgeleid uit de queries)

**`Pages`**
| Kolom | Type (afgeleid) | Omschrijving |
|---|---|---|
| `id` | int, auto increment | Primary key |
| `Template` | string | Naam/type van het paginatemplate |
| `Routing` | string | URL/route van de pagina |
| `PublishedBy` | int | User ID van aanmaker |
| `lastEditedBy` | int | User ID van laatste bewerker |

**`Content`**
| Kolom | Type (afgeleid) | Omschrijving |
|---|---|---|
| `id` | int, auto increment | Primary key |
| `page_id` | int | Foreign key → `Pages.id` (ON DELETE CASCADE) |
| `Location` | string/int | Locatie-aanduiding van het content-blok |
| `ApiName` | string | Sleutel waarmee de frontend het veld herkent (bv. `hero_title`) |
| `Content` | string | De daadwerkelijke waarde (tekst, of pad naar afbeelding) |
| `Type` | enum-achtig | `text`, `image` of `video` |
| `PublishedBy` | int | User ID van aanmaker |
| `lastEditedBy` | int | User ID van laatste bewerker |

**`UserAdmin`**
| Kolom | Type (afgeleid) | Omschrijving |
|---|---|---|
| `id` | int | Primary key |
| `username` | string | Gebruikersnaam |
| `passwordHash` | string | Argon2-hash van het wachtwoord |
| `role` | string | Bijv. `admin` |

---

## 5. Authenticatie (`routes/auth.js`)

### Flow
1. Gebruiker logt in met `username` + `password`.
2. Wachtwoord wordt gecontroleerd met **argon2** tegen de opgeslagen hash.
3. Bij succes wordt een **JWT** gegenereerd (geldig **1 uur**), met payload `{ id, role }`.
4. Frontend stuurt deze token mee in de `Authorization: Bearer <token>` header bij volgende requests.
5. `authMiddleware` controleert en decodeert de token, en zet het resultaat op `req.user`.

### Endpoints

| Methode | Endpoint | Auth vereist | Beschrijving |
|---|---|---|---|
| POST | `/api/auth/login` | Nee | Inloggen, retourneert `{ token, role }` |
| GET | `/api/auth/admin` | Ja (JWT + role `admin`) | Testroute om te checken of token geldig is en gebruiker admin-rol heeft |

### Navbar API

| Methode | Endpoint | Auth vereist | Beschrijving |
|---|---|---|---|
| GET | `/api/admin/navbar` | Ja | Haalt de navbar-config op met `logo` en `items` |
| PUT | `/api/admin/navbar` | Ja | Slaat de navbar-config op en synchroniseert de `Navbar`-tabel |

### Voorbeeld request/response

**POST `/api/auth/login`**
```json
// Request
{ "username": "admin", "password": "geheim123" }

// Response (200)
{ "token": "eyJhbGciOi...", "role": "admin" }

// Response (401)
{ "error": "Verkeerd wachtwoord" }
```

> ⚠️ **Beveiligingsrisico:** `JWT_SECRET` staat hardcoded als `'supergeheim'` in de code (met een `// later .env` commentaar). Dit moet naar een environment variable.

> ⚠️ **Mogelijke bug:** in de query `SELECT id, username, passwordHash, role FROM UserAdmin WHERE username = ?` wordt het resultaat gedestructureerd als `const [rows] = await conn.query(...)`, maar `mariadb` retourneert normaal direct een array (zoals elders in de code, bv. `routes/adminApi.js`, wel correct gebeurt: `const rows = await conn.query(...)`). Dit kan ertoe leiden dat `rows` hier feitelijk de eerste rij is in plaats van de hele array — controleer dit, want `user.passwordHash` wordt verderop gebruikt alsof `user = rows` (zonder `[0]`) al een los object is.

---

## 6. API Endpoints — volledig overzicht

### 6.1 Content API — `/api/content` (publiek)

| Methode | Endpoint | Beschrijving |
|---|---|---|
| GET | `/api/content` | Haalt alle content-rijen op uit de `Content`-tabel |
| GET | `/api/content/:location` | Haalt content op gefilterd op `Location`, gesorteerd op `ApiName` |
| POST | `/api/content` | Voegt een nieuwe content-rij toe. Body: `{ Location, ApiName, Content, Type, PublishedBy }` |

> Deze routes hebben **geen authenticatie** — ook de POST-route is publiek toegankelijk. Dat is mogelijk onbedoeld, zeker vergeleken met de bewust beveiligde admin-routes.

### 6.2 Auth API — `/api/auth`

Zie §5 hierboven.

### 6.3 Admin API — `/api/admin` (vereist geldige JWT, via `authMiddleware`)

**Navbar**

| Methode | Endpoint | Beschrijving |
|---|---|---|
| GET | `/api/admin/navbar` | Navbar-config ophalen met `logo` en `items` |
| PUT | `/api/admin/navbar` | Navbar-config opslaan en syncen met `Navbar` |

**Pagina's**

| Methode | Endpoint | Beschrijving |
|---|---|---|
| POST | `/api/admin/pages` | Nieuwe pagina aanmaken. Body: `{ template, routing }` |
| GET | `/api/admin/pages/:id` | Pagina ophalen, inclusief alle bijbehorende content (omgezet naar `{ ApiName: { id, value, type, location } }`) |
| PUT | `/api/admin/pages/:id` | Pagina-metadata bijwerken (`template`, `routing`) |
| DELETE | `/api/admin/pages/:id` | Pagina verwijderen (content wordt automatisch mee verwijderd via `ON DELETE CASCADE`) |

**Pagina-content**

| Methode | Endpoint | Beschrijving |
|---|---|---|
| PUT | `/api/admin/pages/:id/content` | Content van een pagina in bulk opslaan/updaten (upsert per `ApiName`). Body: `{ content: { hero_title: '...', hero_image: '...' } }` |

Logica hierbij:
- Voor elk veld in `content` wordt het `Type` automatisch bepaald op basis van de key-naam (`image` → `image`, `video` → `video`, anders `text`).
- Bestaat er al een rij met deze `ApiName` voor deze pagina? Dan wordt die **geüpdatet**. Anders wordt een **nieuwe rij** geïnsert.
- Lege strings en `null`-waarden worden overgeslagen.
- Dit gebeurt binnen een **database-transactie** (`beginTransaction` / `commit` / `rollback`).

> ⚠️ **Mogelijke bug:** bij het inserten van een nieuwe content-rij wordt `Location` gevuld met `req.params.id` (het pagina-ID): `INSERT INTO Content (page_id, Location, ApiName, ...) VALUES (req.params.id, req.params.id, ...)`. Dat betekent dat `Location` en `page_id` altijd dezelfde waarde krijgen — vermoedelijk niet de bedoeling, want elders (`routes/content.js`) wordt `Location` gebruikt als een aparte, betekenisvolle filter-waarde.

**Afbeeldingen**

| Methode | Endpoint | Beschrijving |
|---|---|---|
| POST | `/api/admin/upload` | Upload van een afbeelding (multipart/form-data, field name: `image`). Retourneert `{ url: '/uploads/<filename>' }` |
| GET | `/api/admin/uploads` | Lijst van alle geüploade bestanden, gesorteerd op meest recent, met `filename`, `url`, `size`, `createdAt` |

**Upload-validatie (`multer`)**
- Max bestandsgrootte: **5 MB**
- Toegestane MIME-types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Bestandsnaam wordt gegenereerd als `<timestamp>-<random>.<ext>` om naamconflicten te voorkomen
- Opslaglocatie: `public/uploads/` (wordt automatisch aangemaakt als deze niet bestaat)

**Navbar-opslag**
- De navbar-editor gebruikt een object met `logo` en `items`.
- De backend bewaart de laatste configuratie ook in `server/data/navbar.json`.
- De losse linkblokken worden daarnaast gesynchroniseerd met de bestaande `Navbar`-tabel.

---

## 7. Frontend API helper

**Bestand:** `client/src/services/admin.js`

Dit bestand bevat de Vue-client helpers voor admin requests. De helper voegt automatisch de JWT-token uit `localStorage` toe als `Authorization: Bearer <token>` header.

### Exports

| Functie | Endpoint |
|---|---|
| `getPages(website)` | GET `/api/admin/pages` |
| `getPage(id)` | GET `/api/admin/pages/:id` |
| `createPage(data)` | POST `/api/admin/pages` |
| `updatePage(id, data)` | PUT `/api/admin/pages/:id` |
| `deletePage(id)` | DELETE `/api/admin/pages/:id` |
| `updatePageContent(id, content)` | PUT `/api/admin/pages/:id/content` |
| `uploadImage(file)` | POST `/api/admin/upload` |
| `getNavbar()` | GET `/api/admin/navbar` |
| `saveNavbar(data)` | PUT `/api/admin/navbar` |

> De oude server-side helper in `routes/admin.js` hoort niet meer bij deze opzet; de Vue-client gebruikt nu `client/src/services/admin.js`.

---

## 8. Bestanden die geen onderdeel zijn van de werkende API

De volgende bestanden zijn gevonden in de upload, maar zijn **geen actief onderdeel** van de huidige API-opzet zoals die in `server.js` draait. Het is aan te raden deze op te ruimen of duidelijk te markeren, om verwarring te voorkomen:

| Bestand | Wat het is | Advies |
|---|---|---|
| `index.js` | Placeholder-server zonder routes, maar wél het officiële entry point volgens `package.json` | Vervangen door (of laten verwijzen naar) `server.js`, of `package.json` aanpassen zodat `main`/`start` naar `server.js` wijst |
| `routes/admin.js` | Dit is **geen Express-route**, maar een frontend API-client (gebruikt `fetch`, exporteert functies zoals `getPages`, `createPage`). Hoort eigenlijk in de Vue-client, niet in de backend `routes/`-map | Verplaatsen naar de frontend codebase |
| `routes/test.js` | Losse, volledige Express-app met een fake in-memory userlijst — een soort vroege prototype van de auth-flow | Verwijderen, of behouden als losse testscript buiten de `routes/`-map |
| `test.js` (root) | Scratch-script om eenmalig een argon2-hash te genereren (bv. voor het aanmaken van een test-admin-wachtwoord) | Geen onderdeel van de API; kan blijven staan als hulpscript maar hoort niet meegedeployed te worden |
| `adminsecurity.js` | Oudere/duplicaat versie van de `authMiddleware` die nu in `routes/auth.js` staat. Wordt nergens geïmporteerd | Verwijderen, om verwarring met de echte middleware te voorkomen |

---

## 9. Beveiligingsaandachtspunten (samenvatting)

Dit zijn geen blokkerende fouten, maar zaken die het waard zijn om voor productie aan te pakken:

1. **Secrets hardcoded**: `JWT_SECRET` (in `routes/auth.js` en `routes/test.js`) en database-credentials (in `db.js`) staan letterlijk in de code. `dotenv` is al een dependency — gebruik een `.env`-bestand hiervoor.
2. **Content API volledig open**: `/api/content` heeft geen authenticatie, ook niet op de POST-route waarmee data wordt toegevoegd.
3. **CORS staat open voor alle origins** (`cors()` zonder configuratie). Voor productie is het aan te raden dit te beperken tot het eigen frontend-domein.
4. **Mogelijke databug** in `routes/auth.js` rond de query-destructuring (zie §5).
5. **Dubbele/verwarrende entry points** (`index.js` vs `server.js`) — zie §7.

---

## 10. Dependencies

Uit `package.json`:

| Package | Versie | Gebruik |
|---|---|---|
| `express` | ^5.2.1 | Webframework |
| `mariadb` | ^3.5.2 | Database driver |
| `argon2` | ^0.44.0 | Wachtwoord-hashing |
| `jsonwebtoken` | ^9.0.3 | JWT-authenticatie |
| `multer` | ^2.1.1 | File-uploads |
| `helmet` | ^8.1.0 | Security headers (CSP) |
| `cors` | ^2.8.6 | Cross-origin requests |
| `dotenv` | ^17.4.0 | Environment variables (nog niet gebruikt) |
| `bcrypt` | ^6.0.0 | Wachtwoord-hashing (ongebruikt — argon2 wordt gebruikt) |
| `axios` | ^1.14.0 | HTTP-client (niet gebruikt in backend; mogelijk restant van frontend-code) |
| `nodemon` (dev) | ^3.1.14 | Auto-herstart bij ontwikkeling |

> `bcrypt` en `axios` staan in de dependencies maar worden in geen van de geüploade backend-bestanden gebruikt.

---

## 11. Setup-instructies

```bash
# 1. Dependencies installeren
npm install

# 2. MariaDB-database opzetten met de tabellen Pages, Content en UserAdmin
#    (zie §4 voor de afgeleide kolommen)

# 3. Server starten (let op: gebruik server.js, niet index.js — zie §3)
node server.js

# Of voor ontwikkeling met auto-reload:
npx nodemon server.js
```

**Aanbevolen `.env`-bestand** (nog niet aanwezig, maar dependency `dotenv` is al geïnstalleerd):
```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=bit_academy
DB_PASSWORD=bit_academy
DB_NAME=middenbeemster_Smidse
JWT_SECRET=<een lange, willekeurige string>
```

---

## 12. Architectuur-diagram (request flow)

```
Client (Vue)
   │
   ▼
server.js
   ├─► /api/content   → routes/content.js        (publiek)
   ├─► /api/auth      → routes/auth.js            (publiek: login)
   └─► /api/admin     → authMiddleware (JWT check)
                          └─► routes/adminApi.js   (pages, content, uploads)
                                  │
                                  ▼
                                db.js → MariaDB pool → tabellen: Pages, Content, UserAdmin
```
