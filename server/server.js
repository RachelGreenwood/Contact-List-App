const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();
const PORT = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Welcome to your contact list app!');
});

app.get('/contacts', async (req, res) => {
    try{
        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        console.log("Get in the server", contacts);
        res.send(contacts);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});
    }
});

app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));