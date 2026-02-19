const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'tasks.db'));

// Enable WAL mode for better concurrent read performance
db.exec('PRAGMA journal_mode = WAL;');

// ---------------------------------------------------------------------------
// TODO (Candidate): Create your `tasks` table here using db.exec(`...`)
//
// Required columns:
//   id           INTEGER  PRIMARY KEY AUTOINCREMENT
//   title        TEXT     NOT NULL
//   is_completed INTEGER  NOT NULL DEFAULT 0   (0 = false, 1 = true)
//   priority     TEXT     NOT NULL              ('Low' | 'Medium' | 'High')
//   created_at   TEXT     NOT NULL DEFAULT (datetime('now'))
//
// API reference (node:sqlite — no npm install needed, built into Node ≥ 22):
//   db.exec('CREATE TABLE IF NOT EXISTS tasks (...)')  — run DDL / raw SQL
//   db.prepare('SELECT * FROM tasks')                  — returns a StatementSync
//   stmt.all()      — returns all rows as an array
//   stmt.get(id)    — returns the first row
//   stmt.run(args)  — executes the statement (INSERT / UPDATE / DELETE)
// ---------------------------------------------------------------------------

module.exports = db;
