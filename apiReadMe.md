lokaal:
## Overzicht


De flow werkt als volgt:

```
Vue (client) → Express API → MariaDB → Express → Vue
```

---

##  Server starten

Ga naar de server map:

```bash
cd server
npm install
node server.js
```

De API draait op:

```
http://localhost:3000
```

---

##  API Base URL

```
http://localhost:3000/api
```

---

#  Endpoints

/api/content
/api/auth
/

### Alles ophalen

```
GET /api/content
```

 Response:

```json
[
  {
    "id": 1,
    "Location": "home",
    "ApiName": "homepage",
    "Content": "Welkom!",
    "Type": "text",
    "PublishedBy": "admin",
    "LastEditedBy": "",
    "CreatedAt": "2026-03-24T11:22:13.000Z",
    "UpdatedAt": "2026-03-24T11:22:13.000Z"
  }
]
```

---

### Op ApiName (belangrijk voor Vue)

```
GET /api/content/:apiName
```

 Voorbeeld:

```
GET /api/content/homepage
```

---

## Login

```
POST /api/auth/login
```

 Body:

```json
{
  "username": "admin",
  "password": "1234"
}
```

---

# Data flow

1. Vue maakt request → `/api/content/homepage`
2. Express ontvangt request
3. Express haalt data uit MariaDB
4. Express stuurt JSON terug
5. Vue toont data

---

# Belangrijk

## CORS

CORS staat aan in Express:

```js
app.use(cors());
```

---