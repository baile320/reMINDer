CREATE DATABASE reminders;

\c reminders

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reminders CASCADE;
DROP TABLE IF EXISTS users_reminders CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS reminders_tags CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR (255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  author TEXT,
  source TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  
);

CREATE TABLE users_reminders (
  id SERIAL PRIMARY KEY,
  users_id SERIAL REFERENCES users(id),
  reminders_id SERIAL REFERENCES reminders(id),
  last_sent TIMESTAMP NOT NULL DEFAULT NOW(),
  sent_count INTEGER DEFAULT 0
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag TEXT NOT NULL UNIQUE
);

CREATE TABLE reminders_tags (
  id SERIAL PRIMARY KEY,
  reminders_id SERIAL REFERENCES reminders(id),
  tags_id SERIAL REFERENCES tags(id)
);
/*



*/