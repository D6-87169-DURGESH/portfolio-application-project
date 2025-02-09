import React, { useEffect, useState } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      {projects.length > 0 ? (
        projects.map((project) => <ProjectCard key={project.id} project={project} />)
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default Projects;
