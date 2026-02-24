# Technical Interview: Collaborative Task Manager

## Quick Reference Commands

### First time setup
```bash
# One command installs all dependincies for both frontend and backend
npm run setup
```

### Starting the Application
```bash
# From the root directory, start both frontend and backend
npm run dev
```

### Verification Checks
- Frontend: `http://localhost:3000`
- Backend Health: `http://localhost:4000/health`
- API Endpoint: `http://localhost:4000/tasks`

### Useful Development Commands
```bash
# Install dependencies (if needed)
npm install

# Run only the server
npm run server

# Run only the client
npm run client
```

---

## Interview Overview

| Attribute | Details |
|-----------|---------|
| **Total Duration** | 90 Minutes |
| **Coding Time** | 60 Minutes |
| **Goal** | Assess architectural thinking, database handling, and state management |

---

## Interview Sections

### Section 1: Introduction & Setup (10 minutes)

- Brief introductions
- Verify development environment is working
- Confirm screen sharing is active
- Clarify AI/Google usage policy

---

### Section 2: Coding Challenge (60 minutes)

#### Scenario

You are building the core feature for a team task manager. We need a list where tasks can be viewed, added, and prioritized.

#### Requirements

##### 2.1 Database Schema

Design a `tasks` table with the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `title` | Text | Task title |
| `is_completed` | Boolean | Status indicator |
| `priority` | Enum/Text | Must distinguish between Low, Medium, High |
| `created_at` | Timestamp | Creation timestamp |

##### 2.2 Backend API

Implement the following REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Returns all tasks sorted by Priority (High first) then by Created Date (Newest first). **Sorting must be done in SQL, not JavaScript** |
| `POST` | `/tasks` | Adds a new task |
| `PATCH` | `/tasks/:id` | Toggles the completion status |

##### 2.3 Frontend

**Display:**
- Render the list of tasks
- High priority tasks must be visually distinct (e.g., different color, badge, or border)

**Interaction:**
- Create a form to add a task (Title + Priority select)

**User Experience (Optimistic UI):**
- When a user clicks the "Done" checkbox, the UI should update instantly without waiting for the server response
- If the server request fails, the UI must revert the change and alert the user

#### What NOT to Build

- ❌ Authentication/Login (Assume a single anonymous user)
- ❌ Complex styling (Standard HTML/CSS is fine)
- ❌ Drag and drop reordering

## Submission Checklist

Before the interview ends, ensure:

- [ ] Code is committed and pushed to the repository
- [ ] All required endpoints are implemented
- [ ] Frontend displays tasks correctly
- [ ] Optimistic UI is implemented for the "Done" toggle
- [ ] SQL sorting is implemented (not JavaScript sorting)

---

## File Structure Reference

```
/interview-repo
├── package.json          # Root scripts to run both apps
├── /server
│   ├── server.js         # Express app setup
│   ├── db.js             # SQLite connection
│   └── routes.js         # API routes
└── /client
    ├── vite.config.js
    └── /src
        ├── App.jsx       # Main React component
        └── api.js        # Pre-configured API client
```

---

Good luck!
