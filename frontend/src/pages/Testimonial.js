import React, { useEffect, useState } from "react";
import { getTestimonials, createTestimonial } from "../services/api";
import TestimonialCard from "../components/TestimonialCard";
import "../styles/Register.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 🔄 Fetch token from Session Storage
  const token = sessionStorage.getItem("token") || null;
  console.log("🔑 Session Token:", token);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
      setMessage("❌ Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("❌ You need to log in to submit a testimonial.");
      return;
    }
    
    if (!name || !feedback) {
      setMessage("❌ Name and feedback are required!");
      return;
    }

    const testimonialData = { name, feedback };
    console.log("📤 Sending testimonial data:", testimonialData);

    try {
      await createTestimonial(testimonialData, token);
      setMessage("✅ Testimonial submitted successfully!");

      setName("");
      setFeedback("");
      fetchTestimonials(); // Refresh testimonials
    } catch (error) {
      console.error("❌ Error submitting testimonial:", error);
      setMessage("❌ Failed to submit testimonial.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Testimonials</h2>
      {message && <p className="alert alert-info">{message}</p>}

      {token ? (
        <div className="mb-5">
          <h3>Submit a Testimonial</h3>
          <form onSubmit={handleCreateTestimonial}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Feedback</label>
              <textarea className="form-control" value={feedback} onChange={(e) => setFeedback(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Testimonial</button>
          </form>
        </div>
      ) : (
        <p className="alert alert-warning">🔒 You must log in to submit a testimonial.</p>
      )}

      <h3 className="text-center">What People Say</h3>
      {loading ? (
        <p className="text-center">⏳ Loading testimonials...</p>
      ) : (
        <div className="row">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div className="col-md-4" key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))
          ) : (
            <p className="text-center">No testimonials found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
