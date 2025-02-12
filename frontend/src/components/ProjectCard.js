import React from "react";

const ProjectCard = ({ project, onDelete, isAdmin }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <a href={project.github_link} className="btn btn-primary btn-sm me-2" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={project.live_demo_link} className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">Live Demo</a>
        {isAdmin && (
          <button className="btn btn-danger btn-sm float-end" onClick={() => onDelete(project.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
