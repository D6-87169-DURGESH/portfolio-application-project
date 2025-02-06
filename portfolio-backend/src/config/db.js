const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) console.error("Database Connection Failed:", err);
  else console.log("Connected to MySQL Database");
  if (connection) connection.release();
});

module.exports = pool;
