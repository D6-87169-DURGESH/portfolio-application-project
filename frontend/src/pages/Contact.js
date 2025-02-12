import React, { useState } from "react";
import { submitContact } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(form);
      setSuccessMessage("Message sent successfully!");
      setErrorMessage("");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <section className="contact-page d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4 contact-card animate-fade-in">
              <h2 className="text-center mb-4">Contact Me</h2>
              <p className="text-center text-muted">
                Have a question or want to work together? Send me a message!
              </p>
              {successMessage && <p className="alert alert-success">{successMessage}</p>}
              {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
