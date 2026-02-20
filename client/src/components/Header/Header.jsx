import "./Header.css";

export default function Header({ onAddClick }) {
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      onAddClick && onAddClick();
    }
  };

  return (
    <header className="header">
      <h1>TaskList</h1>
      <div
        className="fab"
        role="button"
        tabIndex={0}
        aria-label="Add list item"
        onClick={onAddClick}
        onKeyDown={handleKey}
      >
        <span className="fab-plus">+</span>
      </div>
    </header>
  );
}
