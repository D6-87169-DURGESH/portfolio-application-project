const express = require("express");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController"); 
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
 
router.get("/", getProjects);
 router.post("/", authMiddleware, createProject);
 router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
