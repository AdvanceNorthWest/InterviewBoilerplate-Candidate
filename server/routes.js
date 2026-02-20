const express = require("express");
const db = require("./db");

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

router.get("/tasks", (req, res) => {
  const tasks = db
    .prepare(
      `
    SELECT *
    FROM tasks
    ORDER BY
      CASE priority
        WHEN 'High' THEN 0
        WHEN 'Medium' THEN 1
        WHEN 'Low' THEN 2
      END,
      datetime(created_at) DESC
  `,
    )
    .all();

  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const { title, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const stmt = db.prepare(`
    INSERT INTO tasks (title, priority)
    VALUES (?, ?)
  `);

  const result = stmt.run(title, priority || "Low");

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newTask);
});

router.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.prepare(
    `
    UPDATE tasks
    SET is_completed = CASE is_completed
      WHEN 0 THEN 1
      ELSE 0
    END
    WHERE id = ?
  `,
  ).run(id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!updated) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updated);
});

module.exports = router;
