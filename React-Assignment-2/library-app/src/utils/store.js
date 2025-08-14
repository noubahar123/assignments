import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice.js";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
