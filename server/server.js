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

app.post("/contacts", async (req, res) => {
    try {
      console.log("In the server", req.body);
      const { name, email, phone, notes } = req.body;
      const result = await db.query(
        "INSERT INTO contacts (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, phone, notes]
      );
      let dbResponse = result.rows[0];
      console.log(dbResponse);
      res.json(dbResponse);
    } catch (err) {
      console.log(err);
      res.status(400).json({err});
    }
  });

app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));