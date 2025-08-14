import { Link } from "react-router-dom";

// Card used on Home & Browse pages
export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
      {book.image && (
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
      <p className="text-xs text-gray-500 mb-2">Category: {book.category}</p>
      {book.description && (
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">{book.description}</p>
      )}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm">⭐ {book.rating}</span>
        <Link
          to={`/book/${book.id}`}
          className="text-sm font-medium px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
