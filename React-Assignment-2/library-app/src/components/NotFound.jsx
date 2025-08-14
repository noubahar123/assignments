import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-3">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="px-4 py-2 rounded bg-blue-600 text-white">Go Home</Link>
    </div>
  );
}
