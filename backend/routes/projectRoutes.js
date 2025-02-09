const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");  
const { createProject, getProjects } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.post("/", authMiddleware, createProject);  

module.exports = router;
