const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description, image_url, github_link, live_demo_link } = req.body;
    const project = await Project.create({ title, description, image_url, github_link, live_demo_link });
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};
