const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.status(201).json({ message: "Message submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit message" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
