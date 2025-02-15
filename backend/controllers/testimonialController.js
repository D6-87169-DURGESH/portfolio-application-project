const Testimonial = require("../models/Testimonial");

exports.createTestimonial = async (req, res) => {
    try {
       // console.log("📝 Request Body:", req.body); 

        const { name, feedback } = req.body;
        if (!name || !feedback) {
            return res.status(400).json({ error: "Name and message are required" });
        }

        const testimonial = await Testimonial.create({ name, feedback });
       // console.log("✅ Testimonial Created:", testimonial);

        res.status(201).json({ feedback: "Testimonial added successfully", testimonial });
    } catch (error) {
        console.error("❌ Error adding testimonial:", error);
        res.status(500).json({ error: "Failed to add testimonial", details: error.message });
    }
};



exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        
       // console.log("✅ Testimonials from DB:", JSON.stringify(testimonials, null, 2)); 
        
        if (!testimonials || testimonials.length === 0) {
            return res.status(404).json({ message: "No testimonials found" });
        }

        res.json(testimonials);
    } catch (error) {
        console.error("❌ Error Fetching Testimonials:", error);
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
};
