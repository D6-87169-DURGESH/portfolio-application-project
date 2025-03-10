import React, { useEffect, useState } from "react";
import { getProjects, getTestimonials } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import TestimonialCard from "../components/TestimonialCard";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaSun, FaMoon, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles/home.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "enabled");
  const [showSettings, setShowSettings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");  // 🔥 Using sessionStorage
    console.log("Session Token:", token);  // Debugging
    if (!token) {
      navigate("/"); // Redirect if no token found
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
      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Dark Mode">
        {darkMode ? <FaMoon size={25} /> : <FaSun size={25} />}
      </button>

      {/* Hero Section */}
      <section className={`hero ${darkMode ? "bg-dark text-white" : "bg-light text-dark"} text-center pt-5 pb-5`}>
        <div className="container">
          <h1 className="display-4">Welcome to My Portfolio</h1>
          <p className="lead">Showcasing my latest projects and client testimonials.</p>
          <div className="mt-4">
            <Link to="/projects" className="btn btn-primary btn-lg mx-2">View Projects</Link>
            <Link to="/testimonials" className="btn btn-outline-secondary btn-lg mx-2">View Testimonials</Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container pt-5 pb-5">
        <h2 className="text-center">Projects</h2>
        <div className="row mt-4">
          {projects.slice(0, 3).map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${darkMode ? "bg-secondary text-white" : "bg-light text-dark"} pt-5 pb-5 text-center`}>
        <div className="container">
          <h2>Client Testimonials</h2>
          <div className="row mt-4">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div className="col-md-4 mb-4" key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container pt-5 pb-5 text-center">
        <h2>About Me</h2>
        <p className="lead">🚀 Hello, I'm Durgesh Ahire!
        I'm a passionate Full Stack Developer with expertise in Java, Spring Boot, Hibernate, and React.js. 
        I love building scalable and efficient web applications that provide seamless user experiences. 
        Currently, I am pursuing a Post Graduate Diploma in Advanced Computing at Sunbeam Institute, further honing my development skills. 
        I have also completed my B.Tech from Pune University.</p>
      </section>

      {/* Contact & Social Media Section */}
      <section className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} pt-5 pb-5 text-center`}>
        <div className="container">
          <h2>Contact Me</h2>
          <p>Email: <a href="mailto:durgeshahire6403.email@example.com">durgeshahire6403.email@example.com</a></p>
          <div className="social-icons mt-3">
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} className="mx-2 text-danger" />
            </a>
            <a href="https://github.com/Durgesh6403" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} className="mx-2 text-dark" />
            </a>
            <a href="https://www.linkedin.com/in/durgesh-ahire-04a575349/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} className="mx-2 text-primary" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
