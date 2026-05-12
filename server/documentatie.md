# CMS Backend & API Documentatie

> Complete technische documentatie van de backend, API-routes en frontend helperfuncties.
>
> Doel: nieuwe ontwikkelaars kunnen direct begrijpen waar alles staat, hoe het werkt en hoe de API gebruikt wordt.

---

# 1. Projectoverzicht

Dit project bestaat uit een Node.js/Express backend met een MariaDB database.

De applicatie biedt:

* JWT authenticatie
* Admin dashboard API
* CRUD voor pagina's
* CRUD voor contentblokken
* Afbeelding uploads
* Frontend helper API (`routes/admin.js`)

---

# 2. Projectstructuur

```text
project/
│
├── routes/
│   ├── adminApi.js       # Admin CRUD API
│   ├── auth.js           # Login + JWT authenticatie
│   ├── content.js        # Algemene content API
│   └── test.js           # Losse testserver
│
├── adminsecurity.js      # Auth middleware (herbruikbaar)
├── db.js                 # MariaDB connectiepool
├── index.js              # Startpunt Express server
│
├── public/
│   └── uploads/          # Geüploade afbeeldingen
│
└── frontend/
    └── routes/
        └── admin.js      # Frontend API helper functies
```

---

# 3. Database Configuratie

## Bestand: `db.js`

```javascript
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'bit_academy',
  password: 'bit_academy',
  database: 'middenbeemster_Smidse',
  connectionLimit: 10
});

module.exports = pool;
```

## Functie

Maakt een connectiepool aan zodat routes databaseverbindingen kunnen opvragen via:

```javascript
const conn = await pool.getConnection();
```

---

# 4. Server Startpunt

## Bestand: `index.js`

Het startpunt van de backend.

### Minimale versie

```javascript
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hallo wereld!');
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
```

### Uitgebreide versie (aanbevolen)

```javascript
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/adminApi'));
app.use('/api/content', require('./routes/content'));
```

---

# 5. Authenticatie

## Bestand: `routes/auth.js`

Verantwoordelijk voor:

* Inloggen
* JWT token genereren
* Admin route bescherming

---

## JWT Secret

```javascript
const JWT_SECRET = 'supergeheim';
```

In productie hoort dit in een `.env` bestand.

---

## Auth Middleware

Controleert of een geldig JWT token is meegestuurd.

```javascript
Authorization: Bearer <token>
```

Bij succes:

```javascript
req.user = {
  id: 1,
  role: 'admin'
}
```

---

## POST `/api/auth/login`

### Request

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Response

```json
{
  "token": "jwt-token",
  "role": "admin"
}
```

---

## GET `/api/auth/admin`

Beveiligde route voor admins.

### Response

```json
{
  "message": "Welkom admin!"
}
```

---

# 6. Admin Security Middleware

## Bestand: `adminsecurity.js`

Losse middleware zodat dezelfde authenticatielogica overal gebruikt kan worden.

```javascript
function authMiddleware(req, res, next) {
  // token check
}
```

Gebruik:

```javascript
router.post('/pages', authMiddleware, handler);
```

---

# 7. Frontend API Helper

## Bestand: `frontend/routes/admin.js`

Dit bestand bevat helperfuncties die API-calls naar de backend doen.

## Base URL

```javascript
const BASE_URL = 'http://localhost:3000/api';
```

## Algemene request helper

```javascript
request(path, options)
```

* Voegt headers toe
* Verwerkt fouten
* Retourneert JSON

---

## Beschikbare functies

### Pages

| Functie                | Endpoint                  |
| ---------------------- | ------------------------- |
| `getPages()`           | GET `/admin/pages`        |
| `getPage(id)`          | GET `/admin/pages/:id`    |
| `createPage(data)`     | POST `/admin/pages`       |
| `updatePage(id, data)` | PUT `/admin/pages/:id`    |
| `deletePage(id)`       | DELETE `/admin/pages/:id` |

### Content

| Functie                          | Endpoint                       |
| -------------------------------- | ------------------------------ |
| `updatePageContent(id, content)` | PUT `/admin/pages/:id/content` |

### Upload

| Functie             | Endpoint             |
| ------------------- | -------------------- |
| `uploadImage(file)` | POST `/admin/upload` |

---

# 8. Admin API

