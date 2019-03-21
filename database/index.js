const { Client } = require('pg');

const db = new Client({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOSTNAME || 'localhost',
  database: process.env.POSTGRES_DB || 'reminders',
  password: process.env.POSTGRES_PASSWORD || '',
  port: process.env.POSTGRES_PORT || 5432,
});

module.exports.db = db;
