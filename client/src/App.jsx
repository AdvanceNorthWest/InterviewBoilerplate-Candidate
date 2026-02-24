// ---------------------------------------------------------------------------
// Entry point component.
//
// TODO (Candidate): Replace this placeholder with your Task Manager UI.
//
// Requirements:
//   - Fetch and display the task list on load
//   - Show a form with a Title input and a Priority select (Low/Medium/High)
//   - High priority tasks must be visually distinct
//   - "Done" checkbox must use Optimistic UI:
//       1. Update state immediately
//       2. Send PATCH request to server
//       3. On failure: revert state and alert the user
// ---------------------------------------------------------------------------
import { useState, useEffect } from "react";
import * as api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  // load data from db when the page initially loads
  useEffect(() => {
    api
      .getTasks()
      .then(setTasks)
      .catch((err) => console.error("Initial load failed"));
  }, []);

  // add new tasks
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.createTask({ title, priority });
      const newTasks = await api.getTasks();
      setTasks(newTasks);
      setTitle("");
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // toggle is_completed
  const handleToggle = async (taskId) => {
    const originalTasks = [...tasks];

    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, is_completed: 1 - t.is_completed } : t,
      ),
    );

    try {
      await api.toggleTask(taskId);
    } catch (err) {
      setTasks(originalTasks);
      alert("Sync failed, reverting changes");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Task Manager</h1>

      {/* Form */}
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul style={{ listStyle: "none" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              backgroundColor:
                task.priority === "High" ? "#de9e9e" : "transparent",
              borderLeft:
                task.priority === "High" ? "5px solid red" : "1px solid rec",
            }}
          >
            <input
              type="checkbox"
              checked={!!task.is_completed}
              onChange={() => handleToggle(task.id)}
            />
            <span
              style={{
                marginLeft: "10px",
                textDecoration: task.is_completed ? "line-through" : "none",
                fontWeight: task.is_completed ? "bold" : "normal",
              }}
            >
              {task.title} ({task.priority})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
