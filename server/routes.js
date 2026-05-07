const express = require('express');
const db = require('./db'); // Uncomment when you're ready to use the database

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


router.get('/tasks', (req, res) => {

    const stmt = db.prepare(`
        SELECT * FROM tasks
        ORDER BY
            CASE priority
                WHEN 'High' THEN 1
                WHEN 'Medium' THEN 2
                ELSE 3
            END ASC,
        created_at DESC        
        `)

    const tasks = stmt.all();

    if(!tasks){
        res.status(500).json({error: 'No tasks'}); 
    }
    res.status(201).json(tasks);
});


router.post('/tasks', (req, res) => {

    const {title, priority}  = req.body;

    if(!title || !priority){
        res.status(500).json({error: 'Must have title and priority'})
    }

    const stmt = db.prepare(`INSERT INTO tasks (title, priority) VALUES (?, ?)`);

    stmt.run(title, priority);
    
    res.status(201);

});


router.patch('/tasks/:id', (req, res) => {

    const {id} = req.params;

    const stmt = db.prepare(`UPDATE tasks Set is_completed = 1 - is_completed WHERE id = ?`);

    const result = stmt.run(id)


})

module.exports = router;
