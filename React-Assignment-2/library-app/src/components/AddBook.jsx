import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addLocalBook, setView } from "../utils/booksSlice.js";



export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((s) => s.books);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    rating: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const e = {};
    if (!values.title.trim()) e.title = "Title is required";
    if (!values.author.trim()) e.author = "Author is required";
    if (!values.description.trim()) e.description = "Description is required";
    if (values.rating === "" || isNaN(Number(values.rating))) e.rating = "Rating must be a number";
    else if (Number(values.rating) < 0 || Number(values.rating) > 5) e.rating = "Rating must be between 0 and 5";
    if (!values.category.trim()) e.category = "Category is required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eobj = validate(form);
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    dispatch(
      addLocalBook({
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        rating: Number(form.rating),
        category: form.category,
        image: form.image || null,
      })
    );

    //To make new book show in top of the category
    dispatch(setView({ category: form.category, query: "" }));

    navigate(`/books/${encodeURIComponent(form.category)}`, { replace: true });
  }

  const inputCls = "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelCls = "text-sm font-medium";
  const errCls = "text-xs text-red-600 mt-1";

  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Book (Local)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelCls}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputCls} placeholder="e.g., The Hobbit" />
          {errors.title && <p className={errCls}>{errors.title}</p>}
        </div>

        <div>
          <label className={labelCls}>Author</label>
          <input name="author" value={form.author} onChange={handleChange} className={inputCls} placeholder="e.g., J.R.R. Tolkien" />
          {errors.author && <p className={errCls}>{errors.author}</p>}
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className={inputCls} placeholder="Short summary..." />
          {errors.description && <p className={errCls}>{errors.description}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Rating (0-5)</label>
            <input name="rating" value={form.rating} onChange={handleChange} className={inputCls} placeholder="e.g., 4.5" />
            {errors.rating && <p className={errCls}>{errors.rating}</p>}
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className={errCls}>{errors.category}</p>}
          </div>
        </div>

        <div>
          <label className={labelCls}>Image URL (optional)</label>
          <input name="image" value={form.image} onChange={handleChange} className={inputCls} placeholder="https://..." />
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save Book</button>
          <button type="button" onClick={() => window.history.back()} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
        </div>
      </form>
    </div>
  );
}
