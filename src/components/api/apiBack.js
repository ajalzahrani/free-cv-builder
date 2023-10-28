const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/resume', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM resume');
    res.json(result.rows[0]);
  } finally {
    client.release();
  }
});

app.put('/api/resume/header', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, title, pitch } = req.body;
    await client.query('UPDATE resume SET name=$1, title=$2, pitch=$3', [name, title, pitch]);
    res.sendStatus(200);
  } finally {
    client.release();
  }
});

// Add similar routes for other sections of the resume

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
