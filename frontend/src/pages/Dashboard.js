import React, { useEffect, useState } from "react";
import { getProjects, getTestimonials } from "../services/api";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <h2>Testimonials</h2>
      <ul>
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>{testimonial.name}: {testimonial.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
