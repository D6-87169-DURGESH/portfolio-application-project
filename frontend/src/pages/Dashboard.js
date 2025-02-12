import React, { useEffect, useState } from "react";
import { getProjects, getTestimonials, deleteProject } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    if (!token) {
      alert("Access Denied! Please log in.");
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    getProjects().then(setProjects);
    getTestimonials().then(setTestimonials);
  }, [navigate, token]);

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(projectId, token);
      setProjects(projects.filter((project) => project.id !== projectId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <h2>Projects</h2>
      <ul className="list-group mb-4">
        {projects.map((project) => (
          <li className="list-group-item d-flex justify-content-between" key={project.id}>
            {project.title}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Testimonials</h2>
      <ul className="list-group">
        {testimonials.map((testimonial) => (
          <li className="list-group-item" key={testimonial.id}>
            <strong>{testimonial.name}:</strong> {testimonial.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
