import React, { useEffect, useState } from "react";
import { getTestimonials, createTestimonial } from "../services/api"; // Import API functions
import TestimonialCard from "../components/TestimonialCard";

const Testimonial = ({ token }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch testimonials on page load
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !message) {
      setError("Both name and message are required.");
      setLoading(false);
      return;
    }

    try {
      const newTestimonial = await createTestimonial({ name, message }, token);
      setTestimonials([...testimonials, newTestimonial]);
      setName("");
      setMessage("");
    } catch (err) {
      setError("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Testimonials</h2>

      {/* Display Testimonials */}
      {testimonials.length > 0 ? (
        testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)
      ) : (
        <p>No testimonials available.</p>
      )}

      {/* Testimonial Form */}
      <h3>Leave a Testimonial</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Testimonial;
