import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const SUBJECTS = ["fiction", "nonfiction", "science_fiction", "fantasy", "mystery"];

// 🔧 NEW: map UI labels/route params → canonical labels we store
const CATEGORY_ALIASES = {
  "Fiction": "Fiction",
  "Non-Fiction": "Nonfiction",     // UI → stored
  "Nonfiction": "Nonfiction",
  "Sci-Fi": "Science Fiction",     // UI → stored
  "Science Fiction": "Science Fiction",
  "Fantasy": "Fantasy",
  "Mystery": "Mystery",
};

// helper to canonicalize any incoming label
function canon(label = "") {
  return CATEGORY_ALIASES[label] || label;
}

function normalize(work, fallbackCategory = "General") {
  return {
    id: work.key?.split("/").pop(),
    title: work.title || "Untitled",
    author: work.authors?.[0]?.name || "Unknown",
    description: work.subject?.slice(0, 3)?.join(", ") || "",
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    category: fallbackCategory,
    image: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg` : null,
  };
}

export const fetchInitialBooksOnce = createAsyncThunk(
  "books/fetchInitialBooksOnce",
  async () => {
    const perSubject = 20;
    const urls = SUBJECTS.map((s) => `https://openlibrary.org/subjects/${s}.json?limit=${perSubject}`);
    const responses = await Promise.all(urls.map((u) => fetch(u)));
    const jsons = await Promise.all(responses.map((r) => r.json()));

    const all = [];
    jsons.forEach((data, idx) => {
      const label =
        SUBJECTS[idx]
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()); // e.g. "science_fiction" → "Science Fiction"
      (data.works || []).forEach((w) => all.push(normalize(w, label)));
    });

    const unique = [];
    const seen = new Set();
    for (const b of all) {
      if (!b.id || seen.has(b.id)) continue;
      seen.add(b.id);
      unique.push(b);
      if (unique.length >= 50) break;
    }
    return unique;
  },
  {
    condition: (_, { getState }) => {
      const s = getState().books;
      return !s.fetched && s.status !== "loading";
    },
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    all: [],
    locals: [],
    list: [],
    current: null,
    status: "idle",
    error: null,
    fetched: false,
    // Keep your UI labels if you like these:
    categories: ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Mystery"],
  },
  reducers: {
    // 🔧 ensure local adds use canonical category
    addLocalBook: {
      prepare(book) {
        return {
          payload: {
            ...book,
            id: book.id || nanoid(),
            category: canon(book.category),
            source: "local",
          },
        };
      },
      reducer(state, action) {
        state.locals.unshift(action.payload);
        state.list.unshift(action.payload);
      },
    },

    // recompute visible list locally (locals first) with alias-aware filtering
    setView(state, action) {
      const { category = "", query = "" } = action.payload || {};
      const qlc = (query || "").trim().toLowerCase();

      let merged = [...state.locals, ...state.all];

      if (category) {
        const wanted = canon(category).toLowerCase(); // 🔧 alias here
        merged = merged.filter((b) => (b.category || "").toLowerCase() === wanted);
      }

      if (qlc) {
        merged = merged.filter(
          (b) =>
            b.title.toLowerCase().includes(qlc) ||
            (b.author || "").toLowerCase().includes(qlc)
        );
      }

      state.list = merged;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialBooksOnce.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInitialBooksOnce.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetched = true;
        // 🔧 also canonicalize fetched categories (in case you change labels later)
        state.all = (action.payload || []).map((b) => ({ ...b, category: canon(b.category) }));
        state.list = [...state.locals, ...state.all];
      })
      .addCase(fetchInitialBooksOnce.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load books";
      });
  },
});

export const { addLocalBook, setView } = booksSlice.actions;
export default booksSlice.reducer;
