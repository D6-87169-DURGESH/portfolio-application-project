const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define("Project", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true, // ✅ Allows NULL values
    },
    github_link: {
        type: DataTypes.STRING,
        allowNull: true, // ✅ Allows NULL values
    },
    live_demo_link: {
        type: DataTypes.STRING,
        allowNull: true, // ✅ Allows NULL values
    }
}, {
    timestamps: true, // ✅ Automatically creates `createdAt` & `updatedAt`
});

module.exports = Project;
