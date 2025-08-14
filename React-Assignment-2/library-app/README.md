# React + Vite
Online Library – React + Redux + Tailwind

A simple Online Library web app built with React, Redux Toolkit, React Router, and Tailwind CSS.
Users can browse books, search by title/author, view details, and add their own books.


### 1. Prerequisites
Install following files in the PC
1.) install vite :-  npm create vite@latest  (optional)
2.) Add dependencies :- npm install 
3.) Install & TailwindCSs :- npm install -D tailwindcss postcss autoprefixer
                             npx tailwindcss init -p
4.) Start Server :- npm run dev




## Dependencies

React – UI library

Vite – Development server & bundler

React Router DOM – Routing between pages

Redux Toolkit – State management

React Redux – Connect Redux with React

Tailwind CSS – Styling


## Features

📖 Browse Books – Displays 50 books fetched from the OpenLibrary API.

🔍 Search Functionality – Search books by title or author (works on home page and browse page).

📑 Book Categories – Filter books by categories (e.g., Fiction, Mystery, Science).

➕ Add a Book – Users can add a custom book (title, author, category, description, rating).

🖼️ Book Details Page – Displays cover image, author, category, rating, and description.

🎨 Tailwind CSS – Clean and responsive design














This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
