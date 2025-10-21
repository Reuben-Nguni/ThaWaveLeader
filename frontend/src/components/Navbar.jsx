import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeMenu}>
            <img
              src={logo}
              alt="BenThaWav Logo"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            />
            <span className="fw-bold fs-5 text-primary">BenThaWaveLeader</span>
          </Link>

        {/* Toggle Button for Mobile */}
        {isMobile && (
          <button
            className="navbar-toggler p-1"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            style={{ fontSize: "0.9rem" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
      </div>

      {/* Drawer for Mobile */}
      {isMobile ? (
        <div
          className={`offcanvas offcanvas-end text-bg-dark ${isOpen ? "show" : ""}`}
          tabIndex="-1"
          style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button type="button" className="btn-close btn-close-white" onClick={closeMenu}></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                  <Link className="nav-link text-dark" to="/" onClick={closeMenu}>Home</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/beats" onClick={closeMenu}>
                    <i className="bi bi-music-note-beamed me-1"></i>Beats
                  </Link>
                </li>
              <li className="nav-item">
                  <Link className="nav-link text-dark" to="/blog" onClick={closeMenu}>Blog</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link text-dark" to="/news" onClick={closeMenu}>News</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link text-dark" to="/about" onClick={closeMenu}>About</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Horizontal menu for large screens
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/beats">
                  <i className="bi bi-music-note-beamed me-1"></i>Beats
                </Link>
              </li>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/news">News</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">About</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
