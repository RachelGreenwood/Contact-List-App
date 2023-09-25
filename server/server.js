const express = require('express');
const db = require('./db/db-connection.js');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.json('Welcome to your contact list app!');
});

app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));