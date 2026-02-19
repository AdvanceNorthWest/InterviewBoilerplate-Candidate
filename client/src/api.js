// Pre-configured API client — Base URL points to the Express backend.
// Use the exported functions to communicate with the server.

const BASE_URL = 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
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

export { request };
