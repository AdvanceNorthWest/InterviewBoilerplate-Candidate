import { useState, forwardRef, useImperativeHandle } from "react";
import "./Body.css";

const Body = forwardRef(function Body(_, ref) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish this TaskList",
      date: "2026-02-20",
      urgency: "Low",
      completed: false,
    },
    {
      id: 2,
      title: "Hola Austin",
      date: "2026-02-19",
      urgency: "High",
      completed: false,
    },
    {
      id: 3,
      title: "Eat Breakfast",
      date: "2026-02-19",
      urgency: "Medium",
      completed: false,
    },
    // I wanted to make sure my states were working, so I set it to true.
    {
      id: 4,
      title: "Take cat nap",
      date: "2026-02-19",
      urgency: "Low",
      completed: true,
    },
  ]);

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    const incompleteTasks = updatedTasks.filter((task) => !task.completed);
    const completedTasks = updatedTasks.filter((task) => task.completed);

    setTasks([...incompleteTasks, ...completedTasks]);
  };

  useImperativeHandle(ref, () => ({
    addTask(newTask) {
      const id = Date.now();
      setTasks((prev) => [
        ...prev,
        {
          id,
          title: newTask.title,
          date: newTask.date || "",
          urgency: newTask.urgency,
          completed: false,
        },
      ]);
    },
  }));
  return (
    <div className="body">
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
            </div>
            <div className="task-title">{task.title}</div>
            <div className="task-date">{task.date}</div>
            <div className="task-status">
              {task.completed ? "Completed" : "ToDo"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Body;
