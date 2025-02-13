import React, { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import "../styles/Register.css";  


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [github_link, setGithubLink] = useState("");
  const [live_demo_link, setLiveDemoLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ Added loading state

  // ✅ Retrieve token safely
  const token = localStorage.getItem("token") || null;
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);  // ✅ Show loading while fetching
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      setMessage("❌ Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("❌ You need to log in to create a project.");
      return;
    }
  
    const projectData = { 
      title, 
      description, 
      image_url, 
      github_link, 
      live_demo_link 
    };
  
    console.log("📤 Sending project data:", projectData);
    console.log("🔐 Token used:", token);
  
    // Ensure all required fields are present
    if (!title || !description) {
      setMessage("❌ Title and description are required!");
      return;
    }
  
    if (!window.confirm("Are you sure you want to add this project?")) return;
  
    try {
      await createProject(projectData, token);
      setMessage("✅ Project created successfully!");
  
      // Reset input fields
      setTitle("");
      setDescription("");
      setImageUrl("");
      setGithubLink("");
      setLiveDemoLink("");
  
      fetchProjects(); // ✅ Refresh projects
    } catch (error) {
      console.error("❌ Error creating project:", error.response?.data || error.message);
      setMessage("❌ Failed to create project: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(projectId, token);
      setMessage("✅ Project deleted successfully!");
      fetchProjects(); // ✅ Refresh projects after deletion
    } catch (error) {
      console.error("❌ Error deleting project:", error);
      setMessage("❌ Failed to delete project.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Manage Projects</h2>

      {message && <p className="alert alert-info">{message}</p>}

      {token ? (
        <div className="mb-5">
          <h3>Add a New Project</h3>
          <form onSubmit={handleCreateProject}>
            <div className="mb-3">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div className="mb-3">
              <label>Image URL</label>
              <input type="url" className="form-control" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>GitHub Link</label>
              <input type="url" className="form-control" value={github_link} onChange={(e) => setGithubLink(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Live Demo Link</label>
              <input type="url" className="form-control" value={live_demo_link} onChange={(e) => setLiveDemoLink(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Create Project</button>
          </form>
        </div>
      ) : (
        <p className="alert alert-warning">🔒 You must log in to add a project.</p>
      )}

      <h3 className="text-center">All Projects</h3>
      
      {loading ? (
        <p className="text-center">⏳ Loading projects...</p>
      ) : (
        <div className="row">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="col-md-4" key={project.id}>
                <ProjectCard project={project} onDelete={handleDelete} isAdmin={!!token} />
              </div>
            ))
          ) : (
            <p className="text-center">No projects found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
