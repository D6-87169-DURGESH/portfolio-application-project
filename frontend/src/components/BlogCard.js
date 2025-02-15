import React, { useState } from "react";

const BlogCard = ({ blog }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>

        {/* ✅ Show only part of the content initially */}
        <p className="card-text">
          {showFullContent ? blog.content : `${blog.content.substring(0, 100)}...`}
        </p>

        {/* ✅ Toggle "Read More / Read Less" */}
        {blog.content.length > 100 && (
          <button
            className="btn btn-link p-0"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
