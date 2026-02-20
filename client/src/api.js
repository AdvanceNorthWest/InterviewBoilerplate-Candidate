// Pre-configured API client — Base URL points to the Express backend.
// Use the exported functions to communicate with the server.

const BASE_URL = "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

// ---------------------------------------------------------------------------
// TODO (Candidate): Add functions here that call your API endpoints.
//
// Examples to implement:
//   export const getTasks   = ()         => request('/tasks');
//   export const createTask = (data)     => request('/tasks', { method: 'POST', body: JSON.stringify(data) });
//   export const toggleTask = (id)       => request(`/tasks/${id}`, { method: 'PATCH' });
// ---------------------------------------------------------------------------

// I use this to convert the backend's task object to what my React code expects.
// For example, the backend uses is_completed (0/1), but I want completed (true/false), and I rename priority to urgency.
const normalizeTask = (task) => ({
  ...task,
  completed: task.is_completed === 1,
  urgency: task.priority,
});

/*
// I also tried this approach,I found the arrow function version clearer and easier to read, so I used it above.
function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    completed: Boolean(task.is_completed),
    urgency: task.priority,
    // I could add more fields here if needed
  };
}
*/

// Just runs normalizeTask on every task in the array.
const normalizeTasks = (tasks) => tasks.map(normalizeTask);

// Before sending a new task to the backend, I change my field names back (urgency -> priority).
const denormalizeTask = (task) => ({
  ...task,
  priority: task.urgency,
});

// Get all tasks from the backend and make sure the fields match what my frontend needs.
export const getTasks = () => request("/tasks").then(normalizeTasks);

// When I add a new task, I convert the fields for the backend, then convert the response for my frontend.
export const createTask = (data) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify(denormalizeTask(data)),
  }).then(normalizeTask);

// When I check/uncheck a task, this updates the backend and then updates my frontend fields too.
export const toggleTask = (id) =>
  request(`/tasks/${id}`, {
    method: "PATCH",
  }).then(normalizeTask);

export { request };
