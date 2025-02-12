const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getSettings);
router.post("/", authMiddleware, updateSettings);

module.exports = router;
