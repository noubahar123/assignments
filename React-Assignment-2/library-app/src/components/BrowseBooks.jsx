import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { setView } from "../utils/booksSlice.js";

export default function BrowseBooks() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { list, categories, status, error } = useSelector((s) => s.books);

  // 🔎 local search query (works for All and for specific categories)
  const [q, setQ] = useState("");

  // Recompute the visible list whenever category or query changes
  useEffect(() => {
    dispatch(
      setView({
        category: category ? decodeURIComponent(category) : "",
        query: q,
      })
    );
  }, [dispatch, category, q]);

  const heading = category
    ? `Browse Books — ${decodeURIComponent(category)}`
    : "Browse Books";

  return (
    <div className="space-y-6">
      {/* Heading + ALWAYS-ON SearchBar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">{heading}</h1>
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Search by title or author…"
        />
      </div>

      {/* Category quick filters */}
      <div className="flex flex-wrap gap-2">
        <Link
          to="/books"
          className={`px-3 py-1 rounded ${
            !category ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </Link>
        {categories.map((c) => {
          const active =
            category &&
            decodeURIComponent(category).toLowerCase() === c.toLowerCase();
          return (
            <Link
              key={c}
              to={`/books/${encodeURIComponent(c)}`}
              className={`px-3 py-1 rounded ${
                active ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {/* Loading / Error / Results */}
      {status === "loading" && <p className="text-gray-600">Loading books…</p>}
      {status === "failed" && (
        <p className="text-red-600">Failed to load: {error || "Unknown error"}</p>
      )}

      {status !== "loading" && list.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
