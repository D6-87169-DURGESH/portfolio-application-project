const Project = require("../models/Project");

exports.createProject = async (req, res) => {
    try {
        const { title, description, image_url, github_link, live_demo_link } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and Description are required" });
        }

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

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        await project.destroy();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete project" });
    }
};
