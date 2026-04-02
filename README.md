# Middenbeemster XGrid
Welkom bij de GitHub repository van het 3D-ervaring project voor Gemeente Purmerend.\
Dit project wordt onderhouden door InformAR en wordt ontwikkeld door Aryan, Jarno, Mateusz, Mats en Mehdi.

# Table of Contents
- [Technieken](#technieken)
- [API](#api)

# Technieken
Dit project wordt voornamelijk gemaakt in Vue, Express, Tailwind en MariaDB. \
Verdere documentaties en toelichtingen zijn te vinden in de `/server` of `/client` mappen.

# API
##  Server starten
Zorg ervoor dat je in de `/server` map zit voordat je begint.

```bash
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

##  Endpoints

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