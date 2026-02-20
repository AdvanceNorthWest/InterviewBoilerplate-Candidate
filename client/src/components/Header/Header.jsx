import "./Header.css";

export default function Header({ onAddClick }) {
  return (
    <header className="header">
      <h1>TaskList</h1>
      <button className="add-item-btn" onClick={onAddClick}>
        +list Item
      </button>
    </header>
  );
}
