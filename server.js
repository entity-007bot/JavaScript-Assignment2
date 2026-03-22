const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const users = JSON.parse(fs.readFileSync('users.json'));

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid login details' });
  }

  res.json({ message: 'Login successful' });
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
