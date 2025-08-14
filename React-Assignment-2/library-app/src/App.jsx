import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import BrowseBooks from "./components/BrowseBooks.jsx";
import BookDetails from "./components/BookDetails.jsx";
import AddBook from "./components/AddBook.jsx";
import NotFound from "./components/NotFound.jsx";
import { fetchInitialBooksOnce } from "./utils/booksSlice.js";

export default function App() {
  const dispatch = useDispatch();

  // ✅ fetch ONCE for the whole app
  useEffect(() => {
    dispatch(fetchInitialBooksOnce());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BrowseBooks />} />
          <Route path="/books/:category" element={<BrowseBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  );
}
