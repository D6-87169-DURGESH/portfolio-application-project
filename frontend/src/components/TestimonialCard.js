import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h4>{testimonial.name}</h4>
      <p>"{testimonial.feedback}"</p>
    </div>
  );
};

export default TestimonialCard;
