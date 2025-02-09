const Testimonial = require("../models/Testimonial");

exports.createTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const testimonial = await Testimonial.create({ name, message });
    res.status(201).json({ message: "Testimonial added successfully", testimonial });
  } catch (error) {
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};
