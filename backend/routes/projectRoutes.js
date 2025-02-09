const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware"); // ✅ Correct Import
const { createProject, getProjects } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.post("/", authMiddleware, createProject); // ✅ Use the middleware correctly

module.exports = router;
