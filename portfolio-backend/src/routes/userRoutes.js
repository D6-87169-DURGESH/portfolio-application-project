const express = require("express");
const db = require("../config/db");
const utils = require("../utils/utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const mailer = require("../utils/mailer");

const router = express.Router();

// 📌 User Registration with OTP
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const otp = Math.floor(Math.random() * 1000000);
  const encryptedPassword = String(crypto.MD5(password));

  const statement = `INSERT INTO users (name, email, password, otp) VALUES (?, ?, ?, ?)`;
  db.execute(statement, [name, email, encryptedPassword, otp], (error, result) => {
    if (!error) {
      mailer.sendEmail(
        email,
        "Portfolio App - Verify Your Email",
        `<h2>Your OTP is: ${otp}</h2>`,
        () => res.send(utils.createSuccess("User registered! Check email for OTP."))
      );
    } else {
      res.send(utils.createError(error));
    }
  });
});

// 📌 User Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = String(crypto.MD5(password));

  const statement = `SELECT id, name, email FROM users WHERE email=? AND password=?`;
  db.query(statement, [email, encryptedPassword], (error, result) => {
    if (result.length === 0) {
      res.send(utils.createError("Invalid credentials"));
    } else {
      const user = result[0];
      const token = jwt.sign(user, config.secret);
      res.send(utils.createSuccess({ token, user }));
    }
  });
});

module.exports = router;
