const express = require("express");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController"); // ✅ Removed updateProject
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all projects (Public)
router.get("/", getProjects);

// ✅ Create a new project (Protected - Requires Authentication)
router.post("/", authMiddleware, createProject);

// ❌ Removed updateProject (No PUT request)

// ✅ Delete a project (Protected)
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
