require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const config = require("./config/config");

// Import routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const blogRoutes = require("./routes/blogRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/home", homeRoutes);

sequelize.sync({ force: false }).then(() => console.log("✅ Database connected"));

app.listen(config.PORT, () => console.log(`🚀 Server running on port ${config.PORT}`));
