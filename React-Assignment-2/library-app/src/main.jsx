import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";            
import { BrowserRouter } from "react-router-dom";  
import App from "./App.jsx";
import "./index.css";
import store from "./utils/store.js";

// Provides Redux & Router to the whole app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
