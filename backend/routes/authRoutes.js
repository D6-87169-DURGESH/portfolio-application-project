const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController"); // ✅ Make sure the names match

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

