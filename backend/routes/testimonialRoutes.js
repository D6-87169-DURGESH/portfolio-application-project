const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createTestimonial, getTestimonials } = require("../controllers/testimonialController");

const router = express.Router();

// Get all testimonials (Public)
router.get("/", getTestimonials);

// Create a new testimonial (Protected - Requires Authentication)
router.post("/", authMiddleware, createTestimonial);

module.exports = router;
