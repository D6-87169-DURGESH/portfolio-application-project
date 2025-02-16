const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({ title, content });
        res.status(201).json({ message: "Blog added successfully", blog });
    } catch (error) {
        res.status(500).json({ error: "Failed to add blog" });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

