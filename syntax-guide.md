# Syntax Help Guide

This guide provides syntax hints and patterns without giving away the solution. Use this as a reference during the coding challenge.

---

## Table of Contents

1. [SQLite Database Syntax](#1-sqlite-database-syntax)
2. [Express.js Route Syntax](#2-expressjs-route-syntax)
3. [React State Management Syntax](#3-react-state-management-syntax)
4. [Fetch API Syntax](#4-fetch-api-syntax)

---

## 1. SQLite Database Syntax

### Creating a Table

```sql
CREATE TABLE IF NOT EXISTS table_name (
  column_name TYPE CONSTRAINTS,
  -- Add more columns here
);
```

### Column Types Reference

| Type | Example |
|------|---------|
| Text | `TEXT` |
| Boolean | `INTEGER` (SQLite uses 0/1 for booleans) |
| Timestamp | `INTEGER` or `TEXT` |
| Auto-increment ID | `INTEGER PRIMARY KEY AUTOINCREMENT` |

### INSERT Statement

```sql
INSERT INTO table_name (column1, column2)
VALUES (?, ?)
-- Use ? for parameterized queries to prevent SQL injection
```

### SELECT with ORDER BY (Multiple Columns)

```sql
SELECT * FROM table_name
ORDER BY column1 DIRECTION, column2 DIRECTION
-- DIRECTION can be ASC (ascending) or DESC (descending)
-- Multiple columns are separated by commas
```

### UPDATE Statement

```sql
UPDATE table_name
SET column = ?
WHERE id = ?
```

### Creating an Index (for performance)

```sql
CREATE INDEX IF NOT EXISTS index_name ON table_name(column_name);
```

---

## 2. Express.js Route Syntax

### Basic Route Structure

```javascript
app.METHOD('/endpoint', (req, res) => {
  // Handler logic
  res.send(response);
});
```

### HTTP Methods

| Method | Express Syntax |
|--------|----------------|
| GET | `app.get()` |
| POST | `app.post()` |
| PATCH | `app.patch()` |
| DELETE | `app.delete()` |

### Accessing Request Data

```javascript
// URL Parameters (e.g., /tasks/:id)
const id = req.params.id;

// Request Body (requires express.json() middleware)
const { title, priority } = req.body;

// Query Parameters (e.g., /tasks?priority=high)
const priority = req.query.priority;
```

### Sending Responses

```javascript
// Send JSON
res.json({ key: value });

// Send status + JSON
res.status(201).json({ key: value });

// Send error
res.status(400).json({ error: 'Error message' });
```

### Running a Database Query (using sqlite3)

```javascript
// For queries that return data (SELECT)
db.all('SQL QUERY', [params], (err, rows) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  res.json(rows);
});

// For queries that modify data (INSERT, UPDATE, DELETE)
db.run('SQL QUERY', [params], function(err) {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  // this.lastID gives you the ID of the inserted row
  res.json({ id: this.lastID, ...data });
});
```

---

## 3. React State Management Syntax

### useState Hook

```javascript
import { useState } from 'react';

function Component() {
  const [state, setState] = useState(initialValue);
  
  // Update state
  setState(newValue);
  
  // For objects/arrays, remember to spread
  setState({ ...state, key: newValue });
}
```

### useEffect Hook

```javascript
import { useEffect } from 'react';

function Component() {
  useEffect(() => {
    // Code to run on mount or when dependencies change
    fetchData();
    
    // Optional cleanup function
    return () => {
      // Cleanup code
    };
  }, [dependency1, dependency2]); // Empty array = run once on mount
}
```

### Handling Form Submission

```javascript
const handleSubmit = (e) => {
  e.preventDefault(); // Prevents page refresh
  
  // Access form data
  const formData = new FormData(e.target);
  const title = formData.get('title');
  
  // Or use controlled components with state
};
```

### Conditional Styling

```javascript
// Inline conditional class
<div className={condition ? 'class-a' : 'class-b'}>

// Inline conditional style
<div style={{ color: condition ? 'red' : 'blue' }}>
```

---

## 4. Fetch API Syntax

### Basic GET Request

```javascript
async function fetchData() {
  try {
    const response = await fetch('URL');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### POST Request with Body

```javascript
async function createItem(data) {
  try {
    const response = await fetch('URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### PATCH Request

```javascript
async function updateItem(id, updates) {
  try {
    const response = await fetch(`URL/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 5. Optimistic UI Pattern

### Concept

```javascript
// 1. Update UI immediately (before server responds)
setState(newData);

// 2. Make the API call
try {
  const result = await apiCall(data);
  // 3. If successful, you're done (UI already updated)
} catch (error) {
  // 4. If failed, revert the UI change
  setState(originalData);
  alert('Failed to update');
}
```

### Example with Toggle

```javascript
const handleToggle = async (id) => {
  // Save original state for potential rollback
  const originalTasks = [...tasks];
  
  // Optimistically update
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, is_completed: !task.is_completed } : task
  );
  setTasks(updatedTasks);
  
  // Make API call
  try {
    await api.toggle(id);
  } catch (error) {
    // Revert on error
    setTasks(originalTasks);
    alert('Failed to update task');
  }
};
```

---

## 6. Common Patterns Reference

### Mapping Over Arrays in JSX

```javascript
{items.map((item, index) => (
  <div key={item.id || index}>
    {item.name}
  </div>
))}
```

### Form with Select Dropdown

```javascript
<select name="priority" defaultValue="medium">
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

### Button with Click Handler

```javascript
<button onClick={() => handleClick(id)}>
  Click Me
</button>
```

### Checkbox Input

```javascript
<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

---

## 7. Debugging Tips

### Console Logging

```javascript
console.log('Variable:', variable);
console.table(arrayOfObjects); // Great for viewing arrays of data
```

### Checking API Response

```javascript
const response = await fetch('URL');
console.log('Status:', response.status);
const data = await response.json();
console.log('Data:', data);
```

### React DevTools

- Open browser DevTools (F12)
- Look for the "Components" tab to inspect React component state
- Check the "Network" tab to see API requests and responses

---

Good luck! Remember to think through each step before coding.
