lokaal:

# API Documentatie – Express + MariaDB + Vue

## Overzicht

Dit project bestaat uit 3 onderdelen:

* **Client** → Vue frontend (`/client`)
* **Server** → Express API (`/server`)
* **Database** → MariaDB

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

##  Content ophalen

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
    "Type": "text"
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

##  Content toevoegen

```
POST /api/content
```

 Body:

```json
{
  "Location": "home",
  "ApiName": "homepage",
  "Content": "Nieuwe tekst",
  "Type": "text",
  "PublishedBy": "admin"
}
```

---

## Content updaten

```
PUT /api/content/:id
```

 Body:

```json
{
  "Content": "Aangepaste tekst",
  "lastEditedBy": "admin"
}
```

---

## Content verwijderen

```
DELETE /api/content/:id
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

#  Vue gebruik

## Axios installeren

```bash
npm install axios
```

---

## Data ophalen

```js
import axios from 'axios';

const API = 'http://localhost:3000/api';

const res = await axios.get(`${API}/content/homepage`);
console.log(res.data);
```

---

## Vue component voorbeeld

```vue
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const content = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/content/homepage')
  content.value = res.data
})
</script>

<template>
  <div v-for="item in content" :key="item.id">
    <p>{{ item.Content }}</p>
  </div>
</template>
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

## Poorten

* Vue → `http://localhost:5173`
* API → `http://localhost:3000`

---

## Database connectie

Staat in:

```
/server/db.js
```

---