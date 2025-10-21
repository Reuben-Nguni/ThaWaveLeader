import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import News from "./pages/News";
import About from "./pages/About";
import AdminLogin from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Beats from "./pages/Beats";
import Videos from "./pages/Videos";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <Router>
      <Loading />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
  <Route path="/beats" element={<Beats />} />
  <Route path="/videos" element={<Videos />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<PostDetail />} />

        {/* Hidden admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Optional: catch-all 404 */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
