import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Details from "./pages/Details.tsx";
import Favorites from "./pages/Favorites.tsx";
import Analysis from "./pages/Analysis.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/books/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/books/:id/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
