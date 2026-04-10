const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔐 SECRET (in productie in .env!)
const JWT_SECRET = 'supergeheim';

// 🗄️ Fake database (vervang dit met echte DB)
const users = [
  {
    id: 1,
    username: 'admin',
    // wachtwoord = "admin"
    passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$wV...fakehash...', 
    role: 'admin'
  }
];

// 👉 Helper om user te vinden
function findUser(username) {
  return users.find(u => u.username === username);
}

// LOGIN ROUTE

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = findUser(username);

    if (!user) {
      return res.status(401).json({ error: 'User niet gevonden' });
    }

    // 🔐 Argon2 check
    const valid = await argon2.verify(user.passwordHash, password);

    if (!valid) {
      return res.status(401).json({ error: 'Verkeerd wachtwoord' });
    }

    // 🎟️ JWT token maken
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// REGISTER ROUTE (optioneel maar handig)

// app.post('/api/auth/register', async (req, res) => {
// const { username, password } = req.body;

// try {
//     const hash = await argon2.hash(password);

//     const newUser = {
//     id: users.length + 1,
//     username,
//     passwordHash: hash,
//     role: 'user'
//     };

//     users.push(newUser);

//     res.json({ message: 'User aangemaakt' });

// } catch (err) {
//     res.status(500).json({ error: 'Kon user niet maken' });
// }
// });

// AUTH MIDDLEWARE

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Geen token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Ongeldig token' });
  }
}

// ADMIN ROUTE (beveiligd)

app.get('/api/admin', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Geen toegang' });
  }

  res.json({ message: 'Welkom admin!' });
});

// SERVER START

app.listen(3000, () => {
  console.log('Server draait op http://localhost:3000');
});