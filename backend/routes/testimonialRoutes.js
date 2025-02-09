const express = require("express");
const { createTestimonial, getTestimonials } = require("../controllers/testimonialController");

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial);

module.exports = router;

 
