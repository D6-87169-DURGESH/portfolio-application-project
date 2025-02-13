const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createTestimonial, getTestimonials } = require("../controllers/testimonialController");

const router = express.Router();

 
router.get("/", getTestimonials);

router.post("/", authMiddleware, createTestimonial);

module.exports = router;
