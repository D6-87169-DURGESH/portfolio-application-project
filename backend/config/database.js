const { Sequelize } = require("sequelize");
const config = require("./config");  

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\`;`);
    console.log(`✅ Database '${config.DB_NAME}' is ready`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
})();

module.exports = sequelize;