## Bestand: `routes/adminApi.js`

Deze route bevat alle beheerfunctionaliteit.

---

# 8.1 GET `/api/admin/pages`

Haalt alle pagina's op.

### Response

```json
[
  {
    "id": 1,
    "Template": "home",
    "Routing": "/",
    "publishedByName": "admin"
  }
]
```

---

# 8.2 GET `/api/admin/pages/:id`

Haalt een pagina op inclusief alle contentblokken.

### Response

```json
{
  "id": 1,
  "Template": "home",
  "Routing": "/",
  "content": {
    "hero_title": {
      "id": 10,
      "value": "Welkom",
      "type": "text",
      "location": "1"
    },
    "hero_image": {
      "id": 11,
      "value": "/uploads/abc.jpg",
      "type": "image",
      "location": "1"
    }
  }
}
```

---

# 8.3 POST `/api/admin/pages`

Maakt een nieuwe pagina aan.

### Request

```json
{
  "template": "home",
  "routing": "/"
}
```

### Response

```json
{
  "id": 1,
  "template": "home",
  "routing": "/"
}
```

---

# 8.4 PUT `/api/admin/pages/:id`

Werkt pagina metadata bij.

### Request

```json
{
  "template": "landing",
  "routing": "/over-ons"
}
```

### Response

```json
{
  "message": "Pagina bijgewerkt"
}
```

---

# 8.5 PUT `/api/admin/pages/:id/content`

Slaat contentblokken op via upsert.

### Request

```json
{
  "content": {
    "hero_title": "Welkom",
    "hero_subtitle": "Onze website",
    "hero_image": "/uploads/banner.jpg"
  }
}
```

### Type detectie

| ApiName bevat | Type  |
| ------------- | ----- |
| `image`       | image |
| `video`       | video |
| anders        | text  |

### Response

```json
{
  "message": "Content opgeslagen"
}
```

---

# 8.6 DELETE `/api/admin/pages/:id`

Verwijdert pagina en gekoppelde content.

### Response

```json
{
  "message": "Pagina verwijderd"
}
```

---

# 8.7 POST `/api/admin/upload`

Uploadt een afbeelding.

### FormData

```javascript
formData.append('image', file)
```

### Response

```json
{
  "url": "/uploads/123456-banner.jpg"
}
```

### Toegestane bestandstypes

* image/jpeg
* image/png
* image/webp
* image/gif

### Maximum bestandsgrootte

5 MB

---

# 9. Content API

## Bestand: `routes/content.js`

Generieke API voor directe contenttoegang.

---

## GET `/api/content`

Haalt alle contentrecords op.

---

## GET `/api/content/:location`

Haalt content op voor een specifieke locatie.

### Voorbeeld

```text
GET /api/content/home
```

---

## POST `/api/content`

Voegt contentrecord toe.

### Request

```json
{
  "Location": "home",
  "ApiName": "hero_title",
  "Content": "Welkom",
  "Type": "text",
  "PublishedBy": 1
}
```

---

# 10. Testserver

## Bestand: `routes/test.js`

Losse Express server met:

* Fake database
* Login endpoint
* JWT verificatie
* Admin endpoint

Doel:

* Snel testen zonder echte database.

---

# 11. Database Tabellen

## UserAdmin

| Kolom        | Type    |
| ------------ | ------- |
| id           | INT     |
| username     | VARCHAR |
| passwordHash | TEXT    |
| role         | VARCHAR |

## Pages

| Kolom        | Type     |
| ------------ | -------- |
| id           | INT      |
| Template     | VARCHAR  |
| Routing      | VARCHAR  |
| PublishedBy  | INT      |
| lastEditedBy | INT      |
| UpdatedAt    | DATETIME |

## Content

| Kolom        | Type    |
| ------------ | ------- |
| id           | INT     |
| page_id      | INT     |
| Location     | VARCHAR |
| ApiName      | VARCHAR |
| Content      | TEXT    |
| Type         | VARCHAR |
| PublishedBy  | INT     |
| lastEditedBy | INT     |

---

# 12. Relaties

```text
UserAdmin (1) ───< Pages
UserAdmin (1) ───< Content
Pages (1) ───────< Content
```

---

# 13. Frontend Workflow

## Pagina ophalen

```javascript
const page = await getPage(1);
```

