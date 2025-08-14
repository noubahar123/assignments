import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookCard from "./BookCard.jsx";

// Home shows categories + a "Popular" section fetched from the Fiction subject
export default function Home() {
  const { categories } = useSelector((s) => s.books);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const res = await fetch("https://openlibrary.org/subjects/fiction.json?limit=8");
        const data = await res.json();
        const works = (data.works || []).map((w) => ({
          id: w.key?.split("/").pop(),
          title: w.title,
          author: w.authors?.[0]?.name || "Unknown",
          description: w.subject?.slice(0, 3)?.join(", ") || "",
          rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
          category: "Fiction",
          image: w.cover_id ? `https://covers.openlibrary.org/b/id/${w.cover_id}-M.jpg` : null,
        }));
        setPopular(works);
      } catch {
        setPopular([]);
      }
    };
    loadPopular();
  }, []);

  return (
    <div className="space-y-8">
      <section className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to the Online Library</h1>
        <p className="text-gray-600">
          Explore categories, search titles and authors, and view details powered by the Open Library API.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/books/${encodeURIComponent(c)}`}
              className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Popular Books</h2>
          <Link to="/books" className="text-sm">View all →</Link>
        </div>
        {popular.length === 0 ? (
          <p className="text-gray-600">Loading…</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popular.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
