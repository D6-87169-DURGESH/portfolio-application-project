import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">My Portfolio</Link>
          
          {/* Sidebar Toggle Button */}
          <button className="navbar-toggler" onClick={() => setIsSidebarOpen(true)}>
            <FaBars className="text-white" />
          </button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>

            {/* Auth Buttons */}
            <div className="d-flex gap-2">
              {isAuthenticated ? (
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link className="btn btn-primary" to="/login">Login</Link>
                  <Link className="btn btn-outline-light" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`} onClick={() => setIsSidebarOpen(false)}>
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`} onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
          <ul className="sidebar-menu">
            <li><Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link></li>
            <li><Link to="/projects" onClick={() => setIsSidebarOpen(false)}>Projects</Link></li>
            <li><Link to="/blogs" onClick={() => setIsSidebarOpen(false)}>Blogs</Link></li>
            <li><Link to="/contact" onClick={() => setIsSidebarOpen(false)}>Contact</Link></li>
            {isAuthenticated ? (
              <li><button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button></li>
            ) : (
              <>
                <li><Link className="btn btn-primary w-100" to="/login" onClick={() => setIsSidebarOpen(false)}>Login</Link></li>
                <li><Link className="btn btn-outline-light w-100" to="/register" onClick={() => setIsSidebarOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
