const express = require("express");
const mailer = require("../utils/mailer");

const router = express.Router();

// 📌 Contact Form - Send Email
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  mailer.sendEmail(
    "admin@portfolio.com",
    `New Contact Message from ${name}`,
    `<h3>Message from ${name} (${email})</h3><p>${message}</p>`,
    () => res.send({ message: "Message sent successfully!" })
  );
});

module.exports = router;
