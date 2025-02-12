const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Settings = sequelize.define("Settings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    darkMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    seoTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seoDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

module.exports = Settings;
