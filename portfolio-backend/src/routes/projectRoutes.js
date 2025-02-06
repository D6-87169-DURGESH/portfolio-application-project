const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Get All Projects
router.get("/", (req, res) => {
  const statement = "SELECT * FROM projects";
  db.query(statement, (error, result) => res.send(error ? error : result));
});

// 📌 Add a New Project
router.post("/", auth, (req, res) => {
  const { title, description, technologies, link, image } = req.body;
  const statement = "INSERT INTO projects (title, description, technologies, link, image) VALUES (?, ?, ?, ?, ?)";
  db.execute(statement, [title, description, technologies, link, image], (error, result) => {
    res.send(error ? error : { message: "Project added successfully!" });
  });
});

// 📌 Update a Project
router.put("/:id", auth, (req, res) => {
  const { title, description, technologies, link, image } = req.body;
  const statement = "UPDATE projects SET title=?, description=?, technologies=?, link=?, image=? WHERE id=?";
  db.execute(statement, [title, description, technologies, link, image, req.params.id], (error, result) => {
    res.send(error ? error : { message: "Project updated successfully!" });
  });
});

// 📌 Delete a Project
router.delete("/:id", auth, (req, res) => {
  const statement = "DELETE FROM projects WHERE id=?";
  db.execute(statement, [req.params.id], (error, result) => {
    res.send(error ? error : { message: "Project deleted successfully!" });
  });
});

module.exports = router;
