import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { getTasks, createTask, toggleTask } from "../../api";
import "./Body.css";

const Body = forwardRef(function Body(_, ref) {
  const urgencyOrder = { High: 0, Medium: 1, Low: 2 };

  const sortTasks = (taskList) => {
    const incomplete = taskList.filter((t) => !t.completed);
    const completed = taskList.filter((t) => t.completed);

    // date based sorting, without = new list keeps going to bottom?
    const sortedIncomplete = [...incomplete].sort((a, b) => {
      const aOrder = urgencyOrder[a.urgency] ?? 2;
      const bOrder = urgencyOrder[b.urgency] ?? 2;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      if (a.date && b.date) {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    return [...sortedIncomplete, ...completed];
  };
  // const [tasks, setTasks] = useState(() =>
  //   sortTasks([
  //     {
  //       id: 1,
  //       title: "Finish this TaskList",
  //       date: "2026-02-20",
  //       urgency: "Medium",
  //       completed: false,
  //     },
  //     {
  //       id: 2,
  //       title: "Hola Austin",
  //       date: "2026-02-19",
  //       urgency: "Medium",
  //       completed: false,
  //     },
  //     {
  //       id: 3,
  //       title: "Eat Breakfast",
  //       date: "2026-02-19",
  //       urgency: "Medium",
  //       completed: false,
  //     },
  //     // I wanted to make sure my states were working, so I set it to true.
  //     {
  //       id: 4,
  //       title: "Take cat nap",
  //       date: "2026-02-19",
  //       urgency: "Low",
  //       completed: true,
  //     },
  //   ]),
  // );

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Failed to load tasks:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    toggleTask(id)
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, completed: updatedTask.completed }
              : task,
          ),
        );
      })
      .catch((error) => {
        console.error("Failed to toggle task:", error);
      });
  };

  useImperativeHandle(ref, () => ({
    addTask(newTask) {
      createTask(newTask)
        .then((createdTask) => {
          setTasks((prev) => sortTasks([...prev, createdTask]));
        })
        .catch((err) => {
          console.error("Failed to create task:", err);
        });
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
