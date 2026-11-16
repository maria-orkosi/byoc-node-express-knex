'use strict';
// Sample 1 — a small Express API over Postgres (Knex). The platform must find: backend, node, port from PORT
// (default 3000), health at /api/health, Knex migrations under migrations/, DATABASE_URL as a database reference.
const express = require('express');
const knex = require('knex')(require('../knexfile'));

const app = express();
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  await knex.raw('select 1');
  res.json({ ok: true });
});

app.get('/api/notes', async (_req, res) => {
  res.json(await knex('notes').select('*').orderBy('id'));
});

app.post('/api/notes', async (req, res) => {
  const [row] = await knex('notes')
    .insert({ body: String(req.body.body || '') })
    .returning('*');
  res.status(201).json(row);
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`notes api on ${port}`));
