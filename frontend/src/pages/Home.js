import React, { useEffect, useState } from "react";
import { getProjects, getTestimonials } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import TestimonialCard from "../components/TestimonialCard";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to My Portfolio</h1>
          <p className="lead">
            Showcasing my latest projects and client testimonials.
          </p>
          <a href="#projects" className="btn btn-primary btn-lg mt-3">
            View Projects
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container my-5">
        <h2 className="text-center mb-4">Projects</h2>
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Testimonials</h2>
          <div className="row">
            {testimonials.map((testimonial) => (
              <div className="col-md-4" key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
