import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={project.github_link}>GitHub</a> | 
      <a href={project.live_demo_link}>Live Demo</a>
    </div>
  );
};

export default ProjectCard;
