import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookDetails() {
  const { id } = useParams(); // e.g. "OL8193416W"
  const navigate = useNavigate();

  // Look in newly added books 1st, then the initial fetched list
  const { locals, all } = useSelector((s) => s.books);
  const book = [...locals, ...all].find((b) => b.id === id);

  if (!book) {
    
    return (
      <div className="bg-white border rounded p-6">
        <h1 className="text-xl font-semibold mb-2">Book not found</h1>
        <p className="text-gray-600 mb-4">
          This book isn’t in the cached list. Go back and pick another.
        </p>
        <div className="flex gap-2">
          <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-200 rounded">
            ← Back
          </button>
          <Link to="/books" className="px-3 py-2 bg-blue-600 text-white rounded">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6 space-y-4">
      {book.image && (
        <img src={book.image} alt={book.title} className="w-full max-h-80 object-cover rounded" />
      )}
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-700">by {book.author}</p>
      <p className="text-sm text-gray-500">Category: {book.category}</p>
      {book.description && <p className="text-gray-800">{book.description}</p>}
      <p className="font-medium">Rating: ⭐ {book.rating}</p>
      <div className="pt-2">
        <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-200 rounded">← Back</button>
      </div>
    </div>
  );
}
