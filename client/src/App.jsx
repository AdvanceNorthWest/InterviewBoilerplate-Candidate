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
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
