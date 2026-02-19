const express = require('express');
// const db = require('./db'); // Uncomment when you're ready to use the database

const router = express.Router();

// ---------------------------------------------------------------------------
// TODO (Candidate): Implement the following REST endpoints.
//
//  GET    /tasks        — Return all tasks sorted by priority (High first),
//                         then by created_at (newest first). Sort in SQL only.
//
//  POST   /tasks        — Create a new task.
//                         Expected body: { title: string, priority: string }
//
//  PATCH  /tasks/:id    — Toggle the is_completed status of a task.
// ---------------------------------------------------------------------------

module.exports = router;
