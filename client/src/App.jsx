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
import { createTask, getTasks, toggleTask } from './api';
import { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');


  useEffect (() => {
    async function loadTasks(){
      const data = await getTasks();
      setTasks(data)
    }

    loadTasks()
  },[])

  async function handleAddTask() {
    if(!title.trim() || !priority){
      alert('Must have title and priority');
      return
    }
    try{
      const result = await createTask({title: title, priority: priority})
    
      if (!result.ok){
        throw new Error('Network resonse was not ok');
      }
      const data = await result.json()
      return data;
    }catch(err) {
      console.error('Error:', err);
    }
  };


  async function handleToggleTask(id) {

    const originalTasks = [...tasks];
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, is_completed: !task.is_completed} : task
    );
    setTasks(updatedTasks);

    try{
      await toggleTask(id);
    }catch(err){
      setTasks(originalTasks);
      alert('Failed to update task')
    }
  };



  return (
    <div>
      <h3>TASK MANAGER</h3>

        <form
          onSubmit={handleAddTask}>
          <input
            value={title}
            placeholder='Task Title'
            onChange={(event) => setTitle(event.target.value) }
          ></input>
          <select
            value={priority}
            onChange= {(event) => setPriority(event.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button>Add Task</button>

        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input 
              type='checkbox'
              checked={task.is_completed}
              onChange={(event) => handleToggleTask(task.id)}></input>
              <span style={{
                backgroundColor: task.priority === 'High' ? '#FF6666' : 
                task.priority === 'Medium' ? '#FFCC99' : '#c8e86e'}}>
                  <span style={{ margin: '10px', textDecoration: task.is_completed ? 'line-through' : 'none'}}>
                  {task.title} ----- {task.priority}</span>

                  </span>
            </li>

   
          ))}




        </ul>


    </div>
  );
}

export default App;
