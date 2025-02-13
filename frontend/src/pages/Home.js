import React, { useEffect, useState } from "react";
import { getProjects, getTestimonials } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import TestimonialCard from "../components/TestimonialCard";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCog, FaSun, FaMoon } from "react-icons/fa";
import "../styles/home.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "enabled");
  const [showSettings, setShowSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      getProjects().then(setProjects);
      getTestimonials().then(setTestimonials);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  if (!isAuthenticated) {
    return <div className="text-center mt-5"><h2>Please log in to view the content.</h2></div>;
  }

  return (
    <>
      {/* ✅ Settings Button */}
      <button
        className="settings-btn"
        onClick={() => setShowSettings(true)}
        aria-label="Open Settings"
      >
        <FaCog size={25} />
      </button>

      {/* ✅ Settings Modal */}
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3>Settings</h3>
            <label className="dark-mode-toggle">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />} Dark Mode
            </label>
            <button className="btn btn-danger" onClick={() => setShowSettings(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ✅ Hero Section */}
      <section className={`hero ${darkMode ? "bg-dark text-white" : "bg-light text-dark"} text-center py-5`}>
        <div className="container">
          <h1 className="display-4">Welcome to My Portfolio</h1>
          <p className="lead">Showcasing my latest projects and client testimonials.</p>
          <div className="mt-4">
            <Link to="/projects" className="btn btn-primary btn-lg mx-2">View Projects</Link>
            <Link to="/testimonials" className="btn btn-outline-secondary btn-lg mx-2">View Testimonials</Link>
          </div>
        </div>
      </section>

      {/* ✅ About Section */}
      <section id="about" className="container my-5 text-center">
        <h2>About Me</h2>
        <p className="lead">
          I am a passionate developer specializing in modern web applications.
          With expertise in React, Node.js, and databases, I create seamless user experiences.
        </p>
        <Link to="/about" className="btn btn-outline-dark">Read More</Link>
      </section>

      {/* ✅ Projects Section */}
      <section id="projects" className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Projects</h2>
          <Link to="/projects" className="btn btn-outline-primary">View All</Link>
        </div>
        <div className="row">
          {projects.slice(0, 3).map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonials Section */}
      <section className={`${darkMode ? "bg-secondary text-white" : "bg-light text-dark"} py-5`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Client Testimonials</h2>
            <Link to="/testimonials" className="btn btn-outline-secondary">View All</Link>
          </div>
          <div className="row">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div className="col-md-4 mb-4" key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section className={`contact ${darkMode ? "bg-dark text-white" : "bg-light text-dark"} py-5`}>
        <div className="container text-center">
          <h2>Contact Me</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <FaMapMarkerAlt size={25} className="me-2" />
              <p className="mb-0">1234 Street, City, Country</p>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <FaEnvelope size={25} className="me-2" />
              <p className="mb-0">email@example.com</p>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <FaPhone size={25} className="me-2" />
              <p className="mb-0">+123 456 7890</p>
            </div>
          </div>

          {/* ✅ Social Media Icons */}
          <div className="mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
              <FaTwitter size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
              <FaLinkedin size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
