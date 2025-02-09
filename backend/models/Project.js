const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define("Project", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING },
  github_link: { type: DataTypes.STRING },
  live_demo_link: { type: DataTypes.STRING },
});

module.exports = Project;
