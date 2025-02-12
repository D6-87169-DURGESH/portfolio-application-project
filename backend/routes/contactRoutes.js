const express = require("express");
const { submitContact, getContacts } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a contact message (Public)
router.post("/", submitContact);

// Get all contact messages (Protected - Requires Authentication)
router.get("/", authMiddleware, getContacts);

module.exports = router;
