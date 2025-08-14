import { NavLink } from "react-router-dom";

// Simple top nav with active link styling
export default function Navbar() {
  const linkBase = "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100";
  const active = "bg-gray-200";

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold">
          📚 Online Library
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`} end>
            Home
          </NavLink>
          <NavLink to="/books" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
            Browse Books
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
            Add Book
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
