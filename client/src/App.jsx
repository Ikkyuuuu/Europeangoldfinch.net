// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Sidebar from "./components/Sidebar";      // <-- make sure this exists
import "./components/Sidebar.css";               // <-- platform + sidebar styles

import Login from "./pages/Login";
import Register from "./pages/Register";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import NewPost from "./pages/NewPost";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        {/* Shell to align content with banner/tabs */}
        <div className="egf-shell">
          {/* NEW: white platform behind sidebar + main */}
          <div className="egf-platform">
            <div className="egf-layout">
              <aside className="egf-sidebar">
                <Sidebar />
              </aside>

              <main className="egf-main">
                <Routes>
                  <Route path="/" element={<PostsList />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route
                    path="/posts/new"
                    element={
                      <ProtectedRoute>
                        <NewPost />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
