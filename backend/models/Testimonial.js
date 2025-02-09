const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Testimonial = sequelize.define("Testimonial", {
  name: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Testimonial;