## Content aanpassen

```javascript
await updatePageContent(1, {
  hero_title: 'Welkom',
  hero_image: '/uploads/banner.jpg'
});
```

## Afbeelding uploaden

```javascript
const url = await uploadImage(file);
```

---

# 14. Authenticatie Workflow

1. Gebruiker logt in.
2. Backend valideert wachtwoord met Argon2.
3. Backend retourneert JWT token.
4. Frontend slaat token op.
5. Frontend stuurt token mee in `Authorization` header.
6. Middleware decodeert token.
7. `req.user` bevat gebruiker.

---

# 15. Content Workflow

1. Admin opent pagina.
2. Frontend roept `getPage(id)` aan.
3. API levert pagina + content.
4. Admin past velden aan.
5. Frontend roept `updatePageContent()` aan.
6. Backend doet per `ApiName` een upsert.

---

# 16. Upload Workflow

1. Gebruiker kiest afbeelding.
2. Frontend maakt `FormData`.
3. POST naar `/api/admin/upload`.
4. Multer slaat bestand op.
5. Backend retourneert URL.
6. URL wordt opgeslagen in content.

---

# 17. Middleware Overzicht

| Middleware               | Functie               |
| ------------------------ | --------------------- |
| `express.json()`         | JSON body parser      |
| `cors()`                 | Cross-origin requests |
| `authMiddleware`         | JWT verificatie       |
| `upload.single('image')` | Bestand uploaden      |

---

# 18. Foutafhandeling

Gebruikelijke responses:

```json
{ "error": "Geen token" }
{ "error": "Ongeldig token" }
{ "error": "Pagina niet gevonden" }
{ "error": "Interne serverfout" }
```

---

# 19. Beveiligingsadvies

## Aanbevolen verbeteringen

* JWT secret naar `.env`
* Uploads extra valideren
* Rate limiting op login
* HTTPS gebruiken
* SQL errors loggen
* Role-based authorization uitbreiden

---

# 20. Voorbeeld `.env`

```env
PORT=3000
JWT_SECRET=supergeheim
DB_HOST=127.0.0.1
DB_USER=bit_academy
DB_PASSWORD=bit_academy
DB_NAME=middenbeemster_Smidse
```

---

# 21. Installatie

```bash
npm install express mariadb multer cors jsonwebtoken argon2 dotenv
```

---

# 22. Server starten

```bash
node index.js
```

Of met nodemon:

```bash
npx nodemon index.js
```

---

# 23. Samenvatting

| Onderdeel           | Bestand                    |
| ------------------- | -------------------------- |
| Server start        | `index.js`                 |
| Database            | `db.js`                    |
| Auth routes         | `routes/auth.js`           |
| Admin API           | `routes/adminApi.js`       |
| Content API         | `routes/content.js`        |
| Testserver          | `routes/test.js`           |
| Auth middleware     | `adminsecurity.js`         |
| Frontend API helper | `frontend/routes/admin.js` |
| Uploads             | `public/uploads/`          |

---

# 24. Belangrijkste API Endpoints

| Methode | Endpoint                       | Doel                |
| ------- | ------------------------------ | ------------------- |
| POST    | `/api/auth/login`              | Inloggen            |
| GET     | `/api/auth/admin`              | Admin check         |
| GET     | `/api/admin/pages`             | Alle pagina's       |
| GET     | `/api/admin/pages/:id`         | Pagina + content    |
| POST    | `/api/admin/pages`             | Nieuwe pagina       |
| PUT     | `/api/admin/pages/:id`         | Metadata wijzigen   |
| PUT     | `/api/admin/pages/:id/content` | Content opslaan     |
| DELETE  | `/api/admin/pages/:id`         | Pagina verwijderen  |
| POST    | `/api/admin/upload`            | Afbeelding uploaden |
| GET     | `/api/content`                 | Alle content        |
| GET     | `/api/content/:location`       | Content per locatie |
| POST    | `/api/content`                 | Content toevoegen   |

---

# 25. Contact voor Ontwikkelaars

Wanneer iemand wil weten:

* waar een route staat,
* welke endpoint gebruikt wordt,
* welke data verwacht wordt,
* hoe authenticatie werkt,
* hoe uploads worden opgeslagen,

kan deze documentatie als centrale handleiding worden gebruikt.
