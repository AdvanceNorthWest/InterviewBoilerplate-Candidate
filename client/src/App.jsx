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
import { useState, useRef } from "react";
import Header from "./components/Header/Header";
import AddListModal from "./components/AddListModal/AddListModal";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bodyRef = useRef(null);

  const handleAdd = (task) => {
    if (bodyRef.current && typeof bodyRef.current.addTask === "function") {
      bodyRef.current.addTask(task);
    }
  };

  return (
    <div>
      <Header onAddClick={() => setIsModalOpen(true)} />
      <AddListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
      <Body ref={bodyRef} />
      <Footer />
    </div>
  );
}

export default App;
