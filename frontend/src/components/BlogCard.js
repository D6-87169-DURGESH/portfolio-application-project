import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default BlogCard;
