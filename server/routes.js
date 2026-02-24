const express = require("express");
const db = require("./db"); // Uncomment when you're ready to use the database

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
  try {
    const query = `
            SELECT * FROM tasks
            ORDER BY
                CASE priority
                    WHEN 'High' THEN 1
                    WHEN 'Medium' THEN 2
                    WHEN 'Low' THEN 3
                END ASC,
                created_at DESC
        `;
    const tasks = db.prepare(query).all();
    res.json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ error: "Error getting tasks." });
  }
});

router.post("/tasks", (req, res) => {
  const { title, priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required." });
  }

  try {
    const stmt = db.prepare(`INSERT INTO tasks (title, priority) VALUES (?,?)`);
    const info = stmt.run(title, priority);
    res.json({
      id: info.lastInsertRowid,
      title,
      priority,
      is_completed: 0,
    });
  } catch (err) {
    console.error("POST /tasks error:", err);
    res.status(500).json({ error: "Error creating task" });
  }
});

router.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare(
      `UPDATE tasks SET is_completed = 1 - is_completed WHERE id = ?`,
    );
    const info = stmt.run(id);

    if (info.changes === 0) {
      res.status(404).json({ error: "Task not found." });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("PATCH /tasks error:", err);
    res.status(500).json({ error: "Error updating task." });
  }
});

module.exports = router;
