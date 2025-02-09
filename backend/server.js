const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");  

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes); 

sequelize.sync({ force: false }).then(() => console.log("✅ Database connected"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

