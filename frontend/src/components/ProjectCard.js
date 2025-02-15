import React, { useState } from "react";

const ProjectCard = ({ project, onDelete, isAdmin }) => {
  const [expanded, setExpanded] = useState(false);
  const shortDescription = project.description.substring(0, 100);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">
          {expanded ? project.description : `${shortDescription}...`}
        </p>

        {project.description.length > 100 && (
          <button 
            className="btn btn-link btn-sm p-0" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}

        <div className="mt-2">
          <a 
            href={project.github_link} 
            className="btn btn-primary btn-sm me-2" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href={project.live_demo_link} 
            className="btn btn-secondary btn-sm" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
        </div>

        {isAdmin && (
          <button 
            className="btn btn-danger btn-sm float-end" 
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
